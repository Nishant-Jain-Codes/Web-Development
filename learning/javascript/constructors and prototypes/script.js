var joe = {
    name: "Joe",
    hello: function (){
       console.log("hi, I am " + this.name) ;
    }
}

var globalHello1 = joe.hello.bind(joe) ;
var globalHello2 = joe.hello ;
globalHello1();
globalHello2.bind(joe)();