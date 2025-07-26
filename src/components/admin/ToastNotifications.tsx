import { FaCheck, FaTimes, FaCog } from "react-icons/fa";

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastNotificationsProps {
  toasts: Toast[];
}

export default function ToastNotifications({ toasts }: ToastNotificationsProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg text-white flex items-center space-x-2 ${
            toast.type === 'success' ? 'bg-green-500' :
            toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {toast.type === 'success' && <FaCheck />}
          {toast.type === 'error' && <FaTimes />}
          {toast.type === 'info' && <FaCog />}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
} 