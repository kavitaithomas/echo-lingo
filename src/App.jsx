import { useState, useEffect } from "react";
import EL_logo from "./assets/EL_logo.svg";
import playIcon from "./assets/start.svg";
import pauseIcon from "./assets/stop.svg";

function App() {
  const [isRunning, setIsRunning] = useState(() => {
    const savedState = localStorage.getItem("isRunning");
    return savedState ? JSON.parse(savedState) : false;
  });

  const [activeToggle, setActiveToggle] = useState("speech");
  const [inputValue, setInputValue] = useState(""); // State to store the input value

  useEffect(() => {
    localStorage.setItem("isRunning", JSON.stringify(isRunning));
  }, [isRunning]);

  const handleToggleButton = () => {
    const highlightedText = window.getSelection().toString().trim();

    if (!highlightedText) {
      alert("Please highlight some text first!");
      return;
    }

    if (!isRunning) {
      // Speak the highlighted text
      const utterance = new SpeechSynthesisUtterance(highlightedText);
      window.speechSynthesis.speak(utterance);

      // Store the highlighted text in localStorage
      localStorage.setItem("inputValue", highlightedText);
      setInputValue(highlightedText);
    } else {
      // Stop speaking
      window.speechSynthesis.cancel();
    }

    setIsRunning(!isRunning);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white p-10 w-85 h-auto">
      <div className="flex flex-col items-center">
        <div className="text-[44px] text-center">Echo-Lingo</div>
        <h1 className="text-[16px] text-center">Highlight. Listen. Learn.</h1>
        <img src={EL_logo} alt="EL Logo" className="w-40 h-40 object-contain" />
      </div>
      

      {/* <SliderToggle activeToggle={activeToggle} handleToggle={setActiveToggle} />

      {activeToggle === "translate" && <Translate />} Show Translate only when active */}

      <div className="flex flex-col items-center mt-6 text-[20px] w-full">
        <button
          onClick={handleToggleButton}
          className="py-2 w-full rounded-full border-2 transition-all flex items-center justify-center bg-green-800 text-white border-green-800"
        >
          <img
            src={playIcon}
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
}

export default App;