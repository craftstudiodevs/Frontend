export type UserAccount = {
    id: number,
    discordId: string,
    username: string,
    email: string,
    buyerAccount: BuyerAccount | null,
    developerAccount: DeveloperAccount | null,
}

export type BuyerAccount = {
    subscriptionType: string,
    remainingCommissions: number,
    totalCommissions: number,
}

export type DeveloperAccount = {
    subscriptionType: string,
    remainingBids: number,
    totalBids: number,
}