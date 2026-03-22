import { Metadata } from "next";
import AdminRoute from "@/components/admin-route";
import AdminDashboardClient from "./admin-client";

export const metadata: Metadata = {
  title: "Admin Dashboard — Manage Platform | PromptStudio",
  description: "Admin dashboard for managing users, prompts, categories, and monitoring platform activity.",
  robots: "noindex, nofollow",
};

export default function AdminDashboard() {
  return (
    <AdminRoute>
      <AdminDashboardClient />
    </AdminRoute>
  );
}
