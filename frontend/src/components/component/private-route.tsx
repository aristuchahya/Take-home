import { useAuthStore } from "@/hooks/store/use-auth-store";
import { Navigate, useLocation } from "react-router-dom";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    // Jika tidak ada user, arahkan ke halaman login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("User_Role:", user.role);

  // Jika role adalah ADMIN, hanya izinkan akses ke halaman admin
  if (user.role === "ADMIN" && location.pathname.startsWith("/admin")) {
    return children;
  }

  // Jika role adalah USER, hanya izinkan akses ke halaman non-admin
  if (user.role === "USER" && !location.pathname.startsWith("/admin")) {
    return children;
  }

  // Arahkan ke halaman yang sesuai berdasarkan role pengguna
  if (user.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user.role === "USER") {
    return <Navigate to="/list-baby" replace />;
  }

  // Default redirect jika role tidak diketahui
  return <Navigate to="/" />;
}

export function PublicRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export function AdminRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return user.role === "ADMIN" ? <>{children}</> : <Navigate to="/" />;
}

export function UserRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return user.role === "USER" ? <>{children}</> : <Navigate to="/" />;
}
