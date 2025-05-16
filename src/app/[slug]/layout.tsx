export default function Layout({ children }: { children: React.ReactNode }) {
    return <section className="prose md:prose-lg lg:prose-xl prose-img:rounded-xl w-full max-w-screen prose-slate dark:prose-invert">{ children }</section>
}