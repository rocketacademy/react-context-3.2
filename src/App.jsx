import CallApi from "./Components/CallApi.jsx";
import Root from "./Components/Root.jsx";
import Profile from "./Components/Profile.jsx";
import Component from "./Components/Component.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";
import Home from "./Components/Home.jsx";
import User from "./Components/User";
import "./App.css";

import { createContext } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

export const UserContext = createContext(null);

export default function App() {
  const user = {
    email: "sam@sam.com",
    uid: 12,
  };

  const RequireAuth = ({ children, redirectTo, user }) => {
    const isAuthenticated = user ? true : false;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Home />} />
        <Route path="/api" element={<CallApi />} />
        <Route
          path="/profile"
          element={
            <RequireAuth redirectTo={"/"} user={user}>
              <Profile />
            </RequireAuth>
          }
        >
          <Route
            path="edit"
            element={
              <div>
                <h3>Edit Profile</h3>
                <p>Edit me now</p>
              </div>
            }
          />
          <Route
            path="view"
            element={
              <div>
                <h3>View Profile</h3>
                <p>View me now</p>
              </div>
            }
          />
        </Route>
        <Route path="/component" element={<Component />} />
        <Route path="/user/:username" element={<User />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return (
    <>
      <h1>Hello World</h1>
      <UserContext.Provider value={user}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}
