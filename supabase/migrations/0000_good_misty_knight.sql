CREATE TABLE IF NOT EXISTS "Armory" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"name" text NOT NULL,
	"label" text NOT NULL,
	"synopsis" text NOT NULL,
	"description" text NOT NULL,
	"version" text NOT NULL,
	"authors" text NOT NULL,
	"license" text NOT NULL,
	"repository" text NOT NULL,
	"platforms" text NOT NULL,
	"checksum" text NOT NULL
);
