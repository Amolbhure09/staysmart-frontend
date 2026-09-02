import { useEffect, useState } from "react";
import api from "../services/api";
import TaskForm from "../components/Taskform";
import StatsCard from "../components/Statscard";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  // ================= LOAD DATA =================
  const refreshAll = async () => {
    try {
      setLoading(true);
      setError("");

      const [tasksRes, statsRes] = await Promise.all([
        api.get("/tasks/my-tasks"),
        api.get("/tasks/dashboard"),
      ]);

      setTasks(tasksRes.data.tasks);
      setStats(statsRes.data);

    } catch (err) {
      console.log(err);
      setError("Failed to load data ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  // ================= ADD TASK =================
  const handleTaskAdded = (task) => {
    setTasks((prev) => [task, ...prev]);
    refreshAll();
  };

  // ================= DELETE =================
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/delete/${id}`);
      refreshAll();
    } catch (err) {
      console.log(err);
      setError("Delete failed ❌");
    }
  };

  // ================= TOGGLE =================
  const toggleStatus = async (id) => {
    try {
      const res = await api.patch(`/tasks/toggle/${id}`);

      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? res.data.task : t
        )
      );

      refreshAll();
    } catch (err) {
      console.log(err);
      setError("Update failed ❌");
    }
  };

  // ================= SEARCH =================
  const searchTask = async (value) => {
    setSearch(value);

    try {
      if (!value) return refreshAll();

      const res = await api.get(`/tasks/search?keyword=${value}`);
      setTasks(res.data.tasks);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= FILTER =================
  const filterTask = async (value) => {
    setFilter(value);

    try {
      if (value === "All") return refreshAll();

      const res = await api.get(`/tasks/filter?status=${value}`);
      setTasks(res.data.tasks);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{
      maxWidth: "950px",
      margin: "30px auto",
      padding: "20px",
      fontFamily: "system-ui",
      background: "linear-gradient(135deg,#f9fafb,#eef2ff)",
      minHeight: "100vh"
    }}>

      <Navbar />

      <h1 style={{
        fontSize: "28px",
        marginBottom: "15px"
      }}>
         StaySmart  Dashboard
      </h1>

      {/* ERROR */}
      {error && (
        <div style={{
          background: "#fee2e2",
          color: "#991b1b",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "10px"
        }}>
          {error}
        </div>
      )}

      {/* STATS */}
      <div style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        marginBottom: "20px"
      }}>
        <StatsCard title="Total" value={stats.totalTasks} color="#3b82f6" />
        <StatsCard title="Completed" value={stats.completedTasks} color="#22c55e" />
        <StatsCard title="Pending" value={stats.pendingTasks} color="#f59e0b" />
      </div>

      {/* SEARCH */}
      <input
        placeholder=" Search tasks..."
        value={search}
        onChange={(e) => searchTask(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          marginBottom: "10px"
        }}
      />

      {/* FILTER */}
      <select
        value={filter}
        onChange={(e) => filterTask(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "15px"
        }}
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      {/* FORM */}
      <TaskForm
        onTaskAdded={handleTaskAdded}
        editingTask={editingTask}
        onTaskUpdated={(updatedTask) => {
          setTasks((prev) =>
            prev.map((t) =>
              t._id === updatedTask._id ? updatedTask : t
            )
          );
          setEditingTask(null);
        }}
      />

      <hr />

      {/* LOADING */}
      {loading && (
        <h3 style={{ textAlign: "center" }}>
           Loading tasks...
        </h3>
      )}

      {/* TASKS */}
      {tasks.length === 0 && !loading ? (
        <h2 style={{ textAlign: "center" }}>
          No Tasks Found 
        </h2>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px"
        }}>
          {tasks.map((task) => (
            <div
              key={task._id}
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                transition: "0.2s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <span style={{
                padding: "4px 10px",
                borderRadius: "20px",
                background: task.status === "Completed" ? "#22c55e" : "#f59e0b",
                color: "white",
                fontSize: "12px"
              }}>
                {task.status}
              </span>

              <div style={{
                display: "flex",
                gap: "8px",
                marginTop: "10px"
              }}>
                <button onClick={() => toggleStatus(task._id)}>
                  Toggle
                </button>

                <button onClick={() => setEditingTask(task)}>
                  Edit
                </button>

                <button onClick={() => deleteTask(task._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}