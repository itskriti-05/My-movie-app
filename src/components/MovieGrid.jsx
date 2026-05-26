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
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gap: 20,
      padding: "2rem 3rem",
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
