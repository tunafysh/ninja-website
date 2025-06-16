import { FC } from "react"
import { allDocs } from "contentlayer/generated"
import { notFound } from "next/navigation"
import { Mdx } from "@/components/mdx"
import { useMDXComponent } from "next-contentlayer/hooks"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ninja Docs",
  description: "Documentation for the Ninja tech stack manager, scripting and the manifest.",
};

interface pageProps {
    params: Promise<{ slug?: string[] }>
}

async function getDocFromGenerated(slug?: string) {
    // Default to "home" if no slug provided
    const targetSlug = slug || "home"
  
    const doc = allDocs.find((doc) => doc.slugAsParams === targetSlug)

    if(!doc) notFound()

    return doc
}

const page: FC<pageProps> = async ({params}) => {
    const { slug } = await params
    // Extract first slug or use undefined for default
    const docSlug = slug?.[0]
    
    const doc = await getDocFromGenerated(docSlug)
    
    return (
        <div className="flex-row justify-center items-center m-4 w-2/5 mt-8">
            <h1 className="text-3xl font-bold pb-8">{doc.title.charAt(0).toUpperCase() + doc.title.slice(1)}</h1>
            <Mdx code={doc.body.code} />
        </div>
    )
}

/**
 * Exports the page component as the default export for the dynamic documentation page.
 * Renders a specific documentation page based on the provided slug parameter.
 */
export default page