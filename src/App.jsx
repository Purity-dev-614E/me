import "./App.css";
import { View } from "./components";
import { Contact, About, Now, Hero, Other,Featured } from "./widgets/index";

function App() {
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
