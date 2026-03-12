export const seguimientoView = {
    title: 'Seguimiento de Estados',

    
    // 1. DATOS (Agrupados por columnas para facilitar el renderizado)
    _pipelineData: {
        inscritos: [
            { nombre: 'Valentina Torres', id: '3001234574', loc: 'Medellín · Tarde' },
            { nombre: 'Camila Díaz', id: '3001234576', loc: 'Medellín · Tarde' },
            { nombre: 'Carlos Gómez', id: '3001234567', loc: 'Medellín · Mañana' }
        ],
        llamar: [
            { nombre: 'Mateo Ríos', id: '3001234575', loc: 'Sabaneta · Mañana' },
            { nombre: 'Andrés Martínez', id: '3001234569', loc: 'Bello · Mañana' }
        ],
        interesados: [
            { nombre: 'Sofía Hernández', id: '3001234572', loc: 'Medellín · Tarde' },
            { nombre: 'María López', id: '3001234568', loc: 'Medellín · Tarde' }
        ],
        enProceso: [
            { nombre: 'Laura Rodríguez', id: '3001234570', loc: 'Medellín · Tarde' }
        ],
        admitidos: [
            { nombre: 'Juan Pérez', id: '3001234571', loc: 'Envigado · Mañana' }
        ],
                noInteresado: [
            { nombre: 'Juan Gutierrez', id: '3047845321', loc: 'sabaneta · Mañana' }
        ]
    },

    // 2. ESTRUCTURA (Template)
    template: `
    <style>
        .seguimiento-wrapper { padding: 32px; background: #F8FAFC; min-height: 100vh; }
        
        /* Pipeline Summary */
        .pipeline-card { background: white; padding: 24px; border-radius: 20px; border: 1px solid #E2E8F0; margin-bottom: 32px; }
        .pipeline-steps { display: flex; align-items: center; gap: 12px; overflow-x: auto; padding-bottom: 10px; }
        .step-box { background: white; border: 1px solid #E2E8F0; border-radius: 16px; padding: 12px 20px; text-align: center; min-width: 90px; }
        .step-num { display: block; font-size: 22px; font-weight: 800; color: #6366F1; }
        .step-label { font-size: 10px; color: #94A3B8; font-weight: 700; text-transform: uppercase; }

        /* Kanban Layout */
        .kanban-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .kanban-col-title { display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 13px; font-weight: 700; color: #1E293B; border-bottom: 2px solid #E2E8F0; padding-bottom: 8px; }
        .col-count { background: #E2E8F0; color: #64748B; padding: 2px 8px; border-radius: 10px; font-size: 11px; }

        /* Tarjetas */
        .candidate-card { background: white; border-radius: 12px; padding: 14px; border: 1px solid #E2E8F0; margin-bottom: 12px; transition: transform 0.2s; cursor: grab; }
        .candidate-card:hover { transform: scale(1.02); border-color: #6366F1; }
        .can-name { font-size: 13px; font-weight: 700; color: #1E293B; display: block; }
        .can-id { font-size: 11px; color: #94A3B8; }
    </style>

    <div class="seguimiento-wrapper animate-in">
        <div class="pipeline-card">
            <div class="pipeline-steps" id="summary-steps">
                </div>
        </div>

        <div class="kanban-container" id="kanban-board">
            </div>
    </div>
    `,

    //  LÓGICA (Renderizado dinámico)
    logic: function() {
    const self = this;
    const board = document.getElementById('kanban-board');
    const summary = document.getElementById('summary-steps');

    // 1. CARGAR DATOS REALES
    const datosGuardados = localStorage.getItem('candidatos_riwicalls');
    const listaCandidatos = datosGuardados ? JSON.parse(datosGuardados) : [];

    // 2. CREAR EL OBJETO PIPELINE (El que evita el error de undefined)
    // Importante: Las llaves (keys) deben coincidir con las del array "columnas"
    this._pipelineData = {
        'inscritos': [],
        'llamar': [],
        'enProceso': [],
        'admitidos': [],
        'noInteresado': []
    };

    // 3. REPARTIR CANDIDATOS EN LAS COLUMNAS
    listaCandidatos.forEach(can => {
        // Pasamos el estado a minúsculas y quitamos espacios para comparar mejor
        const estadoCandidato = can.estado ? can.estado.toLowerCase() : 'inscritos';
        
        if (estadoCandidato.includes('admitido')) {
            this._pipelineData['admitidos'].push(can);
        } else if (estadoCandidato.includes('proceso')) {
            this._pipelineData['enProceso'].push(can);
        } else if (estadoCandidato.includes('no interesado') || estadoCandidato.includes('nointeresado')) {
            this._pipelineData['noInteresado'].push(can);
        } else if (estadoCandidato.includes('llamar')) {
            this._pipelineData['llamar'].push(can);
        } else {
            this._pipelineData['inscritos'].push(can);
        }
    });

    // Mapeo de nombres internos a etiquetas visuales (Tu código original)
    const columnas = [
        { key: 'inscritos', label: 'Inscritos' },
        { key: 'llamar', label: 'Llamar' },
        { key: 'enProceso', label: 'En proceso' },
        { key: 'admitidos', label: 'Admitidos' },
        { key: 'noInteresado', label: 'No Interesado' }
    ];

    // 4. Renderizar el Resumen (Pipeline)
    if (summary) {
        summary.innerHTML = columnas.map((col, index) => `
            <div class="step-box">
                <span class="step-num">${this._pipelineData[col.key].length}</span>
                <span class="step-label">${col.label}</span>
            </div>
            ${index < columnas.length - 1 ? '<i data-lucide="arrow-right" class="text-slate-300 w-4 h-4"></i>' : ''}
        `).join('');
    }

    // 5. Renderizar el Tablero Kanban
    if (board) {
        board.innerHTML = columnas.map(col => `
            <div class="kanban-col">
                <div class="kanban-col-title">
                    <span>${col.label}</span>
                    <span class="col-count">${this._pipelineData[col.key].length}</span>
                </div>
                <div class="cards-list">
                    ${this._pipelineData[col.key].map(can => `
                        <div class="candidate-card p-3 mb-2 bg-white rounded-lg shadow-sm border border-slate-100">
                            <span class="can-name block font-bold text-slate-700 text-sm">${can.nombre}</span>
                            <span class="can-id block text-[10px] text-slate-400">CC: ${can.cedula}</span>
                            <span class="text-[10px] text-indigo-500 font-medium">${can.municipio || 'Medellín'}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    if (window.lucide) lucide.createIcons();
}
};