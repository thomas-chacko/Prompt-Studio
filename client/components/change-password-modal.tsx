"use client";

import { useState } from "react";
import { useUser } from "@/hooks";
import { useToast } from "@/components/toast";
import { X, Lock, Eye, EyeOff } from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const { updatePassword, isLoading } = useUser();
  const toast = useToast();

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.current_password) {
      errors.current_password = "Current password is required";
    }

    if (!formData.new_password) {
      errors.new_password = "New password is required";
    } else if (formData.new_password.length < 8) {
      errors.new_password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.new_password)) {
      errors.new_password = "Password must contain at least one letter and one number";
    }

    if (!formData.confirm_password) {
      errors.confirm_password = "Please confirm your password";
    } else if (formData.new_password !== formData.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    if (!validateForm()) return;

    try {
      await updatePassword({
        current_password: formData.current_password,
        new_password: formData.new_password,
      });
      toast.success("Password updated successfully");
      setFormData({ current_password: "", new_password: "", confirm_password: "" });
      onClose();
    } catch (error) {
      // Error already handled by hook
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0c0917] border border-white/10 rounded-2xl p-8 max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label
              htmlFor="current_password"
              className="block text-sm font-medium text-gray-300 mb-2 cursor-pointer"
            >
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type={showPasswords.current ? "text" : "password"}
                id="current_password"
                value={formData.current_password}
                onChange={(e) => {
                  setFormData({ ...formData, current_password: e.target.value });
                  setFieldErrors((prev) => ({ ...prev, current_password: "" }));
                }}
                className={`w-full bg-black/40 border rounded-xl pl-12 pr-12 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                  fieldErrors.current_password
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                }`}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords({ ...showPasswords, current: !showPasswords.current })
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPasswords.current ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {fieldErrors.current_password && (
              <p className="mt-1.5 text-xs text-red-400">{fieldErrors.current_password}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="new_password"
              className="block text-sm font-medium text-gray-300 mb-2 cursor-pointer"
            >
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type={showPasswords.new ? "text" : "password"}
                id="new_password"
                value={formData.new_password}
                onChange={(e) => {
                  setFormData({ ...formData, new_password: e.target.value });
                  setFieldErrors((prev) => ({ ...prev, new_password: "" }));
                }}
                className={`w-full bg-black/40 border rounded-xl pl-12 pr-12 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                  fieldErrors.new_password
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                }`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords({ ...showPasswords, new: !showPasswords.new })
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPasswords.new ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {fieldErrors.new_password && (
              <p className="mt-1.5 text-xs text-red-400">{fieldErrors.new_password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-300 mb-2 cursor-pointer"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type={showPasswords.confirm ? "text" : "password"}
                id="confirm_password"
                value={formData.confirm_password}
                onChange={(e) => {
                  setFormData({ ...formData, confirm_password: e.target.value });
                  setFieldErrors((prev) => ({ ...prev, confirm_password: "" }));
                }}
                className={`w-full bg-black/40 border rounded-xl pl-12 pr-12 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                  fieldErrors.confirm_password
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                }`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {fieldErrors.confirm_password && (
              <p className="mt-1.5 text-xs text-red-400">{fieldErrors.confirm_password}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
