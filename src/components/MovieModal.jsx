import React from 'react'
import { useState, useEffect } from "react";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const IMG = "https://image.tmdb.org/t/p/w500";
const BACKDROP = "https://image.tmdb.org/t/p/w1280";
const BASE = "https://api.themoviedb.org/3";

const MovieModal = ({ movie, onClose, isFav, isWatchlist, onToggleFav, onToggleWatchlist }) => {

    const[details,setDetails] = useState(null);

    useEffect(()=>{
        if(!movie) return;
        fetch(`${BASE}/movie/${movie.id}?api_key=${API_KEY}&append_to_response=credits,similar`)
        .then(res=> res.json())
        .then(setDetails);

    } , [movie?.id]);

    if(!movie) return null;

      const cast = details?.credits?.cast?.slice(0, 5) ?? [];
      const genres = details?.genres ?? [];


  return (
    //overlay
    <div
    onClick={onClose} style={{
    position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem"

    }}>

      {/* Modal */}
      <div onClick={e => e.stopPropagation()} style={{
        background: "#1b1919",
        borderRadius: 16,
        maxWidth: 900, width: "100%",
        border: "1px solid var(--border)",
        overflow: "hidden",
        position: "relative"
      }}>

        {/* Close Button */}
        <button onClick={onClose} style={{
          position: "absolute", top: 12, right: 12,
          background: "rgba(0,0,0,0.5)",
          border: "none", color: "var(--text)",
          borderRadius: "50%", width: 32, height: 32,
          fontSize: 16, cursor: "pointer",
          zIndex: 10
        }}>✕</button>

          {/* Top Row — Poster + Info */}
        <div style={{ display: "flex", gap: 0 }}>

          {/* Poster */}
          {movie.poster_path && (
            <img src={`${IMG}${movie.poster_path}`} alt={movie.title}
              style={{
                width: 260, flexShrink: 0,
                objectFit: "cover", display: "block"
              }} />
          )}

           {/* Info */}
          <div style={{ padding: "1.5rem", flex: 1 }}>

            <h2 style={{
              color: "var(--text)", fontSize: 22,
              fontWeight: 900, margin: "0 0 8px"
            }}>{movie.title}</h2>

            <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "0 0 12px" }}>
              ⭐ {details?.vote_average?.toFixed(1)} &nbsp;·&nbsp;
              {details?.release_date?.slice(0, 4)} &nbsp;·&nbsp;
              {details?.runtime} min
            </p>

              {/* Genres */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              {genres.map(g => (
                <span key={g.id} style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  color: "var(--pink)",
                  fontSize: 11, padding: "3px 10px",
                  borderRadius: 20
                }}>{g.name}</span>
              ))}
            </div>

             {/* Overview */}
            <p style={{
              color: "var(--text-muted)", fontSize: 13,
              lineHeight: 1.7, margin: "0 0 20px"
            }}>
              {(details?.overview ?? movie.overview)?.slice(0, 200)}...
            </p>

              {/* Buttons */}
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => onToggleFav(movie)} style={{
                flex: 1, padding: "10px 0",
                borderRadius: 8, border: "none",
                background: isFav
                  ? "linear-gradient(135deg, var(--pink), var(--red))"
                  : "var(--card-bg)",
                color: "var(--text)",
                fontSize: 13, fontWeight: 700,
                cursor: "pointer"
              }}>
                {isFav ? "★ In Favorites" : "☆ Add to Favorites"}
              </button>
              <button onClick={() => onToggleWatchlist(movie)} style={{
                flex: 1, padding: "10px 0",
                borderRadius: 8, border: "none",
                background: isWatchlist
                  ? "linear-gradient(135deg, var(--pink), var(--red))"
                  : "var(--card-bg)",
                color: "var(--text)",
                fontSize: 13, fontWeight: 700,
                cursor: "pointer"
              }}>
                {isWatchlist ? "✓ In Watchlist" : "+ Watchlist"}
              </button>
            </div>
          </div>
        </div>

          {/* Cast Row */}
        {cast.length > 0 && (
          <div style={{
            padding: "1rem 1.5rem",
            borderTop: "1px solid var(--border)"
          }}>
            <p style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 10 }}>
              CAST
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              {cast.map(c => (
                <div key={c.id} style={{ textAlign: "center", flexShrink: 0 }}>
                  <img
                    src={c.profile_path ? `${IMG}${c.profile_path}` : ""}
                    alt={c.name}
                    style={{
                      width: 48, height: 48, borderRadius: "50%",
                      objectFit: "cover", background: "var(--card-bg)",
                      display: "block", margin: "0 auto"
                    }} />
                  <p style={{
                    color: "var(--text)", fontSize: 10,
                    margin: "4px 0 0", fontWeight: 600
                  }}>{c.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
    </div>
  )
}

export default MovieModal
