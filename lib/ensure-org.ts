import { prisma } from './prisma'
import { seedOrgDefaults } from './seed-defaults'

/**
 * Ensures an Organization record exists for the given Clerk org ID.
 * Auto-provisions with defaults if the Clerk webhook hasn't fired yet (common in dev).
 */
export async function ensureOrganization(clerkOrgId: string) {
  const existing = await prisma.organization.findFirst({
    where: { clerkOrgId },
  })
  if (existing) return existing

  const org = await prisma.organization.create({
    data: {
      clerkOrgId,
      name: clerkOrgId,
      slug: clerkOrgId,
      subscriptionStatus: 'trial',
      subscriptionTier: 'starter',
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  })

  await seedOrgDefaults(clerkOrgId)
  return org
}
