//Todo de Articulo
/***************************************************************************************************************
 * 
 * 
 * 
 * 
 * **************************************************************************************************************/


const urlApi2 = "http://localhost:9000";//colocar la url con el puerto

function listarArticulos(){
    validaToken();
    
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi2+"/articulos",settings)
    .then(response => response.json())
    .then(function(data){
        
            var articulos = `
            <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-list"></i> Listado de Articulos</h1>
                </div>
                  
                <a href="#" onclick="registerFormArticulo('true')" class="btn btn-outline-success"><i class="fa-solid fa-user-plus"></i></a>
                <table class="table">
                    <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Codigo</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Fecha de registro</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Precio de venta</th>
                    <th scope="col">Precio de compra</th>
                    <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody id="listar">`;

            for(const articulo of data){
                //console.log(usuario.correo)
                articulos += `
    
                            <tr>
                            <th scope="row">${articulo.id}</th>
                            <td>${articulo.codigo}</td>
                            <td>${articulo.nombre}</td>
                            <td>${articulo.descripcion}</td>
                            <td>${articulo.fecha_registro}</td>
                            <td>${articulo.stock}</td>
                            <td>${articulo.categoria.nombre}</td>
                            <td>${articulo.usuario.nombre}</td>
                            <td>${articulo.precio_venta}</td>
                            <td>${articulo.precio_compra}</td>
                            <td>
                            <button type="button" class="btn btn-outline-danger" 
                            onclick="eliminaArticulo('${articulo.codigo}')">
                                <i class="fa-solid fa-user-minus"></i>
                            </button>
                            <a href="#" onclick="verModificarArticulo('${articulo.codigo}')" class="btn btn-outline-warning">
                                <i class="fa-solid fa-user-pen"></i>
                            </a>
                            <a href="#" onclick="verArticulo('${articulo.codigo}')" class="btn btn-outline-info">
                                <i class="fa-solid fa-eye"></i>
                            </a>
                            </td>
                        </tr>
                    `;
    
                 }
                 articulos += `
                 </tbody>
                  </table>
                     `;
                 document.getElementById("datos").innerHTML = articulos;
          })
}


function verArticulo(codigo){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi2+"/articulo/codigo/"+codigo,settings)
    .then(response => response.json())
    .then(function(articulo){
            var cadena='';
            if(articulo){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Articulo</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Codigo: ${articulo.codigo}</li>
                    <li class="list-group-item">Nombre: ${articulo.nombre}</li>
                    <li class="list-group-item">Descripcion: ${articulo.descripcion}</li>
                    <li class="list-group-item">Stock: ${articulo.stock}</li>
                    <li class="list-group-item">Categoria: ${articulo.categoria.nombre}</li>
                    <li class="list-group-item">Usuario: ${articulo.usuario.nombre}</li>
                    <li class="list-group-item">Precio de venta: ${articulo.precio_venta}</li>
                    <li class="list-group-item">Precio de compra: ${articulo.precio_compra}</li>
                </ul>`;
              
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}


//Registrar Articulo
function registerFormArticulo(auth=false){
    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-square-plus"></i> Registrar Articulo</h1>
            </div>
              
            <form action="" method="post" id="myFormReg1">
            <input type="hidden" name="id" id="id">
            <label for="codigo" class="form-label">Codigo</label>
            <input type="text" class="form-control" name="codigo" id="codigo" required> <br>
            <label for="nombre"  class="form-label">Nombre</label>
            <input type="text" class="form-control" name="nombre" id="nombre" required> <br>
            <label for="descripcion"  class="form-label">Descripcion</label>
            <input type="text" class="form-control" name="descripcion" id="descripcion" required> <br>
            <label for="fecha_registro"  class="form-label">Fecha registro</label>
            <input type="date" class="form-control" name="fecha_registro" id="fecha_registro" > <br>
            <label for="stock"  class="form-label">Stock</label>
            <input type="number" class="form-control" name="stock" id="stock" > <br>
            <div id="prueba" onclick="categoria()">
                <label  for="categoria">Categoria</label>
                <select  class="form-control" id="categoria_id" name="categoria_id">
                 <option class="FORM-CONTROL" selected disable value="">Seleccione</option>
                </select>
            </div>
            <br>
            <label for="precio_venta"  class="form-label">Precio venta</label>
            <input type="number" class="form-control" name="precio_venta" id="precio_venta" > <br>
            <label for="precio_compra" class="form-label">precio compra</label>
            <input type="number" class="form-control" name="precio_compra" id="precio_compra" required> <br>
                <button type="button" class="btn btn-outline-info" onclick="registrarArticulo('${auth}')">Registrar</button>
            </form>`;
            document.getElementById("contentModal").innerHTML = cadena;
            document.getElementById("exampleModalLabel").innerHTML = "Gestión de Articulos";
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
}
async function categoria(){
        let categoria1 = document.querySelector('#categoria_id');
        var settings={
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
        }
        fetch(urlApi2+"/categorias",settings)
        .then((response) => response.json())
        .then(function (data) {
            let template = ''
            for(const categorias of data){
                template += "<option value="+categorias.id_categoria+">"+categorias.nombre+"</option>"
            }
           categoria1.innerHTML = template
        
        })
        .catch(function (error) {
            console.log(error);
        });
        document.getElementById('prueba').onclick = "";
}


async function registrarArticulo(auth=false){
    validaToken();
    var myForm = document.getElementById("myFormReg1");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    console.log("data user ",jsonData);

    const request = await fetch(urlApi2+"/articulo", {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(function(respuesta){
        console.log("respuesta peticion", respuesta)
    });
    if(auth){
        listarArticulos();
    }
    alertas("Se ha registrado la categoria exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}




























function salir(){
    localStorage.clear();
    location.href = "index.html";
}

function validaToken(){
    if(localStorage.token == undefined){
        salir();
    }
}
