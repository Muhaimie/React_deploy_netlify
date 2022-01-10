import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const Nav = () => {
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setSearchResult = useStoreActions((actions) => actions.setSearchResult);

  useEffect(() => {
    const postFiltered = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearchResult(postFiltered.reverse());
  }, [posts, search, setSearchResult]);

  return (
    <nav className="nav">
      <form
        className="searchForm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* This one will not be visible, use for id for input below */}
        <label htmlFor="search">Search Post</label>
        <input
          id="search"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>

        <Link to="/post">
          <li>New Post </li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
