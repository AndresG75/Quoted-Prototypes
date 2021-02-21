//Constructores

function UI(){}

function Seguro(marca,year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.MostrarResultado = (total,seguro)=>{

    const {year,tipo} = seguro;
    let marca;
    switch(seguro.marca) {
        case '1':
             marca = 'Americano';
             break;
        case '2':
             marca = 'Asiatico';
             break;
        case '3':
             marca = 'Europeo';
             break;
   }
    const div = document.createElement('div');
    div.classList.add('mt-10')
    div.innerHTML = `
    <p class='header'>Tu Resumen: </p>
    <p class="font-bold">Marca: <span class="font-normal"> ${marca} </span> </p>
    <p class="font-bold">Año: <span class="font-normal"> ${year} </span> </p>
    <p class="font-bold">Tipo: <span class="font-normal"> ${tipo} </span> </p>
    <p class="font-bold"> Total: <span class="font-normal"> $ ${total} </span> </p>
`;

const spinner = document.querySelector('#cargando');
spinner.style.display = 'block';
   setTimeout(() => {
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'none';
    const resultado = document.querySelector('#resultado');
    resultado.appendChild(div);
   }, 3000);
}

Seguro.prototype.GenerarCotizacion = function(){
     /*
          1 = americano 1.15
          2 = asiatico 1.05
          3 = europeo 1.35
     */
    let cantidad;
    const base = 2000;

    switch(this.marca){
         case '1':
              cantidad = base * 1.15;
              break;
         case '2':
              cantidad = base * 1.05;
              break;
         case '3':
              cantidad = base * 1.35;
              break;
    }

    // Leer el año
    const diferencia = new Date().getFullYear() - this.year;
    // Cada año de diferencia hay que reducir 3% el valor del seguro
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    /*
         Si el seguro es básico se múltiplica por 30% mas
         Si el seguro es completo 50% mas
    */
   if(this.tipo === 'basico') {
        cantidad *= 1.30;
   } else {
        cantidad *= 1.50;
   }
   console.log("La cantidad es "+cantidad);
    return cantidad;

}


const formulario = document.querySelector('#cotizar-seguro');
const interfaz = new UI();
UI.prototype.FillYears = ()=>{
    const max = new Date().getFullYear();
    const min = max - 21;

    for (let i = max; i >= min; i--){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        
        const select = document.querySelector('#year');
        select.appendChild(option);
    }
}


UI.prototype.MostrarMensaje = (texto)=>{
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje','mt-10');

    if(texto === 'error'){
        mensaje.classList.add('error');
        mensaje.textContent = "Debe rellenar todo el formulario";
    }else{
        mensaje.classList.add('correcto','resultado');
        mensaje.textContent = "Calculando la cotización"
    }
    formulario.insertBefore(mensaje,formulario.querySelector('#resultado'));
    setTimeout(() => {
        mensaje.remove();
    }, 3000);
}

UI.prototype.ValidarFormulario = (e)=>{
    e.preventDefault();
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        interfaz.MostrarMensaje('error');
    }else{
        const resultados = document.querySelector('#resultado div');
        if (resultados != null){
            resultados.remove()
        }
        interfaz.MostrarMensaje('correcto');
        const cotizacion = new Seguro(marca,year,tipo);
        console.log(cotizacion);
        const total = cotizacion.GenerarCotizacion();
        cotizacion.MostrarResultado(total,cotizacion);
    }
}




formulario.addEventListener('submit',interfaz.ValidarFormulario);
document.addEventListener('DOMContentLoaded',()=>{
    interfaz.FillYears();
});

