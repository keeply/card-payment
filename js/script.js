var validated; 

document.getElementById('cardNum').addEventListener('keyup', function(event){
  event.preventDefault();
  this.value = this.value.replace(/[^\d]/g, '').match(/.{1,4}/g);
  this.value =  this.value.replace(/,/g, ' '); 
  checkPaySystem(this.value[0]);
});

document.getElementById('name').addEventListener('keyup', function(event){
  event.preventDefault();
  this.value = this.value.replace(/[^a-z\s]+/ig, '');
  this.value = this.value.toUpperCase();
});

document.getElementById('cvv').addEventListener('keyup', function(event){
  event.preventDefault();
  this.value = this.value.replace(/[^\d]/g, '');
});

//проверка формы перед отправкой
document.getElementById('form').addEventListener('submit', function(e){
  validate();
  if (validated) {

    let inputCardNum = document.getElementById("cardNum");
    let inputName = document.getElementById("name");
    let inputCVV = document.getElementById("cvv");
  
   if (!inputCardNum.validity.valueMissing && !inputName.validity.valueMissing && !inputCVV.validity.valueMissing) {
     if (inputCardNum.value.length >= 19 && inputCVV.value.length === 3) {
       alert("Your payment is being processed.. Please wait!");
       e.preventDefault();
     } else {
       alert("Invalid card!");
       e.preventDefault();
     }
     
   } else alert("Please fill all required fields!");
   e.preventDefault();
    
  } else {
    e.preventDefault();
  }

});

//функция проверки срока действия карты
function validate() { 

var inputMonth = document.getElementById("exMM").value;
var inputYear = document.getElementById("exYY").value;

var today = new Date(); 
var year = today.getFullYear() % 100; 
var month = today.getUTCMonth() + 1;  

if (month < 10) { 
   month = '0' + month;
}

//проверка срока действия карты
if (inputYear == year && inputMonth <= month)  {
   alert("Your card is expired! Please use another card.");
   return validated = false;
} else validated = true;
}

//Проверка-определение платежной системы
function checkPaySystem(firstNumber) {

  switch (firstNumber) {
    case "2":
      //МИР
      document.getElementById("pay-sys").classList.add("mir");
      break;
    case "3":
      //MAESTRO
      document.getElementById("pay-sys").classList.add("maestro");
      break;
    case "4":
      //VISA
      document.getElementById("pay-sys").classList.add("visa");
      break;
    case "5":
      //MASTER CARD
      document.getElementById("pay-sys").classList.add("mastercard");
      break;
    default:
      console.log("Undefined pay system");
  }
}

  
