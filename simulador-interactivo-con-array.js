//Inicio de código - Simulador Interactivo
//0 - Explicación del algoritmo: Simulará a un ecommerce, interactuando con el usuario a través de 'alerts' y de 'prompts'. El ecommerce será de imanes y llaveros de fútbol de los 5 equipos denominados "grandes" del fútbol argentino. El usuario deberá elegir, por iteración y hasta que quiera salir del programa, el tipo de accesorio que va a llevar y de qué equipo. Finalmente, elegirá las cuotas en las que quiere pagar y el sistema calculará cuanto deberá pagar por mes.
//1 - Declaración e inicialización de variables a utilizar
//1. a - variables vinculadas con: (i) cantidad de productos a llevar por tipo (llavero/iman) y equipo + subtotales de la compra + constantes necesarias para el cálculo del valor final de la compra (precios unitarios por llavero e iman + porcentaje de aumento seleccionando las distintas cuotas ofrecidas)
let arrayPedidos = []
let llaverosCASLA = 0
let imanesCASLA = 0
let llaverosCABJ = 0
let imanesCABJ = 0
let llaverosCARP = 0
let imanesCARP = 0
let llaverosCAI = 0
let imanesCAI = 0
let llaverosRC = 0
let imanesRC = 0
let subtotal = 0
let subtotalImanes = 0
let subtotalLlaveros = 0
const VALOR_UNIDAD_LLAVERO = 170
const VALOR_UNIDAD_IMAN = 200
const PORCENTAJE_AUMENTO_3CUOTAS = 5
const PORCENTAJE_AUMENTO_6CUOTAS = 10
const PORCENTAJE_AUMENTO_12CUOTAS = 15
    //1.b - variables vinculadas con datos de envio del cliente
let dniUsuario = ""
let direccionUsuario = ""
let telContactoUsuario = ""
    //2 - Declaración de clases a utilizar en el algoritmo
    //2.a - Declaración de clase 'Pedido': permite, por cada iteración, generar un objeto que represente lo que el cliente/usuario eligió agregar al carrito (equipo elegido en la iteración + tipo de producto que lleva en la iteración + unidades que lleva en la iteración)
class Pedido {
    constructor(equipo, tipoProducto, unidades) {
        this.equipo = equipo
        this.tipoProducto = tipoProducto
        this.unidades = unidades
    }
}
//2.b - Declaración de clase 'Carrito': Permite crear un objeto que 'simula' al carrito de compras del usuario (contiene el resumen de todos los pedidos efectuados en las distintas iteraciones).
//Además de lo explicado en la línea anterior, tiene métodos que permiten obtener datos del carrito de compras
class Carrito {
    constructor() {
        this.llaverosCASLA = 0
        this.imanesCASLA = 0
        this.llaverosCABJ = 0
        this.imanesCABJ = 0
        this.llaverosCARP = 0
        this.imanesCARP = 0
        this.llaverosCAI = 0
        this.imanesCAI = 0
        this.llaverosRC = 0
        this.imanesRC = 0
        this.cuotasElegidas = "1"
        this.subTotal = 0
    }
    devolverCantidadDeImanes() {
        return (this.imanesCABJ + this.imanesCARP + this.imanesCASLA + this.imanesCAI + this.imanesRC)
    }
    devolverCantidadDeLlaveros() {
        return (this.llaverosCABJ + this.llaverosCARP + this.llaverosCASLA + this.llaverosCAI + this.llaverosRC)
    }
    rellenarSubTotal(catalogoPrecios) {
        let cantidadImanes = this.imanesCABJ + this.imanesCARP + this.imanesCASLA + this.imanesCAI + this.imanesRC
        let cantidadLlaveros = this.llaverosCABJ + this.llaverosCARP + this.llaverosCASLA + this.llaverosCAI + this.llaverosRC
        let subTotalSoloDeImanes = cantidadImanes * catalogoPrecios.valorUnitarioIman
        let subTotalSoloDeLlaveros = cantidadLlaveros * catalogoPrecios.valorUnitarioLlavero
        this.subTotal = subTotalSoloDeImanes + subTotalSoloDeLlaveros

    }
    devolverValorFinal(catalogoPrecios) {
        let valorFinal
        let montoAgregado
        switch (this.cuotasElegidas) {
            case "1":
                valorFinal = this.subTotal
                return valorFinal
            case "3":
                montoAgregado = (this.subTotal * catalogoPrecios.recargo3Cuotas) / 100
                valorFinal = this.subTotal + montoAgregado
                return valorFinal
            case "6":
                montoAgregado = (this.subTotal * catalogoPrecios.recargo6Cuotas) / 100
                valorFinal = this.subTotal + montoAgregado
                return valorFinal
            case "12":
                montoAgregado = (this.subTotal * catalogoPrecios.recargo12Cuotas) / 100
                valorFinal = this.subTotal + montoAgregado
                return valorFinal
        }
    }
}

