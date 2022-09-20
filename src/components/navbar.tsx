import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, signOut } from "firebase/auth";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import React from "react";
import { isUserLoggedIn } from "../components/isUserLoggedIn";
import "../styles.css";

export const NavbarGlobal = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const loginInfo = await signInWithPopup(auth, googleProvider);
    console.log(loginInfo);
    navigate("/");
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    right: "0",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
  };

  return (
    <>
      <div className="">
        <Navbar>
          <React.Fragment key=".0">
            {/* LOGO BRAND */}
            <Navbar.Brand href="/">
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ">
                Social Eyes
              </span>
            </Navbar.Brand>

            {/* DROPDOWN */}
            <div className="flex gap-3 md:order-2">
              <Dropdown
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img={user?.photoURL || ""}
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user?.displayName}</span>
                  <span className="block truncate text-sm font-medium">
                    {user?.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>
                  <a href="/createpost">Dashboard</a>
                </Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Divider />
                {isUserLoggedIn() ? (
                  <Dropdown.Item onClick={signInWithGoogle}>
                    Log In
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
                )}
              </Dropdown>
              <Navbar.Toggle />
            </div>

            {/* NAVIGATION */}
            <Navbar.Collapse>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "link-active" : "link"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/createpost"
                className={({ isActive }) =>
                  isActive ? "link-active" : "link"
                }
              >
                Create Post
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "link-active" : "link"
                }
              >
                About
              </NavLink>
            </Navbar.Collapse>
          </React.Fragment>
        </Navbar>
      </div>
    </>
  );
};
