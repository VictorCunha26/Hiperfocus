import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from "react";
import { requestContent, requestIllustration } from "../lib/api.js";
import { hashPassword } from "../lib/crypto.js";
import { CATALOG, STARTER_IDS, makeInterest } from "../lib/interests.js";
import { countWords, firstName, newId } from "../lib/text.js";

const STORAGE_KEY = "hiperfocus:v1";
const MAX_UNSAVED = 60;

export const DEFAULT_PREFS = {
  theme: "claro", // claro | escuro | sistema
  fontSize: 20,
  lineHeight: 1.7,
  font: "nunito", // nunito | lexend | atkinson
  voiceRate: 0.9,
  reduceMotion: false,
};

const starterInterests = () =>
  STARTER_IDS.map((id) => {
    const item = CATALOG.find((c) => c.id === id);
    return { id: item.id, name: item.name, emoji: item.emoji, active: false };
  });

const emptyState = {
  account: null,
  loggedIn: false,
  interests: [],
  texts: [],
  prefs: DEFAULT_PREFS,
  stats: { textsRead: 0, wordsRead: 0, correctAnswers: 0 },
};

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return emptyState;
    return {
      ...emptyState,
      ...saved,
      prefs: { ...DEFAULT_PREFS, ...saved.prefs },
      stats: { ...emptyState.stats, ...saved.stats },
    };
  } catch {
    return emptyState;
  }
}

function trimHistory(texts) {
  let unsaved = 0;
  return texts.filter((t) => t.saved || ++unsaved <= MAX_UNSAVED);
}

function reducer(state, action) {
  switch (action.type) {
    case "signup":
      return {
        ...emptyState,
        prefs: state.prefs,
        account: action.account,
        loggedIn: true,
        interests: starterInterests(),
      };
    case "login":
      return { ...state, loggedIn: true };
    case "logout":
      return { ...state, loggedIn: false };
    case "reset":
      return { ...emptyState, prefs: state.prefs };
    case "updateAccount":
      return { ...state, account: { ...state.account, ...action.patch } };
    case "setInterests":
      return { ...state, interests: action.interests };
    case "addInterest": {
      const exists = state.interests.find((i) => i.id === action.interest.id);
      const interests = exists
        ? state.interests.map((i) => (i.id === action.interest.id ? { ...i, active: true } : i))
        : [...state.interests, action.interest];
      return { ...state, interests };
    }
    case "removeInterest":
      return { ...state, interests: state.interests.filter((i) => i.id !== action.id) };
    case "addText":
      return { ...state, texts: trimHistory([action.text, ...state.texts]) };
    case "updateText":
      return {
        ...state,
        texts: state.texts.map((t) => (t.id === action.id ? { ...t, ...action.patch } : t)),
      };
    case "deleteText":
      return { ...state, texts: state.texts.filter((t) => t.id !== action.id) };
    case "markRead": {
      const text = state.texts.find((t) => t.id === action.id);
      if (!text || text.readAt) return state;
      return {
        ...state,
        texts: state.texts.map((t) => (t.id === action.id ? { ...t, readAt: new Date().toISOString() } : t)),
        stats: {
          ...state.stats,
          textsRead: state.stats.textsRead + 1,
          wordsRead: state.stats.wordsRead + countWords(text.paragraphs),
        },
      };
    }
    case "correctAnswer":
      return { ...state, stats: { ...state.stats, correctAnswers: state.stats.correctAnswers + 1 } };
    case "setPrefs":
      return { ...state, prefs: { ...state.prefs, ...action.patch } };
    default:
      return state;
  }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Sem espaço: removemos as ilustrações dos textos mais antigos não salvos e tentamos de novo.
    try {
      const lighter = {
        ...state,
        texts: state.texts.map((t, index) =>
          !t.saved && index > 10 && t.illustration?.svg ? { ...t, illustration: { status: "scene" } } : t,
        ),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lighter));
    } catch {
      /* armazenamento indisponível (ex.: navegação privada) */
    }
  }
}

