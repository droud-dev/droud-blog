import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm'; 
import rehypeExternalLinks from 'rehype-external-links'; 
import rehypeSlug from 'rehype-slug'; 
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePresetMinify from 'rehype-preset-minify'; 
import remarkToc from 'remark-toc';
import remarkFrontmatter from 'remark-frontmatter';
import a11yEmoji from '@fec/remark-a11y-emoji';
import supersub from 'remark-supersub';
import rehypeHighlight from 'rehype-highlight';
import rehypeGithubEmoji from 'rehype-github-emoji';

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
      // ['remark-gfm',]
      remarkFrontmatter,
      remarkGfm,
      remarkToc,
      a11yEmoji,
      supersub,
    ],
    rehypePlugins: [
      // // TODO: chuck these into the mdx.tsx file
      // // add rel (and target) attributes to external links
      // ['rehype-external-links', { target: '_blank', rel: 'nofollow' }],
      [rehypeExternalLinks, { target: '_blank', rel: 'nofollow' }],
      // // Generate heading ids for rehype-autolink-headings
      rehypeSlug,
      // ['rehype-slug',]
      // // To pass options, use a 2-element array with the
      // // configuration in an object in the second element
      // ['rehype-autolink-headings', { behavior: `wrap` }],
      [rehypeAutolinkHeadings, { behavior: `wrap` }],
      // // Minify HTML & CSS
      // ['rehype-preset-minify',],
      rehypePresetMinify,
      rehypeHighlight,
      rehypeGithubEmoji,
    ],
  }
});

export default withMDX(nextConfig);