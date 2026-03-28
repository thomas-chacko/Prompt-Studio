"use client";

import { useState, useRef, useEffect } from "react";
import { useUser } from "@/hooks";
import { useToast } from "@/components/toast";
import { X, Upload, User as UserIcon } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  currentUser,
}: EditProfileModalProps) {
  const { updateProfile, uploadAvatar, isLoading } = useUser();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    bio: currentUser?.bio || "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    currentUser?.avatar_url || null
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Update form data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        bio: currentUser.bio || "",
      });
      setAvatarPreview(currentUser.avatar_url || null);
    }
  }, [currentUser]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setAvatarFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    // Validate username
    if (formData.username.trim().length < 3) {
      setFieldErrors({ username: "Username must be at least 3 characters" });
      return;
    }

    if (formData.username.trim().length > 32) {
      setFieldErrors({ username: "Username must be less than 32 characters" });
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setFieldErrors({
        username: "Username can only contain letters, numbers, and underscores",
      });
      return;
    }

    try {
      // Upload avatar first if changed
      if (avatarFile) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            await uploadAvatar(reader.result as string);
            // Only update profile if username or bio changed
            if (formData.username !== currentUser?.username || formData.bio !== currentUser?.bio) {
              await updateProfile(formData);
            }
            toast.success("Profile updated successfully");
            setAvatarFile(null); // Reset avatar file
            onClose();
          } catch (error) {
            // Error already handled by hook
          }
        };
        reader.readAsDataURL(avatarFile);
      } else {
        // Just update profile (no avatar change)
        await updateProfile(formData);
        toast.success("Profile updated successfully");
        onClose();
      }
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

        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan p-1">
                <div className="w-full h-full rounded-full bg-[#0c0917] flex items-center justify-center overflow-hidden">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-12 h-12 text-gray-400" />
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-90 transition-all cursor-pointer"
                aria-label="Upload avatar"
              >
                <Upload className="w-4 h-4 text-white" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <p className="text-xs text-gray-500">
              Click the icon to upload a new avatar (max 5MB)
            </p>
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2 cursor-pointer"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                setFieldErrors((prev) => ({ ...prev, username: "" }));
              }}
              className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                fieldErrors.username
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
              }`}
              placeholder="Enter username"
            />
            {fieldErrors.username && (
              <p className="mt-1.5 text-xs text-red-400">{fieldErrors.username}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-300 mb-2 cursor-pointer"
            >
              Bio
            </label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => {
                setFormData({ ...formData, bio: e.target.value });
              }}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all resize-none"
              rows={3}
              placeholder="Tell us about yourself"
            />
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
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
