import Link from "next/link";
import { Store, search } from "lucide-react"

export default function Navbar() {
    return (
        <nav className="w-full border-b bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link href="/" className="flex items-center gap-2 text-black hover:text-green-900">
                    <Store className="h-6 w-6 text-green-900" />
                    <span>
                        CampusMart
                    </span>
                </Link>

                <div className="hidden items-center gap-5 md:flex">
                    <Link href="/" className="text-gray-500 hover:text-green-500 ">
                        Home
                    </Link>
                    <Link href="/marketplace" className="text-gray-500 hover:text-green-500 ">
                        MarketPlace
                    </Link>
                    <Link href="/sell" className="text-gray-500 hover:text-green-500 ">
                        Sell an item
                    </Link>
                    <Link href="/dashboard" className="text-gray-500 hover:text-green-500 ">
                        Dashboard
                    </Link>
                </div>

                <button className="rounded-full bg-green-50 p-4 text-green-800" >
                    <search size={19}/>
                </button>

            </div>
       </nav>
    )

}