import { createHashRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Services from "../pages/Services.jsx";
import Destinations from "../pages/Destinations.jsx";
import Consult from "../pages/Consult.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import VerifyEmail from "../pages/VerifyEmail.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import AdminTrips from "../pages/AdminTrips.jsx";
import AdminBookings from "../pages/AdminBookings.jsx";
import AdminUsers from "../pages/AdminUsers.jsx";
import AdminSupport from "../pages/AdminSupport.jsx";
import AdminFeedback from "../pages/AdminFeedback.jsx";
import AdminPhotos from "../pages/AdminPhotos.jsx";
import AdminNotifications from "../pages/AdminNotifications.jsx";
import SupportMessages from "../pages/SupportMessages.jsx";
import Feedback from "../pages/Feedback.jsx";
import OurPictures from "../pages/OurPictures.jsx";
import PhotoUpload from "../pages/PhotoUpload.jsx";
import Trips from "../pages/Trips.jsx";
import MyTrips from "../pages/MyTrips.jsx";
import NotFound from "../pages/NotFound.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "destinations", element: <Destinations /> },
      { path: "consult", element: <Consult /> },
      { path: "community-gallery", element: <OurPictures /> },
      { path: "pictures", element: <OurPictures /> },
      { path: "community/photos", element: <OurPictures /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "verify-email", element: <VerifyEmail /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "trips", element: <Trips /> },
          { path: "my-trips", element: <MyTrips /> },
          { path: "support", element: <SupportMessages /> },
          { path: "feedback", element: <Feedback /> },
          { path: "pictures/upload", element: <PhotoUpload /> }
        ]
      },
      {
        element: <AdminRoute />,
        children: [
          { path: "admin/trips", element: <AdminTrips /> },
          { path: "admin/bookings", element: <AdminBookings /> },
          { path: "admin/users", element: <AdminUsers /> },
          { path: "admin/support", element: <AdminSupport /> },
          { path: "admin/feedback", element: <AdminFeedback /> },
          { path: "admin/photos", element: <AdminPhotos /> },
          { path: "admin/notifications", element: <AdminNotifications /> }
        ]
      },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

export default router;

