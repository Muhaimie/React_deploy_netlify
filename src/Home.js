import React from "react";
import Feed from "./Feed";

import { useStoreState } from "easy-peasy";

const Home = ({ fetchError, isLoading }) => {
  const searchResult = useStoreState((state) => state.searchResult);
  return (
    <div className="home">
      {console.log(searchResult[1])}
      {isLoading && <p className="statusMessage">Loading post....</p>}
      {fetchError && (
        <p className="statusMessage" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
      {!isLoading &&
        !fetchError &&
        (searchResult.length ? (
          <Feed posts={searchResult} />
        ) : (
          <p
            style={{
              color: "black",
              textAlign: "center",
              padding: "1rem",
              margin: "1rem",
              fontSize: "1.5em",
            }}
          >
            No available post at the moment.
          </p>
        ))}
    </div>
  );
};

export default Home;
