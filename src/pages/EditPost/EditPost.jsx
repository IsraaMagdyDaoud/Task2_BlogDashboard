import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/thunks/postThunks";
import PostForm from "../../components/PostForm/PostForm";
import styles from "./EditPost.module.css";

export default function EditPost() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, status } = useSelector((state) => state.posts);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const currentPost = posts.find((p) => p.id === postId);
    if (currentPost) {
      setPost(currentPost);
    } else {
      navigate("/posts");
    }
  }, [postId, posts, navigate]);

  const handleSubmit = async (formData) => {
    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        publish: formData.publish,
        authorId: post.authorId,
        authorName: post.authorName,
      };
      await dispatch(updatePost({ postId, postData })).unwrap();
      navigate("/posts");
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };
  if (!post) {
    return <div>Loading post.....</div>;
  }
  const initialData = {
    id: post.id,
    title: post.title,
    content: post.content,
    status: post.status,
  };
  return (
    <div className={styles.EditPostContainer}>
      <h1 className={styles.pageTitle}>Edit Post</h1>
      <PostForm onSubmit={handleSubmit} initialData={initialData} />
    </div>
  );
}
