//  "use strict" 

var input ='';
var operation = document.getElementsByClassName('operation');
var number = document.getElementsByClassName('number');
var result = document.getElementById('result');
var output = document.getElementById('output');
var allClear = document.getElementById('all_clear');

for(var i=0;i<operation.length;i++)
{
    operation[i].addEventListener('click',function(){
        var data = this.getAttribute('data-value');
        // output.textContent='';
        input += data;
         output.textContent=input;
    });

}
for(var i=0;i<number.length;i++)
{
    number[i].addEventListener('click',function(){
        var data = this.getAttribute('data-value');
        input += data;
        output.textContent=input;
    });

}
result.addEventListener('click',function(){

       output.textContent=eval(input);
       input=eval(input);

});

allClear.addEventListener('click',function(){
    input='';
    output.textContent='';
});