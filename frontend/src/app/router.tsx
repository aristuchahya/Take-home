// import { Dashboard } from "@/components/component/dashboard";
import { Login } from "@/components/component/login";
import {
  PrivateRoute,
  PublicRoute,
} from "@/components/component/private-route";
import { Register } from "@/components/component/register";
import { createBrowserRouter } from "react-router-dom";
import { DashboardAdmin } from "./pages/admin/dashboard";
import { TableRulePage } from "./pages/admin/table-rule";
import { QuestionsPage } from "./pages/admin/table-questions";
import { GetStarted } from "@/components/component/get-started";
import { BiodataPage } from "./pages/user/biodata-page";
import { AgePage } from "./pages/user/age-page";
import { WeightPage } from "./pages/user/weight-page";
import { HeightPage } from "./pages/user/height-page";
import { ResultPage } from "./pages/user/result-page";
import { ListPage } from "./pages/user/list-baby-page";
import { DimensionPage } from "./pages/admin/dimension";
import { ResultAdminPage } from "./pages/admin/result-admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GetStarted />,
  },

  {
    path: "/list-baby",
    element: <PrivateRoute children={<ListPage />} />,
  },

  {
    path: "/biodata",
    element: <PrivateRoute children={<BiodataPage />} />,
  },

  {
    path: "/age",
    element: <PrivateRoute children={<AgePage />} />,
  },
  {
    path: "/weight",
    element: <PrivateRoute children={<WeightPage />} />,
  },
  {
    path: "/height",
    element: <PrivateRoute children={<HeightPage />} />,
  },

  {
    path: "/result",
    element: <ResultPage />,
  },

  {
    path: "/admin/dashboard",
    element: <PrivateRoute children={<DashboardAdmin />} />,
  },

  {
    path: "/admin/variable",
    element: <PrivateRoute children={<TableRulePage />} />,
  },

  {
    path: "/admin/table-questions",
    element: <PrivateRoute children={<QuestionsPage />} />,
  },

  {
    path: "/admin/dimension",
    element: <DimensionPage />,
  },

  {
    path: "/admin/result",
    element: <ResultAdminPage />,
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
