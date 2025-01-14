CREATE TABLE IF NOT EXISTS "course_files_summary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"course_id" uuid NOT NULL,
	"file_id" uuid NOT NULL,
	"semester" text NOT NULL,
	"file_summary" json NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_files_summary" ADD CONSTRAINT "course_files_summary_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_files_summary" ADD CONSTRAINT "course_files_summary_file_id_course_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."course_files"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "course_files_summary.clerk_user_id_index" ON "course_files_summary" USING btree ("clerk_user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "course_files_summary.course_id_index" ON "course_files_summary" USING btree ("course_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "course_files_summary.file_id_index" ON "course_files_summary" USING btree ("file_id");