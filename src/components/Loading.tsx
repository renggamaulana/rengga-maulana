
export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-50"></div>
            <p className="text-gray-900 dark:text-gray-50 mt-5">Loading...</p>
        </div>
    );
}