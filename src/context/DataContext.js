import { createContext, useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { format } from "date-fns";
import api from "../api/posts";

import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const history = useHistory();
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const postFiltered = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearchResult(postFiltered.reverse());
  }, [posts, search]);

  const handleEdit = async (id) => {
    const newDatetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {
      id,
      title: editTitle,
      datetime: newDatetime,
      body: editBody,
    };

    try {
      // using put because editing a whole row instead of patch (editing specific column/data)
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id == id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      history.push("/");
    } catch (err) {
      if (err.response) {
        //If not 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const myPosts = posts.filter((post) => {
        return post.id !== id;
      });

      setPosts(myPosts);
      history.push("/");
    } catch (err) {
      if (err.response) {
        //If not 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

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
    try {
      const response = await api.post("/posts", newPost);
      const newPosts = [...posts, response.data];
      setPosts(newPosts);
      setPostTitle("");
      setPostBody("");
      history.push("/");
    } catch (err) {
      if (err.response) {
        //If not 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResult,
        fetchError,
        isLoading,
        handleSubmit,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        posts,
        handleEdit,
        editBody,
        editTitle,
        setEditBody,
        setEditTitle,
        handleDelete,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
