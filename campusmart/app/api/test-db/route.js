
import connectdb from "../../../backend/lib/db.js";
import { NextResponse } from "next/server.js";

export async function GET() {
    try {
        await connectdb();

        return NextResponse.json({
            success: true,
            message: "MongoDB connected successfully!",
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Database connection failed",
            },
            { status: 500 }
        );
    }
}
