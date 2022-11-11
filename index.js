//Una vez que se carga el DOM
document.addEventListener ("DOMContentLoaded", () => {

    var index = 0; //variable que va a ir incrementando para identificar los productos

    //Busco el botón y le agrego un evento
    document.querySelector("button").addEventListener("click", () => {

        //Tomo el string que está adentro del input
        const producto = document.querySelector ("input").value;
        if (producto !=""){

       //copio la estructura que voy a querer crear     
       /*
       <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                Default checkbox
            </label>
            <button type="button" class="btn btn-primary">Primary</button>
            <button type="button" class="btn btn-danger">Danger</button>
        </div>  
       */     

        let div = document.createElement("div");

        //Creo el class form-check. Con .setAttribute puedo setear cualquier atributo de un elemento html
        div.setAttribute("class", "form-check d-flex align-items-center");

        //Limpio el input
        document.querySelector ("input").value = "";


        //Creo el elemento input del checkbox
        let checkbox = document.createElement("input");
        checkbox.className = "form-check-input me-1";
        checkbox.type = "checkbox";
        checkbox.id = `checkbox-${index}`; //como el id es único, uso una variable que va a ir incrementando p/ identifica el producto/tarea
        //por cada checkbox que voy a crearle un evento. 
        checkbox.addEventListener("change", (e) => { //paso un parametro e para que se sepa quien lo disparo
            
            const target = e.target; //guardo quien disparó el evento. mirar screenshot
            const parent = target.parentElement; //guardo el padre del elemento. En este caso, el padre del input es un li.

            //el .toggle lo que hace es que si la clase ya está, se la quita. Y si no está, la agrega. 
            parent.classList.toggle("list-group-item-success"); // toggle es conmutar

        })

        //Creo el elemento label del checkbox
        let label = document.createElement ("label");
        label.className = "form-check-label ms-2";
        label.setAttribute("for", `checkbox-${index}`);
        //label.for = `checkbox-${index}`; //OJO NO ANDA. No se sabe por qué
        label.innerText = producto;

       //BOTON PARA ELIMINAR
        const buttonTrashClass = ["btn", "btn-danger", "ms-5"];
        let buttonTrash = document.createElement ("button");
        buttonTrash.type = "button";
        //buttonTrash.className = "btn btn-danger ms-5";
        //los ... sirven para separar los elementos de un array (el array es buttonTrashClass)
        buttonTrash.classList.add(...buttonTrashClass); //en el .add no puedo agregar todas las clases juntas
        buttonTrash.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi   bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>`; //Este svg es un icono de bootstrap
        
        //Agrego el evento para que cuando haga click, se borre la linea    
        buttonTrash.addEventListener ("click", (e) => {

            const target = e.target; //para guardar quién disparó el evento. No se bien para qué se usa.
            console.log(target); 
            div.remove();
        });

         // buttonTrash.addEventListener ("click", (e) => {

        //     const target = e.target; //para guardar quién disparó el evento
        //     console.log(target);
        //     target.parentElement.remove();
        // });

        //BOTON PARA SUBIR LINEA
        let buttonUp = document.createElement ("button");
        buttonUp.className = "btn btn-outline-primary ms-2"; //el outline crea un bordecito
        buttonUp.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
             <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
            </svg>`;
              
        buttonUp.addEventListener ("click", (e) => {

            //Voy del botón al contenedor. Y del contenedor, me voy al anterior (que es lo que tengo arriba). Y a eso le hago un .before para que inserte antes. (y sería como cambiar de lugar)

            const target = e.target;
            //let div = target.parentElement;

            //Regla para que no pueda subir más allá de la lista.
            if (div.previousElementSibling === document.querySelector ("h2") ) {
                alert ('No se puede subir más.');
            } else {
                div.previousElementSibling.before(div);
            }
                
        });

        
        //BOTON PARA BAJAR LINEA
        let buttonDown = document.createElement ("button");
        buttonDown.className = "btn btn-outline-primary ms-2"; //el outline crea un bordecito
        buttonDown.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
             <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
            </svg>`;
              
        buttonDown.addEventListener ("click", (e) => {

            //Voy del botón al contenedor. Y del contenedor, me voy al siguiente (que es lo que tengo abajo). Y a eso le hago un .after para que inserte después. (y sería como cambiar de lugar)

            const target = e.target;
            //let div = target.parentElement;
           
            //Regla para que no pueda bajar más allá de la lista. (Por el momento no hay nada abajo, visualmente no hay error pero en el console aparece algo)
            if (div.nextElementSibling === null) {
                alert ('No se puede bajar más.');
            } else {
                div.nextElementSibling.after(div);
            }
                
        });
       

        //Agrego el checkbox, label, buttonUp, buttonDown, buttonTrash al div.
        div.append (checkbox);
        div.append (label);
        div.append (buttonUp);
        div.append (buttonDown);
        div.append (buttonTrash);
       

        //Si quisiera que lo ponga arriba, uso prepend
        //Agrego el div al section con id tareas
        document.querySelector ("#tareas").append(div);

        index++; //incrementa la variable identificatoria del producto/tarea
    }

    });



});