// 1. Inicialización (Una sola vez)
const supabaseUrl = 'https://dlxlhjuhyfaehpdxviua.supabase.co';
const supabaseKey = 'sb_publishable_u0VAAueof0hx_AG8bGlNVQ_x_Rr8zHT';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2. Lógica para el formulario (Captura)
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
        if (error) {
            alert('Error al guardar: ' + error.message);
        } else {
            alert('¡Venta registrada con éxito!');
            formCaptura.reset();
        }
    });
}

// 3. Lógica para las Gráficas
async function cargarYRenderizarGraficas() {
    const ctx = document.getElementById('graficoIngresos');
    if (!ctx) return; // Si no hay canvas, no hacemos nada

    const { data: ventas, error } = await supabase.from('ventas').select('*');
    
    if (error || !ventas) {
        console.error('Error al cargar datos:', error);
        return;
    }

    const conteoMarcas = ventas.reduce((acc, venta) => {
        acc[venta.marca] = (acc[venta.marca] || 0) + 1;
        return acc;
    }, {});

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(conteoMarcas),
            datasets: [{
                label: 'Ventas por Marca',
                data: Object.values(conteoMarcas),
                backgroundColor: '#28a745'
            }]
        },
        options: { responsive: true }
    });
}

// Ejecutar carga de gráficas al iniciar
window.addEventListener('load', cargarYRenderizarGraficas);
