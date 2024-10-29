import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Supercluster from 'supercluster';

interface Point {
    id: number;
    latitude: number;
    longitude: number;
}

interface InteractiveMapProps {
    points: Point[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ points }) => {
    const [clusters, setClusters] = useState<any[]>([]);
    const [viewportBounds, setViewportBounds] = useState<[number, number, number, number] | null>(null);

    // Criando a instância do Supercluster
    const cluster = new Supercluster({
        radius: 40, // Ajuste o raio do cluster conforme necessário
        maxZoom: 18,
    });

    useEffect(() => {
        const mappedPoints = points?.map((point) => ({
            type: 'Feature' as const,
            geometry: { type: 'Point' as const, coordinates: [point.longitude, point.latitude] },
            properties: { id: point.id },
        }));

        cluster.load(mappedPoints);
        updateClusters();
    }, [points, viewportBounds]);

    const updateClusters = () => {
        if (!viewportBounds) return;

        const clusters = cluster.getClusters(viewportBounds, 13); // Zoom 13 como exemplo
        setClusters(clusters);
    };

    // Captura os limites do mapa quando o usuário navega
    const MapEvents = () => {
        useMapEvents({
            moveend: (event: { target: { getBounds: () => any } }) => {
                const bounds = event.target.getBounds();
                setViewportBounds([bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]);
            },
        });
        return null;
    };

    return (
        <MapContainer
            style={{
                height: '640px',
            }}
            center={[-23.5489, -46.6388]}
            zoom={10}
            scrollWheelZoom={true}
        >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            {clusters.map((cluster) => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                return (
                    <Marker
                        key={cluster.id}
                        position={[latitude, longitude]}
                    >
                        {/* Pode adicionar um popup ou estilo diferenciado se for um cluster */}
                    </Marker>
                );
            })}
            <MapEvents />
        </MapContainer>
    );
};

export default InteractiveMap;
