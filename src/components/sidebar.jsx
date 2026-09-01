import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menu</h2>

      <ul>
        <li>
          <Link to="/dashboard"> Dashboard</Link>
        </li>

        <li>
          <Link to="/dashboard"> My Tasks</Link>
        </li>

        <li>
          <Link to="/dashboard"> AI Generate</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;