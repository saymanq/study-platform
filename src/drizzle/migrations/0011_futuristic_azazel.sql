ALTER TABLE "course_summary" RENAME COLUMN "mdsummary" TO "overall_summary";--> statement-breakpoint
ALTER TABLE "course_files_summary" ADD COLUMN "overall_summary" text NOT NULL;