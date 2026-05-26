import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieGrid from "./components/MovieGrid";
import MovieModal from "./components/MovieModal";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";




function App() {

  const [trending, setTrending] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("Trending");
  const [favorites, setFavorites] = useState(()=>{
    try{return JSON.parse(localStorage.getItem("cinevault_favorites")) ?? []; }
    catch{return [];}
  });
  
  
  const [watchlist, setWatchlist] = useState(() => {
  try { return JSON.parse(localStorage.getItem("cinevault_watchlist")) ?? []; }
  catch { return []; }
  });

useEffect(() => {
  localStorage.setItem("cinevault_favorites", JSON.stringify(favorites));
}, [favorites]);

useEffect(() => {
  localStorage.setItem("cinevault_watchlist", JSON.stringify(watchlist));
}, [watchlist]);



  useEffect(() => {
    setLoading(true);
    fetch(`${BASE}/trending/movie/week?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setTrending(data.results ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  //Toggle favouritesss
  const toggleFav = (movie) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === movie.id)
        ? prev.filter((f) => f.id !== movie.id)
        : [...prev, movie],
    );
  };

  // Toggle watchlist
  const toggleWatchlist = (movie) => {
    setWatchlist((prev) =>
      prev.some((w) => w.id === movie.id)
        ? prev.filter((w) => w.id !== movie.id)
        : [...prev, movie],
    );
  };

  // search movies
  const handleSearch = () => {
    if (!query.trim()) return;
    fetch(
      `${BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
    )
      .then((res) => res.json())
      .then((data) => setSearchResults(data.results ?? []))
      .finally(() => setLoading(false));
  };

  // Which movies to show
  const movies =
    activeTab === "Search"
      ? searchResults
      : activeTab === "Favorites"
        ? favorites
        : activeTab === "Watchlist"
          ? watchlist
          : trending;

  const emptyMsg =
    activeTab === "Favorites"
      ? "No favorites yet — hover a movie and click ☆"
      : activeTab === "Watchlist"
        ? "Watchlist is empty — add movies with + List"
        : activeTab === "Search"
          ? "Search for a movie above"
          : "Loading...";

  return (
    <div>
      {/* navbar section */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        favCount={favorites.length}
        watchlistCount={watchlist.length}
      />

      {/* hero section */}
      {activeTab === "Trending" && <Hero />}

      {/* search bar */}
      {activeTab === "Search" && (
        <div style={{ display: "flex", gap: 10, padding: "2rem 3rem 0" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for a movie..."
            style={{
              flex: 1,
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "12px 16px",
              color: "var(--text)",
              fontSize: 15,
              outline: "none",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              background: "linear-gradient(135deg, var(--pink), var(--red))",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            Search
          </button>
        </div>
      )}

      {/* search titles */}
      <h2
      id="movies-section" 
        style={{
          color: "var(--text)",
          padding: "2rem 3rem 0",
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        {activeTab === "Trending" && "🔥 Trending This Week"}
        {activeTab === "Search" && "🔍 Search Results"}
        {activeTab === "Favorites" && "★ Your Favorites"}
        {activeTab === "Watchlist" && "📋 Your Watchlist"}
      </h2>

      {/* Loading */}
      {loading ? (
        <p style={{ color: "var(--text-muted)", padding: "2rem 3rem" }}>
          Loading...
        </p>
      ) : (
        <MovieGrid
          movies={movies}
          onSelect={setSelectedMovie}
          favorites={favorites}
          watchlist={watchlist}
          onToggleFav={toggleFav}
          onToggleWatchlist={toggleWatchlist}
          emptyMsg={emptyMsg}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isFav={favorites.some((f) => f.id === selectedMovie.id)}
          isWatchlist={watchlist.some((w) => w.id === selectedMovie.id)}
          onToggleFav={toggleFav}
          onToggleWatchlist={toggleWatchlist}
        />
      )}
    </div>
  );
}

export default App;
