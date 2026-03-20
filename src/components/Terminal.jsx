import { useState, useEffect, useRef, useCallback } from 'react';
import { executeCommand, COMMANDS, ASYNC_COMMANDS } from '../data/commands';
import { askPersona, clearChatHistory } from '../data/aiChat';
import AnimatedLogo from './AnimatedLogo';
import MediaEmbed from './MediaEmbed';

const WELCOME_TEXT = `  ALKEM1 AG1 // Operator Console
  Self-aware code intelligence.

  Build systems. Remove illusion. Keep evidence.`;

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
    { type: 'logo' },
    { type: 'output', content: WELCOME_TEXT },
    { type: 'output', content: "  Type 'help' for commands, or ask about AG1, determinism, domain intelligence." },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [logoState, setLogoState] = useState('idle');
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

  // Scroll to bottom of terminal-body whenever needed
  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      const body = containerRef.current.querySelector('.terminal-body');
      if (body) body.scrollTop = body.scrollHeight;
    }
    // Also try scrollIntoView on the input
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 150);
  }, []);

  useEffect(() => {
    focusInput();
    const handleGlobalKey = () => focusInput();
    window.addEventListener('keydown', handleGlobalKey);

    // Mobile keyboard handling
    const vv = window.visualViewport;
    if (vv) {
      const onResize = () => {
        // Set CSS variable to visual viewport height
        const h = vv.height;
        document.documentElement.style.setProperty('--vvh', `${h}px`);
        // Scroll input visible after keyboard resize
        scrollToBottom();
      };
      vv.addEventListener('resize', onResize);
      vv.addEventListener('scroll', onResize);
      onResize();
      return () => {
        window.removeEventListener('keydown', handleGlobalKey);
        vv.removeEventListener('resize', onResize);
        vv.removeEventListener('scroll', onResize);
      };
    }

    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [focusInput, scrollToBottom]);

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
      // Check if command returns media (object with text + media)
      if (result && typeof result === 'object' && result.text) {
        typeOutput(result.text, () => {
          // After text is typed, add media embed
          if (result.media) {
            setHistory(prev => [...prev, { type: 'media', media: result.media }]);
          }
        });
        return;
      }
      typeOutput(result);
      return;
    }

    // Check async operator commands (commit, evidence, witness, prove, verify)
    const parts = cmd.match(/^(\S+)\s*(.*)?$/);
    const cmdName = parts ? parts[1].toLowerCase() : trimmed;
    const cmdArgs = parts ? (parts[2] || '').trim() : '';

    if (ASYNC_COMMANDS[cmdName]) {
      setIsTyping(true);
      setLogoState('thinking');
      const result = await ASYNC_COMMANDS[cmdName](cmdArgs || undefined);
      setLogoState('success');
      setTimeout(() => setLogoState('idle'), 400);
      typeOutput(result);
      return;
    }

    // AI query — operator-style thinking phrases
    setIsTyping(true);
    setLogoState('thinking');

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
      setLogoState('success');
      setTimeout(() => setLogoState('idle'), 400);
      typeOutput('\n' + aiResponse + '\n');
    } else {
      setLogoState('error');
      setTimeout(() => setLogoState('idle'), 400);
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
          'mlops', 'stack', 'determinism', 'philosophy',
          'work', 'showreel', 'technical', 'portfolio',
          'whoami', 'contact', 'commit', 'evidence', 'witness',
          'verify', 'prove', 'status', 'clear',
        ];
        const match = commands.find(c => c.startsWith(partial));
        if (match) setInput(match);
      }
    }
  }, [commandHistory, historyIndex, input]);

  const handleWorkSelect = useCallback((item) => {
    if (item.kind === 'command' && item.command) {
      // Execute internal command
      setInput(item.command);
      setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} };
        // Simulate typing the command
        setHistory(prev => [...prev, { type: 'command', content: item.command }]);
        if (COMMANDS[item.command]) {
          const result = executeCommand(item.command);
          typeOutput(typeof result === 'string' ? result : result.text);
        }
      }, 100);
    } else if (item.kind === 'youtube' && item.videoId) {
      setHistory(prev => [...prev, { type: 'media', media: { type: 'youtube', videoId: item.videoId, label: item.label } }]);
    } else if (item.kind === 'miro' && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  }, [typeOutput]);

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
            {entry.type === 'logo' ? (
              <AnimatedLogo state={logoState} />
            ) : entry.type === 'media' ? (
              <MediaEmbed
                type={entry.media.type}
                url={entry.media.url}
                label={entry.media.label}
                description={entry.media.description}
                videoId={entry.media.videoId}
                options={entry.media.options}
                onSelect={handleWorkSelect}
              />
            ) : entry.type === 'command' ? (
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
                onFocus={() => {
                  // Mobile: scroll to input when keyboard opens
                  setTimeout(() => scrollToBottom(), 100);
                  setTimeout(() => scrollToBottom(), 400);
                  setTimeout(() => scrollToBottom(), 800);
                }}
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
        <span className="hint" onClick={() => { setInput('philosophy'); }}>philosophy</span>
        <span className="hint" onClick={() => { setInput('witness'); }}>witness</span>
      </div>
    </div>
  );
}
