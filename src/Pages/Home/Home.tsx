import InteractiveMap from '@/components/InteractiveMap/InteractiveMap';
import { MapContainer } from 'react-leaflet';

const Home = () => {
    return (
        <div className='h-[calc(100%-58px)] p-4'>
            <MapContainer
                center={[-10.9, -37.07]}
                zoom={13}
                scrollWheelZoom={true}
                className='h-full w-full'
            >
                <InteractiveMap />
            </MapContainer>
        </div>
    );
};

export default Home;
