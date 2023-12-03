const screen = document.getElementById("screen");
let numbers = document.getElementsByClassName("number");
let operators = document.getElementsByClassName("operator");
let point = document.getElementById("point");
let equal = document.getElementById("equal");
let ac = document.getElementById("AC");
let del = document.getElementById("del");



numbers = Array.from(numbers)
operators = Array.from(operators)
let sum = "";
let sum2 = "";
let sign = 0;
let sign2 = 0;
let operatorContent = "";
let clicked = "";



ac.addEventListener("click", () => {
    sum2 = ""
    sum = ""
    screen.textContent = "0"
})

del.addEventListener("click", () => {
    sum2 = sum2.substring(0, sum2.length -1);
    screen.textContent = sum2
    if(sum2 === ""){
        screen.textContent = "0"
    }
})
// console.log(sum.length)



numbers.forEach(number => {
    number.addEventListener("click", () => {
        if(isExponentialNumber(sum)){
            sum = "";
        }
        
        if(sum2.length < 9){
            
            sum2 += number.textContent;
            sign2 = 1;
        }

            let match = sum2.match(/(-?\d*\.?\d+)([+\-*\/^])(-?\d*\.?\d+)/)
            
            if(match){
                screen.textContent = match[3]
            }else{screen.textContent = sum2}
            
            if(sign === 1){
                sum = "";
            }
        
    })
});


point.addEventListener("click", () =>{
    let findOperator = /[+\-*/.^]/g;
    let lastOperator = sum2.match(findOperator)
    let operators = ["+", "-", "*", "/", "^"]
    let lastChar = sum2.slice(-1);
    if(sum2 === ""){
        sum2 += "0";
    }
    
    if( lastOperator === null){
            sum2 += point.textContent
            screen.textContent = "";
            screen.textContent += sum2;
    }
    else if(lastOperator[lastOperator.length - 1] !== "." && !operators.includes(lastChar) ){
        sum2 += point.textContent
        screen.textContent += point.textContent;

    }
    
});


let operation;
operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if(isExponentialNumber(sum)){
            sum = "";
        }
        sum += sum2
        sum2 = "";
        if(sum !== ""){
            if(!["+", "-", "*", "/", "=", "^", "C", "."].includes(sum.charAt(sum.length - 1))){
                sum += operator.textContent
                
            }
            
        }else if(operator.textContent === "-"){
            sum += operator.textContent
            screen.textContent = sum
        }

        
        sign = 0;
        
        console.log(sum)
        
        equal.addEventListener("click", () => {
            if(sign2 === 1 ){
           sign = 1;
                sum += sum2
            
            myFunction()
                
                sum2 = "";
                if((sum.charAt(sum.length - 1)) === "+" || (sum.charAt(sum.length - 1)) === "-" || (sum.charAt(sum.length - 1)) === "*" || (sum.charAt(sum.length - 1)) === "/" || (sum.charAt(sum.length - 1)) === "^"){
                    sum = sum.substring(0, sum.length -1);
                }
                    sign2 = 0;
            }
                
            })
            
            operatorContent = operator.textContent
            myFunction()
            
        })
        });
            
            function myFunction (){
        let match = sum.match(/(-?\d*\.?\d+)([+\-*\/^])(-?\d*\.?\d+)/)
        
        if(match) {
            let leftNumber = parseFloat(match[1]);
            let rightNumber = parseFloat(match[3]);
            let findOperator = match[2];
           
            switch(findOperator) {
                case "+":
                    sum = plus(leftNumber, rightNumber) + operatorContent;
                    screen.textContent = sum.slice(0, -1)
                break;

                case "-":
                    sum = minus(leftNumber, rightNumber) + operatorContent;
                    screen.textContent = sum.slice(0, -1)
                break;

                case "*":   
                    sum = multiply(leftNumber, rightNumber) + operatorContent;
                    screen.textContent = sum.slice(0, -1)
                    break;
                    
                    case "/":
                    sum = divide(leftNumber, rightNumber) + operatorContent;
                    screen.textContent = sum.slice(0, -1)
                    break;
                    
                    case "^":   
                        sum = pow(leftNumber, rightNumber) + operatorContent;
                        screen.textContent = sum.slice(0, -1)
                        break;
                        default:
                            sum = "ERROR"
                        }
                        
                    }
                    
                    
                }  
                    
                    
                    


function plus(a, b){
    let x = ((a * Math.pow(10, 15)) + (b * Math.pow(10, 15))) / Math.pow(10, 15);
    if(x > 999999999){
        return x.toExponential(2)
    } else if (x.toString().length > 9){
        return x.toString().slice(0, 9)
    } else{return x}
}

