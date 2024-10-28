import { useEffect, useState } from 'react';
import { ItemsPerPageSelector, PageSelector } from './components';
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader';

type DataProps = {
    id: number;
    name: string;
    description: string;
    price: number;
};

type ProductsTableProps = {
    data: DataProps[];
    isLoading?: boolean;
};

const ProductsTable = ({ data, isLoading }: ProductsTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
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
        return <div className='flex h-full items-center justify-center'>No data available</div>;
    }

    if (isLoading)
        return (
            <div className='flex h-[calc(100%-58px)] w-full flex-col items-center justify-center'>
                <div className='h-40 w-40'>
                    <SpinnerLoader />
                </div>
            </div>
        );

    return (
        <div className='flex h-full flex-col'>
            <table className='min-w-full border-collapse border border-gray-200'>
                <thead>
                    <tr className='bg-gray-100 text-gray-700'>
                        <th className='custom-th'>Id</th>
                        <th className='custom-th'>Name</th>
                        <th className='custom-th'>Description</th>
                        <th className='custom-th'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {dataToDisplay.map((item) => (
                        <tr
                            key={item.id}
                            className='text-gray-800 odd:bg-white even:bg-gray-50'
                        >
                            <td className='custom-td'>{item.id}</td>
                            <td className='custom-td'>{item.name}</td>
                            <td className='custom-td'>{item.description}</td>
                            <td className='custom-td !text-right'>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer className='mb-0 mt-auto flex justify-center gap-6'>
                <button
                    className='rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300 active:scale-95'
                    onClick={handlePrevPage}
                >
                    Prev
                </button>
                <PageSelector
                    length={Math.ceil(data.length / itemsPerPage)}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <button
                    className='ml-2 rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300 active:scale-95'
                    onClick={handleNextPage}
                >
                    Next
                </button>
                <ItemsPerPageSelector
                    data={['10', '20', '30']}
                    itemsPerPage={itemsPerPage}
                    handleChange={handleChangeItemsPerPage}
                />
            </footer>
        </div>
    );
};

export default ProductsTable;
