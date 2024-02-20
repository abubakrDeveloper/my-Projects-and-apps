let display = document.querySelector(".calc-input"),
 calcButtons = document.querySelectorAll('.btn'),
 operation = ""

calcButtons.forEach(btn => {
 btn.addEventListener("click", () => {
  if (btn.textContent === "C") {
   operation = ""
   display.value = operation
  } else if (btn.textContent === "del") {
   operation = operation.slice(0, -1)
   display.value = operation
  } else if (btn.textContent === "=") {
   let result = eval(operation)
   display.value = result
   operation = `${result}`
  } else if (btn.textContent === "+" || btn.textContent === "-" || btn.textContent === "/" || btn.textContent === "*" || btn.textContent === "%") {
   let index = operation.length - 1
   if (operation[index] === "+" || operation[index] === "-" || operation[index] === '/' || operation[index] === "*" || operation[index] === "%") {
    operation = operation.slice(0, -1)
    operation = operation + btn.textContent
    display.value = operation
   } else {
    operation = operation + btn.textContent
    display.value = operation
   }
  } else {
   operation = operation + btn.textContent
   display.value = operation
  }

 })
})