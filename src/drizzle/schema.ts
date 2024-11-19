import { subscriptionTiers, TierNames } from "@/data/subscriptionTiers";
import { pgTable, text, uuid, integer, timestamp, index, pgEnum } from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at", { withTimezone: true }).notNull().defaultNow()

const updatedAt = timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())

export const Courses = pgTable("courses",{
    id: uuid("id").primaryKey().defaultRandom(),
    clerkUserID: text("clerk_user_id").notNull(),
    c_abbrev: text("c_abbrev").notNull(),
    c_num: integer("c_num").notNull(),
    name: text("name").notNull(),
    createdAt,
}, table => ({
    clerkUserIdIndex: index("products.clerk_user_id_index").on(table.clerkUserID),
}))

export const TierEnum = pgEnum("tier", Object.keys(subscriptionTiers) as [TierNames])

export const UserSubscriptionTable = pgTable("user_subscriptions", {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkUserID: text("clerk_user_id").notNull().unique(),
    stripeSubscriptionItemID: text("stripe_subscription_item_id"),
    stripeSubscriptionID: text("stripe_subscription_id"),
    stripeCustomerID: text("stripe_customer_id"),
    tier: TierEnum("tier").notNull(),
    createdAt,
    updatedAt,
}, table => ({
    clerkUserIdIndex: index("user_subscriptions.clerk_user_id_index").on(table.clerkUserID),
    stripeCustomerIdIndex: index("user_subscriptions.stripe_customer_id_index").on(table.stripeCustomerID),
})
)