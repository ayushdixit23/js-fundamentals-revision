/*
========================================
CLOSURES REVISION
Lexical Environment + Binding Persistence
========================================
*/


/*
----------------------------------------
15. Persistent State
----------------------------------------
Expected Output:
1
2

Reason:
counter() creates one lexical environment.
count lives inside that environment.
Returned function closes over the same binding.
It mutates the same variable each time.
*/

function counter() {
  var count = 0;

  return function () {
    count++;
    return count;
  };
}

var c = counter();

console.log("15.", c());
console.log("15.", c());



/*
----------------------------------------
16. Multiple Functions Sharing One Closure
----------------------------------------
Expected Output:
2

Reason:
inc and log are defined inside the same outer() call.
They share the same lexical environment.
Both reference the same binding of x.
*/

function outer1() {
  var x = 0;

  return {
    inc: function () { x++; },
    log: function () { console.log("16.", x); }
  };
}

var obj = outer1();
obj.inc();
obj.inc();
obj.log();



/*
----------------------------------------
17. Separate Closure Instances
----------------------------------------
Expected Output:
0
1
0

Reason:
Each call to outer2() creates a new lexical environment.
a and b do NOT share memory.
They close over different bindings.
*/

function outer2() {
  var x = 0;

  return function () {
    return x++;
  };
}

var a = outer2();
var b = outer2();

console.log("17.", a());
console.log("17.", a());
console.log("17.", b());



/*
----------------------------------------
18. Classic var Loop Trap
----------------------------------------
Expected Output:
3
3
3

Reason:
var is function-scoped.
There is only ONE binding of i.
Loop finishes first (i becomes 3).
All callbacks reference the same binding.
Closures capture the variable, not its value.
*/

for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("18.", i);
  }, 0);
}



/*
----------------------------------------
19. let Loop Fix (New Binding Per Iteration)
----------------------------------------
Expected Output:
0
1
2

Reason:
let is block-scoped.
Each iteration creates a new binding of i.
Each callback closes over a different binding.
*/

for (let j = 0; j < 3; j++) {
  setTimeout(function () {
    console.log("19.", j);
  }, 0);
}



/*
----------------------------------------
20. Closure With Mutation
----------------------------------------
Expected Output:
7
9

Reason:
One lexical environment.
x persists after test() finishes.
Each call mutates the same binding.
*/

function test() {
  var x = 5;

  return function () {
    x += 2;
    return x;
  };
}

var fn = test();

console.log("20.", fn());
console.log("20.", fn());



/*
----------------------------------------
21. Async Closure Survival
----------------------------------------
Expected Output:
10

Reason:
Callback closes over outer3's lexical environment.
JS cannot garbage collect x
until the callback finishes.
Closure keeps binding alive.
*/

function outer3() {
  var x = 10;

  setTimeout(function () {
    console.log("21.", x);
  }, 1000);
}

outer3();



/*
========================================
CORE RULES
========================================

1. Closures capture bindings, not values.
2. A binding is a variable's memory location.
3. var creates one shared binding in loops.
4. let creates a new binding per iteration.
5. Each function invocation creates a new lexical environment.
6. Closures keep outer variables alive if still referenced.
7. Async callbacks rely on closure to access outer variables.

========================================
*/