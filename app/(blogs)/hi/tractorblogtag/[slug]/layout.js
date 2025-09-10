import { Inter } from "next/font/google";
import DesktopHeader from "@/src/components/shared/header/DesktopHeader";
import "@/app/globals.css";
import NavComponents from "@/src/features/tyre/NavComponents";
import "@/app/tyreGlobals.css";

export default function RootLayout({ children }) {
  return <>{children}</>;
}
