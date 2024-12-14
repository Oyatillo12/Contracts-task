import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Fallback from "../components/fallback/Fallback";
import { ProtectAuth, ProtectLayout } from "../components/protect-routes";

const Login = lazy(() => import("../pages/Login"));
const Contracts = lazy(() => import("../pages/Contracts"));

const RouterPages = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<Fallback />}>
            <ProtectAuth>
              <Login />
            </ProtectAuth>
          </Suspense>
        }
      />
      <Route
        path="/"
        element={
          <Suspense fallback={<Fallback />}>
            <ProtectLayout>
              <Contracts />
            </ProtectLayout>
          </Suspense>
        }
      />
    </Routes>
  );
};

export default RouterPages;
