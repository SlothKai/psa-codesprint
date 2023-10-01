import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NextUIProvider,
} from "@nextui-org/react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

interface PageConfigProps {
  children: React.ReactNode;
}

const PageConfig: React.FC<PageConfigProps> = ({ children }) => {
  return (
    <div className="h-screen pb-52 ">
      <div className="px-4 max-w-7xl md:px-8 mx-auto flex flex-col gap-5 md:gap-10 divide-y divide-blue-bg">
        {/* <div className="px-4 max-w-4xl md:px-8 lg:px-16 mx-auto flex flex-col gap-5 md:gap-10 divide-y divide-blue-bg"> */}
        {children}
      </div>
    </div>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Navbar className="mb-10" maxWidth="xl">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <span className="font-bold text-inherit mr-2">Human Resources</span>
          <span>// CMS</span>
        </NavbarBrand>

        <NavbarContent justify="end">
          {/* <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem> */}
        </NavbarContent>
      </Navbar>
      <Toaster containerStyle={{ top: "80px" }} />
      <PageConfig>
        <Component {...pageProps} />
      </PageConfig>
    </NextUIProvider>
  );
}
