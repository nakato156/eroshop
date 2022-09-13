window.onload = init
let tabla = null;

function init(){
    tabla = document.getElementById('contenidoCarrito')
    loadTabla()
}

function loadTabla(){
    let carrito = localStorage.getItem('carrito')
    carrito = JSON.parse(carrito)
    if(carrito){
        let temp = "";
        let i = 1;
        let total = 0;
        for(let item in carrito){
            let prod = carrito[item]
            temp += `<tr id="${item}">
                <th scope="row">${i++}</th>
                <td>${prod.nombre}</td>
                <td class="d-inline-flex grid text-center">
                    <div class='align-middle'><i class="bx bx-plus" onclick="addItem(this)"></i></div>
                    <p>${prod.cantidad}</p>
                    <div class='align-middle'><i class="bx bx-minus" onclick="removeItem(this)"></i></div>
                </td>
                <td>${prod.precio}</td>
                <td>${prod.precio * prod.cantidad}</td>
            </tr>`
            total+= prod.precio * prod.cantidad;
        }
        tabla.innerHTML = temp + `<tr style="border-top: 1px solid #fff;"><td colspan="4">Total</td><td>${total}</td></tr>`;
    }
}

function addItem(e){
    const celda = e.parentNode.parentNode
    const fila = celda.parentNode

    const id_prod = fila.getAttribute('id')
    let carrito = JSON.parse(localStorage.getItem('carrito'))
    carrito[id_prod]['cantidad'] += 1
    localStorage.setItem('carrito', JSON.stringify(carrito))
    loadTabla()

}

function removeItem(e){
    const celda = e.parentNode.parentNode
    const fila = celda.parentNode

    const id_prod = fila.getAttribute('id')
    let carrito = JSON.parse(localStorage.getItem('carrito'))
    if(carrito[id_prod]['cantidad']-1 == 0){
        Swal.fire({
            icon: 'warning',
            title: 'Desea eliminar el producto?',
            showCancelButton: true,
        }).then(res =>{
            if(res.isConfirmed) {
                delete carrito[id_prod]
                localStorage.setItem('carrito', JSON.stringify(carrito))
                loadTabla()
            }
            else return;
        })
    }
}