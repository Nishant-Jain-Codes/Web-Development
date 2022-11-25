// Create a closure function that generates unique registration numbers in the following format:

// A-2021_1 // For first call
// A-2021_2 // For second call
// A-2021_3 // For third call
// The function when called should return a generator function which when called each time should generate the next ID. The function should take the start value as an argument



//Write your function here


function generateID(start) {
    // Write logic here
    var no = start;
    var id = function()
    {
        return "A-2021_"+no++;
        
    }
    return id;
}



// Input and output has already been handled for you



process.stdin.resume();
process.stdin.setEncoding('utf8');

let remainder = '';
process.stdin.on('data', function (chunk) {
    let lines = chunk.toString().split(' ');
    let start = lines[0];
    let n = lines[1];
    let ans = ''
    let id = generateID(start)
    for(let i=0;i<n;i++) {
        ans += id()+'\n'
    }

    process.stdout.write(ans);
    process.exit();
});