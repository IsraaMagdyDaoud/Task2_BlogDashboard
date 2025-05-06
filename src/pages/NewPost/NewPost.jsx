import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/thunks/postThunks";
import PostForm from "../../components/PostForm/PostForm";
import styles from "./NewPost.module.css";

export default function NewPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (postData) => {
    try {
      const completePostData = {
        ...postData,
        authorId: user.uid,
        authorName: user.name || user.email.split("@")[0],
        authorEmail: user.email,
        status: postData.publish ? "published" : "draft",
      };

      await dispatch(createPost(completePostData)).unwrap();
      navigate("/posts");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className={styles.newPostContainer}>
      <h1 className={styles.pageTitle}>Create New Post</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}
