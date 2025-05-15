import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  date: string
  summary: string
  image?: string
  alt?: string
}

function parseFrontmatter(fileContent: string) {
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

function getMDXFiles(dir: fs.PathLike) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: fs.PathOrFileDescriptor) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file: string) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts() {
  // TODO: Pagination
  return getMDXData(path.join(process.cwd(), 'src', 'content')).sort((a, b) => 
      new Date(a.metadata.date) > new Date(b.metadata.date) ? -1 : 1
  );
}

export function formatDate(date: string, includeRelative = false) {
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

export const findPost = (slug: string) => {
  const posts = getBlogPosts()
  // const posts = .find((post) => post.slug === slug);
  const idx = posts.findIndex(p => p.slug == slug);

  if (idx == -1) return { post: null, prev: null, next: null };

  return {
    post: posts[idx],
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < (posts.length - 1) ? posts[idx + 1] : null,
  }
}

export const strToTitleCase = (text: string) => text.replace(/[^-\s]+/g, s => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
export const postTitle = (post: { slug: string, metadata: { title?: string }}) => {
  let title = post.metadata.title;

  if (!title) title = post.slug.replaceAll('-', ' ');

  return strToTitleCase(title);
}