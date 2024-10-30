import { useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';

export const useMapBounds = () => {
    const [bounds, setBounds] = useState<{
        ur: L.LatLng;
        ul: L.LatLng;
        br: L.LatLng;
        bl: L.LatLng;
    } | null>(null);

    const updateBounds = (map: L.Map) => {
        const mapBounds = map.getBounds();
        setBounds({
            ur: mapBounds.getNorthEast(),
            ul: mapBounds.getNorthWest(),
            br: mapBounds.getSouthEast(),
            bl: mapBounds.getSouthWest(),
        });
    };

    useMapEvents({
        moveend: (event) => updateBounds(event.target),
        zoomend: (event) => updateBounds(event.target),
        load: (event) => updateBounds(event.target), // Add this line to set initial bounds
    });

    return bounds;
};