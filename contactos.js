var selectedRow = null;


//Validaciones de campos
// const expresiones = {
//     nombre: /^[a-zA-ZÀ-Ý\s]{2,40}$/, //Letras y espacios, pueden llevar acentos.
//     apellido: /^[a-zA-ZÀ-Ý\s]{2,40}$/, //Letras y espacios, pueden llevar acentos.
//     telefono: /^\d{7,14}$/ //De 7 a 14 numeros.
// }

// const campos = {
//     nombre: false,
//     apellido: false,
//     telefono: false  //NO se coloca coma (,) al ultimo elemento del objecto.
// }


// const validarFormulario = (e) => {
    
//     switch (e.target.name) {
        
//         case 'nombre':
//             validarCampo(expresiones.nombre, e.target, 'nombre');
            
//             break;

//         case 'apellido':
//             validarCampo(expresiones.nombre, e.target, 'nombre');
            
//             break;

//         case 'telefono':
//             validarCampo(expresiones.telefono, e.target, 'telefono');
            
//             break;        
//     }    
// }



// const validarCampo = (expresion, input, campo) => {
//     if(expresion.test(input.value)){
//         document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
//         document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
//         document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');
//         document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark');
//         document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
//         campos [campo] = true;
        
//     } else {
//         document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
//         document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
//         document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');
//         document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');
//         document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
//         campos [campo] = false;
//     }
// }


// inputs.forEach((input) => {
//     input.addEventListener('keyup', validarFormulario); //Ocurre un evento al presionar una tecla dentro del input ("tecla levantada").
//     //input.addEventListener('blur', validarFormulario); //Ocurre un evento al presionar fuera del input.

// });
















//show alerts
function showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const main = document.querySelector('.main');
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector('.alert').remove(), 2000);
}   

//Clear all fields

function clearFields() {
    document.querySelector('#firstName').value = '';
    document.querySelector('#lastName').value = '';
    document.querySelector('#rollNo').value = '';    
}


//Add data

document.querySelector('#student-form').addEventListener('submit', (e) => {
    e.preventDefault();

    //Get form values
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const rollNo = document.querySelector('#rollNo').value;

    //validate
    if (firstName == '' || lastName == '' || rollNo == '') {
        showAlert('Por favor llena todos los campos.', 'danger');        
    } else {
        if (selectedRow == null) {
            const list = document.querySelector('#student-list');
            const row = document.createElement('tr');

            row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${rollNo}</td>
            <td>
            <a href="#" class="btn btn-warning bt-sm edit">Editar</a>
            <a href="#" class="btn btn-danger bt-sm delete">Borrar</a>
            </td>            
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert('Nuevo contacto agregado.', "success");            
        } else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            selectedRow = null;
            showAlert('Informacion de contacto actualizada.', 'info');
        }

        clearFields();


    }
});

//Edit data

document.querySelector('#student-list').addEventListener('click', (e) => {
    target = e.target;
    if(target.classList.contains('edit')){
        selectedRow = target.parentElement.parentElement;
        document.querySelector('#firstName').value = selectedRow.children[0].textContent;
        document.querySelector('#lastName').value = selectedRow.children[1].textContent;
        document.querySelector('#rollNo').value = selectedRow.children[2].textContent;
    }
})


//Delete data

document.querySelector('#student-list').addEventListener('click', (e) =>{
    target = e.target;

    if (target.classList.contains('delete')) {
        target.parentElement.parentElement.remove();
        showAlert('Contacto borrado.', 'danger');        
    }
});