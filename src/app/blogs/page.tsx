import Link from "next/link"

interface Posts {
    userId:number;
    id:number;
    title:string;
    body:string;
}

interface Categories {
    id: number;
    name: string;
}

const api_url = 'https://jsonplaceholder.typicode.com/posts';

const Blogs = async () => {
    const response = await fetch(api_url);
    const posts: Posts[] = await response.json();
    const categories: Categories[] = [
        {
            id :1,
            name: 'Lifestyle'
        },
        {
            id :2,
            name: 'Programming'
        },
        {
            id :3,
            name: 'Nature'
        },
    ]
    return(
        <div className="min-h-screen px-5 lg:px-20 py-10 flex lg:flex-nowrap flex-wrap gap-10">
            <div className="w-full lg:w-2/3">
                <h1 className="text-2xl text-gray-800 dark:text-gray-50 font-bold">Posts</h1>
                {/* Post list */}
                <div className="flex flex-col gap-10 mt-10">
                    {posts.map((post) => {
                        return(
                            <div key={post.id}>
                                <Link href={`blogs/${post.id}`}>
                                    <h1 className="text-xl text-gray-800 dark:text-gray-50 hover:underline font-semibold">{post.title}</h1>
                                </Link>
                                <p className="mt-2 text-md tracking-wide text-gray-800 dark:text-gray-50">Learn to implement smooth scrolling in Next.js for improved navigation and user experience. This guide covers simple CSS and JavaScript methods for seamless transitions between sections.</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/3 flex flex-col self-baseline gap-5">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-50">Topics</h1>
                <div className="flex flex-wrap gap-3">
                    {categories.map((category) => {
                        return(
                                <Link href="#" key={category.id} className="rounded-lg px-3 py-1 bg-black dark:bg-white hover:underline opacity-75 font-semibold text-white dark:text-gray-800 self-baseline">#{category.name}</Link>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default Blogs;