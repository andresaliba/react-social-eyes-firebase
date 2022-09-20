import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Avatar, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { Post as PostType } from "./home";

interface Props {
  post: PostType;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });

      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLike = async () => {
    try {
      const likeToRemoveQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToRemoveData = await getDocs(likeToRemoveQuery);

      const likeId = likeToRemoveData.docs[0].id;

      const likeToRemove = doc(db, "likes", likeToRemoveData?.docs[0]?.id);

      await deleteDoc(likeToRemove);

      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
      <div className="grid lg:grid-cols-1 ">
        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <a href="#">{post.title}</a>
          </h2>
          <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
            {post.description}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                className="w-7 h-7 rounded-full"
                src={user?.photoURL || ""}
                alt={user?.displayName + " Avatar" || ""}
              />
              <div className="flex flex-col pr-20">
                <Link to={`/profile/${post.userId}`}>
                  <span className="font-medium dark:text-white">
                    {user?.displayName}
                  </span>
                </Link>
                <span className="text-sm text-gray-900 dark:text-gray-400">
                  14 days ago
                </span>
              </div>
            </div>
            <a
              href="/{user?.uid}"
              className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
            >
              Read more
              <svg
                className="ml-2 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  );
};
