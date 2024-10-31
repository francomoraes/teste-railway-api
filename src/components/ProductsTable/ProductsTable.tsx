import { useEffect, useState } from 'react';
import { ItemsPerPageSelector, PageSelector } from './components';
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader';
import { IoCaretBack, IoCaretForwardOutline } from 'react-icons/io5';
import { FaFastBackward, FaFastForward } from 'react-icons/fa';

type DataProps = {
    id: number;
    name: string;
    description: string;
    price: number;
};

type ProductsTableProps = {
    data: DataProps[];
    isLoading?: boolean;
    handleRowClick?: (item: DataProps) => void;
};

const ProductsTable = ({ data, isLoading, handleRowClick }: ProductsTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [dataToDisplay, setDataToDisplay] = useState<DataProps[]>(data.slice(0, itemsPerPage));

    const handlePrevPage = () => {
        if (currentPage === 1) return;
        setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage === data.length / itemsPerPage) return;
        setCurrentPage((prev) => prev + 1);
    };

    const handleChangeItemsPerPage = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setDataToDisplay(data.slice(start, end));
    }, [currentPage, itemsPerPage, data]);

    if (data.length === 0) {
        return <div className='flex h-full items-center justify-center text-sm sm:text-base'>No data available</div>;
    }

    if (isLoading)
        return (
            <div className='flex h-[calc(100%-58px)] w-full flex-col items-center justify-center'>
                <div className='h-20 w-20 sm:h-40 sm:w-40'>
                    <SpinnerLoader />
                </div>
            </div>
        );

    return (
        <div className='flex h-full flex-col'>
            <table className='min-w-full border-collapse border border-gray-200 text-xs sm:text-sm'>
                <thead>
                    <tr className='bg-gray-100 text-gray-700'>
                        <th className='custom-th px-2 sm:px-4'>Id</th>
                        <th className='custom-th px-2 sm:px-4'>Name</th>
                        <th className='custom-th px-2 sm:px-4'>Description</th>
                        <th className='custom-th px-2 sm:px-4'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {dataToDisplay.map((item) => (
                        <tr
                            key={item.id}
                            className='cursor-pointer text-gray-800 odd:bg-white even:bg-gray-50 hover:bg-gray-100'
                            onClick={() => handleRowClick && handleRowClick(item)}
                        >
                            <td className='custom-td px-2 sm:px-4'>{item.id}</td>
                            <td className='custom-td px-2 sm:px-4'>{item.name}</td>
                            <td className='custom-td px-2 sm:px-4'>{item.description}</td>
                            <td className='custom-td px-2 !text-right sm:px-4'>
                                {(item.price / 100).toLocaleString('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer className='mb-0 mt-auto flex flex-wrap justify-center gap-1 p-2 sm:p-4'>
                <button
                    className={`rounded-md bg-gray-200 px-2 py-1 hover:bg-gray-300 active:scale-95 sm:px-4 sm:py-2 ${currentPage === 1 ? 'cursor-not-allowed opacity-40' : ''}`}
                    onClick={() => setCurrentPage(1)}
                >
                    <FaFastBackward className='text-xs sm:text-base' />
                </button>
                <button
                    className={`rounded-md bg-gray-200 px-2 py-1 hover:bg-gray-300 active:scale-95 sm:px-4 sm:py-2 ${currentPage === 1 || data.length <= 1 ? 'cursor-not-allowed opacity-40' : ''}`}
                    onClick={handlePrevPage}
                >
                    <IoCaretBack className='text-xs sm:text-base' />
                </button>
                <PageSelector
                    length={Math.ceil(data.length / itemsPerPage)}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <button
                    className={`rounded-md bg-gray-200 px-2 py-1 hover:bg-gray-300 active:scale-95 sm:px-4 sm:py-2 ${currentPage === Math.ceil(data.length / itemsPerPage) || data.length <= 1 ? 'cursor-not-allowed opacity-40' : ''}`}
                    onClick={handleNextPage}
                >
                    <IoCaretForwardOutline className='text-xs sm:text-base' />
                </button>
                <button
                    className={`rounded-md bg-gray-200 px-2 py-1 hover:bg-gray-300 active:scale-95 sm:px-4 sm:py-2 ${currentPage === Math.ceil(data.length / itemsPerPage) ? 'cursor-not-allowed opacity-40' : ''}`}
                    onClick={() => setCurrentPage(Math.ceil(data.length / itemsPerPage))}
                >
                    <FaFastForward className='text-xs sm:text-base' />
                </button>
                <ItemsPerPageSelector
                    data={['5', '10', '15']}
                    itemsPerPage={itemsPerPage}
                    handleChange={handleChangeItemsPerPage}
                />
            </footer>
        </div>
    );
};

export default ProductsTable;
