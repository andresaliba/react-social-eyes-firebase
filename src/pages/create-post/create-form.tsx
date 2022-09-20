import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface createFormProps {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("Please add a title to your post"),
    description: yup.string().required("Please add a description to your post"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createFormProps>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: createFormProps) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="grid lg:grid-cols-1 ">
          <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <input
                type="text"
                placeholder="Title..."
                {...register("title")}
                id="title-input"
                className="block p-4 w-24  dark:bg-gray-700 border-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 "
              />
              <br></br>
              <input
                type="text"
                placeholder="New Post..."
                {...register("description")}
                id="description-input"
                className="block p-4 w-96  border-none border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </h2>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400"></p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  className="w-7 h-7 rounded-full"
                  src={user?.photoURL || ""}
                  alt={user?.displayName + " Avatar" || ""}
                />
                <div className="flex flex-col pr-20">
                  <span className="text-sm text-gray-900 dark:text-gray-400">
                    {user?.displayName || ""}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Create Post
              </button>
            </div>
          </article>
        </div>
      </div>
    </form>
  );
};
