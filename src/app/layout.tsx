import type { Metadata } from "next";
import { ReviewProvider } from "@/context/ReviewContext";
import { ToastProvider } from "@/components/ui/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reactions and Reviews - Premium Video Reviews",
  description: "Watch in-depth video reactions and honest reviews of movies, tech, games, music, and products. Real opinions from real people.",
  keywords: ["video reviews", "product reviews", "movie reviews", "tech reviews", "gaming reviews", "music reviews", "reactions"],
  authors: [{ name: "Reactions and Reviews" }],
  openGraph: {
    title: "Reactions and Reviews - Premium Video Reviews",
    description: "Watch in-depth video reactions and honest reviews",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <AuthProvider>
            <ReviewProvider>
              {children}
            </ReviewProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html >
  );
}
