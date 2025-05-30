import React from "react";
import styles from "./PostCard.module.css";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post, onDelete }) {
  const navigate = useNavigate();

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "...";
  };

  return (
    <div className={styles.postCard}>
      <div className={styles.status}>
        <span
          className={
            post.status === "published" ? styles.published : styles.draft
          }
        >
          {post.status}
        </span>
      </div>

      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.content}>{truncateContent(post.content)}</p>

      <div className={styles.meta}>
        <span>By {post.authorName}</span>
        <span>•</span>
        <span>{formatDate(post.createdAt)}</span>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.button} ${styles.editAndDeleteButton}`}
          onClick={() => navigate(`/edit-post/${post.id}`)}
        >
          Edit
        </button>
        <button
          className={`${styles.button} ${styles.editAndDeleteButton}`}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
