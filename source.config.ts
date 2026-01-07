import { rehypeToc, remarkDirectiveAdmonition, remarkGfm, remarkHeading } from 'fumadocs-core/mdx-plugins';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { remarkNpm } from "fumadocs-core/mdx-plugins"
import remarkDirective from "remark-directive";
export const docs = defineDocs({
  dir: 'docs'
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkDirective, remarkNpm, remarkDirectiveAdmonition, remarkHeading],
    rehypePlugins: [rehypeToc],
  },
});