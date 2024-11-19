ALTER TABLE "uber_subscriptions" RENAME TO "user_subscriptions";--> statement-breakpoint
ALTER TABLE "user_subscriptions" DROP CONSTRAINT "uber_subscriptions_clerk_user_id_unique";--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_clerk_user_id_unique" UNIQUE("clerk_user_id");