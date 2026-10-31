import type { Membership, MembershipTier } from "./types";

export function monthlyValue(tier: MembershipTier) {
  return tier.includes.reduce((sum, i) => sum + i.value, 0);
}

export function annualSavings(tier: MembershipTier) {
  return Math.max(0, (monthlyValue(tier) - tier.price) * 12);
}

export function spotsRemaining(m: Membership) {
  return Math.max(0, m.foundingCap - m.foundingClaimed);
}
