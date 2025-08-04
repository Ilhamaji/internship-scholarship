"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { Image } from "@heroui/image";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Tentang", "Jenis", "Cara Mendaftar"];
  const menuItemsLink = [
    "#tentang-beasiswa",
    "#jenis-beasiswa",
    "#cara-mendaftar",
  ];

  return (
    <>
      <Navbar
        maxWidth="xl"
        className="lg:h-20 z-50"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarBrand>
            <Image
              src={"/icon/logo.svg"}
              alt="Tsu Logo"
              className="rounded-none w-24 lg:w-32"
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#tentang-beasiswa">
              Tentang
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#jenis-beasiswa">
              Jenis
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#cara-mendaftar">
              Cara Mendaftar
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="warning" href={"/login"} variant="flat">
              Masuk
            </Button>
          </NavbarItem>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        </NavbarContent>
        <NavbarMenu className="z-50">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={"foreground"}
                href={menuItemsLink[index]}
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <div className="sticky w-full h-2 top-16 lg:top-20 sticky-top z-40">
        <div className="flex w-full h-full">
          <div className="bg-[#E8BE00] w-[30%] h-full"></div>
          <div className="bg-[#09697E] w-[70%] h-full"></div>
        </div>
      </div>
    </>
  );
}
