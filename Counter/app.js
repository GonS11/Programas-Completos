//Inicializar la variable contador
let count = 0;

//Seleccionar valor y botones
const value = document.querySelector("#value"); //ID value
const btns = document.querySelectorAll(".btn"); //Todos los class btn

btns.forEach(function (btn) {
    btn.addEventListener("click", function (e) { //Selecciona al hacer click a que boton selecciona
        const styles = e.currentTarget.classList; //Guardamos la clase en cada click del boton seleccionado
        //Cambio valor contador
        if (styles.contains("decrease")) {
            count--;
        } else if (styles.contains("reset")) {
            count = 0;
        } else if (styles.contains("increase")) {
            count++;
        }

        //Cambio colores
        if(count>0){
            value.style.color="green";
        } 
        
        if(count<0){
            value.style.color="red";
        }

        if(count==0){
            value.style.color="black";
        }

        value.textContent = count; //Al hacer click da un nuevo valor segun el boton seleccionado
    })
});