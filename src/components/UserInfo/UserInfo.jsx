import React from "react";
import styles from "./UserInfo.module.css";

export default function UserInfo({ user }) {
  if (!user) {
    return <div className={styles.loading}>Loading user information...</div>;
  }

  return (
    <>
      <div className={styles.userInfoContainer}>
        <div className={styles.userDetails}>
          <h2 className={styles.userName}>{user.name}</h2>
          <p className={styles.userEmail}>Email: {user.email}</p>
          <p className={styles.joinDate}>Member since: {user.joinDate}</p>
        </div>
      </div>
    </>
  );
}
