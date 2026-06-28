import { useState, useEffect } from "react";

const backgrounds = ["/bg1.png", "/bg2.png"];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: "relative", height: "90vh", overflow: "hidden" }}>

      <img src={backgrounds[current]} alt="hero"
        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 1s ease" }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(27,25,25,0.95) 30%, rgba(27,25,25,0.3) 100%), linear-gradient(to top, rgba(27,25,25,1) 0%, transparent 60%)"
      }} />

      <div style={{
        position: "absolute", bottom: "15%",
        left: "clamp(1.5rem, 5vw, 4rem)",
        maxWidth: "min(520px, 90vw)",
      }}>

        <h1 style={{
          fontSize: "clamp(28px, 6vw, 52px)",
          fontWeight: 900, color: "var(--text)",
          lineHeight: 1.1, marginBottom: 16, letterSpacing: -1
        }}>
          Discover Your<br />
          <span style={{
            background: "linear-gradient(90deg, var(--pink), var(--red))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Next Favourite</span>
        </h1>

        <p style={{
          color: "var(--text-muted)", fontSize: "clamp(13px, 2vw, 15px)",
          lineHeight: 1.7, marginBottom: 28
        }}>
          Explore trending movies, save your favourites, and build your perfect watchlist.
        </p>

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {backgrounds.map((_, i) => (
            <div key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 28 : 8, height: 8,
              borderRadius: 10,
              background: i === current ? "var(--pink)" : "var(--border)",
              cursor: "pointer", transition: "all 0.4s ease"
            }} />
          ))}
        </div>

        <button
          onClick={() => document.getElementById("movies-section").scrollIntoView({ behavior: "smooth" })}
          style={{
            background: "linear-gradient(135deg, var(--pink), var(--red))",
            color: "#fff", border: "none", borderRadius: 8,
            padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer"
          }}>🔥 Explore Movies</button>
      </div>
    </div>
  );
}