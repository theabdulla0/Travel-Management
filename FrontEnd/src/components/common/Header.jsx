import React, { useState } from "react";
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

export default function Header({ setOpenLogin }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { refreshToken } = useSelector((state) => state.auth);

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
  };

  const handleLogout = () => {
    dispatch(logout(refreshToken));
    navigate("/");
  };

  return (
    <>
      <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-10">
          {/* Logo */}
          <div className="flex items-center">
            <img className="h-8 md:h-10" src="./logo.svg" alt="Logo" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center w-full">
            {/* Left Spacer */}
            <div className="flex-1" />

            {/* Centered Menu Items */}
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-6">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Trips</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 w-[200px]">
                      {tripComponents.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <button
                              className="block px-2 py-1 hover:bg-gray-100 rounded text-left w-full"
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
                    <Link to="/contact">Contact Us</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right: Profile / Sign In */}
            <div className="flex-1 flex justify-end">
              {user ? (
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-2 w-[150px]">
                          <li>
                            <NavigationMenuLink asChild>
                              <button
                                className="block px-2 py-1 hover:bg-gray-100 rounded text-left w-full"
                                onClick={() => navigate("/profile")}
                              >
                                Profile
                              </button>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <button
                                className="block px-2 py-1 hover:bg-gray-100 rounded text-left w-full"
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
                <Button onClick={() => setOpenLogin(true)}>Sign In</Button>
              )}
            </div>
          </nav>

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
                <button
                  key={item.href}
                  onClick={() => {
                    setMobileOpen(false);
                    handleProtectedClick(item.href);
                  }}
                  className="text-left hover:text-gray-900 transition w-full"
                >
                  {item.title}
                </button>
              ))}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="hover:text-gray-900 transition"
                  >
                    Profile
                  </Link>
                  <Button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  className="w-full mt-2"
                  onClick={() => {
                    setMobileOpen(false);
                    setOpenLogin(true);
                  }}
                >
                  Sign In
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
