const canvas = document.getElementById('calculatorCanvas');
const ctx = canvas.getContext('2d');


const buttons = [
  '', '', '', '%','/',
  '(', '7', '8', '9','x',
  ')', '4', '5', '6','-',
  'Back', '1', '2', '3', '+',
  '0','.','='
];

const buttonWidth = 62;
const buttonHeight = 60;

let expression = '';

function drawCalculatorUI() {
  ctx.beginPath();    // draw redcircle
  ctx.fillStyle="#ff5f58";
  ctx.arc(15,15,11,0,Math.PI*2);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();    // draw yellow circle
  ctx.fillStyle="#febc2e";
  ctx.arc(40,15,11,0,Math.PI*2);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();    // draw green circle
  ctx.fillStyle="#29c83f";
  ctx.arc(65,15,11,0,Math.PI*2);
  ctx.fill();
  ctx.closePath();

  // ctx.clearRect(0, 0, canvas.width, canvas.height);



  let x = 1;
  let y = 100;

  let counter=0;      //loop through buttons list
  buttons.forEach(button => {
    counter++;

    if(counter%5==0 || button=='=')       //to make all buttons on right colum orange
      ctx.fillStyle = '#ff9f0c';
    else                                  // make rest of the buttons grey
      ctx.fillStyle = '#787a7e';

    if(button=="")
      ctx.fillStyle="#5f6065"
    let increaseWidthBy=buttonWidth;

    if(button==='0')
    {
        ctx.fillRect(x, y, buttonWidth*3+2, buttonHeight);
        increaseWidthBy= buttonWidth*3+2;
    }
    else    
        ctx.fillRect(x, y, buttonWidth, buttonHeight);

    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';

    if(button==='Back')
         ctx.fillText(button, x +9, y + 40);
    else
        ctx.fillText(button, x + 20, y + 40);


    x += increaseWidthBy + 1;

    if (x > canvas.width - buttonWidth - 1) {
      x = 1;
      y += buttonHeight + 1
      ;
    }
  });
}
const rect = canvas.getBoundingClientRect();



canvas.addEventListener('click',function(event){
    let clickX=event.offsetX
    let clickY=event.offsetY
    console.log(clickX)
    console.log(clickY)

    let x = 1; // gaps between the button are 1 px
    let y = 100;

    let BW=buttonWidth;
    let BH=buttonHeight;

    for (let i = 0; i < buttons.length; i++) {

        // console.log("i: "+i)
        if(i==20)
            BW=buttonWidth*3+2

    
      if (clickX > x && clickX < x + BW  &&  clickY > y &&clickY < y + BH) {
        // if(clickX>x && clickX<x+buttonWidth &&)
        handleButtonPress(buttons[i]);
        break;
      }

      x += BW + 1;
      BW=buttonWidth;

      if (x > canvas.width - BW - 1) {
        x = 1;
        y += BH + 1;
      }
    }

})

function handleButtonPress(button) {
    // console.log(button)
    if (button === '=') {
      calculateResult();
    } 
    else if(button === 'Back')
    {
      back();
    }
    else if (button==='x'){
      expression=expression+'*';
      printExpression();
    }
    else {
      expression =expression + button;
      printExpression();
    }

}

function calculateResult() {
  let result;
  try {
    result = evaluateExpression();
    
  } catch (error) {
    result = 'Invalid expression';
  }
  printResult(result);
  expression=''

}

function printExpression(){
  ctx.textAlign = 'right';
  ctx.clearRect(13, 35, 400, 20);
  ctx.fillText(expression, 290, 50);
  console.log(expression)
  clearScreen();

}

function printResult(result){
  ctx.textAlign = 'right';
  clearScreen();
  ctx.fillText(result, 290, 80);
}

function back(){
  console.log(expression)
  expression= expression.slice(0,-1);
  printExpression();

}

function clearScreen(){
  ctx.clearRect(11, 65, 400, 20);
}

function evaluateExpression()
{
  return new Function('return ' + expression)();
}

drawCalculatorUI(); 