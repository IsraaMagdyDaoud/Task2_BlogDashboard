import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../../redux/thunks/postThunks";
import { PostCard, Pagination } from "../../components/index";
import styles from "./Posts.module.scss";

export default function Posts() {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId));
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (status === "loading") {
    return <div className={styles.loading}>Loading posts...</div>;
  }

  if (status === "failed") {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <section
      className={styles.postsContainer}
      aria-labelledby="posts-title-page"
    >
      <h1
        id="posts-title-page"
        className={styles.pageTitle}
        aria-label="All Posts"
      >
        All Posts
      </h1>

      {posts.length === 0 ? (
        <p className={styles.noPosts}>No posts found. Create a new post!</p>
      ) : (
        <>
          <div className={styles.postsGrid}>
            {currentPosts.map((post) => (
              <article key={post.id} aria-label={`Post titled ${post.title}`}>
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={() => handleDeletePost(post.id)}
                />
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </section>
  );
}
