/*
========================================
LEXICAL SCOPING REVISION
Scope Chain + Definition-Time Binding
========================================
*/


/*
----------------------------------------
9. Function Uses Scope Where It Was Defined
----------------------------------------
Expected Output: 1

Reason:
foo is defined in global scope.
Its lexical environment points to Global.
It does NOT use bar's scope even though it is called inside bar.
*/

var x = 1;

function foo() {
  console.log("9.", x);
}

function bar() {
  var x = 2;
  foo();
}

bar();



/*
----------------------------------------
10. Closure Basic Example
----------------------------------------
Expected Output: 10

Reason:
inner is defined inside outer.
It closes over outer's lexical environment.
Even after outer() finishes, x persists.
*/

function outer1() {
  var x = 10;

  function inner() {
    console.log("10.", x);
  }

  return inner;
}

var fn = outer1();
fn();



/*
----------------------------------------
11. Definition Scope vs Call Scope
----------------------------------------
Expected Output: 100

Reason:
inner is defined in global scope.
Its lexical environment is Global.
It does NOT use outer's x.
*/

var x2 = 100;

function outer2() {
  var x2 = 50;
  return inner2;
}

function inner2() {
  console.log("11.", x2);
}

outer2()();



/*
----------------------------------------
12. Deep Scope Chain
----------------------------------------
Expected Output: 1 2

Reason:
Scope chain for C:
C -> B -> A -> Global

a found in A
b found in B
*/

function A() {
  var a = 1;

  function B() {
    var b = 2;

    function C() {
      console.log("12.", a, b);
    }

    C();
  }

  B();
}

A();



/*
----------------------------------------
13. Call Location Does Not Matter
----------------------------------------
Expected Output: 10

Reason:
outer is defined in global scope.
It uses global x, not wrapper's x.
*/

var x3 = 10;

function outer3() {
  console.log("13.", x3);
}

function wrapper() {
  var x3 = 20;
  outer3();
}

wrapper();



/*
----------------------------------------
14. Separate Closures Per Invocation
----------------------------------------
Expected Output:
10
10

Reason:
Each call to outer4() creates a new lexical environment.
fn1 and fn2 do NOT share memory.
*/

function outer4() {
  var x = 10;

  function inner() {
    console.log("14.", x);
  }

  return inner;
}

var fn1 = outer4();
var fn2 = outer4();

fn1();
fn2();



/*
========================================
CORE RULES
========================================

1. Scope is determined at function definition time.
2. A function remembers the environment where it was written.
3. Call location does NOT affect scope.
4. Lookup order:
   Current Scope -> Outer Scope -> Global Scope
5. Each function invocation creates a new lexical environment.
6. Closures are just preserved lexical environments.

========================================
*/