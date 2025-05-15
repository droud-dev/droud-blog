import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx'
import { findPost, formatDate, getBlogPosts, postTitle } from '@/utils'
import { baseUrl } from '@/app/sitemap'
import Link from 'next/link'

export async function generateStaticParams() {
    let posts = getBlogPosts()

    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata(props: { params: any }) {
    const params = await props.params;
    let post = getBlogPosts().find((post) => post.slug === params.slug)
    if (!post) {
        return
    }

    let {
        summary: description,
        title,
        date,
        image,
        alt,
    } = post.metadata
    let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

    return {
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

export default async function Blog(props: { params: any }) {
    const params = await props.params;
    let posts = findPost(params.slug);
    const { post, prev, next } = posts;

    if (!post) notFound();

    return (<>
    { post.metadata.image && <div 
        className="hidden md:block md:h-50 lg:h-100 w-full bg-cover bg-center bg-no-repeat" 
        style={{ backgroundAttachment: 'fixed', backgroundImage: `url(${post.metadata.image})`}}></div>}
    <section className="w-full px-5 py-3 lg:max-w-4xl md:max-w-lg mx-auto">
        <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: post.metadata.title,
                datePublished: post.metadata.date,
                dateModified: post.metadata.date,
                description: post.metadata.summary,
                image: post.metadata.image
                    ? `${baseUrl}${post.metadata.image}`
                    : `/og?title=${encodeURIComponent(post.metadata.title)}`,
                url: `${baseUrl}/blog/${post.slug}`,
                author: {
                    '@type': 'Person',
                    name: 'Droud One',
                },
            }),
            }}
        />
        <div className="flex flex-col justify-between text-center items-center mt-2 mb-8 text-sm">
            <h1 className="title font-semibold text-2xl tracking-tighter mb-2 text-gray-900 dark:text-white">
                {postTitle(post)}
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.metadata.date)}
            </p>
        </div>
        <article className="prose text-gray-900 dark:text-white">
            <CustomMDX source={post.content} />
        </article>
        <div className="flex flex-row justify-between mt-5">
            { prev && <Link href={`/${prev?.slug}`} className="py-2 pr-3 text-sm inline-flex items-center font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-cyan-800 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                <svg className="w-2.5 h-2.5 ms-2 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="pl-1 max-w-50 truncate">{postTitle(prev)}</span>
            </Link> }
            { next && <Link href={`/${next?.slug}`} className="py-2 pl-3 pr-2 text-sm inline-flex items-center font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-cyan-800 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                <span className="pr-0 max-w-50 truncate">{postTitle(next)}</span>
                <svg className="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
            </Link> }
        </div>
    </section>
    </>);
}