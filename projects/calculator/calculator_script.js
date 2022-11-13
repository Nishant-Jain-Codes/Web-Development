// "use strict" 

var input ='';
var operation = document.getElementsByClassName('operation');
var number = document.getElementsByClassName('number');
var result = document.getElementById('result');
var output = document.getElementById('output');
var allClear = document.getElementById('all_clear');

for(var i=0;i<operation.length;i++)
{
    operation[i].addEventListener('click',function(){
        console.log(operation[i].textContent,' clicked');
        output.textContent='';
        input += operation[i].textContent;
    });

}
for(var i=0;i<number.length;i++)
{
    number[i].addEventListener('click',function(){
        console.log(number[i].textContent,' clicked');
        input += number[i].textContent;
        output.textContent=input;
    });

}
result.addEventListener('click',function(){
    if(input[0]<49 || input[0]>53 ||(input[input.length-1]==0&&input[input.length-2]!=0))
        {
            input='';
            output.textContent='SYNTAX ERROR';
        }
    else 
        {
            output.textContent=input;
            input='';
        }
});

allClear.addEventListener('click',function(){
    input='';
    output.textContent='';
});