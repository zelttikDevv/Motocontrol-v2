const supabaseUrl = 'https://dlxlhjuhyfaehpdxviua.supabase.co';
const supabaseKey = 'sb_publishable_u0VAAueof0hx_AG8bGlNVQ_x_Rr8zHT';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Captura de datos
const formCaptura = document.getElementById('formCaptura');
if (formCaptura) {
    formCaptura.addEventListener('submit', async (e) => {
        e.preventDefault();
        const datos = {
            sku: document.getElementById('sku').value,
            cliente: document.getElementById('cliente').value,
            marca: document.getElementById('marca').value,
            cilindraje: document.getElementById('cilindraje').value,
            segmento: document.getElementById('segmento').value,
            costo_con_iva: parseFloat(document.getElementById('costo').value),
            tipo_venta: document.getElementById('tipoVenta').value,
            seguro: document.getElementById('seguro').value,
            fecha_venta: document.getElementById('fecha').value
        };
        const { error } = await supabase.from('ventas').insert([datos]);
        if (error) { alert('Error: ' + error.message); } 
        else { alert('Venta guardada con éxito'); formCaptura.reset(); }
    });
}
// --- Lógica para Gráficas (Si estamos en index.html o graficas.html) ---
async function cargarDatosParaGraficas() {
    // 1. Obtener los datos desde Supabase
    const { data: ventas, error } = await supabase
        .from('ventas')
        .select('*');

    if (error) {
        console.error('Error al obtener ventas:', error);
        return;
    }

    // 2. Aquí procesarías los datos según lo que necesites
    // Ejemplo: Contar ventas por marca
    console.log("Datos recibidos:", ventas);
    
    // Si quieres actualizar algo en el DOM:
    if(document.getElementById('marcaTop')) {
        // Lógica simple para mostrar algo en el index
        document.getElementById('marcaTop').innerText = ventas.length > 0 ? ventas[0].marca : "Sin datos";
    }

    // 3. Inicializar gráficas con Chart.js
    // Ejemplo de cómo llamar a una gráfica:
    // renderizarGrafica(ventas);
}

// Ejecutar la carga cuando la página cargue
window.onload = cargarDatosParaGraficas;
