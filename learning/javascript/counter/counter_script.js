function oddSum(n)
{
    var total = 0, result=[]; 
    for(var x = 1; x <= n; x++) 
    { 
       var odd = 2*x-1; 
       total += odd;
       result.push(total);
    }
    return result;
}

var result = oddSum(5);
console.log(result);