import Navbar from "/components/navbar";
import { Inter } from "next/font/google";
import Status from "/components/status";
const inter = Inter({ subsets: ["latin"] });

export default function Writing() {
  return (
    <div className={`max-w-2xl px-4 mx-auto  ${inter.className}`}>
      <Navbar />
      <Status />
      <div className="mt-10 mb-10">
          <p className="mt-2 text-gray-400">🚧 under construction - check back soon</p>
      </div>
    </div>
  );
}