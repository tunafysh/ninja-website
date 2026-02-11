import { InsertPendingShuriken, SelectPendingShuriken, armoryTable, pendingShurikenTable } from "@/db/schema"
import { db } from "@/db/index"
import { eq } from "drizzle-orm"

export async function createPendingShuriken(data: InsertPendingShuriken) {
  await db.insert(pendingShurikenTable).values(data)
}

export async function getPendingShurikens(): Promise<SelectPendingShuriken[]> {
  return db.select().from(pendingShurikenTable)
}

export async function getPendingShurikenById(id: SelectPendingShuriken["id"]): Promise<SelectPendingShuriken[]> {
  return db.select().from(pendingShurikenTable).where(eq(pendingShurikenTable.id, id))
}

export async function deletePendingShuriken(id: SelectPendingShuriken["id"]) {
  await db.delete(pendingShurikenTable).where(eq(pendingShurikenTable.id, id))
}

export async function approvePendingShuriken(id: SelectPendingShuriken["id"]) {
  await db.transaction(async (tx) => {
    const pending = await tx.select().from(pendingShurikenTable).where(eq(pendingShurikenTable.id, id))
    if (pending.length === 0) {
      return
    }

    const record = pending[0]
    await tx.insert(armoryTable).values({
      id: record.id,
      created_at: record.submitted_at ?? new Date(),
      name: record.name,
      label: record.label,
      synopsis: record.synopsis,
      description: record.description,
      version: record.version,
      authors: record.authors,
      license: record.license,
      repository: record.repository,
      platforms: record.platforms,
      checksum: record.checksum,
    })

    await tx.delete(pendingShurikenTable).where(eq(pendingShurikenTable.id, id))
  })
}
