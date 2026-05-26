import React from 'react'

const IMG = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, onSelect, isFav, isWatchlist, onToggleFav, onToggleWatchlist }) => {
  return (
     <div
      onClick={() => onSelect(movie)}
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        background: "var(--card-bg)",
        aspectRatio: "2/3",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.04)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(219,45,105,0.3)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Poster Image */}
      {movie.poster_path
        ? <img
            src={`${IMG}${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        : <div style={{
            width: "100%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text-muted)", fontSize: 13, padding: 12, textAlign: "center"
          }}>{movie.title}</div>
      }

      {/* Hover Overlay */}
      <div className="card-overlay" style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(27,25,25,0.98) 0%, rgba(27,25,25,0.4) 60%, transparent 100%)",
        opacity: 0, transition: "opacity 0.3s ease",
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: 12,
      }}
        onMouseEnter={e => e.currentTarget.style.opacity = 1}
        onMouseLeave={e => e.currentTarget.style.opacity = 0}
      >
        <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 4, lineHeight: 1.3 }}>
          {movie.title}
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: 11, marginBottom: 8 }}>
          ⭐ {movie.vote_average?.toFixed(1)} · {movie.release_date?.slice(0, 4)}
        </p>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={e => { e.stopPropagation(); onToggleFav(movie); }}
            style={{
              flex: 1, padding: "6px 0", borderRadius: 6, border: "none",
              background: isFav ? "var(--pink)" : "rgba(255,255,255,0.15)",
              color: "#fff", fontSize: 11, fontWeight: 700,
            }}>
            {isFav ? "★ Fav'd" : "☆ Fav"}
          </button>
          <button
            onClick={e => { e.stopPropagation(); onToggleWatchlist(movie); }}
            style={{
              flex: 1, padding: "6px 0", borderRadius: 6, border: "none",
              background: isWatchlist ? "#0096c7" : "rgba(255,255,255,0.15)",
              color: "#fff", fontSize: 11, fontWeight: 700,
            }}>
            {isWatchlist ? "✓ Listed" : "+ List"}
          </button>
        </div>
      </div>

      {/* Top Rated Badge */}
      {movie.vote_average >= 8 && (
        <div style={{
          position: "absolute", top: 8, left: 8,
          background: "linear-gradient(135deg, var(--pink), var(--red))",
          color: "#fff", fontSize: 9, fontWeight: 700,
          padding: "3px 8px", borderRadius: 20, letterSpacing: 1
        }}>TOP RATED</div>
      )}
    </div>
  );
}

export default MovieCard
