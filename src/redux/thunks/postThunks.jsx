import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (userId) => {
    try {
      const postsRef = collection(db, "posts");
      let q = postsRef;

      if (userId) {
        q = query(postsRef, where("authorId", "==", userId));
      }

      const querySnapshot = await getDocs(q);
      const posts = [];

      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });

      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData) => {
    try {
      const postsRef = collection(db, "posts");
      const newPost = {
        ...postData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(postsRef, newPost);
      return { id: docRef.id, ...newPost };
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      await deleteDoc(postRef);
      return postId;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const postRef = doc(db, "posts", postId);
      const updatedData = {
        ...postData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: postData.publish ? "published" : "draft",
      };
      await updateDoc(postRef, updatedData);
      return { id: postId, ...updatedData };
    } catch (error) {
      console.log("Error updating post:", error);
      return rejectWithValue(error.message);
    }
  }
);
