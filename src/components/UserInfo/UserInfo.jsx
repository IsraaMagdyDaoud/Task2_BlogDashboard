import React from "react";
import styles from "./UserInfo.module.css";

export default function UserInfo({ user }) {
  if (!user) {
    return (
      <div
        className={styles.loading}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        Loading user information...
      </div>
    );
  }

  return (
    <>
      <section
        className={styles.userInfoContainer}
        aria-labelledby="user-info-Section"
      >
        <div className={styles.userDetails}>
          <h2 id="user-info-Section" className={styles.userName}>
            {user.name}
          </h2>
          <p className={styles.userEmail}>Email: {user.email}</p>
          <p className={styles.joinDate}>Member since: {user.joinDate}</p>
        </div>
      </section>
    </>
  );
}
