
import { BlogPosts } from "@/components/posts";
import { getBlogPosts } from "@/utils";

export default function Home() {
  return (
    <main>
      <BlogPosts />
      <footer><p className="text-slate-500 text-center py-2">You've reached the end 👏</p></footer>
    </main>
  );
}