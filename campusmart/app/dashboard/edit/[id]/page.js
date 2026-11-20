"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function editlisting() {
    const { id } = useParams();
    const router = useRouter();

    const [formdata, setformdata] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        condition: "",
        image: "",
        sellerName: "",
        status: "Available",
    });

    const [loading, setloading] = useState(true);
    const [saving, setsaving] = useState(false);
    const [error, seterror] = useState("");

    useEffect(() => {
        const fetchlistings = async () => {
            try {
                const response = await fetch(`/api/listings/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "failed to fetch listings")
                }
                const listing = data.listing;
                setformdata({
                    title: listing.title || "",
                    description: listing.description || "",
                    price: listing.price ?? "",
                    category: listing.category || "",
                    condition: listing.condition || "",
                    image: listing.image || "",
                    sellerName: listing.sellerName || "",
                    status: listing.status || "Available",
                })
            } catch (error) {
                seterror(error.message)
            } finally {
                setloading(false);
            }
        }
        if (id) {
            fetchlistings()
        }
    }, [id])

    const handlechange = (e) => {
        setformdata({...formdata,[e.target.name]:e.target.value})
    }
    
    const handlesubmit = async(e) => {
        e.preventDefault();
        setsaving(true);
        seterror("");

        try {
            const response = await fetch(`/api/listings/${id}`, {
                method:"PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    ...formdata,
                    price:Number(formdata.price)
                })
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update listing");
            }
            router.push("/dashboard")
            router.refresh();

        } catch (error) {
            seterror(error.message);
        } finally {
            setsaving(true)
        }

        if (loading) {
            return <p className="p-10 text-center">Loading listing...</p>;
        }

    }

    return (

        <main className="min-h-screen bg-[#f8faf7] px-6 py-12">
            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
                <Link href="/dashboard" className="text-sm text-green-600 hover:text-blue-500"> ← Back to Dashboard</Link>
                <h1 className="mt-6 text-3xl font-bold text-gray-900">Edit Listing</h1>
                <p className="mt-2 text-gray-500">Update your product information.</p>

                <form onSubmit={handlesubmit} className="mt-9 space-y-5">
                    <div>
                        <label className="mt-3 block font-medium">Product Title</label>
                        <input name="title" value={formdata.title} onChange={handlechange} required className="w-full rounded-lg border p-3"/>
                    </div>
                    <div>
                        <label className="mt-3 block font-medium">Description</label>
                        <textarea name="description" value={formdata.description} onChange={handlechange} required className="w-full rounded-lg border p-3"/>
                    </div>
                    <div>
                        <label className="mt-3 block font-medium">price</label>
                        <input name="price" value={formdata.price} onChange={handlechange} min="0" step="0.01" required className="w-full rounded-lg border p-3"/>
                    </div>
                    <div>
                        <label className="mt-3 block font-medium">category</label>
                        <select name="category" value={formdata.category} onChange={handlechange} required className="w-full rounded-lg border p-3">
                            <option value="Books">Books</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Stationery">Stationery</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">Condition</label>
                        <select name="condition" value={formdata.condition} onChange={handlechange} required className="w-full rounded-lg border p-3" >
                            <option value="New">New</option>
                            <option value="Like New">Like New</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-2 block font-medium">Image URL</label>
                        <input name="image" value={formdata.image} onChange={handlechange} className="w-full rounded-lg border p-3" />
                    </div>
                    <div>
                        <label className="mb-2 block font-medium">Seller Name</label>
                        <input name="sellerName" value={formdata.sellerName} onChange={handlechange} required className="w-full rounded-lg border p-3"/>
                    </div>
                    <div>
                        <label className="mb-2 block font-medium">Listing status</label>
                        <select name="status" value={formdata.status} onChange={handlechange} className="w-full rounded-lg border p-3">
                            <option value="Available">Available</option>
                            <option value="Reserved">Reserved</option>
                            <option value="Sold">Sold</option>
                        </select>
                    </div>

                    {error && (
                        <p className="text-sm text-red-700">{error}</p>
                    )}
                    <button type="submit" disabled={saving} className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50" >
                        {saving ? "Saving Changes..." : "Update Listing"}
                    </button>
                </form>
            </div>
        </main>


    )

}