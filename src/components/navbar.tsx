import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { useLocation } from "react-router-dom";

import styles from "@/styles/navbar.module.css";
import { ThemeSwitch } from "@/components/theme-switch";
import nhlLogo from "@/assets/nhl-logo.png";
// import { NhlLogo } from "@/components/icons";
// import * as React from "react";

export const Navbar = () => {
  const location = useLocation();

  return (
    <HeroUINavbar
      isBordered
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-gray-800",
        ],
      }}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarItem isActive={location.pathname === "/"}>
          <NavbarBrand className="gap-3 max-w-fit">
            <Link
              className={`flex justify-start items-center gap-1 ${styles.linkStyle}`}
              color="foreground"
              href="/"
            >
              {/*<NhlLogo />*/}

              <img
                alt="logo"
                className="w-6 h-6 object-contain"
                src={nhlLogo}
              />

              <p className="font-bold text-inherit">NHL Database</p>
            </Link>
          </NavbarBrand>
        </NavbarItem>
        {/* <NavbarItem
          className="hidden md:flex gap-2"
          isActive={location.pathname === "/leaders"}
        >
          <Link className={styles.linkStyle} color="foreground" href="/leaders">
            <p className="text-inherit">Players</p>
          </Link>
        </NavbarItem> */}
        <NavbarItem
          className="hidden md:flex gap-2"
          isActive={location.pathname === "/players"}
        >
          <Link className={styles.linkStyle} color="foreground" href="/players">
            <p className="text-inherit">Analysis</p>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-2">
          <NavbarItem key="about" isActive={location.pathname === "/about"}>
            <Link
              className={styles.linkStyle}
              color="foreground"
              href={"/about"}
            >
              {"About the project"}
            </Link>
          </NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
        <ThemeSwitch />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem isActive={location.pathname === "/about"}>
            <Link
              className={styles.linkStyle}
              color="foreground"
              href={"/about"}
            >
              {"About the project"}
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem isActive={location.pathname === "/about"}>
            <Link
              className={styles.linkStyle}
              color="foreground"
              href="/leaders"
            >
              <p className="text-inherit">Player Analysis</p>
            </Link>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
