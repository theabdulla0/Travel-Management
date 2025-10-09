import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
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
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const tripLinks = [
    { title: "Create Trip", href: "/create-trip" },
    { title: "All Trips", href: "/trips" },
    { title: "Bookings", href: "/bookings" },
    { title: "Expenses", href: "/expenses" },
    { title: "Reports", href: "/reports" },
  ];

  const handleLogout = async () => {
    await dispatch(logout());
    setMobileOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            className="h-8 sm:h-9 lg:h-10 transition-transform duration-300 group-hover:scale-105"
            src="/logo.svg"
            alt="Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center w-full">
          <div className="flex-1" />

          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-2">
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                  Trips
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 p-2 w-[220px]">
                    {tripLinks.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.href}
                            className={navigationMenuTriggerStyle()}
                          >
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/contact-us">Contact Us</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Profile / Auth Section */}
          <div className="flex-1 flex justify-end items-center">
            {user ? (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border-2 border-green-600">
                        <AvatarImage
                          src={user?.avatar || "https://github.com/shadcn.png"}
                        />
                      </Avatar>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-1 p-2 w-[180px]">
                        <li>
                          <Link
                            to="/profile"
                            className="block w-full px-3 py-2.5 hover:bg-green-50 hover:text-green-600 rounded-lg text-left font-medium text-sm"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block w-full px-3 py-2.5 hover:bg-red-50 hover:text-red-600 rounded-lg text-left font-medium text-sm"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <div className="flex gap-3">
                <Button asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-700 hover:text-green-600 p-2 rounded-lg hover:bg-gray-100 transition-all"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-4 space-y-1">
          {user && (
            <div className="flex items-center gap-3 px-3 py-3 bg-green-50 rounded-lg mb-3">
              <Avatar className="h-10 w-10 border-2 border-green-600">
                <AvatarImage
                  src={user?.avatar || "https://github.com/shadcn.png"}
                />
              </Avatar>
            </div>
          )}

          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`px-3 py-2.5 rounded-lg font-medium ${
              isActive("/")
                ? "bg-green-50 text-green-600"
                : "hover:bg-green-50 hover:text-green-600"
            }`}
          >
            Home
          </Link>

          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Trips
          </div>

          {tripLinks.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-2.5 rounded-lg font-medium ${
                isActive(item.href)
                  ? "bg-green-50 text-green-600"
                  : "hover:bg-green-50 hover:text-green-600"
              }`}
            >
              {item.title}
            </Link>
          ))}

          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
            className={`px-3 py-2.5 rounded-lg font-medium ${
              isActive("/about")
                ? "bg-green-50 text-green-600"
                : "hover:bg-green-50 hover:text-green-600"
            }`}
          >
            About
          </Link>

          <Link
            to="/contact-us"
            onClick={() => setMobileOpen(false)}
            className={`px-3 py-2.5 rounded-lg font-medium ${
              isActive("/contact-us")
                ? "bg-green-50 text-green-600"
                : "hover:bg-green-50 hover:text-green-600"
            }`}
          >
            Contact Us
          </Link>

          <div className="pt-3 border-t border-gray-200 mt-2 space-y-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full px-3 py-2.5 border border-green-600 text-green-600 hover:bg-green-50 rounded-lg font-semibold text-center"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-3 py-2.5 border border-red-600 text-red-600 hover:bg-red-50 rounded-lg font-semibold text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/login");
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                Sign In
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
