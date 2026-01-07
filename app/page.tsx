import { redirect } from 'next/navigation'
import DevHome from "@/components/home";

/**
 * Server component that redirects to the project's GitHub when running in production, and renders the development home UI otherwise.
 *
 * @returns A React element rendering `DevHome` when `NODE_ENV` is not `production`; in `production` the request is redirected to `https://github.com/tunafysh/ninja`.
 */
export default function Home() {
  if (process.env.NODE_ENV === 'production') {
    // Set PROD_REDIRECT in your environment to change this URL
    redirect('https://github.com/tunafysh/ninja')
  }

  return <DevHome />
}