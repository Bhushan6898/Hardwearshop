import HomeView from "./views/Home";
import SignInView from "./views/account/SignIn";
import SignUpView from "./views/account/SignUp"; // Import SignUpView
import ForgotPasswordView from "./views/account/ForgotPassword";
import NotificationView from "./views/account/Notification";
import MyProfileView from "./views/account/MyProfile";
import ProductListView from "./views/product/List";
import ProductDetailView from "./views/product/Detail";
import StarZoneView from "./views/product/StarZone";
import DocumentationView from "./views/Documentation";
import Addproduct from "./components/add_product/add";
import Building_material from "./components/building_material/building_material";
import Billing from "./components/billing/billing";
import Billinggdata from "./components/billing/billinggdata";
import Electric_material from "./components/electric/electric_material";
 import Dashboard from "./components/dashbord/indexs";
import LandingPage from "./components/landingpage";

import Chatbox from "./components/chatbox";

export const appRoutes = [
  { path: "/", element: <HomeView /> },
  { path: "/signin", element: <SignInView /> },
  { path: "/account/signup", element: <SignUpView /> }, // Ensure this route is defined
  { path: "/account/forgotpassword", element: <ForgotPasswordView /> },
  { path: "/account/profile", element: <MyProfileView /> },
  { path: "/dashbord", element: <Dashboard /> },
  { path: "/account/notification", element: <NotificationView /> },
  { path: "/category", element: <ProductListView /> },
  { path: "/addproduct", element: <Addproduct /> },
  { path: "/building", element: <Building_material /> },
  { path: "/billing", element: <Billing /> },
  { path: "/billingdata", element: <Billinggdata /> },
  { path: "/electric", element: <Electric_material /> },
  { path: "/product/detail", element: <ProductDetailView /> },
  { path: "/star/zone", element: <StarZoneView /> },
  { path: "/documentation", element: <DocumentationView /> },
  { path: "/chatbox", element: <Chatbox /> },
  { path: "/landing", element: <LandingPage /> },
 
  { path: "*",  element: <HomeView  /> }// Catch-all for undefined routes
];
