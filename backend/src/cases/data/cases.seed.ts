import { Case } from '../case.interface';

export const CASES_SEED: Case[] = [
  { id: '1', name: 'Incidente en Estación Norte', description: 'Actividad sospechosa detectada por el sistema de monitoreo.', date: '2026-06-10', status: 'Abierto', latitude: 6.2518, longitude: -75.5636, images: ['/images/estacion.norte.jpg'] },
  { id: '2', name: 'Alerta El Poblado', description: 'Sensor de acceso activado fuera de horario.', date: '2026-06-09', status: 'En revisión', latitude: 6.2087, longitude: -75.5707, images: ['/images/poblado.jpg'] },
  { id: '3', name: 'Reporte Envigado', description: 'Falla intermitente en cámara perimetral.', date: '2026-02-20', status: 'Cerrado', latitude: 6.1759, longitude: -75.5914, images: ['/images/envigado.jpg'] },
  { id: '4', name: 'Evento Bello', description: 'Intento de acceso no autorizado a la red.', date: '2026-06-10', status: 'Abierto', latitude: 6.3378, longitude: -75.5553, images: ['/images/case.bello.jpg'] },
  { id: '5', name: 'Incidente Itagüí', description: 'Corte de energía en nodo secundario.', date: '2025-06-08', status: 'En revisión', latitude: 6.1849, longitude: -75.5996, images: ['https://picsum.photos/seed/case5/600/400'] },
  { id: '6', name: 'Alerta Sabaneta', description: 'Tráfico anómalo detectado en el firewall.', date: '2026-04-12', status: 'Cerrado', latitude: 6.1517, longitude: -75.6166, images: ['/images/sabaneta.jpg'] },
];