function addCarrito(id, nombre, precio, url){
    let carrito = localStorage.getItem('carrito')
    carrito = JSON.parse(carrito)

    const item_default = {cantidad: 1, precio, nombre, url}
    
    if(carrito){
        if(carrito[id])carrito[id]['cantidad'] += 1;
        else {
            carrito[id] =  item_default
        }
    }else {
        carrito = {}
        carrito[id] = item_default
    }
    carrito = JSON.stringify(carrito)
    localStorage.setItem('carrito', carrito)
    Swal.fire({
        icon: 'success',
        text: `${nombre} ha sido agregado a su carrito de compras`
    })
}