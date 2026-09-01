import api from "./api";

export const generateTasks = async (prompt) => {
  const res = await api.post("/generate-tasks", {
    prompt,
  });

  return res.data;
};