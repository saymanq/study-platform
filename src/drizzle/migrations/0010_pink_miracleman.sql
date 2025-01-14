ALTER TABLE "course_files_summary" RENAME COLUMN "file_id" TO "file_r2_name";--> statement-breakpoint
ALTER TABLE "course_files_summary" DROP CONSTRAINT "course_files_summary_file_id_course_files_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "course_files_summary.file_id_index";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_files_summary.unique_file" ON "course_files_summary" USING btree ("clerk_user_id","file_r2_name","semester");