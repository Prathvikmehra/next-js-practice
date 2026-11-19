import { NextResponse } from "next/server";
import connectdb from "../../../backend/lib/db";
import Listing from "../../../backend/models/listing"


export async function GET() {
    try {
        await connectdb();
        const listings = await Listing.find().sort({
            createdAt:-1,
        })

        return NextResponse.json(
            {
                success: true,
                count: listings.length,
                listings,
            }, 
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "failed to fetch listings",
                
            },
            {status:500}
        )
    }
}


export async function POST(request) {
    try {
        await connectdb();
        const body = await request.json();
        const { title, description, price, category, condition, image, sellerName } = body;

        if (!title || !description || price===undefined || !category || !condition || !image || !sellerName) {
            return NextResponse.json(
                {
                success: false,
                message: "please provide all the details",
                },
                { status: 400 }
            )  
        }
                if(typeof price != "number" || !Number.isFinite(price) || price < 0) {
                    return NextResponse.json(
                        {
                            success: false,
                            message:"Price must be a valid non-negative number"
                        },
                        {status:400}
                    )
            }
            
        const newlistings = await Listing.create({
            title, description, price, category, condition, image, sellerName
        })

        return NextResponse.json(
            {
                success: true,
                message: "listing creted successfully",
                listing : newlistings
            },
            {status:201}
        )

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to create listing",
            },
            { status: 500 }
        );
    }
}
