import { useState } from "react";

export default function Navbar({ activeTab, onTabChange, favCount, watchlistCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { id: "Trending", label: "Trending" },
    { id: "Search", label: "Search" },
    { id: "Favorites", label: `★ ${favCount}` },
    { id: "Watchlist", label: `📋 ${watchlistCount}` },
  ];

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(27,25,25,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
      padding: "0 1.5rem",
      display: "flex", alignItems: "center",
      justifyContent: "space-between", height: 64,
    }}>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, var(--pink), var(--red))",
          display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 16
        }}>🎬</div>
        <span style={{
          fontSize: 20, fontWeight: 900, letterSpacing: -0.5,
          background: "linear-gradient(90deg, var(--pink), var(--red))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>CINE</span>
        <span style={{ fontSize: 20, fontWeight: 900, color: "var(--text)", letterSpacing: -0.5 }}>
          VAULT
        </span>
      </div>

      {/* Desktop Tabs */}
      <div style={{ display: "flex", gap: 6 }}
        className="desktop-tabs">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => onTabChange(tab.id)} style={{
            background: activeTab === tab.id
              ? "linear-gradient(135deg, var(--pink), var(--red))"
              : "transparent",
            color: activeTab === tab.id ? "#fff" : "var(--text-muted)",
            border: activeTab === tab.id ? "none" : "1px solid var(--border)",
            borderRadius: 20, padding: "8px 18px",
            fontSize: 13, fontWeight: 600, transition: "all 0.2s",
          }}>{tab.label}</button>
        ))}
      </div>

      {/* Hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)}
        className="hamburger"
        style={{
          display: "none", background: "transparent",
          border: "1px solid var(--border)", borderRadius: 8,
          color: "var(--text)", padding: "6px 10px", fontSize: 18
        }}>☰</button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          position: "absolute", top: 64, left: 0, right: 0,
          background: "rgba(27,25,25,0.98)",
          borderBottom: "1px solid var(--border)",
          display: "flex", flexDirection: "column", padding: "1rem",
          gap: 8, zIndex: 99
        }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => { onTabChange(tab.id); setMenuOpen(false); }}
              style={{
                background: activeTab === tab.id
                  ? "linear-gradient(135deg, var(--pink), var(--red))"
                  : "var(--card-bg)",
                color: "var(--text)", border: "1px solid var(--border)",
                borderRadius: 8, padding: "12px 16px",
                fontSize: 14, fontWeight: 600, textAlign: "left"
              }}>{tab.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}