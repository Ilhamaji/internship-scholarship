"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Image } from "@heroui/image";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import Cookies from "js-cookie";
import { Skeleton } from "@heroui/skeleton";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userData";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = ["Dashboard", "Laporan Monev", "Riwayat Laporan"];
  const [latestLaporanId, setLatestLaporanId] = useState("");
  const router = useRouter();

  const { userData, loading: loadingUser } = useUser();

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
            <Link color="foreground" href={"/dashboard"}>
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Laporan Monev
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Riwayat Laporan
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <button className="flex my-auto bg-transparent w-fit">
                  {loadingUser ? (
                    <Skeleton className="flex rounded-full w-10 h-10" />
                  ) : (
                    <Avatar src={userData?.avatar} />
                  )}
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">
                  <Link className="w-full h-full" href={"/dashboard/profile"}>
                    Profil
                  </Link>
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    router.push("/logout");
                  }}
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  Keluar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        </NavbarContent>
        <NavbarMenu className="z-50">
          {menuItems.map((item, index) => {
            return (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="w-full"
                  color={"foreground"}
                  href="#"
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            );
          })}
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
