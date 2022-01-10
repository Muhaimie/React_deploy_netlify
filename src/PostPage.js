import React from "react";
import { useParams, Link } from "react-router-dom";

import { useStoreState, useStoreActions } from "easy-peasy";

const PostPage = () => {
  const posts = useStoreState((state) => state.posts);
  const deletePost = useStoreActions((actions) => actions.deletePost);

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <main className="postPage">
      <article id="post" className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <div id="postButtonDiv">
              <Link to={`/edit/${id}`}>
                <button id="editPostButton">Edit Post</button>
              </Link>
              <button onClick={() => deletePost(post.id)}>Delete Post</button>
            </div>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not found</h2>
            <p>Well, that's dissapointing</p>
            <Link to="/">Visit Our Homepage Instead.</Link>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
