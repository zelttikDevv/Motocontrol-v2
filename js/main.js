const { createClient } = window.supabase;

const supabaseUrl =
'https://dlxlhjuhyfaehpdxviua.supabase.co';

const supabaseKey =
'TU_PUBLISHABLE_KEY';

const supabase =
createClient(
supabaseUrl,
supabaseKey
);

/* ==========================
CAPTURA
========================== */

const form =
document.getElementById("formCaptura");

if(form){

form.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const venta = {

sku:
document.getElementById("sku").value,

cliente:
document.getElementById("cliente").value,

marca:
document.getElementById("marca").value,

cilindraje:
document.getElementById("cilindraje").value,

segmento:
document.getElementById("segmento").value,

costo_con_iva:
parseFloat(
document.getElementById("costo").value
),

tipo_venta:
document.getElementById("tipoVenta").value,

seguro:
document.getElementById("seguro").value,

fecha_venta:
document.getElementById("fecha").value

};

const { error } =
await supabase
.from("ventas")
.insert([venta]);

if(error){

alert(error.message);

}else{

alert("Venta registrada");

form.reset();

}

});
}

/* ==========================
DASHBOARD
========================== */

async function cargarDashboard(){

const totalVentas =
document.getElementById("totalVentas");

if(!totalVentas) return;

const { data,error } =
await supabase
.from("ventas")
.select("*");

if(error){

console.log(error);
return;

}

totalVentas.textContent =
data.length;

let ingresos = 0;

const marcas = {};

data.forEach(v=>{

ingresos +=
Number(v.costo_con_iva);

marcas[v.marca] =
(marcas[v.marca] || 0)+1;

});

document.getElementById(
"ingresosTotales"
).textContent =
"$"+ingresos.toLocaleString();

let topMarca = "--";
let max = 0;

for(const marca in marcas){

if(marcas[marca] > max){

max = marcas[marca];
topMarca = marca;

}

}

document.getElementById(
"marcaTop"
).textContent =
topMarca;

}

/* ==========================
GRAFICAS
========================== */

async function cargarGraficas(){

const canvas =
document.getElementById(
"graficoMarcas"
);

if(!canvas) return;

const { data,error } =
await supabase
.from("ventas")
.select("*");

if(error){

console.log(error);
return;

}

const conteo = {};

data.forEach(v=>{

conteo[v.marca] =
(conteo[v.marca] || 0)+1;

});

new Chart(
canvas,
{
type:"bar",

data:{
labels:
Object.keys(conteo),

datasets:[{
label:"Ventas",
data:
Object.values(conteo)
}]
}
}
);

}

window.addEventListener(
"load",
()=>{
cargarDashboard();
cargarGraficas();
}
);