function minus(a, b){
    let x = ((a * Math.pow(10, 15)) - (b * Math.pow(10, 15))) / Math.pow(10, 15);
    if(x > 999999999){
        return x.toExponential(2)
    }else if (x.toString().length > 9){
        return x.toString().slice(0, 9)
    }else{return x}
}

function multiply(a, b){
    let x = ((a * Math.pow(10, 8)) * (b * Math.pow(10, 8))) / Math.pow(10, 16);
    if(x > 999999999){
        return x.toExponential(2)
    }else if (x.toString().length > 9){
        return x.toString().slice(0, 9)
    }else{return x}
}

function divide(a, b){
    if(b !== 0){
        let x = ((a * Math.pow(10, 15)) / (b * Math.pow(10, 15)));
        if(x > 999999999){
            return x.toExponential(2)
        }else if (x.toString().length > 9){
        return x.toString().slice(0, 9)
        }else{return x}

    }else{return "ERROR"}
}

function pow(a, b){
    let x = Math.pow(a, b);
    if(x > 999999999){
        return x.toExponential(2)
    }else if (x.toString().length > 9){
        return x.toString().slice(0, 9)
    }else{return x}
}


function isExponentialNumber(str) {
    const exponentialRegex = /^[+-]?\d+(\.\d+)?[eE][+-]?\d+$/;
  
    return exponentialRegex.test(str);
  }



function numFunction(){
    if(isExponentialNumber(sum)){
        sum = "";
    }
    
    if(sum2.length < 9){
        
        sum2 += clicked;
        sign2 = 1;
    }
    // sum += sum2
        // screen.textContent = sum;
        let match = sum2.match(/(-?\d*\.?\d+)([+\-*\/^])(-?\d*\.?\d+)/)
        // console.log(match)
        if(match){
            screen.textContent = match[3]
        }else{screen.textContent = sum2}
        
        if(sign === 1){
            sum = "";
        }
}

function operFunction(){
    if(isExponentialNumber(sum)){
        sum = "";
    }
    sum += sum2
    sum2 = "";
    if(sum !== ""){
        if(!["+", "-", "*", "/", "=", "^", "C", "."].includes(sum.charAt(sum.length - 1))){
            sum += clicked
            
        }
        
    }else if(operator.textContent === "-"){
        sum += clicked
        screen.textContent = sum
    }

    
    sign = 0;

    operatorContent = clicked;
    myFunction()
    
}

function equalFunction(){
    if(sign2 === 1 ){
        sign = 1;
             sum += sum2
         
         myFunction()
             // sum2 = sum;
             sum2 = "";
             if((sum.charAt(sum.length - 1)) === "+" || (sum.charAt(sum.length - 1)) === "-" || (sum.charAt(sum.length - 1)) === "*" || (sum.charAt(sum.length - 1)) === "/" || (sum.charAt(sum.length - 1)) === "^"){
                 sum = sum.substring(0, sum.length -1);
             }
                 sign2 = 0;
         }
}

function delFunction(){
    sum2 = sum2.substring(0, sum2.length -1);
    screen.textContent = sum2
    if(sum2 === ""){
        screen.textContent = "0"
    }
}

function acFunction(){
    sum2 = ""
    sum = ""
    screen.textContent = "0"
}

function pointFunction(){
    let findOperator = /[+\-*/.^]/g;
    let lastOperator = sum2.match(findOperator)
    let operators = ["+", "-", "*", "/", "^"]
    let lastChar = sum2.slice(-1);
    if(sum2 === ""){
        sum2 += "0";
    }
    
    if( lastOperator === null){
            sum2 += point.textContent
            screen.textContent = "";
            screen.textContent += sum2;
    }
    else if(lastOperator[lastOperator.length - 1] !== "." && !operators.includes(lastChar) ){
        sum2 += clicked
        screen.textContent += clicked;

    }
}



document.addEventListener("keydown", (Event) =>{
     clicked = Event.key
    boardkey(clicked)
})

function boardkey(key){
    switch (key) {
        case "0":
            numFunction()
        break;

        case "1":
            numFunction()
        break;

        case "2":
            numFunction()
        break;

        case "3":
            numFunction()
        break;

        case "4":
            numFunction()
        break;

        case "5":
            numFunction()
        break;

        case "6":
            numFunction()
        break;

        case "7":
            numFunction()
        break;

        case "8":
            numFunction()
        break;

        case "9":
            numFunction()
        break;

        case "+":
            operFunction()
        break;

        case "-":
            operFunction()
        break;

        case "*":
            operFunction()
        break;

        case "/":
            operFunction()
        break;

        case "^":
            operFunction()
        break;

        case "Enter":
            equalFunction()
        break;

        case "Backspace":
            delFunction()
        break;

        case "Delete":
            acFunction()
        break;

        case ".":
            pointFunction()
        break;

    }
}

