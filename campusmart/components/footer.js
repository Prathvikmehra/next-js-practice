import Link from "next/link";
import { Store } from "lucide-react"

export default function footer() {
    return (
        <footer className="border-t bg-white" >
            <div className="mx-auto max-w-7xl px-6 md:flex-row" >
                <div className="flex flex-col justify-between gap-6 md:flex-row" >
                    <div> 
                        <Link href="/" className="flex items-center gap-3">
                            <Store className="text-green-800">
                                <span className="text-xl font-bold text-green-900" >
                                    CampusMart
                                </span>
                            </Store>    
                        </Link>
                        <p className="mt-3 max-w-sm text-sm text-gray-500" >
                            A marketplace where students buy, sell and
                            exchange everyday essentials.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3" >
                        <h3 className="text-blue-300" >
                            Quick links 
                        </h3>
                        <Link href="/" className="text-sm text-gray-500 hover:text-green-500 " >
                            Home
                        </Link>
                        <Link href="/" className="text-sm text-gray-500 hover:text-green-500" >
                            marketplace
                        </Link>
                        <Link href="/" className="text-sm text-gray-500 hover:text-green-500" >
                            sell an item 
                        </Link>
                    </div>
                </div>
                <div className="mt-6 border-t pt-5 text-center text-sm text-gray-600" >
                    © {new Date().getFullYear()} CampusMart. All rights reserved.
                </div>
            </div>
        </footer>

    )

}