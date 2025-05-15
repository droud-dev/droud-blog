import { getBlogPosts } from '@/utils'

export const baseUrl = process.env.PAGES_BASE_PATH || 'http://localhost'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: post.metadata.date,
  }))

  let routes = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}