//2.c - Declaración de clase 'Cliente': permite generar un objeto que contiene todos los datos del cliente/usuario del simulador de ecommerce (los cuales son ingresados por el cliente a través de 'prompts')
class Cliente {
    constructor() {
        this.nombre = ""
        this.apellido = ""
        this.dni = ""
        this.direccion = ""
        this.telContacto = ""
    }

    devolverNombreYApellido() {
        return (this.nombre + " " + this.apellido)
    }
}

//2.d - Declaración de clase 'Precios': permite generar un objeto de tipo "catálogo", que en sus propiedades contiene a los valores unitarios de los productos que se venden en la tienda + el porcentaje de recargo que establece el sistema de acuerdo a las cuotas que elija el cliente para pagar
class Precios {
    constructor(valorUnitarioIman, valorUnitarioLlavero, recargo3Cuotas, recargo6Cuotas, recargo12Cuotas) {
        this.valorUnitarioIman = valorUnitarioIman
        this.valorUnitarioLlavero = valorUnitarioLlavero
        this.recargo3Cuotas = recargo3Cuotas
        this.recargo6Cuotas = recargo6Cuotas
        this.recargo12Cuotas = recargo12Cuotas
    }
}


//3 - Declaración de funciones a utilizar en el algoritmo
function saludarUsuario() {
    alert("Bienvenido. A continuación te pediremos tu nombre, apellido, y DNI. Gracias!")
    const nuevoCliente = new Cliente()
    nuevoCliente.nombre = prompt("Ingrese su nombre por favor")
    nuevoCliente.apellido = prompt("Ingrese su apellido por favor")
    nuevoCliente.dni = prompt("Ingrese su número de documento por favor")
    alert("Hola " + nuevoCliente.devolverNombreYApellido() + "! ¿Cómo estás? Bienvenido al simulador de ecommerce de imanes y llaveros de los equipos de fútbol más grandes de Argentina.")
    return nuevoCliente
}

function consultarDatosEnvioUsuario() {
    alert("Para finalizar, te tomaremos un par de datos para realizar el envío correctamente:")
    clienteActual.direccion = prompt("¿Cómo es tu dirección de entrega?")
    clienteActual.telContacto = prompt("¿Cúal es tu número telefónico de contacto?")
}

function calcularValorFinal(subtotal, cuotas) {
    let valorFinal
    let montoAgregado
    switch (cuotas) {
        case "1":
            valorFinal = subtotal
            return valorFinal
        case "3":
            montoAgregado = (subtotal * PORCENTAJE_AUMENTO_3CUOTAS) / 100
            valorFinal = subtotal + montoAgregado
            return valorFinal
        case "6":
            montoAgregado = (subtotal * PORCENTAJE_AUMENTO_6CUOTAS) / 100
            valorFinal = subtotal + montoAgregado
            return valorFinal
        case "12":
            montoAgregado = (subtotal * PORCENTAJE_AUMENTO_12CUOTAS) / 100
            valorFinal = subtotal + montoAgregado
            return valorFinal
    }
}

function calcularValorPorCuota(valorFinal, cuotas) {
    return (valorFinal / parseInt(cuotas))
}

function elegirEquipo() {
    const EQUIPO_ELEGIDO = prompt("Elija un número según el equipo del que quiere comprar algún producto en esta iteración (ingrese cualquier otra cosa para salir del ecommerce): " + "\n" + "1: Boca" + "\n" + "2: River" + "\n" + "3: San Lorenzo" + "\n" + "4: Independiente" + "\n" + "5: Racing")
    return EQUIPO_ELEGIDO
}

function elegirTipoProducto() {
    const TIPO_PRODUCTO = prompt("Elija un número según el tipo de producto que sea adquirir en esta iteración (ingrese cualquier otra cosa para para cancelar esta iteración): " + "\n" + "1: Imanes" + "\n" + "2: Llaveros")
    return TIPO_PRODUCTO
}

