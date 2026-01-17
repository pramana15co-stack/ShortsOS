# Plan Validation System - Documentation

## ✅ Implementation Complete

A centralized, reusable plan validation system that ensures no unpaid user can access paid functionality.

## 🎯 Single Source of Truth

All plan validation logic is centralized in:
- **`lib/planValidation.ts`** - Core validation functions
- **`lib/useAccess.ts`** - React hook for client-side access
- **`lib/apiAuth.ts`** - Server-side API route helpers
- **`components/UpgradeGate.tsx`** - Reusable UI component

## 📚 Core Functions

### `isUserPaid(user)`

Checks if user has an active paid subscription:
- `subscription_status === 'active'`
- `plan_expiry > current time`
- `subscription_tier !== 'free'`

```typescript
import { isUserPaid } from '@/lib/planValidation'

if (isUserPaid(user)) {
  // User has active paid subscription
}
```

### `getUserTier(user)`

Returns user's subscription tier:
- `'free'` - No active subscription
- `'starter'` - Starter plan
- `'pro'` - Creator Pro plan
- `'agency'` - Agency/Operator plan

```typescript
import { getUserTier } from '@/lib/planValidation'

const tier = getUserTier(user) // 'free' | 'starter' | 'pro' | 'agency'
```

### `canAccessTier(user, requiredTier)`

Checks if user can access a specific tier:

```typescript
import { canAccessTier } from '@/lib/planValidation'

if (canAccessTier(user, 'starter')) {
  // User has starter or higher
}
```

### `getDaysUntilExpiry(user)`

Returns days until plan expires:

```typescript
import { getDaysUntilExpiry } from '@/lib/planValidation'

const days = getDaysUntilExpiry(user) // number | null
```

### `isPlanExpiringSoon(user)`

Checks if plan expires within 7 days:

```typescript
import { isPlanExpiringSoon } from '@/lib/planValidation'

if (isPlanExpiringSoon(user)) {
  // Show renewal reminder
}
```

## 🎨 Client-Side Usage

### Using `useAccess` Hook

```typescript
import { useAccess } from '@/lib/useAccess'

function MyComponent() {
  const { 
    isPaid,           // boolean - has active paid subscription
    canAccess,        // function - check tier access
    tier,             // 'free' | 'starter' | 'pro' | 'agency'
    daysUntilExpiry,  // number | null
    isExpiringSoon,   // boolean
  } = useAccess()

  if (!isPaid) {
    return <UpgradeCTA />
  }

  return <PaidFeature />
}
```

### Using `UpgradeGate` Component

Wrap paid-only content:

```typescript
import UpgradeGate from '@/components/UpgradeGate'

function PaidFeaturePage() {
  return (
    <UpgradeGate requiredTier="starter">
      {/* Content only shown to paid users */}
      <PaidFeatureContent />
    </UpgradeGate>
  )
}
```

**Props:**
- `requiredTier` - Minimum tier required ('starter' | 'pro' | 'agency')
- `fallback` - Custom fallback UI (optional)
- `showUpgradeCTA` - Show default upgrade CTA (default: true)

## 🔒 Server-Side API Protection

### Using `requirePaidUser`

Protect API routes that require paid subscription:

```typescript
import { requirePaidUser } from '@/lib/apiAuth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Check if user is paid
  const { user, error } = await requirePaidUser(request)
  
  if (error) {
    return error // Returns 401 or 403 with error message
  }

  // User is paid - proceed with feature
  return NextResponse.json({ success: true })
}
```

### Using `requireTier`

Protect API routes that require specific tier:

```typescript
import { requireTier } from '@/lib/apiAuth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Require Pro tier or higher
  const { user, error } = await requireTier(request, 'pro')
  
  if (error) {
    return error // Returns 401 or 403 with error message
  }

  // User has Pro tier - proceed
  return NextResponse.json({ success: true })
}
```

### Using `getAuthenticatedUser`

Get user from request (for custom validation):

```typescript
import { getAuthenticatedUser, isUserPaid } from '@/lib/apiAuth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser(request)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  if (!isUserPaid(user)) {
    return NextResponse.json(
      { error: 'Upgrade to unlock this feature' },
      { status: 403 }
    )
  }

  // User is paid - proceed
  return NextResponse.json({ success: true })
}
```

