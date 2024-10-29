import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Notification = {
    event: string;
    message: string;
};

interface NotificationDisplayProps {
    notifications: Notification[];
}

const NotificationDisplay: React.FC<NotificationDisplayProps> = ({ notifications }) => {
    useEffect(() => {
        if (notifications.length > 0) {
            const latestNotification = notifications[notifications.length - 1];
            toast.info(`${latestNotification.event}: ${latestNotification.message}`);
        }
    }, [notifications]);

    return (
        <ToastContainer
            position='top-right'
            autoClose={3000}
        />
    );
};

export default NotificationDisplay;
