import Link from "next/link"

Link

export default function Blogs() {
    return(
        <div className="min-h-screen p-10">
            <h1 className="text-2xl text-gray-700 dark:text-gray-50 font-bold">Posts</h1>
            {/* Post list */}
            <div className="flex flex-col gap-10 mt-10">
                <div>
                    <Link href={`blogs/1`}>
                        <h1 className="text-xl text-gray-800 dark:text-gray-50 hover:underline font-semibold">Introduction to Smooth Scrolling in Next.js: A Simple Guide</h1>
                    </Link>
                    <p className="mt-2 text-md tracking-wide text-gray-800 dark:text-gray-50">Learn to implement smooth scrolling in Next.js for improved navigation and user experience. This guide covers simple CSS and JavaScript methods for seamless transitions between sections.</p>
                </div>
            </div>
        </div>
    )
}