## 📋 Implementation Examples

### Example 1: Protected Page Component

```typescript
'use client'

import UpgradeGate from '@/components/UpgradeGate'

export default function ExportInstructionsPage() {
  return (
    <main>
      <UpgradeGate requiredTier="starter">
        <ExportInstructionsContent />
      </UpgradeGate>
    </main>
  )
}
```

### Example 2: Protected API Route

```typescript
import { requirePaidUser } from '@/lib/apiAuth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { user, error } = await requirePaidUser(request)
  
  if (error) {
    return error
  }

  // Process paid feature
  const result = await processPaidFeature(user.id)
  
  return NextResponse.json({ success: true, result })
}
```

### Example 3: Conditional Feature Access

```typescript
'use client'

import { useAccess } from '@/lib/useAccess'

function FeatureButton() {
  const { canAccess } = useAccess()
  
  if (!canAccess('starter')) {
    return <Link href="/pricing">Upgrade to Unlock</Link>
  }
  
  return <button onClick={handleFeature}>Use Feature</button>
}
```

## 🛡️ Security Features

### Server-Side Validation
- ✅ All API routes validate on server
- ✅ Frontend checks are for UX only
- ✅ Cannot bypass by manipulating client code

### Expiry Checking
- ✅ Plans automatically expire after `plan_expiry`
- ✅ Expired plans treated as 'free'
- ✅ No manual expiry handling needed

### Single Source of Truth
- ✅ All validation uses same functions
- ✅ No duplicate logic
- ✅ Consistent behavior across app

## 📊 Validation Logic

### Plan Status Check

```typescript
function isUserPaid(user) {
  // 1. Check subscription status
  if (user.subscription_status !== 'active') {
    return false
  }

  // 2. Check plan expiry
  if (user.plan_expiry) {
    const expiryDate = new Date(user.plan_expiry)
    const now = new Date()
    if (expiryDate <= now) {
      return false // Expired
    }
  } else {
    return false // No expiry = no active subscription
  }

  // 3. Check tier (must be paid tier)
  const tier = user.subscription_tier
  if (!tier || tier === 'free') {
    return false
  }

  return true
}
```

### Tier Hierarchy

```
free < starter < pro < agency
```

Users with higher tiers can access lower tier features.

## 🧪 Testing

### Test Paid User Access

```typescript
// Mock user with active subscription
const paidUser = {
  id: 'user-123',
  subscription_tier: 'starter',
  subscription_status: 'active',
  plan_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
}

isUserPaid(paidUser) // true
canAccessTier(paidUser, 'starter') // true
canAccessTier(paidUser, 'pro') // false
```

### Test Free User Access

```typescript
// Mock free user
const freeUser = {
  id: 'user-456',
  subscription_tier: 'free',
  subscription_status: 'inactive',
  plan_expiry: null,
}

isUserPaid(freeUser) // false
canAccessTier(freeUser, 'starter') // false
canAccessTier(freeUser, 'free') // true
```

### Test Expired Plan

```typescript
// Mock expired subscription
const expiredUser = {
  id: 'user-789',
  subscription_tier: 'starter',
  subscription_status: 'active',
  plan_expiry: new Date(Date.now() - 1).toISOString(), // Expired
}

isUserPaid(expiredUser) // false (expired)
canAccessTier(expiredUser, 'starter') // false
```

## ✅ Production Checklist

- [x] Centralized validation functions
- [x] Client-side hook (`useAccess`)
- [x] Server-side helpers (`apiAuth`)
- [x] Reusable UI component (`UpgradeGate`)
- [x] Expiry checking
- [x] Tier hierarchy support
- [x] Clean error messages
- [x] No hard crashes
- [x] Single source of truth
- [x] Production-safe

## 🚀 Usage Summary

1. **Client-side pages**: Use `<UpgradeGate>` component
2. **Client-side components**: Use `useAccess()` hook
3. **API routes**: Use `requirePaidUser()` or `requireTier()`
4. **Custom validation**: Use `isUserPaid()` or `canAccessTier()`

All validation is centralized, consistent, and production-ready.
