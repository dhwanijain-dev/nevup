
import React from "react";
import { toast, type ExternalToast } from "sonner";

// Type definitions for different toast variants
type ToastVariant = "default" | "success" | "info" | "warning" | "error";

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  duration?: number;
}

// Wrapper function to maintain similar API to old toast
function showToast({
  title,
  description,
  variant = "default",
  action,
  cancel,
  duration,
}: ToastOptions) {
  const message = title || description || "";
  const content = title && description
    ? React.createElement(
        "div",
        null,
        React.createElement("div", { className: "font-semibold" }, title),
        React.createElement("div", { className: "text-sm" }, description)
      )
    : message;

  const options: ExternalToast = {
    duration,
  };

  // Add action button if provided
  if (action) {
    options.action = {
      label: action.label || "Action",
      onClick: action.onClick,
    };
  }

  // Add cancel button if provided
  if (cancel) {
    options.cancel = {
      label: cancel.label || "Cancel",
      //@ts-ignore
      onClick: cancel.onClick,
    };
  }

  // Call appropriate sonner method based on variant
  switch (variant) {
    case "success":
      return toast.success(content, options);
    case "error":
      return toast.error(content, options);
    case "info":
      return toast.info(content, options);
    case "warning":
      return toast.warning(content, options);
    default:
      return toast(content, options);
  }
}

// Hook to use toast (maintains compatibility with old API)
export function useToast() {
  return {
    toast: showToast,
    dismiss: (toastId?: string | number) => {
      if (toastId) {
        toast.dismiss(toastId);
      } else {
        toast.dismiss();
      }
    },
  };
}

// Export the toast function directly for convenience
export { showToast as toast };