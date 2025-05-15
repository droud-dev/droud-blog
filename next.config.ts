import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm'; 
import rehypeExternalLinks from 'rehype-external-links'; 
import rehypeSlug from 'rehype-slug'; 
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePresetMinify from 'rehype-preset-minify'; 

const nextConfig: NextConfig = {
  output: 'export',
  pageExtensions: ['tsx', 'mdx'],
  transpilePackages: ['next-mdx-remote'],
  basePath: process.env.PAGES_BASE_PATH,
  images: { 
    unoptimized: true, // output: export doesn't support optimised images
    path: '/',
  }, 
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      // Add GitHub Flavored Markdown (GFM) support
      remarkGfm,
    ],
    rehypePlugins: [
      // add rel (and target) attributes to external links
      [rehypeExternalLinks, { target: '_blank', rel: 'nofollow' }],
      // Generate heading ids for rehype-autolink-headings
      rehypeSlug,
      // To pass options, use a 2-element array with the
      // configuration in an object in the second element
      [rehypeAutolinkHeadings, { behavior: `wrap` }],
      // Minify HTML & CSS
      rehypePresetMinify,
    ],
  }
});

export default withMDX(nextConfig);