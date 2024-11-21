import Link from "next/link";
interface PaginationProps {
    pageNumber: number; // Number of the current page
    pages: number; // Total number of pages
    route: string; // Base route for the pagination links
}
const Pagination: React.FC<PaginationProps> = ({pageNumber, pages, route}) => {
    const pagesArray = [];
    for (let i = 1; i <= pages; i++) {
        pagesArray.push(i)
    }

    return (
        <div className='flex items-center justify-center mt-2 mb-10'>
            {pageNumber !== 1 && (<Link href={`${route}?pageNumber=${pageNumber - 1}`} className='border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer
                    hover:bg-gray-200 transition'>
                prev
            </Link>)}

            {
                pagesArray.map(page => (
                    <Link href={`${route}?pageNumber=${page}`}
                          className={`${pageNumber == page ? "bg-gray-400" : ""} 
                          border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointerhover:bg-gray-200 transition`}
                          key={page}>
                        {page}
                    </Link>
                ))
            }
            {pageNumber !== pages && (
                <Link href={`${route}?pageNumber=${pageNumber + 1}`} className='border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer
                    hover:bg-gray-200 transition'>
                    Next
                </Link>
            )}

        </div>
    )
}

export default Pagination;
