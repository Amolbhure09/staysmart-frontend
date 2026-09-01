function StatsCard({ title, value, color }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: "220px",
        background: color,
        color: "#fff",
        padding: "25px",
        borderRadius: "16px",
        boxShadow: "0 12px 25px rgba(0,0,0,.15)",
        transition: ".3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "15px",
          opacity: ".9",
          letterSpacing: ".5px",
        }}
      >
        {title}
      </p>

      <h1
        style={{
          marginTop: "15px",
          fontSize: "42px",
          fontWeight: "700",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatsCard;