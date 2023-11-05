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
            temp += `<li id="${item}" class="flex items-center gap-2">
            <img src="${prod.url}" alt="" class="h-16 w-16 rounded object-cover"/>

            <div class="w-1/3">
              <h3 class="text-sm text-gray-200 truncate ...">${prod.nombre}</h3>
                <dl class="mt-0.5 space-y-px text-[13px] text-gray-100">
                    <div>
                        <dt class="inline text-md">Precio:</dt>
                        <dd class="inline text-md">S/ ${prod.precio}</dd>
                    </div>
                </dl>
            </div>

            <div class="w-1/3 flex flex-1 items-center justify-center gap-2">
                <form>
                    <label for="Line1Qty" class="sr-only"> Quantity </label>
                    <div class="flex items-center gap-1">
                        <button type="button" class="hidden md:block w-12 h-12 leading-10 text-red-500 transition hover:opacity-80">
                            &minus;
                        </button>

                        <input type="number" min="1" id="Quantity" value="${prod.cantidad}" class="h-8 w-12 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"/>

                        <button type="button" class="hidden md:block w-12 h-12 leading-10 text-emerald-500 transition hover:opacity-80">
                            &plus;
                        </button>
                    </div>
                </form>
            </div>
            <div class="w-1/3 flex justify-end gap-2">
                <div>
                    <h3 class="text-lg text-gray-200">S/ ${prod.precio * prod.cantidad}</h3>
                </div>
                <button class="text-gray-600 transition hover:text-red-600">
                    <span class="sr-only">Remove item</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                    </svg>
                </button>
            </div>
          </li>`
            total+= prod.precio * prod.cantidad;
        }
        const IGV = total * 0.18;
        const footer_tabla = `<div class="mt-8 flex justify-end border-t border-gray-100 pt-8">
            <div class="w-screen max-w-lg space-y-4">
                <dl class="space-y-0.5 text-sm text-gray-200">
                    <div class="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd>S/ ${total}</dd>
                    </div>

                    <div class="flex justify-between">
                        <dt>IGV</dt>
                        <dd>S/ ${IGV}</dd>
                    </div>

                    <!--- <div class="flex justify-between">
                        <dt>Descuento</dt>
                        <dd>-S/ 20</dd>
                    </div> -->

                    <div class="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd>S/ ${(total + IGV).toFixed(2)}</dd>
                    </div>
                </dl>

                <div class="flex justify-end">
                    <span class="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="-ms-1 me-1.5 h-4 w-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/>
                    </svg>

                    <p class="whitespace-nowrap text-xs">2 Discounts Applied</p>
                    </span>
                </div>

                <div class="flex justify-end">
                    <a href="#" class="block rounded bg-fuchsia-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-fuchsia-600">
                    Checkout
                    </a>
                </div>
            </div>
        </div>`
        tabla.innerHTML = temp + footer_tabla;
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