document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});


var costos = new Vue({
    el: "#costos",
    data: {
        capacidad_Instalada: "",
        capacidad_Instalada_equivalente: 0,
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
        time: [
            { name: "Año", value: 0, days: 365 },
            { name: "Semestre", value: 1, days: 180 },
            { name: "Cuatrimestre", value: 2, days: 120 },
            { name: "Trimestre", value: 3, days: 90 },
            { name: "Bimestre", value: 4, days: 60 },
            { name: "Mensual", value: 5, days: 30 },
            { name: "Bimensual", value: 6, days: 15 },
            { name: "Semanal", value: 7, days: 7 },
            { name: "Diario", value: 8, days: 1 },
        ]
    },
    methods: {
            agregar_fila() {
                if (this.capacidad_Instalada != "" && this.frecuencia != "" && this.margen_Beneficio != "" && this.descripcion != "" && this.costo_Fijo != "" && this.costo_Variable != "") {

                    //Transformar la capacidad instalada a año
                    this.capacidad_Instalada_equivalente = parseFloat(this.capacidad_Instalada) * (this.time[0].days / this.time[this.frecuencia].days);

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
                    this.costo_Unitario = (parseFloat(this.costo_Total) / this.capacidad_Instalada_equivalente).toFixed(3);
                    this.precio_Venta = (parseFloat(this.costo_Unitario) * (1 + parseFloat(this.margen_Beneficio) / 100)).toFixed(3);
                    this.costo_u_Variable = (parseFloat(this.costo_v_Total) / this.capacidad_Instalada_equivalente).toFixed(3);
                    this.punto_Equilibrio = Math.round(parseFloat(this.costo_f_Total) / (parseFloat(this.precio_Venta) - parseFloat(this.costo_u_Variable)))

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