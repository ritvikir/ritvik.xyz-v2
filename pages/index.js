import Image from "next/image";
import Link from "next/link";
import Navbar from "/components/navbar";
import Status from "/components/status";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic"

const inter = Inter({ subsets: ["latin"] });

const DynamicTravelGlobe = dynamic(() => import("/components/globe"), {
  ssr: false,
})


export default function Home() {
  const isOnline = true;
  return (
    <div className={`max-w-2xl px-4 mx-auto  ${inter.className}`}>
      <Navbar />
      <Status />
      <div className="mt-10 mb-10">
        <h1 className="font-bold text-gray-300">about</h1>

        <p className="mt-2">hey, im ritvik 👋. </p>
        <p className="mt-2">i was born in ohio but now live in san diego, ca</p>
        <p className="mt-2">
          currently im a student at ucla where i help organize la hacks
        </p>
        <p className="mt-2">
          prev. i was involved with human-computer interaction research at ucsd&apos;s prototlab
        </p>
      </div>
      <h1 className="font-bold text-gray-300 mt-5 mb-5">travel log</h1>

      <DynamicTravelGlobe />

      
    </div>
  );
}
