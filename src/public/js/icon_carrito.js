
function loadIconCarrito(element_carrito){
    const carrito = JSON.parse(localStorage.getItem('carrito'))
    if(carrito) {
        element_carrito.getElementsByTagName("span")[0].innerHTML = Object.keys(carrito).length;
        element_carrito.style.display = "block"
    }
}

export { loadIconCarrito }