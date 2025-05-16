import Link from "next/link";
import { redirect } from "next/navigation";
import { findPost, formatDate, getBlogPosts, postTitle } from "@/utils";
import { baseUrl } from '@/app/sitemap'
import type { Post } from "@/utils";

const genNav = (post: Post | null, prev: Post | null, next: Post | null) => {
    const btnStyle = 'no-underline hover:underline text-sm inline-flex items-center font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-cyan-800 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700';
    return (<>
        <nav className="w-full lg:w-1/2 mx-auto flex flex-row justify-between justify-items-center-safe py-5">
            { prev && <Link href={`/${prev?.slug}`} className={`py-2 pr-3 ${btnStyle}`}>
                <svg className="w-2.5 h-2.5 ms-2 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="pl-1 max-w-50 truncate">{postTitle(prev)}</span>
            </Link> }
            <Link className={`py-2 pl-3 pr-2 ${btnStyle}`} href='/'>
                Home
            </Link>
            { next && <Link href={`/${next?.slug}`} className={`py-2 pl-3 pr-2 ${btnStyle}`}>
                <span className="pr-0 max-w-50 truncate">{postTitle(next)}</span>
                <svg className="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
            </Link> }
        </nav>
    </>)
};

export async function generateMetadata(props: { params: any }) {
    const params = await props.params;
    let post = getBlogPosts().find((post) => post.slug === params.slug)

    if (!post) return {};

    let {
        summary: description,
        title,
        date,
        image,
        alt,
    } = post.metadata;
    let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

    return {
        metadataBase: new URL(baseUrl),
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            date,
            url: `${baseUrl}/${post.slug}`,
            images: [
                {
                    url: ogImage,
                    alt: alt,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const { default: Post } = await import(`@/content/${slug}.mdx`);
    const { post, prev, next } = findPost(slug);

    if (!post) return redirect('/');

    return (<>
        { post.metadata.image && <div 
            className="hidden md:block md:h-50 lg:h-100 w-full bg-cover bg-center bg-no-repeat" 
            style={{ backgroundAttachment: 'fixed', backgroundImage: `url(${post.metadata.image})`}}>&nbsp;</div>
        }
        { genNav(post, prev, next) }
        <article className="prose-a:no-underline prose-a:hover:underline">
            <div className="w-full lg:w-1/2 mx-auto pt-5">
                <div className="flex flex-col justify-between text-center items-center my-2 text-sm">
                    <h1 className="mb-0 title font-semibold text-2xl tracking-tighter text-gray-900 dark:text-white">
                        {postTitle(post)}
                    </h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 not-prose">
                        {formatDate(post.metadata.date)}
                    </p>
                </div>
                <Post />
            </div>
        </article>
        { genNav(post, prev, next) }
    </>);
}
 
export function generateStaticParams() {
    return getBlogPosts();
}
 
export const dynamicParams = false