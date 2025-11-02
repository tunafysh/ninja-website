import { text, uuid, timestamp, pgTable } from "drizzle-orm/pg-core"

export const armoryTable = pgTable("Armory", {
    id: uuid('id').primaryKey(),
    last_modified: timestamp('last_modified'),
    name: text('name').notNull(),
    label: text('label').notNull(),
    synopsis: text('synopsis').notNull(),
    description: text('description').notNull(),
    version: text('version').notNull(),
    authors: text('authors').notNull(),
    license: text('license').notNull(),
    repository: text('repository').notNull(),
    platforms: text('platforms').notNull(),
    checksum: text('checksum').notNull(),

})

export type InsertShuriken = typeof armoryTable.$inferInsert;
export type SelectShuriken = typeof armoryTable.$inferSelect;