function sumarUnidadesPorEquipoYProducto(equipo, producto, unidades) {
    switch (equipo) {
        case "1":
            if (producto == "1") {
                imanesCABJ = imanesCABJ + unidades
            } else {
                llaverosCABJ = llaverosCABJ + unidades
            }
            break
        case "2":
            if (producto == "1") {
                imanesCARP = imanesCARP + unidades
            } else {
                llaverosCARP = llaverosCARP + unidades
            }
            break
        case "3":
            if (producto == "1") {
                imanesCASLA = imanesCASLA + unidades
            } else {
                llaverosCASLA = llaverosCASLA + unidades
            }
            break
        case "4":
            if (producto == "1") {
                imanesCAI = imanesCAI + unidades
            } else {
                llaverosCAI = llaverosCAI + unidades
            }
            break
        case "5":
            if (producto == "1") {
                imanesRC = imanesRC + unidades
            } else {
                llaverosRC = llaverosRC + unidades
            }
            break
        default:
            break
    }

}

function usuarioCompro() {
    return (arrayPedidos.length > 0)
}

function llenarCarrito(arrayPedidos, catalogoPrecios) {
    const carritoADevolver = new Carrito()
    for (const pedido of arrayPedidos) {
        switch (pedido.equipo) {
            case "1":
                if (pedido.tipoProducto == "1") {
                    carritoADevolver.imanesCABJ = carritoADevolver.imanesCABJ + pedido.unidades
                } else {
                    carritoADevolver.llaverosCABJ = carritoADevolver.llaverosCABJ + pedido.unidades
                }
                break
            case "2":
                if (pedido.tipoProducto == "1") {
                    carritoADevolver.imanesCARP = carritoADevolver.imanesCARP + pedido.unidades
                } else {
                    carritoADevolver.llaverosCARP = carritoADevolver.llaverosCARP + pedido.unidades
                }
                break
            case "3":
                if (pedido.tipoProducto == "1") {
                    carritoADevolver.imanesCASLA = carritoADevolver.imanesCASLA + pedido.unidades
                } else {
                    carritoADevolver.llaverosCASLA = carritoADevolver.llaverosCASLA + pedido.unidades
                }
                break
            case "4":
                if (pedido.tipoProducto == "1") {
                    carritoADevolver.imanesCAI = carritoADevolver.imanesCAI + pedido.unidades
                } else {
                    carritoADevolver.llaverosCAI = carritoADevolver.llaverosCAI + pedido.unidades
                }
                break
            case "5":
                if (pedido.tipoProducto == "1") {
                    carritoADevolver.imanesRC = carritoADevolver.imanesRC + pedido.unidades
                } else {
                    carritoADevolver.llaverosRC = carritoADevolver.llaverosRC + pedido.unidades
                }
                break
            default:
                break
        }

    }
    let cuotasElegidas = prompt("Elija la cantidad de cuotas con las que desea abonar el pedido." + "\n" + "1 cuota: 0% de interés" + "\n" + "3 cuotas: " + PORCENTAJE_AUMENTO_3CUOTAS + "% de interés" + "\n" + "6 cuotas: " + PORCENTAJE_AUMENTO_6CUOTAS + "% de interés" + "\n" + "12 cuotas: " + PORCENTAJE_AUMENTO_12CUOTAS + "% de interés")
    while ((cuotasElegidas != "1") && (cuotasElegidas != "3") && (cuotasElegidas != "6") && (cuotasElegidas != "12")) {
        alert("valor incorrecto, ingrese cantidad de cuotas nuevamente (1, 3, 6 o 12)")
        cuotasElegidas = prompt("Elija la cantidad de cuotas con las que desea abonar el pedido." + "\n" + "1 cuota: 0% de interés" + "\n" + "3 cuotas: " + PORCENTAJE_AUMENTO_3CUOTAS + "% de interés" + "\n" + "6 cuotas: " + PORCENTAJE_AUMENTO_6CUOTAS + "% de interés" + "\n" + "12 cuotas: " + PORCENTAJE_AUMENTO_12CUOTAS + "% de interés")
    }
    carritoADevolver.cuotasElegidas = cuotasElegidas
    return carritoADevolver
}

//4 - Inicio del algoritmo
//genero catálogo de precios, a partir de un objeto de clase 'Precios' que se llena con variables definidas anteriormente en el código
const catalogoPrecios = new Precios(VALOR_UNIDAD_IMAN, VALOR_UNIDAD_LLAVERO, PORCENTAJE_AUMENTO_3CUOTAS, PORCENTAJE_AUMENTO_6CUOTAS, PORCENTAJE_AUMENTO_12CUOTAS)
    //la función 'saludarUsuario' me devuelve un objeto de tipo "Cliente" con nombre, apellido y dni ingresados por el usuario
