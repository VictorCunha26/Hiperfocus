import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell.jsx";
import { EmptyState } from "./components/ui.jsx";
import { Login, Signup, Welcome } from "./pages/Auth.jsx";
import Generate from "./pages/Generate.jsx";
import Home from "./pages/Home.jsx";
import { AddInterest, Interests } from "./pages/Interests.jsx";
import { Library, MyTexts } from "./pages/Lists.jsx";
import { About, EditProfile, Help, Profile, ReadingPrefs } from "./pages/Profile.jsx";
import Reader from "./pages/Reader.jsx";
import { useApp } from "./state/AppContext.jsx";

function OnlyGuests() {
  const { loggedIn } = useApp();
  return loggedIn ? <Navigate to="/inicio" replace /> : <Outlet />;
}

function OnlyMembers() {
  const { loggedIn } = useApp();
  return loggedIn ? <Outlet /> : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<OnlyGuests />}>
        <Route path="/" element={<Welcome />} />
        <Route path="/entrar" element={<Login />} />
        <Route path="/criar-conta" element={<Signup />} />
      </Route>
      <Route element={<OnlyMembers />}>
        <Route element={<AppShell />}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/gerar" element={<Generate />} />
          <Route path="/texto/:id" element={<Reader />} />
          <Route path="/meus-textos" element={<MyTexts />} />
          <Route path="/biblioteca" element={<Library />} />
          <Route path="/interesses" element={<Interests />} />
          <Route path="/interesses/adicionar" element={<AddInterest />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/perfil/editar" element={<EditProfile />} />
          <Route path="/leitura" element={<ReadingPrefs />} />
          <Route path="/ajuda" element={<Help />} />
          <Route path="/sobre" element={<About />} />
          <Route
            path="*"
            element={
              <div className="page">
                <EmptyState emoji="🧭" title="Página não encontrada">
                  Use o menu para voltar ao início.
                </EmptyState>
              </div>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
