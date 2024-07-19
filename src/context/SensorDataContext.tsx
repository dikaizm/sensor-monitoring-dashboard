import { ReactNode, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import appConfig from '../config/env';
import Cookies from 'js-cookie'
import { SensorContext } from './utils/sensorDataContext';
import { useNavigate } from 'react-router-dom';

interface MessageType {
  [key: string]: string
  tag_name: string
  value: string
  timestamp: string
  message_type: string
}

type SensorDataType = {
  children: ReactNode;
}

export function SensorContextProvider({ children }: SensorDataType) {
  const navigate = useNavigate()

  const socketRef = useRef<WebSocket | null>(null);
  const [sensorData, setSensorData] = useState<SensorType>({
    conveyor_status: { value: '' },
    conveyor_speed: { value: '' },
    photoelectric: { value: '' },
    camera: { value: '' },
  })
  const [session, setSession] = useState<string>('')

  useEffect(() => {
    const authToken = Cookies.get('auth')
    if (authToken && authToken !== undefined) {
      setSession(authToken)
    }
  }, [])

  useEffect(() => {
    if (!window.WebSocket) {
      alert('Your browser does not support WebSocket connections');
      return;
    }

    if (!socketRef.current || (socketRef.current.readyState !== WebSocket.OPEN) && (session !== '')) {
      socketRef.current = new WebSocket(`${appConfig.wsUrl}?session=${session}`);

      socketRef.current.addEventListener('message', (event) => {
        const message: MessageType = JSON.parse(event.data);

        if (message.message_type === 'alert') {
          if (message.status === 'success') {
            toast.success(message.message);
          }
        }

        if (message.message_type === 'plc') {
          setSensorData((prev: SensorType) => ({
            ...prev,
            [message.tag_name]: {
              ...prev[message.tag_name],
              value: message.value,
            },
          }));
        }
      });
    }

    socketRef.current.addEventListener('close', (event) => {
      if (event.code === 1008) {
        Cookies.remove('auth')
        navigate('/login')
        toast.error('Unauthorized access. Please login again!')
      }
    })
  }, [session, sensorData, navigate])

  return (
    <SensorContext.Provider value={{ sensorData }}>
      {children}
    </SensorContext.Provider>
  );
}