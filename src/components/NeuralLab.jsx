import { useState, useCallback, useRef } from 'react';
import './NeuralLab.css';

// XOR training data
const XOR_DATA = [
  { input: [0, 0], target: 0 },
  { input: [0, 1], target: 1 },
  { input: [1, 0], target: 1 },
  { input: [1, 1], target: 0 },
];

function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }
function sigmoidDeriv(x) { return x * (1 - x); }

function initNetwork() {
  const rand = () => (Math.random() - 0.5) * 2;
  return {
    w1: [[rand(), rand()], [rand(), rand()]], // 2 inputs → 2 hidden
    b1: [rand(), rand()],
    w2: [rand(), rand()], // 2 hidden → 1 output
    b2: rand(),
  };
}

function forward(net, input) {
  const hidden = [
    sigmoid(input[0] * net.w1[0][0] + input[1] * net.w1[0][1] + net.b1[0]),
    sigmoid(input[0] * net.w1[1][0] + input[1] * net.w1[1][1] + net.b1[1]),
  ];
  const output = sigmoid(hidden[0] * net.w2[0] + hidden[1] * net.w2[1] + net.b2);
  return { hidden, output };
}

function trainStep(net, lr = 0.5) {
  let totalLoss = 0;
  for (const sample of XOR_DATA) {
    const { hidden, output } = forward(net, sample.input);
    const error = sample.target - output;
    totalLoss += error * error;

    // Output gradients
    const dOutput = error * sigmoidDeriv(output);
    // Hidden gradients
    const dHidden = [
      dOutput * net.w2[0] * sigmoidDeriv(hidden[0]),
      dOutput * net.w2[1] * sigmoidDeriv(hidden[1]),
    ];
    // Update output weights
    net.w2[0] += lr * dOutput * hidden[0];
    net.w2[1] += lr * dOutput * hidden[1];
    net.b2 += lr * dOutput;
    // Update hidden weights
    for (let h = 0; h < 2; h++) {
      for (let i = 0; i < 2; i++) {
        net.w1[h][i] += lr * dHidden[h] * sample.input[i];
      }
      net.b1[h] += lr * dHidden[h];
    }
  }
  return totalLoss / XOR_DATA.length;
}

function weightColor(w) {
  const v = Math.max(-3, Math.min(3, w));
  if (v > 0) return `rgba(39, 174, 96, ${Math.min(1, v / 2)})`;
  return `rgba(192, 57, 43, ${Math.min(1, Math.abs(v) / 2)})`;
}

