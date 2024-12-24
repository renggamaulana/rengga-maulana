import Link from "next/link";
import AuthButton from "../AuthButton";
import Dot from "../Dot";

export default function CategoryList({categories}: any) {
    return (
        <div className="p-10 dark:bg-neutral-900 bg-white border border-neutral-200 shadow dark:border-none rounded-lg">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-50">Topics</h1>
                <AuthButton label="Crete New Blog" path="/blogs/create/"/>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
                {/* dangerouslySetInnerHTML={{ __html: blog.excerpt }} */}
                {categories.map((category: Categories) => {
                return (
                    <Link
                    href={`/blogs/category/${category.slug}`}
                    key={category.id}
                    className="flex items-center gap-2 px-3 py-1 border dark:text-white border-sky-600 rounded-full hover:bg-sky-500 opacity-75 font-semibold text-black self-baseline"
                    >
                    <Dot color={category.color} size={8} /> {category.name}
                    </Link>
                );
                })}
            </div>
        </div>
    )
}