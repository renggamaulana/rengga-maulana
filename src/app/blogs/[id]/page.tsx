
import Link from "next/link"


const SingleBlog = () => {

  return (
    <div className="p-10 flex flex-col gap-10 justify-center px-7 lg:px-60">
        {/* Container */}
        <div className="flex divide-y flex-col">
            <h1 className="text-4xl text-gray-800 dark:text-gray-50 font-bold mb-5">Promise in JavaScript</h1>
            <p className="text-sm dark:text-gray-400 text-gray-700 py-3">Published in <span className="text-gray-800 dark:text-gray-100">JavaScript </span> · 4 min read · Sep 30, 2024</p>
            <p></p>
        </div>
        {/* Post's body */}
        <div>
            <h3 className="text-2xl text-gray-800 dark:text-gray-50 font-semibold ">Introduction</h3>
            <p className="text-lg lg:tracking-wide dark:text-gray-50 text-gray-600 lg:leading-8">In web development, user experience (UX) is one of the most critical aspects that can determine the success of a website. Among the many factors contributing to good UX, smooth scrolling is often overlooked. Yet, it plays an essential role in providing a seamless experience, especially on single-page applications (SPAs) or websites that use anchor links to navigate between sections.</p>
            <p className="text-lg lg:tracking-wide dark:text-gray-50 text-gray-600 lg:leading-8">This post will walk you through the process of implementing smooth scrolling in a Next.js project. We will also discuss why smooth scrolling matters and how it can improve the overall feel of your website. By the end of this post, you'll have a clear understanding of how to create a professional, polished navigation experience for your users.</p>
        </div>
        <div>
            <p className="text-md text-gray-700 dark:text-gray-50">Mau berlangganan newsletter? <a href="" className="underline">klik disini</a></p>
            <Link href="/blogs" className="text-md text-gray-700 dark:text-gray-50 flex gap-2 mt-5 hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Lihat postingan lainnya
            </Link>
        </div>
    </div>
  )
}

// // Fungsi untuk fetch data blog spesifik berdasarkan ID
// export const getStaticProps: GetStaticProps = async (context) => {
//     const { id } = context.params!;
//     const res = await fetch(`http://localhost:8000/api/blogs/${id}`); // Fetch blog berdasarkan ID
//     const blog: Blog = await res.json();
  
//     return {
//       props: {
//         blog,
//       },
//       revalidate: 10, // Revalidate setiap 10 detik
//     };
//   };

export default SingleBlog;