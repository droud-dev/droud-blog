import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="w-full max-w-screen lg:max-w-4xl min-w-xs mx-auto p-5 text-center">
      <h2 className="text-5xl">Not Found</h2>
      <p className="p-5">Seems we got a bit lost there friend, try again</p>
      <Link href="/" className="px-3 py-2 no-underline hover:underline text-sm inline-flex items-center font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-cyan-800 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Return Home
      </Link>
    </div>
  )
}