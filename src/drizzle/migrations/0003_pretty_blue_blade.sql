CREATE TYPE "public"."file_status" AS ENUM('Private', 'Public');--> statement-breakpoint
CREATE TYPE "public"."file_type" AS ENUM('Syllabus', 'LectureSlides', 'TextBook', 'Notes', 'AssignmentQ', 'AssignmentS', '');--> statement-breakpoint
ALTER TABLE "course_files" ADD COLUMN "semester" text NOT NULL;--> statement-breakpoint
ALTER TABLE "course_files" ADD COLUMN "status" "file_status" DEFAULT 'Private' NOT NULL;--> statement-breakpoint
ALTER TABLE "course_files" ADD COLUMN "type" "file_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "semester" text NOT NULL;