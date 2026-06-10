import { Case } from '../case.interface';

export const CASES_SEED: Case[] = [
  { id: '1', name: 'Incidente en Estación Norte', description: 'Actividad sospechosa detectada por el sistema de monitoreo.', date: '2025-01-15', status: 'Abierto', latitude: 6.2518, longitude: -75.5636, images: ['https://picsum.photos/seed/case1/600/400'] },
  { id: '2', name: 'Alerta El Poblado', description: 'Sensor de acceso activado fuera de horario.', date: '2025-02-03', status: 'En revisión', latitude: 6.2087, longitude: -75.5707, images: ['https://picsum.photos/seed/case2/600/400'] },
  { id: '3', name: 'Reporte Envigado', description: 'Falla intermitente en cámara perimetral.', date: '2025-02-20', status: 'Cerrado', latitude: 6.1759, longitude: -75.5914, images: ['https://picsum.photos/seed/case3/600/400'] },
  { id: '4', name: 'Evento Bello', description: 'Intento de acceso no autorizado a la red.', date: '2025-03-10', status: 'Abierto', latitude: 6.3378, longitude: -75.5553, images: ['https://picsum.photos/seed/case4/600/400'] },
  { id: '5', name: 'Incidente Itagüí', description: 'Corte de energía en nodo secundario.', date: '2025-03-28', status: 'En revisión', latitude: 6.1849, longitude: -75.5996, images: ['https://picsum.photos/seed/case5/600/400'] },
  { id: '6', name: 'Alerta Sabaneta', description: 'Tráfico anómalo detectado en el firewall.', date: '2025-04-12', status: 'Abierto', latitude: 6.1517, longitude: -75.6166, images: ['https://picsum.photos/seed/case6/600/400'] },
];