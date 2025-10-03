import { Routes, Route } from "react-router-dom";
import MainMenu from "./Pages/MainMenu";
import Configurator from "./Pages/Configurator";
import Aftermath from "./Pages/Aftermath";
import About from "./Pages/About";
import NotFound from "./Pages/NotFound";
import Simulation from "./Pages/Simulation";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/deflect" element={<Configurator />} />
      <Route path="/aftermath" element={<Aftermath />} />
      <Route path="/about" element={<About />} />
      <Route path="/deflect/simulation" element={<Simulation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
