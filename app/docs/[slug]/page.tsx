import { FC } from "react"
import { allDocs } from "contentlayer/generated"
import { notFound } from "next/navigation"
import { Mdx } from "@/components/mdx"

interface pageProps {
    params: Promise<{ slug: string }>
}

async function getDocFromGenerated(slug: string) {
    const doc = allDocs.find((doc) => doc.slug.substring(1) === slug)

    if(!doc) notFound()

    return doc
}

const page: FC<pageProps> = async ({params}) => {
    const { slug } = await params
    const doc = await getDocFromGenerated(slug)
  return (
  <div className="flex-row justify-center items-center m-4 mt-30 w-2/5">
    <h1 className="text-3xl font-bold pb-8">{doc.title.charAt(0).toUpperCase() + doc.title.slice(1)}</h1>
    <Mdx code={doc.body.code} />
    </div>
    )
}

export default page