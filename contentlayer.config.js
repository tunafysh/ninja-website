import { defineDocumentType, makeSource } from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkBlockQuoteAlerts from "remark-blockquote-alerts"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { transformerCopyButton } from "@rehype-pretty/transformers"

const computedFields = {
    slug: {
        type: 'string',
        resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    slugAsParams: {
        type: 'string',
        resolve: (post) => post._raw.flattenedPath.split('/').slice(1).join('/'),
    }
}

export const Doc = defineDocumentType(() => ({
    name: 'Doc',
    filePathPattern: `**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string' },
    },
    computedFields,
}))

export default makeSource({
    contentDirPath: 'docs',
    documentTypes: [Doc],
    mdx: {
        remarkPlugins: [remarkGfm, remarkBlockQuoteAlerts],
        rehypePlugins: [
            rehypeSlug, // Must come before rehypeAutolinkHeadings
            [
                rehypeAutolinkHeadings, 
                {
                    properties: {
                        className: ['subheading-anchor'],
                        ariaLabel: 'Link to section',
                    }   
                }
            ],
            [
                rehypePrettyCode, 
                {
                    theme: "one-dark-pro",
                    keepBackground: true, // Add this to prevent theme conflicts
                    transformers: [
                        transformerCopyButton()
                    ],
                    onVisitLine(node) {
                        // Prevent lines from collapsing in `display: grid` mode, and allow empty
                        // lines to be copy/pasted
                        if (node.children.length === 0) {
                            node.children = [{
                                type: 'text',
                                value: ' ',
                            }]
                        }
                    },
                    onVisitHighlightedLine(node) {
                        node.properties.className.push('line--highlighted')
                    },
                    onVisitHighlightedWord(node) {
                        node.properties.className = ['word--highlighted']
                    }
                }
            ]
        ]
    }
})