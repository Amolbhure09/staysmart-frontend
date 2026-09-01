function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>
        Status: <b>{task.status}</b>
      </p>

      <p>
        Priority: <b>{task.priority}</b>
      </p>

      <div className="actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;