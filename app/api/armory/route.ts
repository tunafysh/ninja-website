import { createShuriken, getAllShurikens, getShurikenByID, getShurikenByLabel, getShurikenByName, getShurikenByPlatform, updateShuriken, deleteShuriken} from "@/db/queries/armory";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Dispatches an incoming HTTP request to the appropriate shuriken CRUD handler based on the request method.
 *
 * @param req - The incoming NextRequest to route.
 * @returns A NextResponse containing the handler's result; returns a 405 JSON error if the method is not allowed, or a 500 JSON error if an internal error occurs.
 */
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

/**
 * Handle GET requests for shuriken resources based on query parameters.
 *
 * Supports the following query parameters on the request URL: `id`, `name`, `label`, and `platform`.
 * - If `id` or `name` is provided, returns the matching shuriken or a 404 when not found.
 * - If `label` or `platform` is provided, returns a list of matching shurikens.
 * - If no supported query parameter is provided, returns all shurikens.
 *
 * @param req - The incoming NextRequest whose URL search parameters determine the lookup.
 * @returns A NextResponse containing the requested shuriken object, an array of shurikens, or an error JSON.
 *          Returns `200` on successful retrieval,
 *          `404` when a requested resource is not found, and `500` on server error.
 */
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
            if (shuriken.length === 0) {
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
            if (shuriken.length === 0) {
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

        // If no query params, return all shurikens
        const shurikens = await getAllShurikens();
        return NextResponse.json(shurikens);

    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json(
            { error: "Failed to retrieve shuriken" }, 
            { status: 500 }
        );
    }
}

/**
 * Create a new shuriken resource from the request body.
 *
 * Validates that `name` is present in the parsed JSON body and attempts to persist the new shuriken.
 * Handles invalid JSON and returns appropriate error responses.
 *
 * @returns A JSON response:
 * - 200 with an empty body on successful creation.
 * - 400 with `{ error: "Name is required" }` if the `name` field is missing.
 * - 400 with `{ error: "Invalid JSON" }` if the request body is malformed JSON.
 * - 500 with `{ error: "Failed to create shuriken" }` for other failures.
 */
async function handlePost(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 403 }
        );
    }

    try {
        const body = await req.json();
        
        const requiredFields = [
            "name",
            "label",
            "synopsis",
            "description",
            "version",
            "authors",
            "license",
            "repository",
            "platforms",
            "checksum",
        ] as const;

        const missingFields = requiredFields.filter(
            (field) => !body?.[field] || String(body[field]).trim().length === 0
        );

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: "Missing required fields", fields: missingFields },
                { status: 400 }
            );
        }

        const payload = {
            ...body,
            id: body.id ?? crypto.randomUUID(),
            created_at: body.created_at ?? new Date(),
        };

        await createShuriken(payload);
        
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

/**
 * Update a shuriken identified by the `id` query parameter using the request JSON body.
 *
 * @returns A `NextResponse`:
 * - `200` on successful update.
 * - `400` if the `id` query parameter is missing or the request body is invalid JSON.
 * - `404` if no shuriken exists with the given `id`.
 * - `500` for other failures.
 */
async function handlePut(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 403 }
        );
    }

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
        if (existingShuriken.length === 0) {
            return NextResponse.json(
                { error: "Shuriken not found" }, 
                { status: 404 }
            );
        }

        await updateShuriken(id, body);
        
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

/**
 * Deletes a shuriken identified by the `id` query parameter.
 *
 * Returns a JSON response indicating outcome:
 * - 200: deletion succeeded with message "Shuriken deleted successfully".
 * - 400: missing `id` with error "ID parameter is required for deletion".
 * - 404: shuriken not found with error "Shuriken not found".
 * - 500: server error with error "Failed to delete shuriken".
 *
 * @param req - Incoming request; `id` must be present in the URL search params.
 * @returns A NextResponse containing the JSON result and the corresponding HTTP status.
 */
async function handleDelete(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 403 }
        );
    }

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
        if (existingShuriken.length === 0) {
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