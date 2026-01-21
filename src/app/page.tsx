"use client";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface Token {
  text: string;
  vector: THREE.Vector3;
  probability: number;
  sphere: THREE.Mesh;
  label: HTMLDivElement;
  isGenerated: boolean;
  particles?: THREE.Points;
  line?: THREE.Line;
}
/*
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #000;
    overflow: hidden;
  }

  .container {
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  .canvas-container {
    width: 100%;
    height: 100%;
  }

  .controls {
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.9);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    max-width: 400px;
    z-index: 100;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 0.875rem;
    color: #888;
    margin-bottom: 20px;
  }

  .input-group {
    margin-bottom: 16px;
  }

  .label {
    display: block;
    font-size: 0.875rem;
    color: #aaa;
    margin-bottom: 8px;
  }

  .input {
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 10px 12px;
    color: #fff;
    font-size: 1rem;
    outline: none;
    transition: all 0.2s;
  }

  .input:focus {
    border-color: #3b82f6;
    background: rgba(255, 255, 255, 0.08);
  }

  .button {
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 8px;
    padding: 12px;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    margin-bottom: 8px;
  }

  .button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }

  .button:active {
    transform: translateY(0);
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button.secondary {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }

  .button.secondary:hover:not(:disabled) {
    box-shadow: 0 8px 20px rgba(245, 87, 108, 0.4);
  }

  .info {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.9);
    padding: 16px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: #fff;
    font-size: 0.875rem;
    max-width: 350px;
    z-index: 100;
  }

  .info-title {
    font-weight: 600;
    margin-bottom: 8px;
    color: #3b82f6;
  }

  .info-item {
    margin-bottom: 4px;
    color: #aaa;
  }

  .token-label {
    position: absolute;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.8);
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .response-panel {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.9);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    max-width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 100;
  }

  .response-title {
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 12px;
  }

  .response-content {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .response-section {
    margin-bottom: 12px;
  }

  .response-section-title {
    font-size: 0.75rem;
    color: #888;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .response-text {
    color: #fff;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .token-chip {
    display: inline-block;
    background: rgba(102, 126, 234, 0.2);
    border: 1px solid rgba(102, 126, 234, 0.4);
    padding: 4px 8px;
    border-radius: 4px;
    margin: 2px;
    font-size: 0.75rem;
    color: #fff;
  }

  .token-chip.user {
    background: rgba(59, 130, 246, 0.3);
    border-color: rgba(59, 130, 246, 0.5);
  }

  .token-chip.generated {
    background: rgba(245, 87, 108, 0.3);
    border-color: rgba(245, 87, 108, 0.5);
  }

  .status {
    font-size: 0.75rem;
    color: #888;
    margin-top: 8px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 6px;
  }

  .status.generating {
    color: #f5576c;
    border: 1px solid rgba(245, 87, 108, 0.3);
  }

  .probability-bar {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    margin-top: 4px;
    overflow: hidden;
  }

  .probability-fill {
    height: 100%;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.3s;
  }

  .candidates {
    margin-top: 12px;
  }

  .candidate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 8px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 4px;
    margin-bottom: 4px;
    font-size: 0.75rem;
  }

  .candidate-text {
    color: #aaa;
  }

  .candidate-prob {
    color: #667eea;
    font-weight: 600;
  }
`;
*/

const LLMReasoningVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const tokensRef = useRef<Token[]>([]);
  const [input, setInput] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [userTokens, setUserTokens] = useState<string[]>([]);
  const [generatedTokens, setGeneratedTokens] = useState<string[]>([]);
  const [currentCandidates, setCurrentCandidates] = useState<
    Array<{ text: string; prob: number }>
  >([]);
  const [currentProbability, setCurrentProbability] = useState<number>(0);
  const animationRef = useRef<number>(0);

  // Token vocabulary for generation
  // Token vocabulary for generation (expanded & semantic)
  const vocabulary = [
    // Grammar & connectors
    "is",
    "are",
    "was",
    "were",
    "be",
    "being",
    "the",
    "a",
    "an",
    "this",
    "that",
    "these",
    "those",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "without",
    "from",
    "by",
    "into",
    "within",
    "through",
    "across",
    "and",
    "or",
    "but",
    "because",
    "while",
    "although",
    "if",
    "when",
    "where",
    "how",
    "why",

    // Modality & intent
    "can",
    "will",
    "may",
    "might",
    "could",
    "should",
    "would",
    "must",
    "allows",
    "enables",
    "requires",
    "supports",
    "drives",

    // Descriptive adjectives
    "amazing",
    "interesting",
    "complex",
    "simple",
    "powerful",
    "elegant",
    "sophisticated",
    "robust",
    "efficient",
    "adaptive",
    "dynamic",
    "flexible",
    "scalable",
    "intuitive",
    "abstract",
    "concrete",
    "novel",
    "emergent",
    "predictable",
    "uncertain",

    // Systems & structures
    "system",
    "model",
    "network",
    "algorithm",
    "process",
    "mechanism",
    "structure",
    "framework",
    "architecture",
    "pipeline",
    "layer",
    "component",
    "module",
    "interface",

    // Actions & cognition
    "understand",
    "learn",
    "analyze",
    "compute",
    "generate",
    "predict",
    "transform",
    "optimize",
    "evaluate",
    "interpret",
    "represent",
    "connect",
    "organize",
    "compare",
    "refine",

    // Language & information
    "language",
    "data",
    "information",
    "knowledge",
    "context",
    "meaning",
    "pattern",
    "signal",
    "symbol",
    "representation",
    "relationship",
    "sequence",
    "distribution",
    "probability",
    "state",

    // Perspective & flow
    "based",
    "using",
    "through",
    "from",
    "within",
    "across",
    "toward",
    "around",
    "between",
    "over",
    "under",
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 10, 50);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 8, 20);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x667eea, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xf5576c, 2, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    const axesHelper = new THREE.AxesHelper(12);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(30, 30, 0x444444, 0x222222);
    scene.add(gridHelper);

    const sphereGeometry = new THREE.SphereGeometry(10, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x667eea,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const vectorSpace = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(vectorSpace);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.0002;
      camera.position.x = Math.sin(time) * 20;
      camera.position.z = Math.cos(time) * 20;
      camera.lookAt(0, 0, 0);

      tokensRef.current.forEach((token, index) => {
        const sphere = token.sphere;

        const scale =
          1 + Math.sin(Date.now() * 0.003 + index) * 0.2 * token.probability;
        sphere.scale.set(scale, scale, scale);

        sphere.position.y =
          token.vector.y + Math.sin(Date.now() * 0.002 + index) * 0.3;

        if (token.particles) {
          token.particles.rotation.y += 0.01;
        }

        const vector = new THREE.Vector3();
        sphere.getWorldPosition(vector);
        vector.project(camera);

        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = (vector.y * -0.5 + 0.5) * window.innerHeight;

        token.label.style.left = `${x}px`;
        token.label.style.top = `${y - 30}px`;
        token.label.style.opacity = vector.z < 1 ? "1" : "0";
      });

      vectorSpace.rotation.y += 0.001;
      vectorSpace.rotation.x += 0.0005;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const createToken = (
    text: string,
    index: number,
    total: number,
    isGenerated: boolean = false,
  ) => {
    if (!sceneRef.current) return;

    const baseAngle = (index / total) * Math.PI * 2;
    const radius = isGenerated ? 7 : 5;
    const height = isGenerated
      ? (Math.random() - 0.5) * 4
      : (Math.random() - 0.5) * 6;

    const vector = new THREE.Vector3(
      Math.cos(baseAngle) * radius,
      height,
      Math.sin(baseAngle) * radius,
    );

    const probability = isGenerated
      ? 0.5 + Math.random() * 0.5
      : 0.3 + Math.random() * 0.7;

    const geometry = new THREE.SphereGeometry(isGenerated ? 0.4 : 0.3, 32, 32);
    const color = isGenerated
      ? new THREE.Color().setHSL(0.95, 0.8, 0.5) // Pink for generated
      : new THREE.Color().setHSL(0.6, 0.8, 0.5); // Blue for user input

    const material = new THREE.MeshPhongMaterial({
      color: color,
      emissive: new THREE.Color().setHSL(isGenerated ? 0.95 : 0.6, 0.5, 0.3),
      shininess: 100,
      transparent: true,
      opacity: 0.9,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(vector);
    sceneRef.current.add(sphere);

    const label = document.createElement("div");
    label.className = "token-label";
    label.textContent = text;
    label.style.opacity = "0";
    document.body.appendChild(label);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
    });
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      vector,
    ]);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    sceneRef.current.add(line);

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const offset = isGenerated ? 0.7 : 0.5;
      positions[i] = vector.x + (Math.random() - 0.5) * offset;
      positions[i + 1] = vector.y + (Math.random() - 0.5) * offset;
      positions[i + 2] = vector.z + (Math.random() - 0.5) * offset;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: color,
      size: isGenerated ? 0.07 : 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    sceneRef.current.add(particles);

    tokensRef.current.push({
      text,
      vector,
      probability,
      sphere,
      label,
      isGenerated,
      particles,
      line,
    });
  };

  const handleVisualize = () => {
    if (!input.trim()) return;

    clearGeneration();

    tokensRef.current.forEach((token) => {
      if (sceneRef.current) {
        sceneRef.current.remove(token.sphere);
        if (token.particles) sceneRef.current.remove(token.particles);
        if (token.line) sceneRef.current.remove(token.line);
      }
      document.body.removeChild(token.label);
    });
    tokensRef.current = [];

    const words = input.trim().split(/\s+/);
    setUserTokens(words);
    setGeneratedTokens([]);

    words.forEach((word, index) => {
      createToken(word, index, words.length, false);
    });
  };

  // Replace your existing handleGenerate with this DeepSeek version:

  const handleGenerate = async () => {
    if (userTokens.length === 0) return;

    setIsGenerating(true);
    setGeneratedTokens([]);
    setCurrentCandidates([]);

    try {
      // IMPORTANT: Don’t hardcode real keys in the client in production.
      // Use a backend proxy instead. For local demos, you can use:
      // Vite: import.meta.env.VITE_DEEPSEEK_API_KEY
      // CRA:  process.env.REACT_APP_DEEPSEEK_API_KEY
      const DEEPSEEK_API_KEY = "sk-daadb7c9968f4c07b802743b631164d1";

      if (!DEEPSEEK_API_KEY) {
        throw new Error(
          "Missing DeepSeek API key (VITE_DEEPSEEK_API_KEY / REACT_APP_DEEPSEEK_API_KEY)",
        );
      }

      const response = await fetch(
        "https://api.deepseek.com/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify({
            model: "deepseek-chat", // or "deepseek-reasoner" for reasoning model
            messages: [{ role: "user", content: input }],
            max_tokens: 100,
            stream: true,
          }),
        },
      );

      if (!response.ok) {
        const errText = await response.text().catch(() => "");
        throw new Error(
          `DeepSeek error ${response.status}: ${errText || response.statusText}`,
        );
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";
      const newGenerated: string[] = [];
      let wordBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const data = trimmed.slice(5).trim(); // after "data:"
          if (!data) continue;
          if (data === "[DONE]") continue;

          let parsed: any;
          try {
            parsed = JSON.parse(data);
          } catch {
            continue;
          }

          // DeepSeek streaming is OpenAI-compatible:
          // data: {"choices":[{"delta":{"content":"..."}}], ...}
          const chunk: string = parsed?.choices?.[0]?.delta?.content ?? ""; // (some models may also stream other fields)

          if (!chunk) continue;

          wordBuffer += chunk;

          // Split into words when we hit whitespace (keeps your visualization behavior)
          const parts = wordBuffer.split(/(\s+)/);

          for (let i = 0; i < parts.length - 1; i++) {
            const word = parts[i].trim();
            if (!word) continue;

            newGenerated.push(word);
            setGeneratedTokens([...newGenerated]);

            // Fake candidate distribution for visualization (same as your current logic)
            const candidates = vocabulary
              .slice(0, 5)
              .map((w) => ({
                text: w,
                prob: 0.5 + Math.random() * 0.5,
              }))
              .sort((a, b) => b.prob - a.prob);

            candidates[0] = { text: word, prob: 0.85 + Math.random() * 0.15 };
            setCurrentCandidates(candidates);
            setCurrentProbability(candidates[0].prob);

            // Create token in 3D space
            const totalTokens = userTokens.length + newGenerated.length;
            createToken(word, totalTokens - 1, totalTokens, true);

            // Small delay for visualization
            await new Promise((resolve) => setTimeout(resolve, 300));
          }

          wordBuffer = parts[parts.length - 1];
        }
      }

      // Handle any remaining trailing text
      if (wordBuffer.trim()) {
        const word = wordBuffer.trim();
        newGenerated.push(word);
        setGeneratedTokens([...newGenerated]);

        const totalTokens = userTokens.length + newGenerated.length;
        createToken(word, totalTokens - 1, totalTokens, true);
      }

      setIsGenerating(false);
    } catch (error) {
      console.error("Generation error:", error);
      setIsGenerating(false);
      alert("Failed to generate response. Please try again.");
    }
  };

  const clearGeneration = () => {
    setIsGenerating(false);
    setGeneratedTokens([]);
    setCurrentCandidates([]);
    setCurrentProbability(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleVisualize();
    }
  };

  return (
    <>
      <div className="container">
        <div ref={containerRef} className="canvas-container" />

        <div className="controls">
          <h1 className="title">ACE Day AI Activity - LLM Reasoning Engine</h1>
          <p className="subtitle">
            Watch how LLMs generate responses token by token
          </p>

          <div className="input-group">
            <label className="label">Enter your prompt</label>
            <input
              type="text"
              className="input"
              placeholder="e.g., artificial intelligence"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isGenerating}
            />

            <button
              className="button"
              onClick={handleVisualize}
              disabled={isGenerating}
            >
              Visualize Input Tokens
            </button>

            <button
              className="button secondary"
              onClick={handleGenerate}
              disabled={isGenerating || userTokens.length === 0}
            >
              {isGenerating ? "Generating..." : "Generate Response"}
            </button>
          </div>
        </div>

        <div className="response-panel">
          <div className="response-title">Reasoning Process</div>

          <div className="response-content">
            <div className="response-section">
              <div className="response-section-title">Input Tokens</div>
              <div className="response-text">
                {userTokens.map((token, i) => (
                  <span key={i} className="token-chip user">
                    {token}
                  </span>
                ))}
                {userTokens.length === 0 && (
                  <span style={{ color: "#666" }}>No input yet</span>
                )}
              </div>
            </div>

            <div className="response-section">
              <div className="response-section-title">Generated Tokens</div>
              <div className="response-text">
                {generatedTokens.map((token, i) => (
                  <span key={i} className="token-chip generated">
                    {token}
                  </span>
                ))}
                {generatedTokens.length === 0 && (
                  <span style={{ color: "#666" }}>Not generated yet</span>
                )}
              </div>
            </div>

            {isGenerating && (
              <div className="status generating">
                🔄 Generating next token... Analyzing {currentCandidates.length}{" "}
                candidates
              </div>
            )}
          </div>

          {currentCandidates.length > 0 && (
            <div className="candidates">
              <div className="response-section-title">
                Token Candidates (Top 5)
              </div>
              {currentCandidates.map((candidate, i) => (
                <div key={i} className="candidate">
                  <span className="candidate-text">{candidate.text}</span>
                  <span className="candidate-prob">
                    {(candidate.prob * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
              <div className="probability-bar">
                <div
                  className="probability-fill"
                  style={{ width: `${currentProbability * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="response-section">
            <div className="response-section-title">Stats</div>
            <div className="response-text">
              <div style={{ fontSize: "0.75rem", color: "#888" }}>
                Total tokens: {userTokens.length + generatedTokens.length}
                <br />
                Input: {userTokens.length} | Generated: {generatedTokens.length}
              </div>
            </div>
          </div>
        </div>

        <div className="info">
          <div className="info-title">How LLM Reasoning Works</div>
          <div className="info-item">
            🔵 <strong>Blue spheres</strong> = Your input tokens
          </div>
          <div className="info-item">
            🔴 <strong>Pink spheres</strong> = Generated tokens
          </div>
          <div className="info-item">
            📊 <strong>Size</strong> = Token probability/confidence
          </div>
          <div className="info-item">
            📍 <strong>Position</strong> = Vector embedding space
          </div>
          <div className="info-item">
            ✨ <strong>Particles</strong> = Attention weights
          </div>
          <div className="info-item">
            🎯 <strong>Lines</strong> = Vector direction from origin
          </div>
          <div
            className="info-item"
            style={{
              marginTop: "8px",
              paddingTop: "8px",
              borderTop: "1px solid #333",
            }}
          >
            Watch as the model selects each token based on probability!
          </div>
        </div>
      </div>
    </>
  );
};

export default LLMReasoningVisualizer;
