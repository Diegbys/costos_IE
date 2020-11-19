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
        costo_f_Total: 0,
        costo_v_Total: 0,
        costo_Total: 0,

        costo_Unitario: 0,
        precio_Venta: 0,
        costo_u_Variable: 0,
        punto_Equilibrio: 0,
    },
    methods: {
        agregar_fila() {
            if (this.capacidad_Instalada != "" && this.frecuencia != "" && this.margen_Beneficio != "" && this.descripcion != "" && this.costo_Fijo != "" && this.costo_Variable != "") {

                //Para agregar una fila nueva
                let row = { descripcion: this.descripcion, costoFijo: this.costo_Fijo, costoVariable: this.costo_Variable, subtotal: (parseFloat(this.costo_Fijo) + parseFloat(this.costo_Variable)).toFixed(3) };
                this.datos_Tabla.push(row)
                this.descripcion = "";
                this.costo_Fijo = "";
                this.costo_Variable = "";

                //Marcas los totales de la tabla
                this.costo_f_Total = 0;
                this.costo_v_Total = 0;
                this.costo_Total = 0;
                this.datos_Tabla.forEach(row => {
                    console.log(row)
                    console.log(parseFloat(row.costoFijo))
                    this.costo_f_Total = (parseFloat(this.costo_f_Total) + parseFloat(row.costoFijo)).toFixed(3);
                    this.costo_v_Total = (parseFloat(this.costo_v_Total) + parseFloat(row.costoVariable)).toFixed(3);
                });
                this.costo_Total = (parseFloat(this.costo_f_Total) + parseFloat(this.costo_v_Total)).toFixed(3);

                //resultados
                this.costo_Unitario = (parseFloat(this.costo_Total) / parseFloat(this.capacidad_Instalada)).toFixed(3);
                this.precio_Venta = (parseFloat(this.costo_Unitario) * (1 + parseFloat(this.margen_Beneficio)/100 )).toFixed(3);

            } else {
                alert("Debe rellenar todos los campos");
            }
        }
    },
})

//Permitir solo escribir numeros y puntos
function isNumber(e) {
    e = e || window.event;
    var charCode = e.which ? e.which : e.keyCode;
    return /^[0-9]*\.?[0-9]*$/.test(String.fromCharCode(charCode));
}