const clienteActual = saludarUsuario()
    //comienza la sección del código en donde el sistema itera, y por cada iteración el cliente hace un pedido eligiendo:
    //1) equipo a comprar - 2) tipo de producto a comprar - 3) cantidad de unidades a llevar
let equipoElegido = elegirEquipo()
while ((equipoElegido == "1") || (equipoElegido == "2") || (equipoElegido == "3") || (equipoElegido == "4") || (equipoElegido == "5")) {
    const tipoProducto = elegirTipoProducto()
    if ((tipoProducto == "1") || (tipoProducto == "2")) {
        let cantidadUnidades = parseInt(prompt("Ingrese las unidades a llevar en esta iteración (ingrese '0' si se arrepintió en esta tanda)"))
        const nuevoPedido = new Pedido(equipoElegido, tipoProducto, cantidadUnidades)
        arrayPedidos.push(nuevoPedido)
    } else {
        alert("iteración cancelada, los datos de esta iteración no contarán para el total de la compra por no haber elegido un tipo de producto correcto")
    }
    equipoElegido = elegirEquipo()
}
//chequeo si el usuario, a través de las iteraciones, encargó al menos un producto (con la función 'usuarioCompro')
if (usuarioCompro()) {
    //creo carrito de compra a partir de los pedidos efectuados por el cliente en las distintas iteraciones
    const carritoDeCompra = llenarCarrito(arrayPedidos, catalogoPrecios)
    carritoDeCompra.rellenarSubTotal(catalogoPrecios)
    alert("Resumen del pedido: " + "\n\n" + "1. Productos de Boca:" + "\n" + "1.a. Imanes: " + carritoDeCompra.imanesCABJ + " unidades." + "\n" + "1.b. Llaveros: " + carritoDeCompra.llaverosCABJ + " unidades." + "\n\n" + "2. Productos de River:" + "\n" + "2.a. Imanes: " + carritoDeCompra.imanesCARP + " unidades." + "\n" + "2.b. Llaveros: " + carritoDeCompra.llaverosCARP + " unidades." + "\n\n" + "3. Productos de San Lorenzo:" + "\n" + "3.a. Imanes: " + carritoDeCompra.imanesCASLA + " unidades." + "\n" + "3.b. Llaveros: " + carritoDeCompra.llaverosCASLA + " unidades." + "\n\n" + "4. Productos de Independiente:" + "\n" + "4.a. Imanes: " + carritoDeCompra.imanesCAI + " unidades." + "\n" + "4.b. Llaveros: " + carritoDeCompra.llaverosCAI + " unidades." + "\n\n" + "5. Productos de Racing:" + "\n" + "5.a. Imanes: " + carritoDeCompra.imanesRC + " unidades." + "\n" + "5.b. Llaveros: " + carritoDeCompra.llaverosRC + " unidades.")
    alert("Resumen de lo que ud. tiene que pagar en función de su pedido:" + "\n" + "Cantidad de imanes: " + carritoDeCompra.devolverCantidadDeImanes() + " x $" + catalogoPrecios.valorUnitarioIman + " (precio unitario) = " + "$" + (carritoDeCompra.devolverCantidadDeImanes() * catalogoPrecios.valorUnitarioIman) + "\n" + "Cantidad de llaveros: " + carritoDeCompra.devolverCantidadDeLlaveros() + " x $" + catalogoPrecios.valorUnitarioLlavero + " (precio unitario) = " + "$" + (carritoDeCompra.devolverCantidadDeLlaveros() * catalogoPrecios.valorUnitarioLlavero) + "\n" + "Total a abonar: $" + carritoDeCompra.subTotal)
    alert("Pedido realizado con éxito. Usted pagará un total de $" + carritoDeCompra.devolverValorFinal(catalogoPrecios) + " en " + carritoDeCompra.cuotasElegidas + " cuotas, y tendrá que abonar un total de $" + (carritoDeCompra.devolverValorFinal(catalogoPrecios) / carritoDeCompra.cuotasElegidas) + " por cuota.")
    consultarDatosEnvioUsuario()
    alert(clienteActual.devolverNombreYApellido() + "(Doc. N° " + clienteActual.dni + "), muchas gracias por su compra. Su pedido será despachado en las próximas semanas a la dirección '" + clienteActual.direccion + "'. En breve le llegará el link de seguimiento.")
} else {
    alert("Usted no compró nada, hasta luego!")
}