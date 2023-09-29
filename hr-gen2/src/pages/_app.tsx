import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";

interface PageConfigProps {
  children: React.ReactNode;
}

const PageConfig: React.FC<PageConfigProps> = ({ children }) => {
  return (
    <div className="bg-gray-200 h-screen pb-52 ">
      <div className="px-4 max-w-4xl md:px-8 lg:px-16 mx-auto flex flex-col gap-5 md:gap-10 divide-y divide-blue-bg">
        {children}
      </div>
    </div>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <PageConfig>
        <Component {...pageProps} />
      </PageConfig>
    </NextUIProvider>
  );
}
