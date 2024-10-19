import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/oct/search";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products/searchresults/${query}`);
    }
  };

  return (
    <div id="searchbar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <Icon icon={search} size={15} />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