function useResolvedTheme(theme) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = theme === "escuro" || (theme === "sistema" && media.matches);
      document.documentElement.dataset.theme = dark ? "dark" : "light";
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0e1a33" : "#f5f8fe");
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => save(state), [state]);
  useResolvedTheme(state.prefs.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.readFont = state.prefs.font;
    root.dataset.motion = state.prefs.reduceMotion ? "reduce" : "auto";
    root.style.setProperty("--read-size", `${state.prefs.fontSize}px`);
    root.style.setProperty("--read-line", String(state.prefs.lineHeight));
  }, [state.prefs]);

  const signup = useCallback(async ({ name, email, password, age, level, guardian }) => {
    const passwordHash = await hashPassword(email, password);
    dispatch({
      type: "signup",
      account: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        passwordHash,
        age: age ? Number(age) : null,
        level,
        guardian: guardian?.trim() || "",
        avatar: "🧒",
        createdAt: new Date().toISOString(),
      },
    });
  }, []);

  const login = useCallback(async (email, password) => {
    const { account } = stateRef.current;
    if (!account) return "Nenhuma conta foi criada neste aparelho ainda. Toque em “Criar conta” para começar.";
    if (account.email !== email.trim().toLowerCase()) return "Não encontramos esse e-mail neste aparelho.";
    if ((await hashPassword(email, password)) !== account.passwordHash) return "Senha incorreta. Tente de novo.";
    dispatch({ type: "login" });
    return null;
  }, []);

  const illustrate = useCallback(async (text) => {
    try {
      const { svg } = await requestIllustration({
        interest: text.interestName,
        title: text.title,
        description: text.illustrationDescription,
      });
      dispatch({
        type: "updateText",
        id: text.id,
        patch: { illustration: svg ? { status: "done", svg } : { status: "scene" } },
      });
    } catch {
      dispatch({ type: "updateText", id: text.id, patch: { illustration: { status: "scene" } } });
    }
  }, []);

  const generate = useCallback(
    async ({ type, interest, theme, detail }, signal) => {
      const { account, interests } = stateRef.current;
      const result = await requestContent(
        {
          type,
          interest: interest.name,
          theme,
          detail,
          level: account?.level,
          age: account?.age,
          readerName: firstName(account?.name),
          otherInterests: interests.filter((i) => i.active && i.id !== interest.id).map((i) => i.name),
        },
        signal,
      );
      const text = {
        id: newId(),
        type,
        interestId: interest.id,
        interestName: interest.name,
        emoji: interest.emoji,
        detail: detail || "",
        theme: theme || "",
        title: result.title,
        paragraphs: result.paragraphs,
        funFact: result.funFact || "",
        glossary: result.glossary || [],
        questions: result.questions || [],
        illustrationDescription: result.illustrationDescription || "",
        illustration: type === "texto-ilustracao" ? { status: "pending" } : null,
        source: result.source,
        notice: result.notice || "",
        createdAt: new Date().toISOString(),
        saved: false,
        readAt: null,
      };
      dispatch({ type: "addText", text });
      if (type === "texto-ilustracao") illustrate(text);
      return text;
    },
    [illustrate],
  );

  // Ilustrações que ficaram pela metade (ex.: a página foi recarregada) são pedidas de novo.
  const resumed = useRef(false);
  useEffect(() => {
    if (resumed.current) return;
    resumed.current = true;
    stateRef.current.texts.filter((t) => t.illustration?.status === "pending").forEach(illustrate);
  }, [illustrate]);

  const actions = useMemo(
    () => ({
      signup,
      login,
      generate,
      illustrate,
      logout: () => dispatch({ type: "logout" }),
      reset: () => dispatch({ type: "reset" }),
      updateAccount: (patch) => dispatch({ type: "updateAccount", patch }),
      setInterests: (interests) => dispatch({ type: "setInterests", interests }),
      addInterest: (name, emoji) => {
        const interest = makeInterest(name, emoji);
        dispatch({ type: "addInterest", interest });
        return interest;
      },
      removeInterest: (id) => dispatch({ type: "removeInterest", id }),
      updateText: (id, patch) => dispatch({ type: "updateText", id, patch }),
      deleteText: (id) => dispatch({ type: "deleteText", id }),
      markRead: (id) => dispatch({ type: "markRead", id }),
      correctAnswer: () => dispatch({ type: "correctAnswer" }),
      setPrefs: (patch) => dispatch({ type: "setPrefs", patch }),
    }),
    [signup, login, generate, illustrate],
  );

  const value = useMemo(() => ({ ...state, ...actions }), [state, actions]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
