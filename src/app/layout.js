import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: {
    default: "$JAY Protocol | Next-Gen Asset Exchange",
    template: "%s | $JAY Protocol",
  },
  description: "Experience the brutal efficiency of $JAY. A high-performance, Neo-Brutalist dApp for instant ETH to $JAY swaps. Secure, decentralized, and built for the future.",
  keywords: ["$JAY", "Token", "Web3", "dApp", "Crypto", "Ethereum", "Sepolia", "Neo-Brutalist", "DeFi", "Smart Contract"],
  icons: {
    icon: [
      { url: "/assets/logo-token.png" },
      { url: "/assets/logo-token.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/assets/logo-token.png" },
    ],
  },

  openGraph: {
    title: "$JAY Protocol | Neo-Brutalist Digital Asset dApp",
    description: "Instant ETH to $JAY swaps with zero friction. Built with secure vendor contracts on the Ethereum network.",
    url: "https://jay-dapps.vercel.app", 
    siteName: "$JAY Protocol",
    images: [
      {
        url: "/assets/home-page.png", 
        width: 1200,
        height: 630,
        alt: "$JAY Protocol Interface",
      },
    ],
    locale: "en_US", 
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "$JAY Protocol | Decentralized Exchange",
    description: "Swap assets instantly. No fluff, just brutal performance.",
    images: ["/assets/home-page.png"], 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="text-black antialiased selection:bg-brand-yellow selection:text-black">
        {children}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              fontFamily: "monospace", 
              fontWeight: "900", 
              border: "4px solid black",
              borderRadius: "0px",
              boxShadow: "6px 6px 0px black",
              padding: "16px",
              backgroundColor: "white",
              color: "black",
              textTransform: "uppercase",
            },
          }}
        />
      </body>
    </html>
  );
}