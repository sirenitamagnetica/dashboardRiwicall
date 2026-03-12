import { App } from '../app.js';
import { dashboardView } from '../views/dashboardView.js';
import { candidatosView } from '../views/candidatosView.js';
import { analiticaView } from '../views/analiticaView.js';
import { configuracionView } from '../views/configuracionView.js';
import { eventosView } from '../views/eventosView.js';
import { llamadasView } from '../views/llamadasView.js';
import { reportesView } from '../views/reportesView.js';
import { seguimientoView } from '../views/seguimientoView.js';
import { notFoundView } from '../views/notFoundView.js' 

const routes = {
    '#/dashboard': dashboardView,
    '#/candidatos': candidatosView,
    '#/analitica': analiticaView,
    '#/configuracion': configuracionView,
    '#/eventos': eventosView,
    '#/llamadas': llamadasView,
    '#/reportes': reportesView,
    '#/seguimiento': seguimientoView
};

export const initRouter = () => {
    const handleRoute = () => {
        // Si no hay hash, por defecto vamos al dashboard
        const hash = window.location.hash || '#/dashboard';
        
        // Buscamos la vista, si no existe usamos el notFoundView
        const view = routes[hash] || notFoundView;

        // El motor App se encarga de pintar y ejecutar la lógica
        App.render(view);
    };

    // Escuchamos los cambios de navegación
    window.addEventListener('hashchange', handleRoute);
    
    // Ejecutamos una vez al cargar la página
    window.addEventListener('load', handleRoute);
};