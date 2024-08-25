import { Dashboard } from "@/components/component/dashboard";
import { Login } from "@/components/component/login";
import {
  PrivateRoute,
  PublicRoute,
} from "@/components/component/private-route";
import { Register } from "@/components/component/register";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute children={<Dashboard />} />,
  },

  {
    path: "/login",
    element: <PublicRoute children={<Login />} />,
  },
  {
    path: "/register",
    element: <PublicRoute children={<Register />} />,
  },
]);
