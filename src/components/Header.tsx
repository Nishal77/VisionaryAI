"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Menu, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export default function Header() {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      setInitialLoading(false);
    }
  }, [status, session]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-blue-500"
                  fill="currentColor"
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="ml-2 text-xl font-bold text-white">
                  Visionary.AI
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[15px] text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {initialLoading && status === "loading" ? (
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              ) : !session ? (
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setShowLoginModal(true)}
                    variant="ghost"
                    className="bg-white text-black hover:text-black hover:bg-gray-300 rounded-full hidden md:flex"
                  >
                    Sign In
                  </Button>

                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-gray-400 hover:text-white rounded-md"
                  >
                    {isMenuOpen ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Menu className="w-6 h-6" />
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => signOut()}
                    variant="ghost"
                    className="hidden md:flex text-black  bg-red-500"
                  >
                    Sign Out
                  </Button>
                  <Link href="/profile">
                    <Avatar className="h-8 w-8 transition-transform duration-200 hover:scale-105">
                      <AvatarImage src={session.user?.image || ""} />
                      <AvatarFallback className="bg-blue-600">
                        {session.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-gray-400 hover:text-white rounded-md"
                  >
                    {isMenuOpen ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Menu className="w-6 h-6" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-t border-gray-800">
              <nav className="flex flex-col py-4 px-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="py-3 text-gray-300 hover:text-white transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {!session && (
                  <div className="flex flex-col space-y-3 pt-4 border-t border-gray-800 mt-4">
                    <Button
                      variant="ghost"
                      className="bg-white text-black hover:bg-gray-100 rounded-full justify-center px-0 hover:bg-transparent"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowLoginModal(true);
                      }}
                    >
                      Sign In
                    </Button>
                  </div>
                )}
                {session && (
                  <Button
                    onClick={() => signOut()}
                    variant="ghost"
                    className="text-black  hover:text-black justify-center px-0 bg-red-500 mt-4"
                  >
                    Sign Out
                  </Button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md bg-black/95 backdrop-blur-md border border-gray-800 text-white">
          <DialogHeader className="flex flex-col items-center space-y-4 pt-8">
            <DialogTitle className="text-2xl font-semibold">
              Visionary.AI
            </DialogTitle>
            <p className="text-gray-400 text-sm">Unleash Your Imagination</p>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-6 py-8">
            <Button
              onClick={handleGoogleLogin}
              className="w-full max-w-sm bg-white hover:bg-gray-100 text-black font-medium 
                       rounded-full py-6 flex items-center justify-center space-x-2"
            >
              <img
                 src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                alt="Google"
                className="w-5 h-5"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg/%3E";
                }}
              />
              <span>Continue with Google</span>
            </Button>
            <p className="text-sm text-gray-400 text-center max-w-sm">
              By creating an account on our website, you are agreeing to our{" "}
              <Link
                href="/privacy"
                className="text-blue-400 hover:text-blue-300"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
