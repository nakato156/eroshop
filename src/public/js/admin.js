window.onload = init 

let formUpdateProd = null;
let ResultadosBusqueda;
let btnAddProduct = null
let blockAddPord = false

let actual_tab, actualItemListProd = null

function FromDataToObj(data){
    let jsonData = {};
    for (let [k, v] of data) jsonData[k] = v;
    return jsonData
}

function init(){
    const formAddProduct = document.getElementById("formAddProducto")
    formAddProduct.addEventListener('submit', addProduct)

    btnAddProduct = document.getElementById('btnAddProd')

    const formSearchProduct = document.getElementById("BuscarProducto")
    formSearchProduct.addEventListener('submit', SearchProducto)

    formUpdateProd = document.getElementById("formEditProducto")
    formUpdateProd.addEventListener('submit', updateProd)
    
    ResultadosBusqueda = document.getElementById("ResultadosBusqueda");

    const tabs_links = document.querySelectorAll(".nav-link")
    tabs_links.forEach(tab =>{
        actual_tab = tab.classList.contains('active') ? tab : actual_tab
        tab.addEventListener('click', changeTab)
    })
}

function isCompleteData(data, ignore=[]){
    for(let [k, v] of data){
        if(ignore.includes(k)) continue
        else if(!v) return false
    }
    return true;
}

function changeTab(e){
    actual_tab.classList.toggle('active')
    document.getElementById(actual_tab.getAttribute('bs-target')).style.display = "none"

    const id = e.target.getAttribute("bs-target")
    const element = document.getElementById(id)
    
    if(!element) return

    element.style.display = "block"
    actual_tab = e.target;
}

function loadProdForEdit(element){
    if(actualItemListProd) actualItemListProd.classList.toggle('active')

    const productos = JSON.parse(localStorage.getItem('productos'))
    const producto = productos[element.getAttribute('uuid')]
    
    actualItemListProd = element
    if(element == actualItemListProd) element.classList.toggle('active')

    for(let input of formUpdateProd.elements){
        if(input.name && Object.hasOwnProperty.call(producto, input.name)){
            input.value = producto[input.name]
        }
    }
}

async function updateProd(e){
    e.preventDefault();
    const data = new FormData(this)
    if(!isCompleteData(data)){
        return Swal.fire({
            icon: 'warning',
            title: 'Datos incompletos',
            text: 'Debe completar todos los campos'
        })
    }
    const req = await fetch('/panel/update-producto', {
        method: "PUT",
        body: data
    })
    const res = await req.status==200 ? await req.json() : await req.text();
    let icon = 'error'
    let title = 'Error al actualizar'
    if(res.status){
        icon = 'success'
        title = 'Producto actualizado'
    }
    return Swal.fire({
        icon,
        title
    })
}

async function SearchProducto(e){
    e.preventDefault();

    const data = new FormData(this)
    let datos = {}
    fetch('/panel/search/producto', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(FromDataToObj(data))
    })
    .then(req => req.json())
    .then(productos => {        
        let temp = "";
        productos.forEach(prod=>{
            temp+=`<div onclick="loadProdForEdit(this)" class="list-group-item list-group-item-action flex-column align-items-start" uuid="${prod.uuid}" style="cursor: pointer;">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">${prod.nombre}</h5>
            </div>
            <span class="mb-1 d-inline-block text-truncate" style="max-width: 99%;">${prod.descripcion}</span>
            <small>S/ ${prod.precio}</small>
          </div>`
          datos[prod.uuid] = prod
        })
        localStorage.setItem('productos', JSON.stringify(datos));
        let lista = `<div class="list-group">${temp}</div>`
        ResultadosBusqueda.innerHTML = lista
    })
}

async function addProduct(e){
    e.preventDefault();
    const data = new FormData(this)
    if(!isCompleteData(data, ['imagen'])){
        return Swal.fire({
            icon: 'warning',
            title: 'Datos incompletos',
            text: 'Debe completar todos los campos'
        })
    };
    if(blockAddPord) return;

    blockAddPord = true;
    btnAddProduct.disabled = false;
    const req = await fetch('/panel/crear-producto',{
        method: "POST",
        body: data
    })

    let icon = "error", title = "Error", text = "Ha ocurrido un error";

    const res = req.status == 200 ? await req.json() : req.text();
    if (res.token){
        const data_img = new FormData()
        console.log(res)
        data_img.append('X-CSRFToken', res.token);
        data_img.append('imagen', data.get('imagen'))
        data_img.append('name', res.id)
        
        if(uploadImg(data_img)){
            icon = 'success', title = "Agregado", text = 'Producto agregado satisfacotriamente'
        }
    }
    Swal.fire({icon, title, text})
    blockAddPord = false
    btnAddProduct.disabled = true;
}

async function uploadImg(data){
    const req = await fetch('https://storage.ecosolucionesweb.com/upload-file',{
        method: "POST",
        body: data
    })
    const res = req.status == 200 ? await req.text() : await req.text();
    console.log(res)
    if(!res.error) return res;
    return false;
}
