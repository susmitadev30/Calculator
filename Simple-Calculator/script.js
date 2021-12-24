class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement= previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
        this.clear()
        // to clear d inputs and set to default value as soon as we create a new calculator
    }
    clear(){
        this.currentOperand= ''
        this.previousOperand= ''
        this.operation = null 
    }

    delete(){
        this.currentOperand= this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number=== '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
            // line 20 - return: means it stops the 'this.currentOpreand' code any further
            //  if d string incldes "."
    }

    chooseOperation(operation){
        if(this.currentOperand=== ' ') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation= operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ' '
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break;
            case '-':
                computation =prev - current
                break;
            case '*':
                computation = prev * current
                break;
            case '÷':
                computation = prev / current
                break;
            default:
                return
        }
        this.currentOperand = computation
        this.previousOperand = ' '
        this.operation = undefined
        
        
    }

    getDisplayNumber(number){
        const stringNumber= number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        if(isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
        
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText= this.getDisplayNumber(this.currentOperand)
        if (this.operation != null){
            this.previousOperandTextElement.innerText= 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previousOperandTextElement.innerText= ' '
        }
    }
}

const numberButtons= document.querySelectorAll('[data-number]');
const operationButtons= document.querySelectorAll('[data-operation]');
const equalsButton= document.querySelector('[data-equals]');
const deleteButton= document.querySelector('[data-delete]');
const allClearButton= document.querySelector('[data-all-clear]');
const previousOperandTextElement= document.querySelector('[data-previous-operand]');
const currentOperandTextElement= document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement,
currentOperandTextElement)
// new 'className' is how classes are defined or called(constructor)

numberButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
// () an action is created and saved.

operationButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', ()=>{
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', ()=>{
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', ()=>{
    calculator.clear()
    calculator.updateDisplay()
})


// line 54,55: returns the default value for computation if none of switch statements true/executed
// line -40: returns noting if true
// computation variable store the computed result to be returned and displayed
// parseFloat converts string to  a number
// const floatNumber = parseFloat(number)
        // if(isNaN(floatNumber)) return ''
        // return floatNumber.toLocaleString('en')-----for getDisplayNumber()
//  line 80, 81 (.)compute() & (.)updateDisplay() is calling each func and make perform