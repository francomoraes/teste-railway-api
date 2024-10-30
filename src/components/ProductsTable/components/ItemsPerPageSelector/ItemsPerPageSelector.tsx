const ItemsPerPageSelector = ({
    data,
    itemsPerPage,
    handleChange,
}: {
    data: string[];
    itemsPerPage: number;
    handleChange: (value: number) => void;
}) => {
    return (
        <div className='ml-4 flex items-center rounded-lg bg-gray-100 px-3 py-2 shadow-sm'>
            <label
                htmlFor='itemsPerPage'
                className='font-medium text-gray-600'
            >
                Tamanho da página:
            </label>
            <select
                id='itemsPerPage'
                className='ml-3 cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1 font-medium text-gray-700 shadow-inner transition duration-150 hover:border-gray-400 focus:outline-none'
                value={itemsPerPage}
                onChange={(e) => handleChange(+e.target.value)}
            >
                {data.map((item) => (
                    <option
                        key={item}
                        value={item}
                    >
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ItemsPerPageSelector;
