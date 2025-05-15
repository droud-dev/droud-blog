
import { getBlogPosts } from "@/utils";
import Link from "next/link";

export default function Home() {
  const posts = getBlogPosts();

  return (
    <main>
      <div>Home page</div>
      <ul>
        { posts.map(post => (<li>
          <Link href={`/${post.slug}`}>
            {post.metadata.title || post.slug.replace('-', ' ')}
          </Link>
        </li>)) }
      </ul>
    </main>
  );
}