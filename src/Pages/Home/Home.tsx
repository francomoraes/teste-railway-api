import InteractiveMap from '@/components/InteractiveMap/InteractiveMap';

const points = [
    { id: 1, latitude: -23.5489, longitude: -46.6388 },
    { id: 2, latitude: -22.9068, longitude: -43.1729 },
    { id: 3, latitude: -19.9167, longitude: -43.9345 },
];

const Home = () => {
    return (
        <div className='h-[calc(100%-58px)] p-4'>
            <InteractiveMap points={points} />
        </div>
    );
};

export default Home;
