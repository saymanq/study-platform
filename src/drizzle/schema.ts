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
    semester: text("semester").notNull(),
    createdAt,
}, table => ({
    clerkUserIdIndex: index("products.clerk_user_id_index").on(table.clerkUserID),
}))

export const TierEnum = pgEnum("tier", Object.keys(subscriptionTiers) as [TierNames])
export const FileStatusEnum = pgEnum("file_status", ["Private", "Public"])
export const FileTypeEnum = pgEnum("file_type", [
    "Syllabus",
    "LectureSlides",
    "TextBook",
    "Notes",
    "AssignmentQ",
    "AssignmentS",
    ""
])

export const UserSubscriptionTable = pgTable("user_subscriptions", {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkUserID: text("clerk_user_id").notNull().unique(),
    email: text("email").notNull(),
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

export const CourseFiles = pgTable("course_files", {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkUserID: text("clerk_user_id").notNull(),
    courseId: uuid("course_id").notNull().references(() => Courses.id),
    fileName: text("file_name").notNull(),
    R2Name: text("r2_name").notNull(),
    semester: text("semester").notNull(),
    status: FileStatusEnum("status").notNull().default("Private"),
    type: FileTypeEnum("type").notNull(),
    createdAt,
    updatedAt
}, table => ({
    clerkUserIdIndex: index("course_files.clerk_user_id_index").on(table.clerkUserID),
    courseIdIndex: index("course_files.course_id_index").on(table.courseId),
}))