export default function NeuralLab() {
  const [net, setNet] = useState(() => initNetwork());
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState(1);
  const [lossHistory, setLossHistory] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [training, setTraining] = useState(false);
  const trainRef = useRef(false);

  const updatePredictions = useCallback((network) => {
    setPredictions(XOR_DATA.map(s => {
      const { output } = forward(network, s.input);
      return { ...s, prediction: output };
    }));
  }, []);

  const stepOnce = useCallback(() => {
    setNet(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const l = trainStep(copy);
      setLoss(l);
      setEpoch(e => e + 1);
      setLossHistory(h => [...h.slice(-99), l]);
      updatePredictions(copy);
      return copy;
    });
  }, [updatePredictions]);

  const trainFull = useCallback(() => {
    setTraining(true);
    trainRef.current = true;
    let localNet = JSON.parse(JSON.stringify(net));
    let localEpoch = epoch;
    let localHistory = [...lossHistory];

    const tick = () => {
      if (!trainRef.current) { setTraining(false); return; }
      for (let i = 0; i < 50; i++) {
        const l = trainStep(localNet);
        localEpoch++;
        localHistory = [...localHistory.slice(-99), l];
        if (l < 0.001) {
          trainRef.current = false;
          break;
        }
      }
      const lastLoss = localHistory[localHistory.length - 1];
      setNet({ ...localNet });
      setEpoch(localEpoch);
      setLoss(lastLoss);
      setLossHistory([...localHistory]);
      updatePredictions(localNet);
      if (trainRef.current) requestAnimationFrame(tick);
      else setTraining(false);
    };
    tick();
  }, [net, epoch, lossHistory, updatePredictions]);

  const stopTraining = useCallback(() => {
    trainRef.current = false;
    setTraining(false);
  }, []);

  const resetNetwork = useCallback(() => {
    trainRef.current = false;
    setTraining(false);
    const fresh = initNetwork();
    setNet(fresh);
    setEpoch(0);
    setLoss(1);
    setLossHistory([]);
    updatePredictions(fresh);
  }, [updatePredictions]);

  // Mini loss chart
  const chartH = 40;
  const maxLoss = Math.max(0.5, ...lossHistory);

  return (
    <div className="neural-lab">
      <div className="lab-header">
        <span className="lab-tag">LAB</span>
        <span className="lab-title">NEURAL NETWORK — XOR TRAINING</span>
      </div>

      <div className="neural-desc">
        2-layer perceptron learns XOR — the simplest problem a single
        neuron cannot solve. Watch weights evolve through backpropagation.
      </div>

      <div className="neural-grid">
        {/* Network diagram */}
        <div className="net-diagram">
          <div className="net-label">NETWORK</div>
          <div className="net-nodes">
            <div className="net-col">
              <div className="node input-node">X₁</div>
              <div className="node input-node">X₂</div>
            </div>
            <div className="net-edges">
              {net.w1.map((row, h) =>
                row.map((w, i) => (
                  <div key={`${h}-${i}`} className="edge"
                    style={{ color: weightColor(w) }}>
                    {w.toFixed(2)}
                  </div>
                ))
              )}
            </div>
            <div className="net-col">
              <div className="node hidden-node" style={{ borderColor: weightColor(net.b1[0]) }}>H₁</div>
              <div className="node hidden-node" style={{ borderColor: weightColor(net.b1[1]) }}>H₂</div>
            </div>
            <div className="net-edges out">
              {net.w2.map((w, i) => (
                <div key={i} className="edge" style={{ color: weightColor(w) }}>
                  {w.toFixed(2)}
                </div>
              ))}
            </div>
            <div className="net-col">
              <div className="node output-node">Y</div>
            </div>
          </div>
          <div className="net-meta">
            Epoch: {epoch} · Loss: {loss.toFixed(6)}
          </div>
        </div>

        {/* Predictions */}
        <div className="net-predictions">
          <div className="net-label">PREDICTIONS</div>
          <table className="pred-table">
            <thead>
              <tr><th>X₁</th><th>X₂</th><th>TARGET</th><th>OUTPUT</th><th></th></tr>
            </thead>
            <tbody>
              {predictions.map((p, i) => (
                <tr key={i}>
                  <td>{p.input[0]}</td>
                  <td>{p.input[1]}</td>
                  <td>{p.target}</td>
                  <td className={Math.abs(p.prediction - p.target) < 0.1 ? 'correct' : 'wrong'}>
                    {p.prediction.toFixed(4)}
                  </td>
                  <td>{Math.abs(p.prediction - p.target) < 0.1 ? '✓' : '✗'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loss chart */}
      {lossHistory.length > 1 && (
        <div className="loss-chart">
          <div className="net-label">LOSS CURVE</div>
          <svg width="100%" height={chartH} viewBox={`0 0 ${lossHistory.length} ${chartH}`} preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="#c0392b"
              strokeWidth="0.5"
              points={lossHistory.map((l, i) =>
                `${i},${chartH - (l / maxLoss) * (chartH - 2)}`
              ).join(' ')}
            />
          </svg>
          <div className="chart-axis">
            <span>0</span>
            <span>{lossHistory.length} epochs</span>
          </div>
        </div>
      )}

      <div className="neural-controls">
        <button onClick={stepOnce} className="lab-btn" disabled={training}>STEP ×1</button>
        {!training ? (
          <button onClick={trainFull} className="lab-btn encode">TRAIN</button>
        ) : (
          <button onClick={stopTraining} className="lab-btn reset">STOP</button>
        )}
        <button onClick={resetNetwork} className="lab-btn reset">RESET</button>
      </div>

      <div className="lab-footer">
        XOR requires hidden neurons because it is not linearly separable.
        This is why neural networks need depth. One layer is never enough.
      </div>
    </div>
  );
}
