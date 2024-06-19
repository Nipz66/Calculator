

  //  console.log(typeof number1);
  //   console.log(typeof number2);

   // let number1 = document.getElementById("number1").value;
    //let number2 = document.getElementById("number2").value;
   // number1 = Number();
    //number2 = Number();


   // let op = document.getElementById("op").value;
    //let lblOutput = document.getElementById("Output")


  //  lblOutput.innerHTML=number1+number2;

 //====================Addition=========================
function addition(){
    let num1 = document.getElementById("num1").value ;
    let num2 = document.getElementById("num2").value ;
    let addition = document.getElementById("btnAdd");

    let result = parseInt(num1) + parseInt(num2);


    output.innerHTML="Out Put : "+result;
}
//====================subtraction=========================
function subtraction(){
    let num1 = document.getElementById("num1").value ;
    let num2 = document.getElementById("num2").value ;
    let subtraction = document.getElementById("btnSub");

    let result = parseInt(num1) - parseInt(num2);


    output.innerHTML="Out Put : "+result;
}
//====================Multipication=========================
function multipication (){
    let num1 = document.getElementById("num1").value ;
    let num2 = document.getElementById("num2").value ;
    let multipication = document.getElementById("btnMulti");

    let result = parseInt(num1) * parseInt(num2);


    output.innerHTML="Out Put : "+result;
}
//====================Division=========================
function division (){
    let num1 = document.getElementById("num1").value ;
    let num2 = document.getElementById("num2").value ;
    let division = document.getElementById("btnDivi");

    let result = parseInt(num1) / parseInt(num2);


    output.innerHTML="Out Put : "+result;
}