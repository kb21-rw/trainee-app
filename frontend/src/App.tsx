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
import AllForm from "./pages/Form/AllForms";
import SingleForm from "./pages/Form/SingleForm";
import SignIn from "./pages/Applicant/SignIn";
import OverView from "./pages/User/OverView";
import TraineeResults from "./pages/User/TraineeResults";
import NewPassword from "./pages/Applicant/NewPassword";
import ForgetPassword from "./pages/Applicant/ForgetPassword";
export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />} errorElement={<Error />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<OverView />} />
            <Route path="/forms" element={<AllForm />} />
            <Route path="/forms/:id" element={<SingleForm />} />
            <Route path="/trainees" element={<TraineesInfo />} />
            <Route path="/coaches" element={<CoachesInfo />} />
            <Route path="/my-trainees" element={<EditMyTrainees />} />
            <Route path="/trainees-results" element={<TraineeResults />} />
            <Route path="/profile-settings" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/applicant">
          <Route index element={<h1>Successfully In!</h1>} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="reset-password" element={<ForgetPassword />} />
          <Route path="new-password" element={<NewPassword />} />
          <Route
            path="verify"
            element={<h1>This page should be created, EMAIL VERIFICATION PAGE</h1>}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <ApiProvider api={usersApi}>
      <RouterProvider router={router} />
    </ApiProvider>
  );
}
