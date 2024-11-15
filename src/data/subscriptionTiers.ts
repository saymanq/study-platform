export type TierNames = keyof typeof subscriptionTiers;

export const subscriptionTiers = {
    Free: {
        name: "Free",
    },
    Basic: {
        name: "Basic",
    },
    Standard: {
        name: "Standard",
    },
    Premium: {
        name: "Premium",
    },
}