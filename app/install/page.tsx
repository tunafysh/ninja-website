import { Suspense } from "react"

import InstallPageView from "@/components/elements/install-page"

export default function InstallPage() {
  return (
    <Suspense fallback={null}>
      <InstallPageView />
    </Suspense>
  )
}