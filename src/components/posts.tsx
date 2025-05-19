import Link from 'next/link';
import { formatDate, getBlogPosts, postTitle } from '@/utils';
import Image from 'next/image';

export function BlogPosts() {
    // TODO: pagination
    let allBlogs = getBlogPosts();

    return (
        <div className="flex flex-row flex-wrap justify-center items-start">{ allBlogs.map((post) => (
                <div key={post.slug} className="m-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className={post.metadata.image ? 'w-sm md:w-lg' : 'w-sm'}>
                        <Link
                            key={post.slug}
                            className="flex flex-row text-gray-900 dark:text-gray-300 hover:text-cyan-900 dark:hover:text-white"
                            href={`/${post.slug}`}
                        >
                            { post.metadata.image && <div className="rounded-s-lg h-55 w-75 overflow-hidden hidden md:block">
                                <Image className="h-full w-full object-cover hover:scale-125 transition ease-in-out" src={post.metadata.image} alt={post.metadata.alt || `Decorative cover image for the blog post`} width="350" height="200" /> 
                            </div>}
                            <div className="flex flex-col justify-between space-y-1 px-5 py-3 h-55 w-100">
                                <p className="mb-2 text-2xl font-bold tracking-tight ">{postTitle(post)}</p>
                                <p className="mb-3 font-normal line-clamp-3">{post.metadata.summary}</p>
                                <p className="text-gray-700 dark:text-gray-400 pb-2">{formatDate(post.metadata.date, false)}</p>

                                <span className="py-2 px-4 text-sm inline-flex items-center font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-cyan-800 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    Read on
                                    <svg className="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            ))
        } </div>
    )
}