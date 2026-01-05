import { redirect } from 'next/navigation'

export default function ProductsPage() {
  // Redirect to pricing page since they're now unified
  redirect('/pricing')
}
