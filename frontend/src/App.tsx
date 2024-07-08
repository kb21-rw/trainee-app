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
import AllForm from "./pages/Form/AllForms";
import SingleForm from "./pages/Form/SingleForm";
import OverView from "./pages/User/OverView";
import TraineeResults from "./pages/User/TraineeResults";
import ApplicantSignup from "./pages/User/ApplicantSignup";
import ApplicantSignin from "./pages/User/ApplicantSignin";
import ApplicantVerification from "./pages/User/ApplicantVerification";
import ApplicationForm from "./pages/Applicant/ApplicationForm";
import ApplicantHomePage from "./pages/Applicant/ApplicantHomePage";
import Applicants from "./pages/User/Applicants";
export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" errorElement={<Error />}>
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<OverView />} />
              <Route path="/forms" element={<AllForm />} />
              <Route path="/forms/:id" element={<SingleForm />} />
              <Route path="/applicants" element={<Applicants />} />
              <Route path="/trainees" element={<TraineesInfo />} />
              <Route path="/coaches" element={<CoachesInfo />} />
              <Route path="/my-trainees" element={<EditMyTrainees />} />
              <Route path="/trainees-results" element={<TraineeResults />} />
              <Route path="/profile-settings" element={<Profile />} />
            </Route>
            <Route path="/applicant">
              <Route index element={<ApplicantHomePage />} />
              <Route path="apply" element={<ApplicationForm />} />
            </Route>
          </Route>
          <Route path="/applicant">
            <Route path="signup" element={<ApplicantSignup />} />
            <Route path="signin" element={<ApplicantSignin />} />
            <Route path="verify" element={<ApplicantVerification />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
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