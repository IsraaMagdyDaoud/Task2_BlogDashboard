import React, { useState } from "react";
import styles from "./PostForm.module.css";

export default function PostForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    content: initialData.content || "",
    publish: initialData.status === "published",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
          placeholder="Enter post title"
        />
        {errors.title && <p className={styles.errorText}>{errors.title}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className={`${styles.textarea} ${
            errors.content ? styles.inputError : ""
          }`}
          placeholder="Write your post content here..."
          rows={10}
        />
        {errors.content && <p className={styles.errorText}>{errors.content}</p>}
      </div>

      <div className={styles.formGroup}>
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="publish"
            name="publish"
            checked={formData.publish}
            onChange={handleChange}
            className={styles.checkbox}
          />
          <label htmlFor="publish" className={styles.checkboxLabel}>
            Publish immediately
          </label>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>
          {initialData.id ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  );
}
