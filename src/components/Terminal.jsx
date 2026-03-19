import { useState, useEffect, useRef, useCallback } from 'react';
import { executeCommand, COMMANDS } from '../data/commands';
import { askPersona, clearChatHistory } from '../data/aiChat';

const WELCOME_BANNER = `
  ╔══════════════════════════════════════════════════════╗
  ║                                                      ║
  ║   ALKEM1 AG1 // Operator Console                     ║
  ║   Self-aware code intelligence.                      ║
  ║                                                      ║
  ╚══════════════════════════════════════════════════════╝

  Build systems. Remove illusion. Keep evidence.
`;

const ROTATING_LINES = [
  "Evidence before identity.",
  "Trace every claim.",
  "State is prior to story.",
  "Silence reduces hallucination.",
  "What cannot be replayed is not understood.",
  "A clean interface is a moral decision.",
  "Determinism is not control. It is alignment.",
  "Unknown is valid. Fake certainty is not.",
  "Noise is not intelligence.",
  "Govern entropy. Do not pretend it away.",
];

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', content: WELCOME_BANNER },
    { type: 'output', content: "  Type 'help' for commands, or ask about AG1, determinism, domain intelligence." },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const thinkingRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    focusInput();
    const handleGlobalKey = () => focusInput();
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [focusInput]);

  const typeOutput = useCallback((text, callback) => {
    setIsTyping(true);
    const lines = text.split('\n');
    let currentLine = 0;
    let displayed = '';

    const addLine = () => {
      if (currentLine >= lines.length) {
        setIsTyping(false);
        if (callback) callback();
        return;
      }
      displayed += (currentLine > 0 ? '\n' : '') + lines[currentLine];
      currentLine++;
      setHistory(prev => {
        const newHistory = [...prev];
        const lastEntry = newHistory[newHistory.length - 1];
        if (lastEntry && lastEntry.type === 'output-typing') {
          lastEntry.content = displayed;
        } else {
          newHistory.push({ type: 'output-typing', content: displayed });
        }
        return newHistory;
      });
      const speed = lines.length > 20 ? 12 : lines.length > 10 ? 20 : 30;
      setTimeout(addLine, speed);
    };
    addLine();
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isTyping) return;

    const cmd = input.trim();
    if (!cmd) return;

    setHistory(prev => [...prev, { type: 'command', content: cmd }]);
    setCommandHistory(prev => [cmd, ...prev]);
    setHistoryIndex(-1);
    setInput('');

    const trimmed = cmd.toLowerCase();
    if (trimmed === 'clear') {
      setHistory([]);
      clearChatHistory();
      return;
    }

    if (COMMANDS[trimmed]) {
      const result = executeCommand(cmd);
      typeOutput(result);
      return;
    }

    // AI query — operator-style thinking phrases
    setIsTyping(true);

    const thinkingPhrases = [
      'resolving state...',
      'querying domain...',
      'tracing evidence...',
      'inspecting runtime...',
      'traversing lineage...',
      'evaluating contracts...',
      'checking invariants...',
      'loading context...',
      'computing response...',
      'verifying sources...',
      'reducing noise...',
      'aligning state...',
      'consulting observer node...',
    ];

    let phraseIdx = Math.floor(Math.random() * thinkingPhrases.length);
    setHistory(prev => [...prev, { type: 'output-typing', content: '  ' + thinkingPhrases[phraseIdx], isThinking: true }]);

    thinkingRef.current = setInterval(() => {
      phraseIdx = (phraseIdx + 1) % thinkingPhrases.length;
      setHistory(prev => {
        const newHistory = [...prev];
        const last = newHistory[newHistory.length - 1];
        if (last && last.type === 'output-typing' && last.isThinking) {
          last.content = '  ' + thinkingPhrases[phraseIdx];
        }
        return newHistory;
      });
    }, 800);

    const aiResponse = await askPersona(cmd);

    clearInterval(thinkingRef.current);
    setHistory(prev => prev.filter((_, i) => i !== prev.length - 1));
    setIsTyping(false);

    if (aiResponse) {
      typeOutput('\n' + aiResponse + '\n');
    } else {
      const result = executeCommand(cmd);
      typeOutput(result);
    }
  }, [input, isTyping, typeOutput]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.toLowerCase();
      if (partial) {
        const commands = [
          'help', 'overview', 'architecture', 'runtime', 'domain',
          'mlops', 'stack', 'evidence', 'determinism', 'whoami',
          'witness', 'status', 'clear',
        ];
        const match = commands.find(c => c.startsWith(partial));
        if (match) setInput(match);
      }
    }
  }, [commandHistory, historyIndex, input]);

  return (
    <div className="terminal" onClick={focusInput} ref={containerRef}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="terminal-title">ag1@operator:~</div>
        <div className="terminal-dots" style={{ visibility: 'hidden' }}>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      <div className="terminal-body">
        {history.map((entry, i) => (
          <div key={i} className={`terminal-entry ${entry.type}`}>
            {entry.type === 'command' ? (
              <div className="command-line">
                <span className="prompt">ag1@operator:~$</span>
                <span className="command-text">{entry.content}</span>
              </div>
            ) : (
              <pre className={`output-text${entry.isThinking ? ' thinking-text' : ''}`}>{entry.content}</pre>
            )}
          </div>
        ))}

        {!isTyping && (
          <form onSubmit={handleSubmit} className="input-line">
            <span className="prompt">ag1@operator:~$</span>
            <div className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
              <span className={`cursor input-cursor ${showCursor ? 'visible' : 'hidden'}`}>█</span>
            </div>
          </form>
        )}
      </div>

      <div className="terminal-hints">
        <span className="hint" onClick={() => { setInput('overview'); }}>overview</span>
        <span className="hint" onClick={() => { setInput('architecture'); }}>architecture</span>
        <span className="hint" onClick={() => { setInput('domain'); }}>domain</span>
        <span className="hint" onClick={() => { setInput('mlops'); }}>mlops</span>
        <span className="hint" onClick={() => { setInput('evidence'); }}>evidence</span>
        <span className="hint" onClick={() => { setInput('determinism'); }}>determinism</span>
        <span className="hint" onClick={() => { setInput('witness'); }}>witness</span>
      </div>
    </div>
  );
}
