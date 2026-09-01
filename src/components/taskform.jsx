import { useEffect, useState } from "react";
import api from "../services/api";

function TaskForm({
  onTaskAdded,
  editingTask,
  onTaskUpdated,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return alert("Please fill all fields.");
    }

    try {
      setLoading(true);

      if (editingTask) {
        const res = await api.put(
          `/tasks/update/${editingTask._id}`,
          {
            title,
            description,
            status: editingTask.status,
          }
        );

        onTaskUpdated(res.data.task);
      } else {
        const res = await api.post("/tasks/create", {
          title,
          description,
          status: "Pending",
        });

        onTaskAdded(res.data.task);
      }

      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="card"
      style={{
        marginBottom: "25px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        {editingTask ? "✏️ Update Task" : "➕ Create New Task"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          rows="5"
          placeholder="Task Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button
          className="primary-btn"
          disabled={loading}
          type="submit"
        >
          {loading
            ? "Saving..."
            : editingTask
            ? "Update Task"
            : "Create Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;