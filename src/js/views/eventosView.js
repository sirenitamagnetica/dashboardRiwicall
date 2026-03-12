export const eventosView = {
    title: 'Sistema de Eventos',

    // 1. DATOS PRIVADOS
    _eventos: [
        {
            titulo: 'Charla informativa',
            tipo: 'Charla',
            fecha: '25/2/2026, 8:33:00 a. m.',
            candidato: 'Sofía Hernández',
            descripcion: 'Presentación del programa y metodología.',
            estado: 'Programado'
        },
        {
            titulo: 'Entrevista inicial',
            tipo: 'Entrevista',
            fecha: '22/2/2026, 8:33:00 a. m.',
            candidato: 'Laura Rodríguez',
            descripcion: 'Primera entrevista de admisión técnica.',
            estado: 'Programado',
            destacado: true 
        }
    ],

    // 2. ESTRUCTURA (Template)
    template: `
    <style>
        .eventos-wrapper { padding: 32px; background: #F8FAFC; min-height: 100vh; }
        .btn-nuevo-evento { background: #6366F1; color: white; padding: 10px 20px; border-radius: 12px; font-weight: 600; display: flex; align-items: center; gap: 8px; border: none; cursor: pointer; margin-bottom: 30px; transition: 0.2s; }
        .btn-nuevo-evento:hover { background: #4F46E5; transform: translateY(-2px); }

        .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        
        .event-card { background: white; border-radius: 20px; padding: 24px; border: 1px solid #E2E8F0; position: relative; transition: all 0.3s ease; }
        .event-card.destacada { border: 2px solid #6366F1; box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.1); }
        .event-card:hover { border-color: #C7D2FE; }

        .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
        .card-title { font-size: 18px; font-weight: 700; color: #1E293B; }
        .card-status { font-size: 10px; font-weight: 800; color: #6366F1; background: #EEF2FF; padding: 4px 8px; border-radius: 6px; text-transform: uppercase; }
        .card-subtitle { font-size: 13px; color: #64748B; margin-bottom: 16px; font-weight: 500; }

        .info-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #64748B; margin-bottom: 8px; }
        .card-desc { font-size: 13px; color: #64748B; margin-top: 12px; margin-bottom: 20px; line-height: 1.5; }

        .card-actions { display: flex; gap: 16px; padding-top: 16px; border-top: 1px solid #F1F5F9; color: #94A3B8; }
        .card-actions i { cursor: pointer; transition: 0.2s; }
        .card-actions i:hover { color: #6366F1; }
    </style>

    <div class="eventos-wrapper animate-in">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-black text-slate-800">Próximos Eventos</h1>
            <button class="btn-nuevo-evento" id="btn-add-event">
                <i data-lucide="plus" class="w-4 h-4"></i> Nuevo Evento
            </button>
        </div>

        <div class="cards-grid" id="grid-eventos">
            </div>
    </div>
        <div id="modalNuevoEvento" class="modal-overlay" style="display:none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.4); z-index: 9999; justify-content: center; align-items: center; backdrop-filter: blur(8px);">
    <div style="background: white; padding: 32px; border-radius: 32px; width: 500px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15); border: 1px solid #F1F5F9;">
        <h2 style="font-weight: 800; font-size: 24px; margin-bottom: 28px; color: #1E293B;">Nuevo Evento</h2>
        
        <div style="margin-bottom: 20px;">
            <label style="display:block; font-weight:600; font-size:13px; margin-bottom:10px; color:#64748B;">Nombre del Evento</label>
            <input type="text" id="evNombre" placeholder="Nombre del evento" style="width:100%; padding:14px 18px; border-radius:16px; border:1px solid #E2E8F0; outline:none; font-size: 15px; color: #1E293B;">
        </div>

        <div style="display:flex; gap:16px; margin-bottom: 20px;">
            <div style="flex:1;">
                <label style="display:block; font-weight:600; font-size:13px; margin-bottom:10px; color:#64748B;">Tipo</label>
                <select id="evTipo" style="width:100%; padding:14px; border-radius:16px; border:1px solid #E2E8F0; outline:none; background: #fff; font-size: 15px; cursor: pointer;">
                    <option value="Reunión">Reunión</option>
                    <option value="Entrevista">Entrevista</option>
                    <option value="Charla">Charla</option>
                    <option value="Prueba">Prueba</option>
                </select>
            </div>
            <div style="flex:1;">
                <label style="display:block; font-weight:600; font-size:13px; margin-bottom:10px; color:#64748B;">Estado</label>
                <select id="evEstado" style="width:100%; padding:14px; border-radius:16px; border:1px solid #E2E8F0; outline:none; background: #fff; font-size: 15px; cursor: pointer;">
                    <option value="Programado">Programado</option>
                    <option value="En curso">En curso</option>
                    <option value="Completado">Completado</option>
                </select>
            </div>
        </div>

        <div style="margin-bottom: 20px;">
            <label style="display:block; font-weight:600; font-size:13px; margin-bottom:10px; color:#64748B;">Fecha y Hora</label>
            <input type="datetime-local" id="evFecha" style="width:100%; padding:14px 18px; border-radius:16px; border:1px solid #E2E8F0; outline:none; font-size: 15px; color: #1E293B;">
        </div>

        <div style="margin-bottom: 20px;">
            <label style="display:block; font-weight:600; font-size:13px; margin-bottom:10px; color:#64748B;">Candidato (opcional)</label>
            <select id="evCandidato" style="width:100%; padding:14px; border-radius:16px; border:2px solid #C7D2FE; outline:none; background: #fff; font-size: 15px; cursor: pointer;">
                <option value="Ninguno">Ninguno</option>
            </select>
        </div>

        <div style="margin-bottom: 28px;">
            <label style="display:block; font-weight:600; font-size:13px; margin-bottom:10px; color:#64748B;">Descripción</label>
            <textarea id="evDescripcion" rows="2" placeholder="Nota del evento..." style="width:100%; padding:14px 18px; border-radius:16px; border:1px solid #E2E8F0; outline:none; font-size: 15px; font-family: inherit; resize: none;"></textarea>
        </div>

        <div style="display:flex; gap:12px;">
            <button id="btnGuardarEvento" style="flex: 2; padding:16px; border:none; background:#6366F1; color:white; border-radius:16px; font-weight:700; font-size: 16px; cursor:pointer; box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);">Crear Evento</button>
            <button id="btnCerrarEv" style="flex: 1; padding:16px; border:1px solid #E2E8F0; background:white; color:#64748B; border-radius:16px; font-weight:600; cursor:pointer;">Cancelar</button>
        </div>
    </div>
</div>
    
        </div>
    `,

    
    // 3. LÓGICA (Renderizado y Eventos)
    logic: function() {
        const self = this;
        const grid = document.getElementById('grid-eventos');
        const modalEv = document.getElementById('modalNuevoEvento');
        const selectCand = document.getElementById('evCandidato');
        const btnCerrarEv = document.getElementById('btnCerrarEv');
        const btnGuardarEv = document.getElementById('btnGuardarEvento');
        let editIndex = null;
        
        const cargarCandidatosDinamicos = () => {
            // Leemos de la misma lista que usa la vista de Candidatos y Llamadas
            const lista = JSON.parse(localStorage.getItem('candidatos_riwicalls')) || [];
            
            // Limpiamos y dejamos solo la opción por defecto
            selectCand.innerHTML = '<option value="Ninguno">Ninguno</option>';
            
            // Creamos una opción por cada candidato real
            lista.forEach(c => {
                const nombre = c.nombre || c.Nombre || "Sin nombre";
                const opt = document.createElement('option');
                opt.value = nombre;
                opt.textContent = nombre;
                selectCand.appendChild(opt);
            });
        }
        const btnAbrirEv = document.getElementById('btn-add-event');

        // Cargar eventos del LocalStorage o usar los de ejemplo si está vacío
        let eventosGuardados = JSON.parse(localStorage.getItem('eventos_riwicalls')) || self._eventos;

        // Función para pintar tarjetas (encapsulada para poder reutilizarla)
        const renderizarCards = (lista) => {
            grid.innerHTML = lista.map((ev, index) => `
                <div class="event-card ${ev.destacado ? 'destacada' : ''}">
                    <div class="card-header">
                        <h3 class="card-title">${ev.titulo || ev.nombre}</h3>
                        <span class="card-status">${ev.estado}</span>
                    </div>
                    <p class="card-subtitle">${ev.tipo}</p>
                    
                    <div class="info-row">
                        <i data-lucide="calendar" class="w-4 h-4"></i>
                        <span>${ev.fecha}</span>
                    </div>
                    ${ev.candidato ? `
                    <div class="info-row">
                        <i data-lucide="user" class="w-4 h-4"></i>
                        <span>Candidato: ${ev.candidato}</span>
                    </div>` : ''}
                    
                    <p class="card-desc">${ev.descripcion}</p>
                    
                    <div class="card-actions">
                        <i data-lucide="pencil" class="w-4 h-4 edit-ev" data-index="${index}"></i>
                        <i data-lucide="trash-2" class="w-4 h-4 delete-ev" data-index="${index}"></i>
                    </div>
                </div>
            `).join('');
            if (window.lucide) lucide.createIcons();
        };

        // Pintar al cargar
        renderizarCards(eventosGuardados);

        // --- EVENTOS DEL MODAL ---
        
        // Abrir modal
        if (btnAbrirEv) {
            btnAbrirEv.onclick = () => {
                cargarCandidatosDinamicos();
                modalEv.style.display = 'flex';
            };
        }

        // Cerrar modal
        btnCerrarEv.onclick = () => {
            modalEv.style.display = 'none';
        };

        // Guardar Evento
        btnGuardarEv.onclick = () => {
            const nombre = document.getElementById('evNombre').value;
            
            const fecha = document.getElementById('evFecha').value;
            let fechaFinal = (editIndex !== null && !fecha) ? eventosGuardados[editIndex].fecha : fecha;
            
            const datosEvento = {
                titulo: document.getElementById('evNombre').value,
                tipo: document.getElementById('evTipo').value,
                estado: document.getElementById('evEstado').value,
                fecha: document.getElementById('evFecha').value || new Date().toLocaleString(),
                candidato: document.getElementById('evCandidato').value,
                descripcion: document.getElementById('evDescripcion').value
            };

            if (editIndex !== null) {
                // CIRUGÍA: Si estamos editando, reemplazamos en la posición exacta
                eventosGuardados[editIndex] = datosEvento;
                editIndex = null; // Reseteamos para la próxima
            } else {
                // Si no, lo agregamos al final como siempre
                eventosGuardados.push(datosEvento);
            }

localStorage.setItem('eventos_riwicalls', JSON.stringify(eventosGuardados));
renderizarCards(eventosGuardados);
modalEv.style.display = 'none';

            if (nombre && fecha) {
                const nuevoEvento = {
                    nombre: nombre,
                    tipo: document.getElementById('evTipo').value,
                    estado: document.getElementById('evEstado').value,
                    fecha: fecha,
                    descripcion: document.getElementById('evDescripcion').value
                };

                eventosGuardados.push(nuevoEvento);
                localStorage.setItem('eventos_riwicalls', JSON.stringify(eventosGuardados));
                
                // Actualizar vista y cerrar
                renderizarCards(eventosGuardados);
                modalEv.style.display = 'none';
                
                // Limpiar campos
                document.getElementById('evNombre').value = '';
                document.getElementById('evFecha').value = '';
                document.getElementById('evDescripcion').value = '';
            } else {
                alert("Datos guardados con exito");
            }
        };

        // Delegación de eventos para eliminar
        grid.onclick = (e) => {
            if (e.target.classList.contains('delete-ev') || e.target.closest('.delete-ev')) {
                const icon = e.target.classList.contains('delete-ev') ? e.target : e.target.closest('.delete-ev');
                const index = icon.getAttribute('data-index');
                
                if(confirm('¿Seguro que quieres eliminar este evento?')) {
                    eventosGuardados.splice(index, 1);
                    localStorage.setItem('eventos_riwicalls', JSON.stringify(eventosGuardados));
                    renderizarCards(eventosGuardados);
                }
            }

            // Delegación para EDITAR
        grid.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-ev');
            if (editBtn) {
                editIndex = editBtn.getAttribute('data-index');
                const ev = eventosGuardados[editIndex];

                // Llenamos el modal con la info actual
                document.getElementById('evNombre').value = ev.titulo || ev.nombre;
                document.getElementById('evTipo').value = ev.tipo;
                document.getElementById('evEstado').value = ev.estado;
                document.getElementById('evDescripcion').value = ev.descripcion;
                
                // Para la fecha, si es un objeto Date, hay que formatearlo al input
                // Por ahora lo dejamos vacío o asegúrate de que el formato coincida
                
                cargarCandidatosDinamicos();
                document.getElementById('evCandidato').value = ev.candidato || "Ninguno";
                
                modalEv.style.display = 'flex';
            }
        });


        };
    }
};