import { redirect } from 'next/navigation'
import DevHome from "@/components/home";

// Server component: redirect in production, render client child in development
export default function Home() {
  if (process.env.NODE_ENV === 'production') {
    // Set PROD_REDIRECT in your environment to change this URL
    redirect('https://github.com/tunafysh/ninja')
  }

  return <DevHome />
}
