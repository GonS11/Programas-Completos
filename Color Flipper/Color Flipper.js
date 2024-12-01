const colors=["green", "red", "rgba(133,122,200)","#f15025"];
const btn=document.getElementById("btn");
const color = document.querySelector(".color");

//Events liseteners
btn.addEventListener("click",function(){
    //Conseguir un numero aletoria en 0 y 3, los del array
    const randomNumber=getRandomNumber();
    console.log(randomNumber);

    color.textContent=colors[randomNumber];
    document.body.style.backgroundColor=colors[randomNumber];
    
});

//El Math.random va de 0 a 1, para obtener numeros del tamaño del array multiplandolo por el array.length consigues los valors
function getRandomNumber(){
    return Math.floor(Math.random()*colors.length);
}