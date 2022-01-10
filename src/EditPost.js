import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useStoreState, useStoreActions } from "easy-peasy";

import { format } from "date-fns";
import { useHistory } from "react-router-dom";

const EditPost = () => {
  const history = useHistory();

  const editBody = useStoreState((store) => store.editBody);
  const editTitle = useStoreState((store) => store.editTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const editPost = useStoreActions((actions) => actions.editPost);

  //this is a function
  const getPostbyId = useStoreState((state) => state.getPostbyId);

  const { id } = useParams();
  const post = getPostbyId(id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditBody, setEditTitle]);

  const handleEdit = async (id) => {
    const newDatetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {
      id,
      title: editTitle,
      datetime: newDatetime,
      body: editBody,
    };

    editPost(updatedPost);
    history.push("/");
  };

  return (
    <main className="newPost">
      {post && (
        <>
          <h1>Edit Post</h1>
          <form
            className="newPostForm"
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(id);
            }}
          >
            <label htmlFor="editTitle">Title:</label>
            <input
              id="editTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="editBody">Post:</label>
            <textarea
              id="editBody"
              type="text"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      {!post && (
        <>
          <h2>Post Not found</h2>
          <p>Well, that's dissapointing</p>
          <Link to="/">Visit Our Homepage Instead.</Link>
        </>
      )}
    </main>
  );
};

export default EditPost;
