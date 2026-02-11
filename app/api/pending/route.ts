import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import type { Session } from "next-auth"
import { authOptions } from "@/lib/auth"
import { approvePendingShuriken, createPendingShuriken, deletePendingShuriken, getPendingShurikenById, getPendingShurikens } from "@/db/queries/pending"

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
] as const

function isAdmin(session: Session | null) {
  return session?.user?.role === "admin"
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const pending = await getPendingShurikens()
  return NextResponse.json(pending)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const missingFields = requiredFields.filter(
      (field) => !body?.[field] || String(body[field]).trim().length === 0
    )

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", fields: missingFields },
        { status: 400 }
      )
    }

    await createPendingShuriken({
      id: body.id ?? crypto.randomUUID(),
      submitted_at: new Date(),
      name: body.name,
      label: body.label,
      synopsis: body.synopsis,
      description: body.description,
      version: body.version,
      authors: body.authors,
      license: body.license,
      repository: body.repository,
      platforms: body.platforms,
      checksum: body.checksum,
      submitted_by: session.user.email ?? null,
    })

    return NextResponse.json({ status: "pending" }, { status: 200 })
  } catch (error) {
    console.error("PENDING POST Error:", error)
    return NextResponse.json({ error: "Failed to submit shuriken" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "ID parameter is required" }, { status: 400 })
  }

  const record = await getPendingShurikenById(id)
  if (record.length === 0) {
    return NextResponse.json({ error: "Shuriken not found" }, { status: 404 })
  }

  await approvePendingShuriken(id)
  return NextResponse.json({ status: "approved" }, { status: 200 })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "ID parameter is required" }, { status: 400 })
  }

  const record = await getPendingShurikenById(id)
  if (record.length === 0) {
    return NextResponse.json({ error: "Shuriken not found" }, { status: 404 })
  }

  await deletePendingShuriken(id)
  return NextResponse.json({ status: "rejected" }, { status: 200 })
}
