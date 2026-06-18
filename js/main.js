// Inicialización del cliente Supabase
const supabaseUrl = 'https://dlxlhjuhyfaehpdxviua.supabase.co';
const supabaseKey = 'sb_publishable_u0VAAueof0hx_AG8bGlNVQ_x_Rr8zHT';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// --- Lógica de Captura (Si estás en la página de captura) ---
const formCaptura = document.getElementById('formCaptura');
if (formCaptura) {
    formCaptura.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener datos del formulario
        const nuevaVenta = {
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

        // Insertar en Supabase
        const { data, error } = await supabase.from('ventas').insert([nuevaVenta]);

        if (error) {
            console.error('Error:', error);
            alert('Error al guardar: ' + error.message);
        } else {
            alert('¡Venta registrada con éxito!');
            formCaptura.reset();
        }
    });
}
