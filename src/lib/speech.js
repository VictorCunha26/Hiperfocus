import { useCallback, useEffect, useRef, useState } from "react";

const supported = typeof window !== "undefined" && "speechSynthesis" in window;

function pickVoice() {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === "pt-BR" && /natural|google|luciana|francisca/i.test(v.name)) ||
    voices.find((v) => v.lang === "pt-BR") ||
    voices.find((v) => v.lang?.startsWith("pt")) ||
    null
  );
}

// Lê o texto em voz alta, frase por frase, informando qual frase está sendo lida
// para que ela seja destacada na tela.
export function useSpeech(sentences, rate = 1) {
  const [status, setStatus] = useState("idle"); // idle | playing | paused
  const [current, setCurrent] = useState(-1);
  const runRef = useRef(0);

  const stop = useCallback(() => {
    runRef.current += 1;
    if (supported) window.speechSynthesis.cancel();
    setStatus("idle");
    setCurrent(-1);
  }, []);

  const speakFrom = useCallback(
    (index) => {
      if (!supported) return;
      const run = ++runRef.current;
      window.speechSynthesis.cancel();
      const step = (i) => {
        if (run !== runRef.current) return;
        if (i >= sentences.length) {
          setStatus("idle");
          setCurrent(-1);
          return;
        }
        const utterance = new SpeechSynthesisUtterance(sentences[i]);
        utterance.lang = "pt-BR";
        utterance.rate = rate;
        const voice = pickVoice();
        if (voice) utterance.voice = voice;
        utterance.onend = () => step(i + 1);
        utterance.onerror = (event) => {
          if (event.error !== "interrupted" && event.error !== "canceled") step(i + 1);
        };
        setCurrent(i);
        window.speechSynthesis.speak(utterance);
      };
      setStatus("playing");
      step(index);
    },
    [sentences, rate],
  );

  const toggle = useCallback(() => {
    if (!supported) return;
    if (status === "playing") {
      window.speechSynthesis.pause();
      setStatus("paused");
    } else if (status === "paused") {
      window.speechSynthesis.resume();
      setStatus("playing");
    } else {
      speakFrom(0);
    }
  }, [status, speakFrom]);

  // Para a leitura ao sair da tela ou ao trocar de texto.
  useEffect(() => stop, [sentences, stop]);

  return { supported, status, current, toggle, stop, speakFrom };
}

export function speakSample(text, rate) {
  if (!supported) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = rate;
  const voice = pickVoice();
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

export const speechSupported = supported;
