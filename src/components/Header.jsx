import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "@/redux/slices/jobsSlice";
import { logout } from "@/redux/slices/authSlice";
import { useDebounce } from "../hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { BriefcaseIcon, HeartIcon, Search, UserCircle, Menu, BookmarkIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleDesktopSearch = (value) => {
    setSearchInput(value);
    if (debouncedSearch !== value) {
      dispatch(setSearchTerm(debouncedSearch));
      queryClient.invalidateQueries(["jobs"]);
    }
  };

  const handleMobileSearch = () => {
    dispatch(setSearchTerm(searchInput));
    queryClient.invalidateQueries(["jobs"]);
  };

  const NavButton = ({ to, icon: Icon, children }) => (
    <Link to={to}>
      <Button
        variant={location.pathname === to ? "default" : "ghost"}
        className="flex items-center gap-2"
      >
        <Icon className="h-4 w-4 text-white" />
        {children}
      </Button>
    </Link>
  );

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 mb-4">
          <div className="relative w-full">
            <div 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/50 cursor-pointer"
              onClick={handleMobileSearch}
            >
              <Search className="h-5 w-5" />
            </div>
            <Input
              type="search"
              placeholder="Search jobs, companies..."
              className="w-full pl-12 pr-4 h-12 text-base bg-background/95 border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleMobileSearch()}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {isAuthenticated ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b">
                <UserCircle className="h-10 w-10 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              {[
                { to: "/", icon: BriefcaseIcon, text: "Jobs" },
                { to: "/favorites", icon: HeartIcon, text: "Favorites" },
                { to: "/saved-jobs", icon: BookmarkIcon, text: "Saved Jobs" }
              ].map(({ to, icon: Icon, text }) => (
                <Link key={to} to={to} className="block">
                  <Button
                    variant={location.pathname === to ? "default" : "ghost"}
                    className="w-full justify-start text-white"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {text}
                  </Button>
                </Link>
              ))}
              <Button variant="destructive" className="w-full" onClick={() => dispatch(logout())}>
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login" className="block">
              <Button className="w-full">Sign In</Button>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <BriefcaseIcon className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              RemoteJobs
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/50">
                <Search className="h-5 w-5" />
              </div>
              <Input
                type="search"
                placeholder="Search jobs, companies..."
                className="w-full pl-12 pr-4 h-12 text-base bg-background/95 border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                value={searchInput}
                onChange={(e) => handleDesktopSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <NavButton to="/" icon={BriefcaseIcon}>Jobs</NavButton>
                <NavButton to="/favorites" icon={HeartIcon}>Favorites</NavButton>
                <NavButton to="/saved-jobs" icon={BookmarkIcon}>Saved Jobs</NavButton>
                <div className="flex items-center gap-3 ml-4 border-l pl-4">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <UserCircle className="h-8 w-8 text-primary" />
                  <Button onClick={() => dispatch(logout())} variant="destructive" size="sm">
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/login">
                <Button className="font-medium">Sign In</Button>
              </Link>
            )}
          </div>

          <MobileNav />
        </nav>
      </div>
    </header>
  );
}

export default Header;
