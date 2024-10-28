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
        <ul className='inline-flex items-center justify-center gap-2 text-gray-800'>
            {Array.from({ length }).map((_, index) => (
                <li
                    key={index}
                    className={`cursor-pointer rounded-md px-4 py-2 transition-all ${
                        currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
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
