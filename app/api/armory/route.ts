import { createShuriken, getShurikenByID, getShurikenByLabel, getShurikenByName, getShurikenByPlatform, updateShuriken, deleteShuriken} from "@/db/queries/armory";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
    try {
        switch(req.method) {
            case "GET":
                return await handleGet(req);
            case "POST":
                return await handlePost(req);
            case "PUT":
                return await handlePut(req);
            case "DELETE":
                return await handleDelete(req);
            default:
                return NextResponse.json(
                    { error: "Method not allowed" }, 
                    { status: 405 }
                );
        }
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal server error" }, 
            { status: 500 }
        );
    }
}

async function handleGet(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const label = searchParams.get('label');
    const platform = searchParams.get('platform');

    try {
        // Get by specific ID
        if (id) {
            const shuriken = await getShurikenByID(id);
            if (!shuriken) {
                return NextResponse.json(
                    { error: "Shuriken not found" }, 
                    { status: 404 }
                );
            }
            return NextResponse.json(shuriken);
        }

        // Get by name
        if (name) {
            const shuriken = await getShurikenByName(name);
            if (!shuriken) {
                return NextResponse.json(
                    { error: "Shuriken not found" }, 
                    { status: 404 }
                );
            }
            return NextResponse.json(shuriken);
        }

        // Get by label
        if (label) {
            const shurikens = await getShurikenByLabel(label);
            return NextResponse.json(shurikens);
        }

        // Get by platform
        if (platform) {
            const shurikens = await getShurikenByPlatform(platform);
            return NextResponse.json(shurikens);
        }

        // If no query params, return error (you might want to implement a "get all" function)
        return NextResponse.json(
            { error: "Please provide id, name, label, or platform parameter" }, 
            { status: 400 }
        );

    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json(
            { error: "Failed to retrieve shuriken" }, 
            { status: 500 }
        );
    }
}

async function handlePost(req: NextRequest) {
    try {
        const body = await req.json();
        
        // Validate required fields (adjust based on your schema)
        if (!body.name) {
            return NextResponse.json(
                { error: "Name is required" }, 
                { status: 400 }
            );
        }

        const newShuriken = await createShuriken(body);
        
        return NextResponse.json({}, { status: 200 });

    } catch (error) {
        console.error("POST Error:", error);
        
        // Handle JSON parsing errors
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: "Invalid JSON" }, 
                { status: 400 }
            );
        }
        
        return NextResponse.json(
            { error: "Failed to create shuriken" }, 
            { status: 500 }
        );
    }
}

async function handlePut(req: NextRequest) {
    try {
        const body = await req.json();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: "ID parameter is required for updates" }, 
                { status: 400 }
            );
        }

        // Check if shuriken exists
        const existingShuriken = await getShurikenByID(id);
        if (!existingShuriken) {
            return NextResponse.json(
                { error: "Shuriken not found" }, 
                { status: 404 }
            );
        }

        const updatedShuriken = await updateShuriken(id, body);
        
        return NextResponse.json({},{ status: 200 });

    } catch (error) {
        console.error("PUT Error:", error);
        
        // Handle JSON parsing errors
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: "Invalid JSON" }, 
                { status: 400 }
            );
        }
        
        return NextResponse.json(
            { error: "Failed to update shuriken" }, 
            { status: 500 }
        );
    }
}

async function handleDelete(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: "ID parameter is required for deletion" }, 
                { status: 400 }
            );
        }

        // Check if shuriken exists
        const existingShuriken = await getShurikenByID(id);
        if (!existingShuriken) {
            return NextResponse.json(
                { error: "Shuriken not found" }, 
                { status: 404 }
            );
        }

        await deleteShuriken(id);
        
        return NextResponse.json(
            { message: "Shuriken deleted successfully" }, 
            { status: 200 }
        );

    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json(
            { error: "Failed to delete shuriken" }, 
            { status: 500 }
        );
    }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };