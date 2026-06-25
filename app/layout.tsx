import React from "react";

export const metadata = {
  title: "Anvay Dating App",
  description: "Meaningful connections, real conversations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: "sans-serif", backgroundColor: "#1c0d0d" }}>
        {children}
      </body>
    </html>
  );
}

