import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { Post } from "./post";

export interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  username: string;
}

export const Home = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="grid content-center margin-2 gap-4 ">
      {postsList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};
