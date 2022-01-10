import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

const NewPost = () => {
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);
  const posts = useStoreState((state) => state.posts);

  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);
  const savePost = useStoreActions((actions) => actions.savePost);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newDatetime = format(new Date(), "MMMM dd, yyyy pp");
    const newTitle = postTitle;
    const newBody = postBody;
    const newPost = {
      id,
      title: newTitle,
      datetime: newDatetime,
      body: newBody,
    };

    savePost(newPost);
    history.push("/");
  };
  return (
    <main className="newPost">
      <h1>NewPost</h1>
      <form className="newPostForm" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="newPostBody">Post:</label>
        <textarea
          id="newPostBody"
          type="text"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
