"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "hsl(142, 76%, 36%)", // Vibrant green
          "--success-text": "white",
          "--error-bg": "hsl(0, 72%, 50%)", // Bright red
          "--error-text": "white",
          "--info-bg": "hsl(217, 91%, 60%)", // Vibrant blue
          "--info-text": "white",
          "--shadow": "0px 10px 30px rgba(0, 0, 0, 0.15)", // Smooth shadow
          "--border-radius": "12px",
        } as React.CSSProperties
      }
      toastOptions={{
        duration: 4000, // Keeps toasts visible for 4 seconds
        // position: "top-right", // Removed as it is not a valid property
      }}
      {...props}
    />
  );
};

export { Toaster };
