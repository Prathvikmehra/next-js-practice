"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function sellpage() {

    const router = useRouter();
    const [formdata, setformdata] = useState({ title: "", description: "", price: "", category: "", condition: "", image: "", sellerName: "", });

    const [loading, setloading] = useState(false);
    const [message, setMessage] = useState("");

    const handlechange = (e) => {
        setformdata({
            ...formdata, [e.target.name]: e.target.value
        })
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        setMessage("");

        try {
            const response = await fetch("/api/listings", {
                method: "POST",
                headers: {
                    'content-type': "application/json",
                },
                body: JSON.stringify({
                    ...formdata, price: Number(formdata.price)
                })
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "failed to create listings")
            }

            setMessage("listing created successfully")

            setTimeout(() => {
                router.push("/marketplace")
            }, 1000)
        } catch (error) {
            setMessage(error.message)
        } finally {
            setloading(false)
        }

    }

    return (

        <main className="min-h-screen  bg-[#f8faf7] px-6 py-12">
            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm ">
                <h1 className="text-5xl font-bold text-black">Sell an Item </h1>
                <p className="mt-2 text-gray-500">
                    Fill in the details to create your listing.
                </p>

                <form onSubmit={handlesubmit} className="mt-9 space-y-5">
                    <div>
                        <label className="mb-3 block font-medium">Product title </label>
                        <input name="title" value={formdata.title} onChange={handlechange} required className="w-full rounded-lg border p-3 " placeholder="e.g engineering book"/>
                    </div>
                    <div>
                        <label className="mb-2 block font-medium">Description</label>
                        <textarea name="description" value={formdata.description} onChange={handlechange} required rows={4} className="w-full rounded-lg border p-3" placeholder="Describe your item..."/>
                    </div>
                   

                    <div>
                        <label className="mb-2 block font-medium">Price (₹)</label>
                        <input type="number" name="price" value={formdata.price} onChange={handlechange} required min="0" step="0.01" className="w-full rounded-lg border p-3" placeholder="Enter price"/>
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">Category</label>
                        <select name="category" value={formdata.category} onChange={handlechange} required className="w-full rounded-lg border p-3">
                            <option value="">Select category</option>
                            <option value="Books">Books</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Stationery">Stationery</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">Condition</label>
                        <select name="condition"  value={formdata.condition} onChange={handlechange} required className="w-full rounded-lg border p-3">
                            <option value="">Select condition</option>
                            <option value="New">New</option>
                            <option value="old">old</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">Image URL (optional)</label>
                        <input name="image" value={formdata.image}  onChange={handlechange}  className="w-full rounded-lg border p-3"  placeholder="Paste an image URL"/>
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">Seller Name</label>
                        <input name="sellerName" value={formdata.sellerName} onChange={handlechange} required className="w-full rounded-lg border p-3" placeholder="Enter your name"/>
                    </div>

                    {message && (
                        <p className="text-sm text-shadow-green-600">{message}</p>
                    )}

                    <button type="submit" disabled={loading} className="w-full rounded-lg bg-green-400 px-7 py-5 font-semibold text-white hover:bg-green-900 disabled:opacity-50"> 
                        {loading ? "Creating Listing..." : "Create Listing"}
                    </button>
                     
                </form>

            </div>

        </main>
    )

}