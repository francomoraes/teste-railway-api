import { useEffect, useRef, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';

const MAX_NOTIFICATIONS = 3;
const BUFFER_SIZE = 1000;
const FLUSH_INTERVAL = 20000;

export const useSSEPolyfill = (tenantUuid?: string, token?: string | null) => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const buffer = useRef<any[]>([]);

    useEffect(() => {
        if (!tenantUuid || !token) return;

        const eventSource = new EventSourcePolyfill(`${import.meta.env.VITE_BASE_URL}notify/${tenantUuid}/events`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        eventSource.onmessage = (event) => {
            const newNotification = JSON.parse(event.data);
            buffer.current.push(newNotification);

            if (buffer.current.length > BUFFER_SIZE) {
                buffer.current = buffer.current.slice(-BUFFER_SIZE);
            }
        };

        const flushInterval = setInterval(() => {
            setNotifications(buffer.current.slice(-MAX_NOTIFICATIONS));
            buffer.current = [];
        }, FLUSH_INTERVAL);

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
            clearInterval(flushInterval);
        };
    }, [tenantUuid, token]);

    return notifications;
};
