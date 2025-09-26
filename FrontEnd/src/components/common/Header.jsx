"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import AuthModal  from "@/pages/auth/AuthModal";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const tripComponents = [
    { title: "Create Trip", href: "/create-trip" },
    { title: "All Trips", href: "/trips" },
    { title: "Bookings", href: "/bookings" },
    { title: "Expenses", href: "/expenses" },
    { title: "Reports", href: "/reports" },
  ];

  return (
    <>
      <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-10">
          {/* Logo */}
          <div className="flex items-center">
            <img className="h-8 md:h-10" src="./logo.svg" alt="Logo" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Home - no dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Trips Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Trips</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 w-[200px]">
                      {tripComponents.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block px-2 py-1 hover:bg-gray-100 rounded"
                            >
                              {item.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Profile */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/profile">Profile</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* About */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/about">About</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Contact Us */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/contact">Contact Us</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop Sign In Button */}
          <div className="hidden md:block">
            <Button onClick={() => setOpenLogin(true)}>Sign In</Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-md">
            <nav className="flex flex-col px-6 py-4 space-y-3">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="hover:text-gray-900 transition"
              >
                Home
              </Link>
              {tripComponents.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-gray-900 transition"
                >
                  {item.title}
                </Link>
              ))}
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="hover:text-gray-900 transition"
              >
                Profile
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="hover:text-gray-900 transition"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="hover:text-gray-900 transition"
              >
                Contact Us
              </Link>
              <Button
                className="w-full mt-2"
                onClick={() => {
                  setMobileOpen(false);
                  setOpenLogin(true);
                }}
              >
                Sign In
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <AuthModal open={openLogin} setOpen={setOpenLogin} />
    </>
  );
}
