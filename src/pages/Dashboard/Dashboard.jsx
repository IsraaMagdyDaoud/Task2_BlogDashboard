import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/thunks/postThunks";
import { updateUserStats } from "../../redux/slices/userSlice";
import UserInfo from "../../components/UserInfo/UserInfo";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { userStats } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchPosts(user.uid));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (posts.length > 0) {
      const publishedPosts = posts.filter(
        (post) => post.status === "published"
      ).length;
      const draftPosts = posts.filter((post) => post.status === "draft").length;

      dispatch(
        updateUserStats({
          totalPosts: posts.length,
          publishedPosts,
          draftPosts,
        })
      );
    }
  }, [posts, dispatch]);

  const userProfile = user
    ? {
        id: user.uid,
        name: user.name || user.email.split("@")[0],
        email: user.email,

        joinDate: new Date(user.createdAt).toLocaleDateString(),
      }
    : null;

  return (
    <main
      className={styles.dashboardContainer}
      aria-labelledby="dashboard-title"
    >
      <h1 id="dashboard-title" className={styles.pageTitle}>
        Dashboard
      </h1>

      <div className={styles.dashboardGrid}>
        <section
          className={styles.userSection}
          aria-labelledby="profile-info-heading"
        >
          <h2 id="profile-info-heading" className={styles.Info}>
            Profile info
          </h2>
          <UserInfo user={userProfile} />
        </section>

        <section
          className={styles.statsSection}
          aria-labelledby="blog-stats-heading"
        >
          <h2 id="blog-stats-heading">Your Blog </h2>

          <div className={styles.statsGrid}>
            <div
              className={styles.statCard}
              role="region"
              aria-labelledby="total-posts"
            >
              <h3 id="total-posts">Total Posts</h3>
              <p className={styles.statValue}>{userStats.totalPosts}</p>
            </div>

            <div
              className={styles.statCard}
              role="region"
              aria-labelledby="published-posts"
            >
              <h3 id="published-posts">Published</h3>
              <p className={styles.statValue}>{userStats.publishedPosts}</p>
            </div>

            <div
              className={styles.statCard}
              role="region"
              aria-labelledby="draft-posts"
            >
              <h3 id="draft-posts">Drafts</h3>
              <p className={styles.statValue}>{userStats.draftPosts}</p>
            </div>
          </div>

          <h3 className={styles.recentTitle} id="recent-activity-heading">
            Recent Activity
          </h3>
          <div
            className={styles.recentPosts}
            role="list"
            aria-labelledby="recent-activity-heading"
          >
            {posts.slice(0, 3).map((post) => (
              <article
                key={post.id}
                className={styles.recentPost}
                role="listitem"
                aria-label={`Post titled ${post.title}`}
              >
                <h4>{post.title}</h4>
                <p>{post.status === "published" ? "Published" : "Draft"}</p>
                <p className={styles.date}>
                  {post.updatedAt
                    ? new Date(
                        post.updatedAt.seconds * 1000
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </article>
            ))}
            {posts.length === 0 && <p>No recent activity</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
