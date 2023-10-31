import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useMemo, useRef, useState} from 'react';

export default function App() {
    const mapRef = useRef(null);
    const [serverInfo, setServerInfo] = useState([]);
    const [smellType, setSmellType] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://zpspace.com.ua/api/airdata');
                const data = await response.json();
                setServerInfo(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([47.842732, 35.10289], 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapRef.current);
        }
    }, []);

    const filteredData = useMemo(() => {
        if (!smellType) return serverInfo;

        return serverInfo.filter((item) => item.kind_of_smell === smellType);
    }, [smellType, serverInfo]);


    useEffect(() => {
        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                mapRef.current.removeLayer(layer);
            }
        });

        filteredData.forEach((item) => {
            L.marker([item.latitude, item.longitude]).addTo(mapRef.current);
        });
    }, [filteredData]);


    return (
        <>
            <select value={smellType} onChange={(event) => setSmellType(event.target.value)} id="type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5">
                <option value='' disabled>За типом сморіду</option>
                <option value="Йод">Йод</option>
                <option value="Аміак">Аміак</option>
                <option value="Сірководень">Сірководень</option>
                <option value="Сірка">Сірка</option>
                <option value="Металургійний гар">Металургійний гар</option>
                <option value="Горілий пластик">Горілий пластик</option>
                <option value="Хімія">Хімія</option>
                <option value="Гниль">Гниль</option>
            </select>

            <div id="map" className={'h-[calc(100vh-41px)]'}></div>
        </>
    )
}
