import api from "./api";

// GET all tasks
export const getTasks = async () => {
  const res = await api.get("/task/my-tasks");
  return res.data;
};

// CREATE task
export const createTask = async (taskData) => {
  const res = await api.post("/task/create", taskData);
  return res.data;
};

// DELETE task
export const deleteTask = async (id) => {
  const res = await api.delete(`/task/delete/${id}`);
  return res.data;
};

// UPDATE task
export const updateTask = async (id, taskData) => {
  const res = await api.put(`/task/update/${id}`, taskData);
  return res.data;
};