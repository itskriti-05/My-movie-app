import React from "react";
import { useState, useEffect } from "react";

const backgrounds = ["/bg1.png", "/bg2.png"];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "92vh",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <img
        src={backgrounds[current]}
        alt="hero background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 1s ease",
        }}
      />
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(27,25,25,0.95) 30%, rgba(27,25,25,0.3) 100%), linear-gradient(to top, rgba(27,25,25,1) 0%, transparent 60%)",
        }}
      />

      {/* Text Content */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "4rem",
          maxWidth: 520,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, var(--pink), var(--red))",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: 20,
            letterSpacing: 2,
            marginBottom: 16,
            textTransform: "uppercase",
          }}
        >
          🔥 Now Trending
        </div>

        <h1
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "var(--text)",
            lineHeight: 1.1,
            marginBottom: 16,
            letterSpacing: -1,
          }}
        >
          Discover Your
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, var(--pink), var(--red))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Next Favourite
          </span>
        </h1>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 15,
            lineHeight: 1.7,
            marginBottom: 28,
          }}
        >
          Explore trending movies, save your favourites, and build your perfect
          watchlist.
        </p>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 8 }}>
          {backgrounds.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                borderRadius: 10,
                background: i === current ? "var(--pink)" : "var(--border)",
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>

        <button
  onClick={() => document.getElementById("movies-section").scrollIntoView({ behavior: "smooth" })}
  style={{
    marginTop: 20,
    background: "linear-gradient(135deg, var(--pink), var(--red))",
    color: "#fff", border: "none",
    borderRadius: 8, padding: "12px 28px",
    fontSize: 14, fontWeight: 700,
    cursor: "pointer"
  }}>
  🔥 Explore Movies
</button>

      </div>
    </div>
  );
};

export default Hero;
