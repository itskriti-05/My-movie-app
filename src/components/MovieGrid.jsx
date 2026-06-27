import React from 'react'
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, onSelect, favorites, watchlist, onToggleFav, onToggleWatchlist, emptyMsg }) => {
    if(!movies.length) return (
        <div style={{ 
            textAlign: "center" , color:"var(--text-muted)" , padding:"4rem 0",fontSize:16 }}>
            {emptyMsg}
            </div>
    );

  return (
    <div style={{
    display: "grid",
gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
gap: "clamp(10px, 2vw, 20px)",
padding: "clamp(1rem, 3vw, 2rem) clamp(1rem, 3vw, 3rem)",
    }}>

      {
        movies.map(movie=>(
          <MovieCard
            key = {movie.id}
            movie={movie}
            onSelect={onSelect}
            isFav={favorites.some(f=> f.id === movie.id)}
            isWatchlist={watchlist.some(w=> w.id === movie.id)}
            onToggleFav={onToggleFav}
            onToggleWatchlist={onToggleWatchlist}
          />
        ))
      }
      
    </div>
  )
}

export default MovieGrid
