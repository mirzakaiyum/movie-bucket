import { useState } from "react";

function NavBar({ children }) {
    return (
      <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
    );
  }
  
  function Logo() {
    return (
      <div className="logo">
        <span role="img">🍿</span>
        <h1>Movie Bucket</h1>
      </div>
    );
  }
  
  function Search({ query, setQuery }) {
    return (
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    );
  }
  
  function NumberOfResults({ moviesData }) {
    return (
      <p className="num-results">
        Found <strong>10</strong> results
      </p>
    );
  }

export { NavBar, Logo, Search, NumberOfResults };

  