/*
========================================
HOISTING REVISION
Execution Context + Memory Phase + Shadowing
========================================
*/


/*
----------------------------------------
1. var Hoisting
----------------------------------------
Expected Output: undefined

Reason:
During memory phase:
a -> undefined

Execution phase:
console.log(a) -> undefined
then a = 5
*/

console.log("1.", a);
var a = 5;



/*
----------------------------------------
2. let Hoisting (TDZ)
----------------------------------------
Expected Output: ReferenceError

Reason:
During memory phase:
b -> uninitialized (TDZ)

Access before initialization throws error.
*/

// Uncomment to test
// console.log("2.", b);
// let b = 5;



/*
----------------------------------------
3. Function Declaration Hoisting
----------------------------------------
Expected Output: A

Reason:
Function declarations are fully hoisted
during memory phase.
*/

foo();

function foo() {
  console.log("3. A");
}



/*
----------------------------------------
4. Function Expression Hoisting
----------------------------------------
Expected Output: TypeError (undefined is not a function)

Reason:
var bar is hoisted as undefined.
Function assignment happens in execution phase.
*/

// Uncomment to test
// bar();
// var bar = function () {
//   console.log("4. B");
// };



/*
----------------------------------------
5. Function + var Same Name
----------------------------------------
Expected Output:
function
10

Reason:
Memory phase:
foo2 -> function (function wins)

Execution:
console.log(foo2) -> function
foo2 = 10 (assignment overrides)
console.log(foo2) -> 10
*/

console.log("5. first:", typeof foo2);

function foo2() {}

var foo2 = 10;

console.log("5. second:", foo2);



/*
----------------------------------------
6. Local var Shadows Global
----------------------------------------
Expected Output: undefined

Reason:
Inside test():
var x is hoisted locally.
Local x shadows global x.
*/

var x = 1;

function test() {
  console.log("6.", x);
  var x = 2;
}

test();



/*
----------------------------------------
7. let Shadowing + TDZ
----------------------------------------
Expected Output: ReferenceError

Reason:
Local let y is hoisted (uninitialized).
Access before initialization -> TDZ error.
*/

// Uncomment to test
// var y = 1;

// function test2() {
//   console.log("7.", y);
//   let y = 2;
// }

// test2();



/*
----------------------------------------
8. Shadowing With var Inside Function
----------------------------------------
Expected Output: undefined

Reason:
Local var a2 is hoisted inside outer().
It shadows global a2.
*/

var a2 = 10;

function outer() {
  console.log("8.", a2);
  var a2 = 20;
}

outer();



/*
========================================
CORE RULES
========================================

1. var -> hoisted and initialized as undefined
2. let/const -> hoisted but uninitialized (TDZ)
3. Function declarations -> fully hoisted
4. Function expressions -> behave like normal variables
5. Local declarations always shadow outer ones
6. Lookup never skips a local binding (even if undefined or TDZ)

========================================
*/