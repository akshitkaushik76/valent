import { useState, useEffect, useRef } from "react";
import "./index.css";

export default function App() {

  const [scale, setScale] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");

  const audioRef = useRef(null);

  // 🔴 CHANGE THIS NAME
  const herName = "Vidushi ❤️";

  /* NO button runs away + YES grows */
  const moveNo = () => {
    const x = Math.random() * 400 - 200;
    const y = Math.random() * 250 - 125;

    setNoPos({ x, y });
    setScale(prev => prev + 0.25);
  };

  /* YES CLICKED */
  const sayYes = () => {
    setAccepted(true);
    createHearts(100);

    // play music (after user interaction so browser allows it)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.7;
        audioRef.current.play();
      }
    }, 400);
  };

  /* Typing animation */
  useEffect(() => {
    if (!accepted) return;

    let i = 0;
    const interval = setInterval(() => {
      setTypedText(herName.slice(0, i + 1));
      i++;
      if (i === herName.length) clearInterval(interval);
    }, 120);

    return () => clearInterval(interval);
  }, [accepted]);

  /* Floating hearts */
  const createHearts = (num) => {
    for (let i = 0; i < num; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerHTML = "❤";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = 10 + Math.random() * 30 + "px";
      heart.style.animationDuration = 3 + Math.random() * 3 + "s";
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 6000);
    }
  };

  return (
    <div className="container">

      {/* background music */}
      <audio ref={audioRef} src="/music/love.mp3" loop />

      <div className="card">

        {!accepted ? (
          <>
            <h1>Will You Be My Valentine? 💖</h1>

            <div className="buttons">

              <button
                className="yes"
                style={{ transform: `scale(${scale})` }}
                onClick={sayYes}
              >
                Yes 💘
              </button>

              <button
                className="no"
                onMouseEnter={moveNo}
                style={{
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`
                }}
              >
                No 😢
              </button>

            </div>
          </>
        ) : (
          <div className="loveMessage">
            <div className="typing">{typedText}</div>
            <br />
            You just made me the happiest person alive 🥹💖
            <br /><br />
            I promise unlimited hugs, food dates,
            and loving you forever ❤️
          </div>
        )}

      </div>
    </div>
  );
}
