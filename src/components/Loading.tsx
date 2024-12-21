
export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <svg className="mr-2 h-16 w-16 animate-spin text-orange-500 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p className="text-gray-900 dark:text-gray-50 mt-5">Loading...</p>
        </div>
    );
}