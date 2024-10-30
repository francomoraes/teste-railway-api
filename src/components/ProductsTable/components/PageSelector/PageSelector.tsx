const PageSelector = ({
    length,
    currentPage,
    setCurrentPage,
}: {
    length: number;
    currentPage: number;
    setCurrentPage: (value: number) => void;
}) => {
    return (
        <ul className='mx-2 inline-flex items-center justify-center gap-2 text-gray-800'>
            {Array.from({ length }).map((_, index) => (
                <li
                    key={index}
                    className={`cursor-pointer rounded-md px-3 py-1 transition-colors duration-200 ${
                        currentPage === index + 1
                            ? 'bg-blue-500 font-semibold text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                >
                    {index + 1}
                </li>
            ))}
        </ul>
    );
};

export default PageSelector;
