import { useState } from "react";
import api from "../services/api";

export default function Generator({ onTasksGenerated }) {
  const [prompt, setPrompt] = useState("");

  const generate = async () => {
    const res = await api.post("/generate", { prompt });

    alert(" Tasks Generated");

    onTasksGenerated(res.data.tasks);
  };

  return (
    <div>
      <h3>Task Generator</h3>

      <input
        placeholder="Enter idea (e.g. learn react)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={generate}>Generate</button>
    </div>
  );
}