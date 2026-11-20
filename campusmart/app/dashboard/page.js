"use client"

import { useEffect, useState } from "react"
import Link from "next/link";

export default function Dashboard() {

    const [loading, setloading] = useState(true);
    const [listings, setlistings] = useState([]);
    const [error, seterror] = useState("");

    const fetchlistings = async () => {
        try {
            const response = await fetch("/api/listings");
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "failed to retrieve the listings");
            }
            setlistings(data.listings || []);

        } catch (error) {
            seterror(error.message);
        } finally {
            setloading(false);
        }
    }

    const handledelete = async (id) => {
        const confirmdelete = window.confirm(
            "Are you sure you want to delete this listing?"
        );

        if (!confirmdelete) return;

        try {
            const response = await fetch(`/api/listings/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to delete listing");
            }

            setlistings((prev) =>
                prev.filter((item) => item._id !== id)
            );

        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchlistings();
    }, []);

    const totallistings = listings.length;
    const available = listings.filter((item) => item.status == "Available").length;

    const sold = listings.filter((item) => item.status == "Sold").length;

    if (loading) {
        return <p className="p-10 text-center" >loading Dashboard...</p>;
    }

    if (error) {
        return <p className="p-10 text-center text-red-700" >{error}</p>
    }


    return (

        <main className="min-h-screen bg-[#f8faf7] px-6 py-12" >
            <div className="mx-auto max-w-7xl">
                <div className="mb-10">
                    <h1 className="text-black text-4xl  font-bold">
                        Seller Dashboard
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Manage your CampusMart listings.
                    </p>

                </div>

                <div className="mb-10 grid gap-6 sm:grid-cols-2 lg-grid-cols-3">
                    <div className="rounde-xl bg-white p-6 shadow-sm " >
                        <p className="text-sm text-gray-500">Total Listings</p>
                        <h2 className="mt-2 text-3xl font-bold text-black">{totallistings}</h2>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">Available Listings</p>
                        <h2 className="mt-2 text-3xl font-bold text-green-600">{available}</h2>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">Sold Listings</p>
                        <h2 className="mt-2 text-3xl font-bold text-blue-600">{sold}</h2>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
                    <div className="mb-10  p-6">
                        <h2 className="text-xl font-semibold text-black">Your Listings</h2>
                    </div>
                </div>

                {listings.length == 0 ? (
                    <div className="p-10 text-center">
                        <p className="text-white ">You havent listed anything</p>
                    </div>
                ) : (
                        <div className="overflow-x-auto mt-10 ">
                            <table className="w-full text-left">
                                <thead className="bg-white text-sm text-black">
                                    <tr>
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">

                                    {listings.map((item) => (
                                        <tr key={item._id}>
                                            <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>

                                            <td className="px-6 py-4">{item.price}</td>

                                            <td className="px-6 py-4">{item.category}</td>

                                            <td className="px-6 py-4">
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                    {item.status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Link href={`/dashboard/edit/${item._id}`} className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200" >Edit</Link>
                                                    <button type="button" onClick={() => handledelete(item._id)} className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200" >Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>
                        </div>
                )}

            </div>
        </main>
    )

}