"use client"

import { useState, useEffect } from "react"
import Link from "next/link"


export default function MarketPlace() {

    const [listings, setlistings] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState("");


    useEffect(() => {
        const fetchlistings = async () => {
            try {
                const response = await fetch("/api/listings");
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "failed to fetch listings")
                }

                setlistings(data.listings || []);

            } catch (error) {
                seterror(error.message)
            } finally {
                setloading(false);
            }
        }
        fetchlistings();
    }, [])


    if (loading) {
        return <p className="p-10 text-center" > loading listings...</p>
    }

    if (error) {
        return <p className="p-10 text-center text-red-700" > {error}</p>
    }

    return (

        <main className="min-h-screen bg-[#f8faf7] px-6 py-12" >
            <div className="mx-auto max-w-7xl">
                <div>
                    <h1 className="text-6xl font-bold text-black">Explore Marketplace</h1>
                    <p className="mt-2 text-gray-600">
                        Find affordable items from fellow students.
                    </p>
                </div>
                {listings.length == 0 ? (
                    <div className="rounded-xl bg-white p-12 text-center shadow-sm " >
                        <h2 className="text-xl font-semibold text-black" >No listings yet</h2>
                        <p className="mt-2 text-gray-500">
                            Be the first to sell something on CampusMart!
                        </p>
                        <Link href="/sell" className="mt-5 inline-block rounded-lg bg-green-400 px-3 py-4 text-white hover:bg-green-800">
                            Sell an Item
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 ">
                        {listings.map((listing) => (
                            <Link href={`/product/${listing._id}`} key={listing._id} className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                {listing.image ? (
                                    <img src={listing.image} alt={listing.title} className="h-52 w-full object-cover" />
                                ) : (
                                    <div className="flex h-53 items-center justify-center  bg-gray-400 text-black">
                                        No Image Available
                                    </div>
                                )}

                                <div className="p-5">
                                    <p className="text-sm text-green-800 ">
                                        {listing.category}
                                    </p>

                                    <h2 className="mt-2 text-lg font-semibold text-gray-900">
                                        {listing.title}
                                    </h2>

                                    <p className="mt-2 text-xl font-bold text-gray-900">
                                        ₹{listing.price}
                                    </p>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Condition: {listing.condition}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Seller: {listing.sellerName}
                                    </p>

                                </div>
                            </Link>
                        ))}
                    </div>
                )}

            </div>


        </main>


    )

}