import { useEffect, useRef, useState } from "react";
import "./about.css";

export default function About() {
  const [output, setOutput] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const inputRef = useRef(null);
  const termRef = useRef(null);
  const endRef = useRef(null);

  // typing helpers
  const typingTimerRef = useRef(null);
  const typingIdxRef = useRef(-1);
  const [typingIndex, setTypingIndex] = useState(-1); // which output line is being typed
  const TYPING_SPEED = 18; // ms per character (adjustable)

  const commands = {
    role: ">_ Web Developer",
    stack: ">_ HTML, CSS, JavaScript, React, Node.js, Express.js, Tailwind",
    ability: ">_ Turning ideas into clean, creative, and functional code.",
    name: ">_ Vedant D. Adhau",
    bio: ">_ Passionate developer exploring the intersection of creativity and logic.",
    projects: ">_ Stand Out, Portfolio.",
    tools: ">_ VS Code, Figma, Firebase, Git, Vite.",
    portfolio: ">_ https://vedantadhaudev.vercel.app",
    github: ">_ https://github.com/VedantAdhaudev",
    contact: ">_ Reach me at vedant.adhau.dev@gmail.com or on LinkedIn.com/in/vedant-adhau-dev",
    motto: ">_ Create. Break. Learn. Repeat.",
    coffee: ">_ Always.",
    help: ">_ Available commands: role, stack, ability, mission, location, name, bio, projects, tools, portfolio, github, contact, motto, coffee, clear",
  };

  const typeResponse = (command, fullText) => {
    // cancel any ongoing typing
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    // add placeholder entry so UI renders a new line immediately
    setOutput((prev) => {
      const next = [...prev, { command, response: "" }];
      typingIdxRef.current = next.length - 1;
      setTypingIndex(next.length - 1);
      return next;
    });

    let i = 0;
    typingTimerRef.current = setInterval(() => {
      setOutput((prev) => {
        // always update the last item (the one being typed)
        const idx = typingIdxRef.current;
        if (idx < 0 || idx >= prev.length) return prev;
        const newArr = prev.map((item, j) =>
          j === idx ? { ...item, response: fullText.slice(0, i + 1) } : item
        );
        return newArr;
      });
      i += 1;
      if (i >= fullText.length) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
        typingIdxRef.current = -1;
        setTypingIndex(-1);
      }
    }, TYPING_SPEED);
  };

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") {
      // if typing, cancel
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
        typingIdxRef.current = -1;
        setTypingIndex(-1);
      }
      setOutput([]);
      return;
    }
    const response = commands[command] || `Command not found: ${command}`;

    // start typing animation for the response (keeps UX similar to original)
    typeResponse(command, response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentLine.trim()) return;
    handleCommand(currentLine);
    setCurrentLine("");
  };

  // Scroll only when new lines appear
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [output]);

  // Adjust visible height based on navbar height and keyboard
  useEffect(() => {
    const term = termRef.current;
    const updateHeight = () => {
      const navbar = document.querySelector(".navbar"); // match your navbar class
      const navHeight = navbar ? navbar.offsetHeight : 60;
      const visibleHeight =
        (window.visualViewport?.height || window.innerHeight) - navHeight;
      if (term) term.style.height = `${visibleHeight}px`;
    };
    updateHeight();
    window.visualViewport?.addEventListener("resize", updateHeight);
    window.addEventListener("resize", updateHeight);
    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  // cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  return (
    <div className="terminal-page">
      <div className="terminal-container" ref={termRef}>
        <div className="terminal-header">About Me Terminal — Type "help"</div>

        <div className="terminal-body" onClick={() => inputRef.current.focus()}>
          {output.map((line, i) => (
            <div key={i} className="terminal-line">
              <span className="prompt">$ {line.command}</span>
              {/* Add a "typing" class to the response that's currently being typed */}
              <div className={`response ${typingIndex === i ? "typing" : ""}`}>
                {line.response}
              </div>
            </div>
          ))}

          <form className="terminal-line current" onSubmit={handleSubmit}>
            <span className="prompt">$ </span>
            <input
              ref={inputRef}
              className="terminal-input"
              type="text"
              value={currentLine}
              onChange={(e) => setCurrentLine(e.target.value)}
              autoComplete="off"
              spellCheck="false"
              inputMode="text"
            />
          </form>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}