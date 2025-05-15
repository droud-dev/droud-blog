import Link from 'next/link';
import { formatDate, getBlogPosts } from '@/utils';

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .sort((a, b) => 
            new Date(a.metadata.date) > new Date(b.metadata.date) ? -1 : 1
        ).map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {formatDate(post.metadata.date, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}