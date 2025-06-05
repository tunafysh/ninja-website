import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  /* config options here */
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [['remark-gfm', {throwOnError: true}]],
    rehypePlugins: [],
    format: 'mdx'
  },
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)
