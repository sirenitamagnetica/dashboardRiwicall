export const llamadasView = {
    title: 'Gestión de Llamadas',

    _historialLlamadas: [
        { candidato: 'Valentina Torres', tel: '3001234574', estado: 'Pendiente', fecha: '20/2/2026, 8:33:00 a. m.', motivo: 'Interés en desarrollo frontend' },
        { candidato: 'María López', tel: '3001234568', estado: 'Interesado', fecha: '19/2/2026, 8:33:00 a. m.', motivo: 'Consulta sobre becas' }
    ],

    template: `
    <style>
        .llamadas-wrapper { padding: 32px; background: #F8FAFC; min-height: 100vh; font-family: 'Inter', sans-serif; }
        .header-llamadas { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .titulo-llamadas { font-size: 24px; font-weight: 800; color: #1E293B; }
        .action-bar { display: flex; align-items: center; gap: 20px; margin-bottom: 24px; flex-wrap: nowrap; }
        
        .btn-nueva-llamada { 
            background: #6366F1; color: white; padding: 10px 20px; border-radius: 12px; border: none; 
            font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer;
            box-shadow: 0 4px 10px rgba(99, 102, 241, 0.2);
        }

        .btn-n8n { background: #6EE7B7; color: #15803D; padding: 10px 20px; border-radius: 12px; border: none; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; }
        
        .table-container { background: white; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #F8FAFC; padding: 12px 20px; text-align: left; font-size: 11px; color: #64748B; text-transform: uppercase; font-weight: 800; }
        td { padding: 16px 20px; border-bottom: 1px solid #F1F5F9; }

        .modal-overlay { 
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.5); z-index: 9999; display: none; justify-content: center; align-items: center; 
            backdrop-filter: blur(4px);
        }
    </style>

    <div class="llamadas-wrapper animate-in">
        <div class="header-llamadas">
            <h1 class="titulo-llamadas">Gestión de Llamadas</h1>
        </div>

        <div class="action-bar">
            <button class="btn-nueva-llamada" id="btn-nueva-llamada">
                <i data-lucide="plus" class="w-4 h-4"></i> Nueva Llamada
            </button>

            <button class="btn-n8n" id="btn-n8n-flow">
                <i data-lucide="share-2" class="w-4 h-4"></i> Iniciar flujo con n8n
            </button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Candidato / Motivo</th>
                        <th>Teléfono</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody id="lista-llamadas"></tbody>
            </table>
        </div>
    </div>
    
    <div id="modalNuevaLlamada" class="modal-overlay">
        <div style="background: white; padding: 30px; border-radius: 24px; width: 400px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <h2 style="font-weight: 800; font-size: 20px;">Nueva Llamada</h2>
                <button id="cerrarModal" style="border:none; background:none; cursor:pointer; font-size: 20px;">&times;</button>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display:block; font-weight:600; font-size:12px; margin-bottom:5px;">Nombre</label>
                <input type="text" id="nuevoNombre" style="width:100%; padding:10px; border-radius:10px; border:1px solid #E2E8F0;">
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display:block; font-weight:600; font-size:12px; margin-bottom:5px;">Teléfono</label>
                <input type="text" id="nuevoTel" style="width:100%; padding:10px; border-radius:10px; border:1px solid #E2E8F0;">
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display:block; font-weight:600; font-size:12px; margin-bottom:5px;">Motivo</label>
                <textarea id="detalleMotivo" rows="3" style="width:100%; padding:10px; border-radius:10px; border:1px solid #E2E8F0;"></textarea>
            </div>

            <div style="display:flex; justify-content: flex-end; gap:10px;">
                <button id="btnCancelar" style="padding:10px 20px; border:none; background:#F1F5F9; border-radius:10px; cursor:pointer;">Cancelar</button>
                <button id="btnGuardarLlamada" style="padding:10px 20px; border:none; background:#6366F1; color:white; border-radius:10px; cursor:pointer;">Guardar</button>
            </div>
        </div>
    </div>
    `,

    logic: function() {
        const self = this;
        const tabla = document.getElementById('lista-llamadas');
        const modal = document.getElementById('modalNuevaLlamada');
        const btnAbrir = document.getElementById('btn-nueva-llamada');
        const btnN8n = document.getElementById('btn-n8n-flow');
        let indexEdicion = null;

        // Cargamos los candidatos reales en lugar de la lista de ejemplo
        let candidatos = JSON.parse(localStorage.getItem('candidatos_riwicalls')) || [];
        console.log("Candidatos cargados:", candidatos);
        // Función para renderizar la tabla
        const renderizarFilas = (datos) => {
            if (!tabla) return;
    // Usamos los candidatos del LocalStorage
    tabla.innerHTML = candidatos.map((c, index) => {
        const nombreReal = c.nombre || c.Nombre || "Sin nombre";
        const yaSeLlamo = c.estado !== 'Inscrito';
        // Requisito 2: Fecha vacía si no se ha llamado
        const fechaMostrar = yaSeLlamo ? (c.fechaLlamada || '') : '';

        return `
            <tr>
                <td>
                    <div class="font-bold text-slate-700">${nombreReal}</div>
                    <div style="font-size: 11px; color: #6366F1; font-weight:500;">${c.motivo || ''}</div>
                </td>
                <td class="text-slate-600">${c.tel || c.Telefono || ''}</td>
                <td><span class="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold">${c.estado}</span></td>
                <td class="text-slate-400 text-xs">${fechaMostrar}</td>
                <td>
                    <div style="display:flex; gap:12px; align-items:center;">
                        <i data-lucide="phone" style="color: #94A3B8; width: 16px;"></i>
                        <button class="btn-editar-gestion" data-index="${index}" style="border:none; background:none; cursor:pointer; padding:0;">
                            <i data-lucide="pencil" style="color: #6366F1; width: 16px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    if (window.lucide) lucide.createIcons();

    // Evento para los lápices
    document.querySelectorAll('.btn-editar-gestion').forEach(btn => {
        btn.onclick = () => {
            indexEdicion = btn.getAttribute('data-index');
            const cand = candidatos[indexEdicion];
            // Llenamos el modal con la info del candidato
            document.getElementById('nuevoNombre').value = cand.nombre || cand.Nombre;
            document.getElementById('nuevoTel').value = cand.tel || cand.Telefono;
            document.getElementById('detalleMotivo').value = cand.motivo || '';
            modal.style.display = 'flex';
        };
    });
        };

        // --- CONEXIÓN CON n8n (Desde la configuración) ---
        if (btnN8n) {
            btnN8n.addEventListener('click', async () => {
                // Buscamos la URL en el localStorage (donde la guardó la vista configuración)
                const urlConfigurada = localStorage.getItem('webhook_n8n_url');

                if (!urlConfigurada) {
                    alert('⚠️ Primero debes configurar la URL del Webhook en la sección de Configuración.');
                    return;
                }

                btnN8n.innerHTML = 'Enviando...';
                btnN8n.disabled = true;

                try {
                    const respuesta = await fetch(urlConfigurada, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            proyecto: "RiwiCalls",
                            usuario: "Andrea Lizcano",
                            datos: self._historialLlamadas
                        })
                    });

                    if (respuesta.ok) alert(' Flujo de n8n iniciado con éxito.');
                } catch (error) {
                    alert(' Error de conexión con n8n. Revisa la URL en Configuración.');
                } finally {
                    btnN8n.innerHTML = '<i data-lucide="share-2" class="w-4 h-4"></i> Iniciar flujo con n8n';
                    btnN8n.disabled = false;
                    if (window.lucide) lucide.createIcons();
                }
            });
        }

        // --- LÓGICA MODAL NUEVA LLAMADA ---
        btnAbrir?.addEventListener('click', () => modal.style.display = 'flex');
        
        const cerrarModal = () => modal.style.display = 'none';
        document.getElementById('cerrarModal')?.addEventListener('click', cerrarModal);
        document.getElementById('btnCancelar')?.addEventListener('click', cerrarModal);

        document.getElementById('btnGuardarLlamada')?.addEventListener('click', () => {
            const motivo = document.getElementById('detalleMotivo').value;

            if (indexEdicion !== null) {
                // Guardamos el motivo y actualizamos la fecha si es necesario
                if (candidatos[indexEdicion].estado === 'Inscrito') {
                    candidatos[indexEdicion].estado = 'Llamar'; // Cambiamos el estado automáticamente
                    candidatos[indexEdicion].fechaLlamada = new Date().toLocaleString();
                }
                
                candidatos[indexEdicion].motivo = motivo;

                // Guardamos en LocalStorage para que persista
                localStorage.setItem('candidatos_riwicalls', JSON.stringify(candidatos));
                
                renderizarFilas(candidatos); // Refrescamos la tabla
                modal.style.display = 'none';
                indexEdicion = null; // Reset
            
                
                // Limpiar inputs
                document.getElementById('nuevoNombre').value = '';
                document.getElementById('nuevoTel').value = '';
                document.getElementById('detalleMotivo').value = '';
            } else {
                alert("Llena nombre y teléfono");
            }
        });

        renderizarFilas(candidatos);
    }
};