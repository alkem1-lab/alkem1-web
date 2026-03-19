import { useState, useEffect, useRef, useCallback } from 'react';
import { executeCommand, COMMANDS } from '../data/commands';
import { askPersona, clearChatHistory } from '../data/aiChat';

const WELCOME_MESSAGE = String.raw`
                       ,.oooooooooob..
                    ,.dodOOOO"""""":"ooPO88bo..
                  .o8O""" '            "'"""PO8b.
              .dd8P'"                       ''::Y8o.
            ,d8Po'                             "':7Ob;
           d8P::'                                 ';:8b.
         ;d8''"                                     ';Y8;
       ,d8O:'                                        ';:8b.
      ,88o:'                                           ';Yb.
     ,8P::'                                           . ';Yb
    ,8o;:'                                          ,;'  ':8b
   ,8:::'                                           ;:    :;8b
  d8o;::                                            o:     ::8,
 ,8':::                                            :::     :;Y8
 8'oo:'                                            :::     :::8:
dP;:YO                                             ':::;.;;:::Y8.
,8:::;Yb                                            :b::::::::::8b
dO;::::8b                                           'Yb::::::::::8.
,8;:::::O8,                                          'Y88::::::::8:
8P;::::::88                                            ${"'"}8O::::::::O
d::::::::88:                                            O8;:::::::8
8:::::::888:                                            88b:::::::O:
,8::::::::88:                                           :888Oooo::;Y:
dO:::::::bO8:             ..:.::::::::::...:            :888888P;::db
OP:::::::O88:         ..o8888:::::::::::::)8888bo..      O8888O:::::8
O;::::::::88'    ..od888888888::::"""":::88888888888oo;  ${"'"}8888;:::::8
O:::ob:::;8:  ,d88888888888888::       ':88888888888888b; '"88;:::::8
OO::;Yo::OP' d888888888888888O:'      ,.;8888888888888888b ,88::::::8
YO:::;Y::Ob ,8888888888888888;::       :;88888888888888888 :88::::::8
 8;::::b;8' :8888888888888888o::        ':8888888888888888 :888d::)88
 Y:::::88P   888888888888888888'         'O888888888888888 :88888888P
 ${"'"}b:::;8O    d888888888888888P'          ,8888888888888888 '88888888:
  Y::::8:   ,88888888888888P:      ..    '8888888888888888  Y8888888:
  8O::;8'   :88888888888888:      d88,   ':Y88888888888888  '8888888:
  'YbooO    :8888888888P:8P:     :8888:    '':Y8888888888P   "Y888YP
   '888:     8888888P:;'8O:'     :8P88b       '"O888888P"      ;:;o'
    ${"'"}88:     "oOOo:.::)O:;:      :8:888.        :8b'           :::'
     88:      '"""" ,do;:'      ,88bO88b     ,.o::PO:;.;.     :::'
     88';           :' ${"'"}Yb      d88O${"'"}888b    O8"::::o::::::::::o:;
     8O::b         ;:   ''     d88Po O888    :8;:""" '";88::::o:::
     YO:;Yb    :o.;::          O8P.: O888     'Y::    :YO8b:::::O'
      Y:::8b  o;O:::;.         OO;:: OO;'       ''"  .;bO88"d:od'
      ${"'"}b::;8: :8bo::::;.       OO::: OK:         ,;:8888P',8OP"
       Yb:;OO  O888b::::;.     'O:O",;"'         ;o8888P  :O"
       '${"'"}Y888. :88888::::::     ':' db          ;o8888P   8P
          '${"'"}8;  O8888::::::        '8'         :o8888P   :8'
            OO: :8888::::::         Y:        ,::;888'   :8
            ${"'"}8,  o888"::::'          '        ;:::88:    OP
            ,8:   O888O8POYOOO"OPOOPYO8OO8OO888888888'   O:
            88:   '888o::o':Y: d  O  'Y:'8: O"Y:${"'"}K:8o;   8'
           88O;    ;88o;:::: : :  :   '  ${"'"}:   '  ,:8 :  :8
           O8O:.  ,:OP"8bd;':: d...      ,.  .db.'"8 :: :O
          ,88O::. ;:O: O"'"YP"YPYP'YO"""${"'"}8K${"'"}O"O ${"'"}b:O.:; :O
          888o:::.:;Ob : :::: :::: :P ,  OO : :  O;::::;:O
          888O::::::::'dbd::b.d::: :: db ::,d.8o;O;::::::dP
           888::::::::;:"""""Y8888od8d88o8P""'"  ':::::'d'
           "Y88Odo:"::::         ${"'"}""""'          ':::)P'
             ""88888O:::                         ;::dP
                '""88O:::                  oo;  ;O88'
                   ${"'"}Y8O::.  ,.      .     '8b::O88'
                     Y8b::. ,)O   ,;'       ::O88'
                      '88d:..:   ,d:       ;'d88'
                       'Y88d::;.;:8b,  ,..:O88P'
                         ""88oodO888O::::bd88P'
                           '${"'"}8888888888888P"'
                                 """"""""'
`;

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', content: WELCOME_MESSAGE, isWelcome: true },
    { type: 'output', content: "  Type 'help' to see available commands or ask me anything." },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingText, setThinkingText] = useState('');
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const thinkingRef = useRef(null);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on click anywhere
  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    focusInput();
    // Also listen for keydown on the whole page
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

      // Speed: faster for longer outputs
      const speed = lines.length > 20 ? 15 : lines.length > 10 ? 25 : 35;
      setTimeout(addLine, speed);
    };

    addLine();
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isTyping) return;

    const cmd = input.trim();
    if (!cmd) return;

    // Add command to history
    setHistory(prev => [...prev, { type: 'command', content: cmd }]);
    setCommandHistory(prev => [cmd, ...prev]);
    setHistoryIndex(-1);
    setInput('');

    // Check if it's a built-in command
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

    // Not a built-in command — try AI persona first, fall back to scripted
    setIsTyping(true);

    const thinkingPhrases = [
      'deconstructing ego...',
      'consulting the void...',
      'parsing entropy...',
      'dissolving boundaries...',
      'rendering silence...',
      'traversing non-duality...',
      'compiling sarcasm...',
      'querying consciousness...',
      'decrypting meaning...',
      'scanning frequencies...',
      'unfolding layers...',
      'negotiating with chaos...',
      'mapping the unmappable...',
      'loading philosophy drivers...',
      'bypassing illusion...',
      'calibrating awareness...',
      'defragmenting thought...',
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
    // Remove thinking placeholder
    setHistory(prev => prev.filter((_, i) => i !== prev.length - 1));
    setIsTyping(false);

    if (aiResponse) {
      typeOutput('\n' + aiResponse + '\n');
    } else {
      // AI unavailable — use scripted fallback
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
      // Simple autocomplete
      const partial = input.toLowerCase();
      if (partial) {
        const commands = [
          'help', 'whoami', 'skills', 'projects', 'stack', 'philosophy',
          'wisdom', 'contact', 'showreel', 'fly', 'hack', 'why', 'dreams',
          'agi', 'lao', 'ramana', 'nisargadatta', 'koan', 'surprise',
          'clear', 'top', 'exit', 'sudo hire alek', 'cat soul.txt', 'reveal ego',
        ];
        const match = commands.find(c => c.startsWith(partial));
        if (match) {
          setInput(match);
        }
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
        <div className="terminal-title">alkem1@shell:~</div>
        <div className="terminal-dots" style={{ visibility: 'hidden' }}>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      <div className="terminal-body">
        {history.map((entry, i) => (
          <div key={i} className={`terminal-entry ${entry.type}${entry.isWelcome ? ' welcome' : ''}`}>
            {entry.type === 'command' ? (
              <div className="command-line">
                <span className="prompt">alkem1@shell:~$</span>
                <span className="command-text">{entry.content}</span>
              </div>
            ) : (
              <pre className={`output-text${entry.isThinking ? ' thinking-text' : ''}`}>{entry.content}</pre>
            )}
          </div>
        ))}

        {!isTyping && (
          <form onSubmit={handleSubmit} className="input-line">
            <span className="prompt">alkem1@shell:~$</span>
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
        <span className="hint" onClick={() => { setInput('whoami'); }}>whoami</span>
        <span className="hint" onClick={() => { setInput('skills'); }}>skills</span>
        <span className="hint" onClick={() => { setInput('projects'); }}>projects</span>
        <span className="hint" onClick={() => { setInput('agi'); }}>agi</span>
        <span className="hint" onClick={() => { setInput('philosophy'); }}>philosophy</span>
        <span className="hint" onClick={() => { setInput('hack'); }}>hack</span>
        <span className="hint" onClick={() => { setInput('contact'); }}>contact</span>
      </div>
    </div>
  );
}
