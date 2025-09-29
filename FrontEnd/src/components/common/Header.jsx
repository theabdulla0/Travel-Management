import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/features/auth/authThunk";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function Header({ setOpenLogin }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, hasFetchedUser, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tripComponents = [
    { title: "Create Trip", href: "/create-trip" },
    { title: "All Trips", href: "/trips" },
    { title: "Bookings", href: "/bookings" },
    { title: "Expenses", href: "/expenses" },
    { title: "Reports", href: "/reports" },
  ];

  const handleProtectedClick = (path) => {
    if (!user) {
      setOpenLogin(true);
      return;
    }
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMobileOpen(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";
    if (user.name) {
      const names = user.name.split(" ");
      return names.length > 1
        ? `${names[0][0]}${names[1][0]}`.toUpperCase()
        : names[0][0].toUpperCase();
    }
    return user.email?.[0]?.toUpperCase() || "U";
  };

  return (
    <>
      <header className="w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              className="h-8 sm:h-9 lg:h-10 transition-transform duration-300 group-hover:scale-105"
              src="./logo.svg"
              alt="Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center w-full">
            {/* Left Spacer */}
            <div className="flex-1" />

            {/* Centered Menu Items */}
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-1 lg:space-x-2">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={`${navigationMenuTriggerStyle()} font-medium hover:text-blue-600 transition-colors`}
                  >
                    <Link to="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium hover:text-blue-600 transition-colors">
                    Trips
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-1 p-2 w-[220px]">
                      {tripComponents.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <button
                              className="block w-full px-3 py-2.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-left transition-colors font-medium text-sm"
                              onClick={() => handleProtectedClick(item.href)}
                            >
                              {item.title}
                            </button>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={`${navigationMenuTriggerStyle()} font-medium hover:text-blue-600 transition-colors`}
                  >
                    <Link to="/about">About</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={`${navigationMenuTriggerStyle()} font-medium hover:text-blue-600 transition-colors`}
                  >
                    <Link to="/contact">Contact Us</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right: Profile / Sign In */}
            <div className="flex-1 flex justify-end items-center">
              {!hasFetchedUser ? (
                // Loading skeleton while checking auth
                <Skeleton className="h-10 w-24 rounded-lg" />
              ) : user ? (
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="gap-2">
                        <Avatar className="h-8 w-8 border-2 border-blue-500">
                          <AvatarImage
                            src={user.avatar || "https://github.com/shadcn.png"}
                          />
                          <AvatarFallback className="bg-blue-600 text-white font-semibold text-xs">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden lg:inline font-medium">
                          {user.name?.split(" ")[0] || "Account"}
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-1 p-2 w-[180px]">
                          <li className="px-3 py-2 border-b border-gray-100 mb-1">
                            <p className="font-semibold text-sm truncate">
                              {user.name || "User"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <button
                                className="block w-full px-3 py-2.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-left transition-colors font-medium text-sm"
                                onClick={() => navigate("/profile")}
                              >
                                Profile
                              </button>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <button
                                className="block w-full px-3 py-2.5 hover:bg-red-50 hover:text-red-600 rounded-lg text-left transition-colors font-medium text-sm"
                                onClick={handleLogout}
                              >
                                Logout
                              </button>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Button
                  onClick={() => setOpenLogin(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  Sign In
                </Button>
              )}
            </div>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col px-4 py-4 space-y-1">
            {/* User Info for Mobile */}
            {user && (
              <div className="flex items-center gap-3 px-3 py-3 bg-blue-50 rounded-lg mb-3">
                <Avatar className="h-10 w-10 border-2 border-blue-500">
                  <AvatarImage
                    src={user.avatar || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback className="bg-blue-600 text-white font-semibold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-gray-600 truncate">{user.email}</p>
                </div>
              </div>
            )}

            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
            >
              Home
            </Link>

            {/* Trips Section */}
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Trips
            </div>
            {tripComponents.map((item) => (
              <button
                key={item.href}
                onClick={() => handleProtectedClick(item.href)}
                className="text-left px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium w-full"
              >
                {item.title}
              </button>
            ))}

            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
            >
              Contact Us
            </Link>

            {/* Auth Buttons */}
            <div className="pt-3 border-t border-gray-200 mt-2 space-y-2">
              {!hasFetchedUser ? (
                <>
                  <Button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/profile");
                    }}
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold"
                  >
                    Profile
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-red-600 text-red-600 hover:bg-red-50 font-semibold"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                  onClick={() => {
                    setMobileOpen(false);
                    setOpenLogin(true);
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      {/* <div className="sm:h-16" /> */}
    </>
  );
}
