import "./App.css";
import { useEffect, useState } from "react";
import { View } from "./components";
import { Contact, About, Now, Hero, Other,Featured } from "./widgets/index";
import Journal from "./pages/journal/journal";
import Admin from "./pages/admin/admin";

function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const updateRoute = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  if (route === "#/journal") return <Journal />;
  if (route === "#/admin") return <Admin />;

  return (
    <>
      <Hero />
      <Featured />
      <Other />
      <Now />
      <About />
      <Contact />
    </>
  );
}

export default App;
