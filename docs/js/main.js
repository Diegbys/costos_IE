document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});


var costos = new Vue({
    el: "#costos",
    data: {
        capacidad_Instalada: "",
        frecuencia: "",
        margen_Beneficio: "",

        descripcion: "",
        costo_Fijo: "",
        costo_Variable: "",

        cabecera_Tabla: [
            "Descripcion",
            "Costo fijo",
            "Costo Variable",
            "Subtotal"
        ],

        datos_Tabla: [],
        costo_f_Total: "",
        costo_v_Total: "",
        costo_Total: "",

        costo_Unitario: "",
        precio_Venta: "",
        costo_u_Variable: "",
        punto_Equilibrio: "",
    },
    methods: {
        agregar_fila(){
            //Para agregar una fila nueva
            let row = {descripcion: this.descripcion, costoFijo: this.costo_Fijo, costoVariable: this.costo_Variable, subtotal: (parseFloat(this.costo_Fijo) + parseFloat(this.costo_Variable)).toFixed(2)}
            this.datos_Tabla.push(row)

            this.datos_Tabla.forEach(element => {
                console.log(element)
            });
        }
    },
})

//Permitir solo escribir numeros y puntos
function isNumber(e) {
    e = e || window.event;
    var charCode = e.which ? e.which : e.keyCode;
    return /^[0-9]*\.?[0-9]*$/.test(String.fromCharCode(charCode));
}