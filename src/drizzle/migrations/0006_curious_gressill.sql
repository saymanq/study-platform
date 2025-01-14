CREATE TABLE IF NOT EXISTS "vector_data" (
	"vector_id" text PRIMARY KEY NOT NULL,
	"vector_text" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
