import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Seems we got a bit lost there friend, try again</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}