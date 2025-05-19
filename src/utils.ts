import fs from 'fs'
import path from 'path'

export type Metadata = {
  title: string
  date: string
  summary: string
  image?: string
  alt?: string
  hidden?: string
}

export type Post = {
  metadata: Metadata
  slug: string
  content: string
}

function parseFrontmatter(fileContent: string): Omit<Post, 'slug'> {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match && match[1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock ? frontMatterBlock.trim().split('\n') : []
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: fs.PathLike): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: fs.PathOrFileDescriptor): Omit<Post, 'slug'> {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string): Post[] {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file: string): Post => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

const isPostPublished = (post: Post)=> 
    (!post.metadata.hidden || post.metadata.hidden != "true") && 
    (!post.metadata.date || (new Date(post.metadata.date) <= new Date()));

export function getBlogPosts(page = 1, limit = 10, published = true): Post[] {
  let posts = getMDXData(path.join(process.cwd(), 'src', 'content'))
  
  if (published) posts = posts.filter(isPostPublished);
  
  posts = posts.sort((a, b) => new Date(a.metadata.date) > new Date(b.metadata.date) ? -1 : 1 );
  
  // Disable pagination if we set page to be 0
  if (page > 0) posts = posts.slice((page - 1) * limit, limit);

  return posts;
}

export function formatDate(date: string, includeRelative = false): string {
  if (!date) return '';

  let currentDate = new Date()
  if (!date.includes('T')) date = `${date}T00:00:00`
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}

export const findPost = (slug: string): { post: Post | null, prev: Post | null, next: Post | null} => {
  const posts = getBlogPosts(0,0, process.env.NODE_ENV == 'production');
  const idx = posts.findIndex(p => p.slug == slug);

  if (idx == -1) return { post: null, prev: null, next: null };

  return {
    post: posts[idx],
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < (posts.length - 1) ? posts[idx + 1] : null
  }
}

export const strToTitleCase = (text: string) => text.replace(/[^-\s]+/g, s => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
export const postTitle = (post: { slug: string, metadata: { title?: string }}) => {
  let title = post.metadata.title;

  if (!title) title = post.slug.replaceAll('-', ' ');

  return strToTitleCase(title);
}