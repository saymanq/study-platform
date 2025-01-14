CREATE TABLE IF NOT EXISTS "course_summary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"course_id" uuid NOT NULL,
	"semester" text NOT NULL,
	"summary" json NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "course_summary_clerk_user_id_unique" UNIQUE("clerk_user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_summary" ADD CONSTRAINT "course_summary_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "course_summary.clerk_user_id_index" ON "course_summary" USING btree ("clerk_user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "course_summary.course_id_index" ON "course_summary" USING btree ("course_id");--> statement-breakpoint
ALTER TABLE "course_files" ADD CONSTRAINT "course_files_clerk_user_id_unique" UNIQUE("clerk_user_id");