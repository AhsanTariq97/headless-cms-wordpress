import { Lexend_Giga, Roboto, Raleway } from "next/font/google";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import BlogHomepage from "./components/BlogHomepage";

const lexendGiga = Lexend_Giga({
  subsets: ["latin"],
  variable: "--font-lexend-giga",
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const raleway = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

export default function Home() {
  return (
    <main
      className={`overflow-x-hidden ${roboto.className} ${raleway.className} ${lexendGiga.className} font-roboto`}
    >
      <Navbar />
      <main className="pb-16 mx-auto lg:max-w-screen-xl md:max-w-screen-md">
        <BlogHomepage />
      </main>
      <Footer />
    </main>
  );
}
