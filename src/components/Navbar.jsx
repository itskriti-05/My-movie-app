import React from 'react'
import { useState } from 'react'

const Navbar = ({ onTabChange, activeTab, favCount, watchlistCount }) => {

     const [menuOpen, setMenuOpen] = useState(false);

     const tabs =[
        {id:"Trending",label:"Trending"},
          { id: "Search", label: "Search" },
         { id: "Favorites", label: `★ Favorites (${favCount})` },
         { id: "Watchlist", label: `📋 Watchlist (${watchlistCount})` },
     ]

  return (
       <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(27,25,25,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
      padding: "0 2rem",
      display: "flex", alignItems: "center",
      justifyContent: "space-between", height: 68,
    }}>

        {/* //creating logos */}
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
        <span style={{
          fontSize: 20, fontWeight: 900,
          color: "var(--text)", letterSpacing: -0.5
        }}>VAULT</span>
      </div>


      {/* //creating tabs */}
       <div style={{ display: "flex", gap: 6 }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => onTabChange(tab.id)}
            style={{
              background: activeTab === tab.id
                ? "linear-gradient(135deg, var(--pink), var(--red))"
                : "transparent",
              color: activeTab === tab.id ? "#fff" : "var(--text-muted)",
              border: activeTab === tab.id
                ? "none"
                : "1px solid var(--border)",
              borderRadius: 20,
              padding: "8px 18px",
              fontSize: 13, fontWeight: 600,
              transition: "all 0.2s",
            }}>
            {tab.label}
          </button>
        ))}
      </div>




    
    </nav>
   
  );
}

export default Navbar

