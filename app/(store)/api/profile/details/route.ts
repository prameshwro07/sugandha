
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/User";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json(
                { user: null },
                { status: 200 }
            );
        }

        await connectToDatabase();

        const user = await User.findOne({
            email: session.user.email,
        }).lean();

        if (!user) {
            return NextResponse.json({
                user: {
                    name: session.user.name ?? "",
                    email: session.user.email ?? "",
                    phone: "",
                    address: "",
                },
            });
        }

        return NextResponse.json({
            user: {
                name: user.name ?? session.user.name ?? "",
                email: user.email ?? session.user.email ?? "",
                phone: user.phone ?? "",
                address: user.address ?? "",
            },
        });
    } catch (error) {
        console.error("GET_PROFILE_DETAILS_ERROR:", error);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        if (!session.user.googleId) {
            return NextResponse.json(
                {
                    error: "Google account ID is missing. Please sign out and sign in again.",
                },
                { status: 400 }
            );
        }

        const body = await request.json();

        const phone = body.phone?.trim();
        const address = body.address?.trim();

        if (!phone) {
            return NextResponse.json(
                { error: "Phone number is required" },
                { status: 400 }
            );
        }

        if (!address) {
            return NextResponse.json(
                { error: "Address is required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const user = await User.findOneAndUpdate(
            { email: session.user.email },
            {
                $set: {
                    googleId: session.user.googleId,
                    name: session.user.name ?? "",
                    email: session.user.email,
                    image: session.user.image ?? "",
                    phone,
                    address,
                },
            },
            {
                returnDocument: "after",
                upsert: true,
                setDefaultsOnInsert: true,
            }
        );

        return NextResponse.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
        });
    } catch (error) {
        console.error("PROFILE_DETAILS_ERROR:", error);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}