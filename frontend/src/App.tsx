import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Error from "./components/Error";
import Layout from "./components/layouts/Layout";
import NotFound from "./pages/NotFound";
import Login, { action as loginAction } from "./pages/User/Login";
import React, { createContext, useState } from "react";
import Profile, { action as profileAction } from "./pages/User/Profile";
import TraineesInfo from "./pages/User/TraineesInfo";
import CoachesInfo from "./pages/User/CoachesInfo";
import { Provider } from "react-redux";
import {store} from "./store";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { usersApi } from "./features/user/apiSlice";

export const authContext = createContext<any>(null);

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />} errorElement={<Error />}>
          <Route index element={<h1>Overview page</h1>} />
          <Route path="/forms" element={<h1>Forms page</h1>} />
          <Route
            path="/trainees"
            element={<TraineesInfo />}
          />
          <Route
            path="/administer-coach"
            element={<CoachesInfo/>}
          />
          <Route
            path="/profile-settings"
            element={<Profile />}
            action={profileAction}
          />
        </Route>
        <Route path="/login" element={<Login />} action={loginAction} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  const [user, setUser] = useState(null);
  return (
    // <Provider store={store}>
      <ApiProvider api={usersApi}>
      <authContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </authContext.Provider>
      </ApiProvider>
    // </Provider>
  );
}
