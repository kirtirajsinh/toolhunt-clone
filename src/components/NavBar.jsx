import Link from "next/link";
import LoginButton from "./LoginButton";
import SocialDiv from "./landingpage/SocialDiv";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Submit", href: "/submit" },
    { label: "Explore", href: "/new" },
  ];

  return (
    <Navbar
      classNames={{
        "max-width": "64rem",
        wrapper: "px-6 lg:px-0",
        toggleIcon: "text-primary-text",
      }}
      onMenuOpenChange={setIsMenuOpen}
      className="py-2 bg-transparent"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand className="flex gap-8">
          <Link className="font-bold text-2xl tracking-wider" href="/">
            Logo
          </Link>
          <div className="hidden md:flex gap-4">
            <NavbarItem>
              <Link href="https://twitter.com/aitoptools" target="_blank">
                <SocialDiv icon="/icons/twitter.svg" text="9k" />
              </Link>
            </NavbarItem>
            {/* <NavbarItem>
              <SocialDiv icon="/icons/plane.svg" text="34k" />
            </NavbarItem> */}
          </div>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex hover:text-primary-hovertext">
          <Link href="/submit">Submit</Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex hover:text-primary-hovertext">
          <Link href="/new">Explore</Link>
        </NavbarItem>
        <NavbarItem>
          <LoginButton />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="pt-8 flex gap-4">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className="w-full text-primary-text text-xl font-medium"
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <div className="flex gap-4 mt-8">
          <NavbarItem>
            <Link href="https://twitter.com/aitoptools" target="_blank">
              <SocialDiv icon="/icons/twitter.svg" text="9k" />
            </Link>
          </NavbarItem>
          {/* <NavbarMenuItem>
            <SocialDiv icon="/icons/plane.svg" text="34k" />
          </NavbarMenuItem> */}
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
