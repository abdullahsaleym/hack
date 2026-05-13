import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "atomcamp Smart LMS — Personalised AI Learning Paths",
  description:
    "atomcamp's Smart Adaptive Learning Management System. Get a personalised AI course recommendation, learning path, and gap analysis — powered by Claude AI. 10,000+ learners trained, 80% job placement.",
  keywords:
    "atomcamp, AI bootcamp, data analytics, Pakistan, machine learning, LMS, learning management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <Header />
        {children}
      </body>
    </html>
  );
}
