import Link from "next/link"

export const metadata = {
  title: "Page Not Found | Promptlytic",
  description: "The page you are looking for does not exist.",
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="head_text">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="desc mb-8">The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="black_btn">
        Return Home
      </Link>
    </div>
  )
}