// src/js/views/candidatosView.js

export const candidatosView = {
    title: 'Gestión de Candidatos',

    // Datos iniciales
    _listaOriginal: [
        { nombre: 'Laura Rodríguez', cedula: '1001234570', edad: 28, genero: 'Femenino', tel: '3001234570', municipio: 'Medellín', educacion: 'Profesional', programacion: 'Intermedio', jornada: 'Tarde', estado: 'En proceso' },
        { nombre: 'Carlos Mario Ruiz', cedula: '1001234571', edad: 22, genero: 'Masculino', tel: '3012345678', municipio: 'Bello', educacion: 'Técnico', programacion: 'Básico', jornada: 'Mañana', estado: 'Inscrito' },
        { nombre: 'Diego Alejandro Vargas', cedula: '1001234573', edad: 30, genero: 'Masculino', tel: '3001234573', municipio: 'Envigado', educacion: 'Profesional', programacion: 'Avanzado', jornada: 'Mañana', estado: 'Admitido' }
    ],

    template: `
    <div class="p-6 space-y-6 animate-in">
        
        <div class="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div class="relative flex-1 min-w-[300px]">
                <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"></i>
                <input type="text" id="searchInput" placeholder="Buscar por nombre, cédula o teléfono..." 
                    class="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
            </div>

            <div class="relative">
                <select id="filtroEstado" class="appearance-none pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-600 focus:outline-none hover:bg-slate-50 cursor-pointer transition-all">
                    <option value="Todos">Todos los estados</option>
                    <option value="Inscrito">Inscrito</option>
                    <option value="Llamar">Llamar</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Admitido">Admitido</option>
                    <option value="No Interesado">No Interesado</option>
                    
                    
                </select>
                <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"></i>
            </div>

            <div class="relative">
                <select id="filtroGenero" class="appearance-none pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-600 focus:outline-none hover:bg-slate-50 cursor-pointer transition-all">
                    <option value="Todos">Género: Todos</option>
                    <option value="Masculino">Hombre</option>
                    <option value="Femenino">Mujer</option>
                    <option value="Otro">Otro</option>
                </select>
                <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"></i>
            </div>

            <button id="btnNuevoCandidato" class="flex items-center gap-2 px-6 py-3 bg-[#6366f1] text-white rounded-2xl font-bold hover:bg-[#4f46e5] transition-all shadow-lg shadow-indigo-100">
                <i data-lucide="plus" class="w-5 h-5"></i> Nuevo Candidato
            </button>

            <div class="relative inline-block text-left" id="dropdownContainer">
            <button id="btnDropdownImportar" class="flex items-center gap-2 px-6 py-3 bg-[#71c9a7] text-white rounded-2xl font-bold hover:bg-[#5eb594] transition-all shadow-lg shadow-emerald-50">
                <i data-lucide="upload" class="w-5 h-5"></i> 
                Importar Candidatos 
                <i data-lucide="chevron-down" class="w-4 h-4"></i>
            </button>

            <div id="menuImportar" class="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 hidden animate-in fade-in zoom-in duration-200">
                <div class="p-2 space-y-1">
                    <button id="optExcel" class="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors group">
                        <i data-lucide="upload" class="w-4 h-4 text-indigo-500"></i>
                        <span class="font-medium">Importar desde Excel</span>
                    </button>
                    
                    <button id="optDatabase" class="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                        <i data-lucide="database" class="w-4 h-4 text-indigo-500"></i>
                        <span class="font-medium">Conectar a base de datos</span>
                    </button>
                </div>
            </div>
        </div>

        <input type="file" id="inputFileExcel" accept=".xlsx, .xls, .csv" class="hidden">
        

        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full border-collapse min-w-[1000px]">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-100">
                            <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase text-left">Nombre</th>
                            <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase text-left">Cédula</th>
                            <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase text-left">Edad</th>
                            <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase text-left">Género</th>
                            <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase text-left">Teléfono</th>
                            <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase text-left">Municipio</th>
                            <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase text-left">Educación</th>
                            <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase text-left">Programación</th>
                            <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase text-left">Jornada</th>
                            <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase text-left">Estado</th>
                            <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase text-left text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="cuerpoTabla" class="divide-y divide-slate-50"></tbody>
                </table>
            </div>
        </div>
    </div>

    <div id="modalRegistro" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
    <div class="bg-white rounded-[2rem] p-10 w-full max-w-2xl shadow-2xl relative animate-in zoom-in duration-200">
        <button id="btnCerrarX" class="absolute right-8 top-8 text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-6 h-6"></i>
        </button>
        
        <h2 class="text-2xl font-bold mb-8 text-[#1e293b]">Nuevo Candidato</h2>
        
        <div class="grid grid-cols-2 gap-x-8 gap-y-5">
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-500 ml-1">Nombre</label>
                <input type="text" id="regNombre" class="w-full p-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10">
            </div>
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-500 ml-1">Apellido</label>
                <input type="text" id="regApellido" class="w-full p-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10">
            </div>
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-500 ml-1">Cédula</label>
                <input type="text" id="regCedula" class="w-full p-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10">
            </div>
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-500 ml-1">Edad</label>
                <input type="number" id="regEdad" value="18" class="w-full p-3.5 bg-white border border-slate-200 rounded-2xl outline-none">
            </div>
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-500 ml-1">Género</label>
                <select id="regGenero" class="w-full p-3.5 bg-white border border-slate-200 rounded-2xl outline-none appearance-none">
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
            </div>
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-500 ml-1">Municipio</label>
                <input type="text" id="regMunicipio" value="Medellín" class="w-full p-3.5 bg-white border border-slate-200 rounded-2xl outline-none">
            </div>

            
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-500 ml-1">Teléfono</label>
                <input type="text" id="regTel" class="w-full p-3.5 bg-white border border-slate-200 rounded-2xl outline-none">
            </div>
            
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-500 ml-1">Nivel Educativo</label>
                <select id="regEducacion" class="w-full p-3.5 bg-white border border-slate-200 rounded-2xl outline-none">
                    <option value="Bachiller">Bachiller</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Tecnólogo">Tecnólogo</option>
                    <option value="Profesional">Profesional</option>
                </select>
            </div>
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-500 ml-1">Nivel Programación</label>
                <select id="regProgramacion" class="w-full p-3.5 bg-white border border-slate-200 rounded-2xl outline-none">
                    <option value="Ninguno">Ninguno</option>
                    <option value="Básico">Básico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                </select>
            </div>
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-500 ml-1">Jornada</label>
                <select id="regJornada" class="w-full p-3.5 bg-white border border-slate-200 rounded-2xl outline-none">
                    <option value="Mañana">Mañana</option>
                    <option value="Tarde">Tarde</option>
                </select>
            </div>
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-500 ml-1">Estado</label>
                <select id="regEstado" class="w-full p-3.5 bg-white border border-slate-200 rounded-2xl outline-none">
                    <option value="Inscrito">Inscrito</option>
                    <option value="Llamar">Llamar</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Admitido">Admitido</option>
                    <option value="No Interesado">No interesado</option>
                </select>
            </div>
        </div>

        <div class="flex gap-4 mt-10">
            <button id="btnGuardar" class="flex-1 py-4 bg-[#6366f1] text-white rounded-2xl font-bold text-lg hover:bg-[#4f46e5] shadow-lg shadow-indigo-100 transition-all">Crear Candidato</button>
            <button id="btnCancelar" class="px-10 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-bold hover:bg-slate-50">Cancelar</button>
            </div>
        </div>
    </div>

    <div id="modalDB" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] hidden items-center justify-center p-4">
        <div class="bg-white rounded-[2rem] p-10 w-full max-w-lg shadow-2xl relative animate-in zoom-in duration-200">
            <button id="btnCerrarDB" class="absolute right-8 top-8 text-slate-400 hover:text-slate-600">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
            
            <h2 class="text-2xl font-bold mb-2 text-[#1e293b]">Conectar a Base de Datos</h2>
            <p class="text-slate-500 text-sm mb-8 leading-relaxed">
                Conecta una base de datos externa (Supabase, API REST, etc.) para importar candidatos automáticamente.
            </p>
            
            <div class="space-y-6">
                <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-500 ml-1">Nombre de la conexión</label>
                    <input type="text" id="dbNombre" placeholder="Ej: BD Producción RIWI" 
                        class="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                </div>

                <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-500 ml-1">URL de la base de datos</label>
                    <input type="text" id="dbUrl" placeholder="https://proyecto.supabase.co?apikey=tu_anon_key" 
                        class="w-full p-4 bg-white border border-indigo-400 rounded-2xl outline-none ring-2 ring-indigo-500/10 transition-all">
                    <p class="text-[11px] text-slate-400 ml-1">
                        Para Supabase: <span class="text-indigo-400">https://tu-proyecto.supabase.co?apikey=tu_anon_key</span><br>
                        Para API REST: cualquier URL que retorne un array JSON de candidatos.
                    </p>
                </div>

                <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-500 ml-1">Nombre de la tabla</label>
                    <input type="text" id="dbTabla" value="candidatos" 
                        class="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                </div>
            </div>

            <div class="flex gap-4 mt-10">
                <button id="btnSincronizar" class="flex-1 py-4 bg-[#6366f1] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#4f46e5] shadow-lg shadow-indigo-100 transition-all">
                    <i data-lucide="database" class="w-5 h-5"></i>
                    Conectar y Sincronizar
                </button>
                <button id="btnCancelarDB" class="px-8 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                    Cancelar
                </button>
            </div>
        </div>
    </div>
        `,

    logic: function() {
    const self = this;
    
    // --- 1. ELEMENTOS DEL DOM ---
    const inputBusqueda = document.getElementById('searchInput');
    const selectEstado = document.getElementById('filtroEstado');
    const selectGenero = document.getElementById('filtroGenero');
    const modal = document.getElementById('modalRegistro');
    const btnDropdown = document.getElementById('btnDropdownImportar');
    const menuImportar = document.getElementById('menuImportar');
    const optExcel = document.getElementById('optExcel');
    const inputFile = document.getElementById('inputFileExcel');
    const modalDB = document.getElementById('modalDB');
    const optDatabase = document.getElementById('optDatabase');
    const btnSincronizar = document.getElementById('btnSincronizar');
    
    // --- 2. ESTADO Y MEMORIA ---
    let editandoIndex = null; 
    const datosEnMemoria = localStorage.getItem('candidatos_riwicalls');
    self._listaOriginal = datosEnMemoria ? JSON.parse(datosEnMemoria) : [];

    const guardarEnLocal = () => {
        localStorage.setItem('candidatos_riwicalls', JSON.stringify(self._listaOriginal));
    };

    // --- 3. FUNCIONES PRINCIPALES ---

    const actualizarTabla = (datos) => {
        const tbody = document.getElementById('cuerpoTabla');
        if (!tbody) return;

        tbody.innerHTML = datos.map((c, index) => `
            <tr class="hover:bg-slate-50/50 transition-colors text-sm">
                <td class="px-6 py-4 font-bold text-slate-700">${c.nombre}</td>
                <td class="px-6 py-4 text-slate-500">${c.cedula}</td>
                <td class="px-6 py-4 text-slate-500">${c.edad}</td>
                <td class="px-6 py-4 text-slate-500">${c.genero}</td>
                <td class="px-6 py-4 text-slate-500">${c.tel || ''}</td>
                <td class="px-6 py-4 text-slate-500">${c.municipio}</td>
                <td class="px-6 py-4 text-slate-500">${c.educacion}</td>
                <td class="px-6 py-4 text-slate-500">${c.programacion}</td>
                <td class="px-6 py-4 text-slate-500">${c.jornada}</td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[11px] font-bold">${c.estado}</span>
                </td>
                <td class="px-6 py-4 text-center">
                    <div class="flex items-center justify-center gap-3">
                        <button class="btn-editar text-blue-400 hover:text-blue-600 transition-colors" data-index="${index}">
                            <i data-lucide="pencil" class="w-4 h-4"></i>
                        </button>
                        <button class="btn-eliminar text-red-400 hover:text-red-600 transition-colors" data-index="${index}">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        if (window.lucide) lucide.createIcons();

        // Eventos de Editar
        tbody.querySelectorAll('.btn-editar').forEach(btn => {
            btn.onclick = () => {
                const index = btn.getAttribute('data-index');
                const c = datos[index];
                editandoIndex = self._listaOriginal.indexOf(c); // Buscamos el índice real en la lista original

                document.querySelector('#modalRegistro h2').innerText = "Editar Candidato";
                document.getElementById('btnGuardar').innerText = "Guardar Cambios";

                // Llenar todos los campos para editar
                const nombres = c.nombre.split(' ');
                document.getElementById('regNombre').value = nombres[0] || '';
                document.getElementById('regApellido').value = nombres.slice(1).join(' ') || '';
                document.getElementById('regCedula').value = c.cedula;
                document.getElementById('regEdad').value = c.edad;
                document.getElementById('regGenero').value = c.genero;
                document.getElementById('regTel').value = c.tel || '';
                document.getElementById('regMunicipio').value = c.municipio;
                document.getElementById('regEducacion').value = c.educacion;
                document.getElementById('regProgramacion').value = c.programacion;
                document.getElementById('regJornada').value = c.jornada;
                document.getElementById('regEstado').value = c.estado;

                modal.classList.remove('hidden');
                modal.classList.add('flex');
            };
        });

        // Eventos de Eliminar
        tbody.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.onclick = () => {
                const index = btn.getAttribute('data-index');
                const c = datos[index];
                if(confirm(`¿Estás seguro de eliminar a ${c.nombre}?`)) {
                    const realIndex = self._listaOriginal.indexOf(c);
                    self._listaOriginal.splice(realIndex, 1);
                    guardarEnLocal();
                    filtrar();
                }
            };
        });
    };

    const filtrar = () => {
        const busqueda = inputBusqueda.value.toLowerCase();
        const filtrados = self._listaOriginal.filter(c => {
            const matchBusqueda = c.nombre.toLowerCase().includes(busqueda) || c.cedula.includes(busqueda);
            const matchEstado = selectEstado.value === "Todos" || c.estado === selectEstado.value;
            const matchGenero = selectGenero.value === "Todos" || c.genero === selectGenero.value;
            return matchBusqueda && matchEstado && matchGenero;
        });
        actualizarTabla(filtrados);
    };

    const cerrar = () => { 
        modal.classList.add('hidden'); 
        modal.classList.remove('flex'); 
        editandoIndex = null;
        document.querySelector('#modalRegistro h2').innerText = "Nuevo Candidato";
        document.getElementById('btnGuardar').innerText = "Crear Candidato";
        document.querySelectorAll('#modalRegistro input, #modalRegistro select').forEach(el => {
            el.value = el.defaultValue || (el.tagName === 'SELECT' ? el.options[0].value : '');
        });
    };

    // --- 4. EVENTOS DE BOTONES Y FORMULARIOS ---

    inputBusqueda.addEventListener('input', filtrar);
    selectEstado.addEventListener('change', filtrar);
    selectGenero.addEventListener('change', filtrar);

    document.getElementById('btnNuevoCandidato').onclick = () => { 
        cerrar(); // Limpia antes de abrir como nuevo
        modal.classList.remove('hidden'); 
        modal.classList.add('flex'); 
    };
    
    document.getElementById('btnCancelar').onclick = cerrar;
    document.getElementById('btnCerrarX').onclick = cerrar;

    document.getElementById('btnGuardar').onclick = () => {
        const nuevo = {
            nombre: document.getElementById('regNombre').value + " " + document.getElementById('regApellido').value,
            cedula: document.getElementById('regCedula').value,
            edad: document.getElementById('regEdad').value,
            genero: document.getElementById('regGenero').value,
            tel: document.getElementById('regTel').value,
            municipio: document.getElementById('regMunicipio').value,
            educacion: document.getElementById('regEducacion').value,
            programacion: document.getElementById('regProgramacion').value,
            jornada: document.getElementById('regJornada').value,
            estado: document.getElementById('regEstado').value
        };

        if (nuevo.nombre.trim() && nuevo.cedula) {
            if (editandoIndex !== null) {
                self._listaOriginal[editandoIndex] = nuevo;
                alert("¡Candidato actualizado!");
            } else {
                self._listaOriginal.unshift(nuevo);
                alert("¡Candidato creado!");
            }
            guardarEnLocal();
            filtrar(); 
            cerrar(); 
        } else { 
            alert("El nombre y la cédula son obligatorios.");
        }
    };

    // --- 5. EXCEL E IMPORTACIÓN ---

    btnDropdown.onclick = (e) => {
        e.stopPropagation();
        menuImportar.classList.toggle('hidden');
    };

    document.addEventListener('click', () => menuImportar.classList.add('hidden'));

    optExcel.onclick = () => inputFile.click();

    inputFile.onchange = (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const data = evt.target.result;
                const workbook = XLSX.read(data, { type: 'array' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const datosCrudos = XLSX.utils.sheet_to_json(sheet);

                // Normaliza el campo "estado" desde distintas cabeceras/formatos del Excel
                const normalizarEstado = (v) => {
                    // No forzar "Inscrito" por defecto: devolver cadena vacía si no hay valor
                    if (v === undefined || v === null) return '';
                    const s = String(v).trim();
                    if (!s) return '';
                    const lower = s.toLowerCase();
                    if (lower.includes('inscr')) return 'Inscrito';
                    if (lower.includes('llam')) return 'Llamar';
                    if (lower.includes('proceso')) return 'En proceso';
                    if (lower.includes('admit')) return 'Admitido';
                    if (lower.includes('no') && lower.includes('interes')) return 'No Interesado';
                    // Por defecto, normalizar capitalización
                    return s.charAt(0).toUpperCase() + s.slice(1);
                };

                const nuevos = datosCrudos.map(fila => ({
                    nombre: fila.Nombre || fila.nombre || "Sin nombre",
                    cedula: String(fila.Cedula || fila.cedula || "0"),
                    edad: fila.Edad || fila.edad || 18,
                    genero: fila.Genero || fila.genero || "Otro",
                    tel: String(fila.Telefono || fila.telefono || ""),
                    municipio: fila.Municipio || fila.municipio || "Medellín",
                    educacion: fila.Educacion || "Bachiller",
                    programacion: fila.Programacion || "Ninguno",
                    jornada: fila.Jornada || "Mañana",
                    // buscar distintas cabeceras posibles y normalizar
                    estado: normalizarEstado(fila.Estado || fila.estado || fila['Estado_final'] || fila['Estado Final'] || fila['estado_final'])
                }));

                self._listaOriginal = [...nuevos, ...self._listaOriginal];
                guardarEnLocal();
                filtrar();
                alert(`Importados ${nuevos.length} candidatos.`);
            } catch (err) { alert("Error con el Excel"); }
        };
        reader.readAsArrayBuffer(archivo);
        e.target.value = ""; 
    };

    // --- 6. BASE DE DATOS ---

    optDatabase.onclick = () => { modalDB.classList.remove('hidden'); modalDB.classList.add('flex'); };
    const cerrarDB = () => { modalDB.classList.add('hidden'); modalDB.classList.remove('flex'); };
    document.getElementById('btnCerrarDB').onclick = cerrarDB;
    document.getElementById('btnCancelarDB').onclick = cerrarDB;

    btnSincronizar.onclick = async () => {
        const url = document.getElementById('dbUrl').value;
        if (!url) return alert("URL requerida");
        btnSincronizar.disabled = true;
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (Array.isArray(data)) {
                self._listaOriginal = data;
                guardarEnLocal();
                filtrar();
                alert("Sincronizado");
                cerrarDB();
            }
        } catch (e) { alert("Error de conexión"); }
        finally { btnSincronizar.disabled = false; }
    };

    // --- 7. EJECUCIÓN INICIAL ---
    actualizarTabla(self._listaOriginal);
}
}