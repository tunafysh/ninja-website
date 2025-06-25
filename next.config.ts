import type { NextConfig } from "next"; 
import { createMDX } from "fumadocs-mdx/next"

const withMDX = createMDX()

const nextConfig: NextConfig = {
  /* config options here */  
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default withMDX(nextConfig);
