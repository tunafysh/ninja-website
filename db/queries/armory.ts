import { InsertShuriken, SelectShuriken, armoryTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { db } from "@/db/index"

export async function createShuriken(data: InsertShuriken) {
    await db.insert(armoryTable).values(data)
}

export async function getShurikenByID(id: SelectShuriken['id']): Promise<
    Array<{
        id: string;
        last_modified: Date | null;
        name: string;
        label: string;
        synopsis: string;
        description: string;
        version: string;
        authors: string;
        license: string;
        repository: string;
        platforms: string;
        checksum: string;
    }>
>
{
    return db.select().from(armoryTable).where(eq(armoryTable.id, id));
}

export async function getShurikenByName(name: SelectShuriken['name']): Promise<
    Array<{
        id: string;
        last_modified: Date | null;
        name: string;
        label: string;
        synopsis: string;
        description: string;
        version: string;
        authors: string;
        license: string;
        repository: string;
        platforms: string;
        checksum: string;
    }>
>
{
    return db.select().from(armoryTable).where(eq(armoryTable.name, name));
}

export async function getShurikenByLabel(label: SelectShuriken['label']): Promise<
    Array<{
        id: string;
        last_modified: Date | null;
        name: string;
        label: string;
        synopsis: string;
        description: string;
        version: string;
        authors: string;
        license: string;
        repository: string;
        platforms: string;
        checksum: string;
    }>
>
{
    return db.select().from(armoryTable).where(eq(armoryTable.label, label));
}

export async function getShurikenByPlatform(platforms: SelectShuriken['platforms']): Promise<
    Array<{
        id: string;
        last_modified: Date | null;
        name: string;
        label: string;
        synopsis: string;
        description: string;
        version: string;
        authors: string;
        license: string;
        repository: string;
        platforms: string;
        checksum: string;
    }>
>
{
    return db.select().from(armoryTable).where(eq(armoryTable.platforms, platforms));
}

export async function updateShuriken(id: SelectShuriken['id'], data: Partial<Omit<SelectShuriken, 'id'>>) {
  await db.update(armoryTable).set(data).where(eq(armoryTable.id, id));
}

export async function deleteShuriken(id: SelectShuriken['id']) {
  await db.delete(armoryTable).where(eq(armoryTable.id, id));
}
