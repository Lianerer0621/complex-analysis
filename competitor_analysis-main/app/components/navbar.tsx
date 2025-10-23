"use client";

import { ChartPie } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Link from "next/link"
import { ModeToggle } from "@/components/modetoggle";

const Navbar = () => {
  return (
      <nav className="fixed w-full top-0 left-0 z-10">
        <div className="backdrop-filter backdrop-blur flex flex-wrap items-center justify-between p-2">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse ml-5 font-semibold"
          >
            <ChartPie />
            <span>Vulse Analytix</span>
          </a>
          <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <ToggleGroup type="single" size="sm" className="mr-20">
                    <ToggleGroupItem value="home" className="mr-5 pr-5 pl-5">
                      <Link href="/">Home</Link>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="web-search" className="mr-5 pr-5 pl-5">
                      <Link href="/web-search">Search Web</Link>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="socials" className="mr-5 pr-5 pl-5">
                      <Link href="/socials">Socials</Link>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center space-x-3 rtl:space-x-reverse ml-5">
              <ModeToggle/>
            </div>
        </div>
      </nav>
  );
};

export default Navbar;