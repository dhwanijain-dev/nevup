import { redirect } from 'next/navigation'

export default function Page() {
  // Redirect root to the login page while you work on auth
  redirect('/login')
}
