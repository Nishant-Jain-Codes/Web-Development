class Person {
    constructor(name) {
        this.name = name;
    }
 }
  

 //Define Student and teacher class here
 
 class Student extends Person{
    constructor(n,cls,rollNo){
        super(n),
        this.cls = cls;
        this.rollNo = rollNo;
    }
    getDetails()
    {
        return [this.name,this.cls,this.rollNo];
    }
 }
 class Teacher extends Person{
    constructor(n,tId,sub){
        super(n),
        this.tId = tId;
        this.sub = sub;
    }
    getDetails()
    {
        return [this.name,this.tId,this.sub];
    }
 }

// Input and output has already been handled for you


process.stdin.resume()
process.stdin.setEncoding('utf8')

let remainder = ''
process.stdin.on('data', function (chunk) {
  let arr = chunk.toString()
  arr = arr.replace('\r','')
  arr = arr.replace('\n','')
  arr = arr.split(' ')
  let s1 = new Student(arr[0],arr[1],arr[2])
  let t1 = new Teacher(arr[3],arr[4],arr[5])
  let ans = s1.getDetails().join(' ')
  ans += '\n' + t1.getDetails().join(' ')
  process.stdout.write(ans)
  process.exit();
});
 