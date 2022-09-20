import { getAuth, onAuthStateChanged } from "firebase/auth";

export const isUserLoggedIn = () => {
  const auth = getAuth();
  let loggedIn = false;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggedIn = true;
    } else {
      loggedIn = false;
    }
  });
  return loggedIn;
};
