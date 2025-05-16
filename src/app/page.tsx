
import { BlogPosts } from "@/components/posts";
import { getBlogPosts } from "@/utils";

export default function Home() {
  const posts = getBlogPosts();

  return (
    <main>
      <BlogPosts />
    </main>
  );
}