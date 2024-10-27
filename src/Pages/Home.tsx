import useUserStore from '../store/useUserStore';

const Home = () => {
    const { user } = useUserStore();

    return (
        <div className='p-4'>
            <h2 className='custom-h2'>Home</h2>
            <h3>{user?.name}</h3>
        </div>
    );
};

export default Home;
