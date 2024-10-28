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
        <div className='ml-4 rounded-md bg-gray-200 px-2'>
            <label htmlFor='itemsPerPage'>Tamanho da página:</label>
            <select
                className='ml-2 cursor-pointer rounded-md bg-gray-200 px-4 py-2'
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
