import Link from "next/link"

Link

export default function Blogs() {
    return(
        <div className="min-h-screen p-10">
            <h1 className="text-2xl">All Post</h1>
            {/* Post list */}
            <div className="flex flex-col gap-10">
                <div>
                    <Link href={`blogs/1`}>
                        <h1>First Post</h1>
                    </Link>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, eos!</p>
                </div>
                <div>
                    <Link href={`blogs/1`}>
                        <h1>Second Post</h1>
                    </Link>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, eos!</p>
                </div>
                <div>
                    <Link href={`blogs/1`}>
                        <h1>Third Post</h1>
                    </Link>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, eos!</p>
                </div>
            </div>
        </div>
    )
}