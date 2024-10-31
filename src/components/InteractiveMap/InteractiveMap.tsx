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
            } finally {
            }
        };

        fetchPoints();
    }, [bounds]);

    const customIcon = new L.Icon({
        iconUrl: './location.svg',
        iconSize: new L.Point(40, 47),
    });

    const createClusterCustomIcon = (cluster: any) => {
        return L.divIcon({
            html: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: 'Roboto', serif; font-weight: 600">${cluster.getChildCount()}</div>`,
            className: 'border-2 border-gray-400 bg-gray-200 text-gray-600 rounded-full font-medium shadow-sm',
            iconSize: L.point(40, 40, true),
        });
    };

    return (
        <div className='h-full w-full'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <MarkerClusterGroup
                chunkedLoading
                showCoverageOnHover={false}
                spiderfyOnMaxZoom={false}
                iconCreateFunction={createClusterCustomIcon}
            >
                {points?.map((point, index) => {
                    const [longitude, latitude] = point.geometry.coordinates;
                    return (
                        <Marker
                            key={index}
                            position={[latitude, longitude]}
                            title={point?.type}
                            icon={customIcon}
                        ></Marker>
                    );
                })}
            </MarkerClusterGroup>
        </div>
    );
};

export default InteractiveMap;
