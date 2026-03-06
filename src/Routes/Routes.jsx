import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import ErrorPage from "../Components/Common/Errorpage/ErrorPage";
import Loading from "../Components/Common/Loading/Loading";
import Home from "../Pages/Home/Home";
import AllJobs from "../Pages/AllJobs/AllJobs";
import JobDetails from "../Pages/JobDetails/JobDetails";
import AllCompanies from "../Pages/AllCompanies/AllCompanies";
import AuthLayouts from "../Layouts/AuthLayouts";
import Register from "../Components/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import DashBoardLayouts from "../Layouts/DashBoardLayouts";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import OverView from "../Pages/Dashboard/OverView/OverView";
import Login from "../Components/Login/Login";
import CreateJob from "../Pages/Dashboard/CreateJob/CreateJob";
import JobListing from "../Pages/Dashboard/JobListing/JobListing";
import ApplicantsList from "../Pages/Dashboard/ApplicantsList/ApplicantsList";
import Settings from "../Pages/Dashboard/StaticPages/Settings";
import Help from "../Pages/Dashboard/StaticPages/Help";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <Loading></Loading>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/jobs",
        element: <AllJobs></AllJobs>,
      },
      {
        path: "/jobs/:id",
        element: <JobDetails></JobDetails>,
      },
      {
        path: "/companies",
        element: <AllCompanies></AllCompanies>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayouts></AuthLayouts>,
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <Loading></Loading>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashBoardLayouts></DashBoardLayouts>
      </PrivateRoutes>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <Loading></Loading>,

    children: [
       {
        index: true,
        element:<OverView></OverView>,
      },
      {
        path: "profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "dashboard",
        element: <OverView></OverView>,
      },
       {
        path: "post-job",
        element: <CreateJob></CreateJob>,
      },
        {
        path: "job-listing",
        element: <JobListing></JobListing>,
      },
          {
        path: "applicants",
        element: <ApplicantsList></ApplicantsList>,
      },
          {
        path: "settings",
        element: <Settings></Settings>,
      },
          {
        path: "help",
        element:<Help></Help>,
      },
    ],
  },
]);
