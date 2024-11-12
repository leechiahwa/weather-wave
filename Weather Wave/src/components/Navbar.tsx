import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Cloud as CloudIcon,
  Map as MapIcon,
  Moon as MoonIcon,
  UsersRound as UsersRoundIcon,
  Menu as MenuIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = () => (
    <>
      <Link to="/forecast">
        <Button variant="ghost" className="flex items-center gap-2">
          <MapIcon className="h-4 w-4" />
          <span>Forecast</span>
        </Button>
      </Link>
      <Link to="/celestial-event">
        <Button variant="ghost" className="flex items-center gap-2">
          <MoonIcon className="h-4 w-4" />
          <span>Celestial Event</span>
        </Button>
      </Link>
      <Link to="/about">
        <Button variant="ghost" className="flex items-center gap-2">
          <UsersRoundIcon className="h-4 w-4" />
          <span>About</span>
        </Button>
      </Link>
      <ModeToggle />
    </>
  );

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <CloudIcon className="h-6 w-6 text-blue-500" />
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Weather Wave
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="ml-auto hidden md:flex items-center space-x-2">
          <NavItems />
        </div>

        {/* Mobile Navigation */}
        <div className="ml-auto md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[240px]">
              <div className="flex flex-col space-y-4 mt-4">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center space-x-2 mb-6">
                    <CloudIcon className="h-6 w-6 text-blue-500" />
                    <span className="text-xl font-bold">Weather Wave</span>
                  </div>
                </Link>
                <div className="flex flex-col space-y-2">
                  <Link to="/forecast" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      <MapIcon className="h-4 w-4" />
                      <span>Forecast</span>
                    </Button>
                  </Link>
                  <Link to="/celestial-event" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      <MoonIcon className="h-4 w-4" />
                      <span>Celestial Event</span>
                    </Button>
                  </Link>
                  <Link to="/about" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      <UsersRoundIcon className="h-4 w-4" />
                      <span>About</span>
                    </Button>
                  </Link>
                  <div className="pt-4 mt-4 border-t flex justify-center">
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
