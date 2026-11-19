
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetails() {
    const { id } = useParams();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(`/api/listings/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch product");
                }

                setListing(data.listing);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchListing();
        }
    }, [id]);

    if (loading) {
        return <p className="p-10 text-center">Loading product...</p>;
    }

    if (error || !listing) {
        return (
            <div className="p-10 text-center">
                <p className="text-red-500">
                    {error || "Product not found"}
                </p>
                <Link href="/marketplace" className="mt-4 inline-block text-green-700">
                    Back to Marketplace
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#f8faf7] px-6 py-12">
            <div className="mx-auto max-w-6xl">

                <Link href="/marketplace" className="mb-8 inline-block text-green-700 hover:underline">
                    ← Back to Marketplace
                </Link>

                <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">

                    <div>
                        {listing.image ? (
                            <img src={listing.image} alt={listing.title} className="h-80 w-full rounded-xl object-cover md:h-[450px]"/>
                        ) : (
                            <div className="flex h-80 items-center justify-center rounded-xl bg-gray-100 text-gray-400 md:h-[450px]">
                                No image available
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center">
                        <p className="text-sm font-medium text-green-700">
                            {listing.category}
                        </p>

                        <h1 className="mt-3 text-3xl font-bold text-gray-900">
                            {listing.title}
                        </h1>

                        <p className="mt-4 text-3xl font-bold text-green-700">
                            ₹{listing.price}
                        </p>

                        <div className="mt-6 space-y-4 border-t border-gray-100 pt-6">
                            <div>
                                <p className="text-sm text-gray-500">Description</p>
                                <p className="mt-1 text-gray-800">
                                    {listing.description}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Condition</p>
                                <p className="mt-1 font-medium text-gray-800">
                                    {listing.condition}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Seller</p>
                                <p className="mt-1 font-medium text-gray-800">
                                    {listing.sellerName}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className="mt-1 font-medium text-gray-800">
                                    {listing.status}
                                </p>
                            </div>
                        </div>

                        <Link href="/marketplace" className="mt-8 rounded-lg bg-green-600 px-6 py-3 text-center font-medium text-white hover:bg-green-700">
                            Continue Shopping
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}
