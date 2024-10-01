import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";

export const metadata = {
  title: "Next-Yelp",
  description: "Inspired by yelpcamp, made with nextjs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
