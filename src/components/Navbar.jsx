import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <nav
      style={{
        background: "#4f46e5",
        color: "#fff",
        padding: "18px 25px",
        borderRadius: "14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 8px 25px rgba(0,0,0,.12)",
        marginBottom: "30px",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontWeight: "700",
            letterSpacing: ".5px",
          }}
        >
          StaySmart 
        </h2>

        <small
          style={{
            opacity: ".8",
          }}
        >
          Smart Task Management
        </small>
      </div>

      <button
        className="logout-btn"
        onClick={logout}
      >
         Logout
      </button>
    </nav>
  );
}

export default Navbar;