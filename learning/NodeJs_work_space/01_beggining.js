console.log('hello world :)');
function add(a,b)
{
    return a+b;
}
console.log(add(1,2))
console.log(process.argv);
var args = process.argv.slice(2);
console.log('add: ',add(parseInt(args[0]),parseInt(args[1])));