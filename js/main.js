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
