// src/components/ProtectedRoute.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/Auth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading, session } = useAuth();

  if (loading) return null; // or a spinner
  if (!session) return <Navigate to="/auth/login" replace />;

  return <>{children}</>;
}
