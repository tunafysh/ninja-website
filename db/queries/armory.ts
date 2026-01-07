import { InsertShuriken, SelectShuriken, armoryTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { db } from "@/db/index"

/**
 * Insert a new shuriken record into the armory table.
 *
 * @param data - The shuriken record to insert; must conform to the `InsertShuriken` schema
 */
export async function createShuriken(data: InsertShuriken) {
    await db.insert(armoryTable).values(data)
}

/**
 * Fetch records from the armory table that match the given shuriken id.
 *
 * @param id - The shuriken id to query
 * @returns An array of matching shuriken records containing: `id`, `last_modified`, `name`, `label`, `synopsis`, `description`, `version`, `authors`, `license`, `repository`, `platforms`, and `checksum`
 */
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

/**
 * Retrieve shuriken records that match the given name.
 *
 * @param name - The shuriken's name to match against the armory table
 * @returns An array of records with fields: `id`, `last_modified`, `name`, `label`, `synopsis`, `description`, `version`, `authors`, `license`, `repository`, `platforms`, and `checksum`
 */
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

/**
 * Fetches armory records that have the specified label.
 *
 * @param label - The label value to match in the armory table.
 * @returns An array of shuriken records matching `label`. Each record contains `id`, `last_modified`, `name`, `label`, `synopsis`, `description`, `version`, `authors`, `license`, `repository`, `platforms`, and `checksum`.
 */
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

/**
 * Fetches armory records that match the given platforms value.
 *
 * @param platforms - The platforms value to match against the `armoryTable.platforms` column.
 * @returns An array of armory records matching `platforms`. Each record contains: `id`, `last_modified`, `name`, `label`, `synopsis`, `description`, `version`, `authors`, `license`, `repository`, `platforms`, and `checksum`.
 */
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

/**
 * Update the armory record for the specified shuriken id with the provided fields.
 *
 * @param id - The shuriken record's id to update
 * @param data - Partial fields to set on the record; must not include `id`
 */
export async function updateShuriken(id: SelectShuriken['id'], data: Partial<Omit<SelectShuriken, 'id'>>) {
  await db.update(armoryTable).set(data).where(eq(armoryTable.id, id));
}

/**
 * Delete a shuriken record from the armory by its id.
 *
 * @param id - The identifier of the shuriken to delete
 */
export async function deleteShuriken(id: SelectShuriken['id']) {
  await db.delete(armoryTable).where(eq(armoryTable.id, id));
}