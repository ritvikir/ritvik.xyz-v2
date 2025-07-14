import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="mt-10 font-bold text-gray-300 pt-6 pb-2">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div>
        <h1 className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 text-transparent inline-block bg-clip-text">ritvik.xyz</h1>
        </div>
        
        <div className="w-auto" id="navbar-default">
          <ul className="flex flex-row space-x-4 mt-0 ">
            <li className=" py-1 px-2 hover:bg-gray-100 hover:rounded-lg ">
              <Link href="https://github.com/ritvikir" aria-current="page">
                github
              </Link>
            </li>
            <li className="py-1 px-2 hover:bg-gray-100 hover:rounded-lg">
              <Link href="https://twitter.com/ritvikir" aria-current="page">
                twitter
              </Link>
            </li>
            <li className=" py-1 px-2 hover:bg-gray-100 hover:rounded-lg">
              <Link href="/writing">writing</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
