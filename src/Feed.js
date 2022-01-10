import React from "react";
import Post from "./Post";

const Feed = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );
};

export default Feed;
