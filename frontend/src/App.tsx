import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Error from "./components/Error";
import Layout from "./components/layouts/Layout";
import NotFound from "./pages/NotFound";
import Login from "./pages/User/Login";
import React from "react";
import Profile from "./pages/User/Profile";
import TraineesInfo from "./pages/User/TraineesInfo";
import CoachesInfo from "./pages/User/CoachesInfo";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { usersApi } from "./features/user/apiSlice";
import ResetPassword from "./pages/User/ResetPassword";
import EditMyTrainees from "./pages/User/EditTraineesForCoach";
import ProtectedRoute from "./components/ProtectedRoutes";
import SignUp from "./pages/Applicant/SignUp";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />} errorElement={<Error />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<h1>Overview page</h1>} />
            <Route path="/forms" element={<h1>Forms page</h1>} />
            <Route path="/trainees" element={<TraineesInfo />} />
            <Route path="/administer-coach" element={<CoachesInfo />} />
            <Route path="/edit-my-trainees" element={<EditMyTrainees />} />
            <Route path="/profile-settings" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/applicant/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>,
    ),
  );
  return (
    <ApiProvider api={usersApi}>
      <RouterProvider router={router} />
    </ApiProvider>
  );
}
