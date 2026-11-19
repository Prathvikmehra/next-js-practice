
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectdb from "../../../../backend/lib/db";
import Listing from "../../../../backend/models/listing";

export async function GET(request, { params }) {
    try {
        await connectdb();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid listing ID" },
                { status: 400 }
            );
        }

        const listing = await Listing.findById(id);

        if (!listing) {
            return NextResponse.json(
                { success: false, message: "Listing not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, listing },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch listing" },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        await connectdb();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid listing ID" },
                { status: 400 }
            );
        }

        const body = await request.json();
        const allowedFields = ["title","description","price","category","condition","image","sellerName","status",];

        const updates = {};

        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                updates[field] = body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return NextResponse.json(
                { success: false, message: "No valid fields provided" },
                { status: 400 }
            );
        }

        const listing = await Listing.findByIdAndUpdate(
            id,
            updates,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!listing) {
            return NextResponse.json(
                { success: false, message: "Listing not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Listing updated successfully",
                listing,
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to update listing" },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectdb();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid listing ID" },
                { status: 400 }
            );
        }

        const listing = await Listing.findByIdAndDelete(id);

        if (!listing) {
            return NextResponse.json(
                { success: false, message: "Listing not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Listing deleted successfully",
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to delete listing" },
            { status: 500 }
        );
    }
}
