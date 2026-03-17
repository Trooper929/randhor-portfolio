import { useState } from "react";
import PortfolioGame from "./components/Game";
import IntroScreen from "./components/IntroScreen";

export default function App() {
  const [started, setStarted] = useState(false);

  return started ? (
    <PortfolioGame />
  ) : (
    <IntroScreen onStart={() => setStarted(true)} />
  );
}
