import { initRouter } from './router/routes.js';
import { Sidebar } from './components/sidebar.js';

/**
 * OBJETO APP: El motor principal de RiwiCalls
 */
export const App = {
    container: document.getElementById('app'),
    tituloPagina: document.getElementById('titulo-pagina'),

    render(view) {
        if (!this.container) return;
        
        // 1. Inyectamos el HTML de la vista modular
        this.container.innerHTML = view.template;
        
        // 2. Actualizamos el título en la UI (el h1 del header global)
        if (this.tituloPagina) {
            this.tituloPagina.textContent = view.title;
        }

        // 3. Actualizamos el título de la pestaña del navegador
        document.title = `RiwiCalls | ${view.title}`;
        
        // 4. Ejecutamos la lógica específica de la vista (eventos, botones)
        if (view.logic) {
            view.logic();
        }

        // 5. Renderizamos los iconos de Lucide
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // 6. Scroll al inicio por si la vista anterior era muy larga
        window.scrollTo(0, 0);
    }
};

// --- ARRANQUE DE LA APLICACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    // Dibujamos el Sidebar una sola vez (se mantiene fijo)
    Sidebar.render(); 
    
    // Encendemos el Router para que detecte la URL actual
    initRouter();     
});

