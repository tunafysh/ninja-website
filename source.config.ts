import { rehypeToc, remarkAdmonition, remarkGfm, remarkHeading } from 'fumadocs-core/mdx-plugins';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { remarkInstall } from "fumadocs-docgen"

export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkInstall, remarkAdmonition, remarkHeading],
    rehypePlugins: [rehypeToc],
  },
});