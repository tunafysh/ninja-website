import { FC } from "react"
import { allDocs } from "contentlayer/generated"
import { notFound } from "next/navigation"
import { Mdx } from "@/component/mdx"
import { useMDXComponent } from "next-contentlayer/hooks"

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
  return <div><Mdx code={doc.body.code} /></div>
}

export default page