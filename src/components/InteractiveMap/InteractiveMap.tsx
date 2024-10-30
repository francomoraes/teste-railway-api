import 'leaflet/dist/leaflet.css';
import { Marker, TileLayer } from 'react-leaflet';
import { useMapBounds } from './hooks/useMapBounds';
import { useEffect, useState } from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';

const InteractiveMap = () => {
    const bounds = useMapBounds();
    const [points, setPoints] = useState<any[]>([] as any);

    const { ul, ur, br, bl } = bounds || {};

    useEffect(() => {
        if (!ul || !ur || !br || !bl) {
            return;
        }
        const accessToken = localStorage.getItem('accessToken');

        const fetchPoints = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}points?ul=${ul.lat},${ul.lng}&bl=${bl.lat},${bl.lng}&ur=${ur.lat},${ur.lng}&br=${br.lat},${br.lng}&responseType=geojson`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Erro ao requisitar pontos');
                }

                const data = await response.json();

                setPoints(data);
            } catch (error) {
                console.error('Erro ao requisitar pontos', error);
            }
        };

        fetchPoints();
    }, [bounds]);

    return (
        <div className='h-full w-full'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <MarkerClusterGroup chunkedLoading>
                {points?.map((point, index) => {
                    const [longitude, latitude] = point.geometry.coordinates;
                    return (
                        <Marker
                            key={index}
                            position={[latitude, longitude]}
                            title={point?.type}
                            icon={
                                new L.Icon({
                                    iconUrl: `path/to/icon/${point?.properties?.['marker-symbol']}.png`,
                                    iconSize: [25, 25],
                                })
                            }
                        ></Marker>
                    );
                })}
            </MarkerClusterGroup>
        </div>
    );
};

export default InteractiveMap;
