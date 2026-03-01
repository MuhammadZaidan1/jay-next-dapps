import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "$JAY Swap | Digital Asset dApp",
  description: "Neo-Brutalist single asset dApp experience for $JAY Token. Swap ETH to $JAY instantly via our secure vendor contract.",
  keywords: ["$JAY", "Token", "Web3", "dApp", "Crypto", "Ethereum", "Sepolia", "Neo-Brutalist", "React", "Next.js"],
  openGraph: {
    title: "$JAY Swap | Digital Asset dApp",
    description: "Join the $JAY ecosystem. Swap assets directly from the vendor contract with zero hidden fees.",
    url: "https://jay-token-swap.vercel.app", 
    siteName: "$JAY Token",
    images: [
      {
        url: "/assets/home-page.png",
        width: 1200,
        height: 630,
        alt: "$JAY Token Cover Image",
      },
    ],
    locale: "en_US", 
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "$JAY Swap | Neo-Brutalist Web3",
    description: "Swap ETH to $JAY instantly. Secure, fast, and brutal.",
    images: ["/assets/cover.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="text-black antialiased">
        {children}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              fontFamily: "var(--font-mono, monospace)", 
              fontWeight: "900", 
              border: "4px solid black",
              borderRadius: "0px",
              boxShadow: "6px 6px 0px black",
              padding: "16px",
            },
          }}
        />
      </body>
    </html>
  );
}