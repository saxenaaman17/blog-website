+++
title = 'var, let and const'
date = 2023-12-26T12:31:43+05:30
draft = false
description = "Mastering Scope with var, let & const"
image = "/images/js.svg"
imageBig = "/images/coding.webp"
categories = ["programming", "javascript"]
authors = ["Aman Saxena"]
avatar="/images/avatar.webp"
+++

First of all, before going into the details of var, let and const, let us understand what are scopes in js ? 

Scopes in js can be defined as a set of variables, objects and functions that you have access to inside a js program. And scopes are of three types:-
1. Global scope - Global scope refers to variables, functions, or objects that are accessible from anywhere in your code.
2. Function scope - Function scope refers to variables or functions that are accessible only within the function they are defined in.
3. Block scope - It was introduced in ES6. Block scope refers to variables declared using let or const that are accessible only within the block they are defined in, generaly within curly braces {}.

## var

- Variables declared with var are function-scoped.
- 'var' variables are hosited at the top of their scope which essentially means they can be accessed before they are declared.
- 'var' variables can be redeclared and reassigned.

### Example

{{< highlight js "linenos=table" >}}
function hello() {
  console.log(varVariable); // accessible here because var variables are hoisted to 
                            // the top of their function scope but 
                            // will have undefined value because their assignments are not hoisted
  if (true) {
    var varVariable = "Aman";
  }

  console.log(varVariable); // we can access this variable outside curly braces because 
                            // it has function scpoe not block scope

  var varVariable = "Aman Saxena"; // can be reassigned and redeclare too
}

console.log(varVariable); // this statement will give an error because we are trying to access
                          // this variable outside its function where it's declared

hello();
{{< / highlight >}}

## let

- Variables declared with let are block-scoped which means they are only accessible within the nearest enclosing {} block.
- 'let' variables are not hoisted to the top of the block which means they exist in the temporal dead zone until the declaration is encountered.
- 'let' variables can be reassigned but not redeclared within the same block.

### Example

{{< highlight js "linenos=table" >}}
function hello() {
  if (true) {
    console.log(letVariable); // this will give an error because let variables are not hoisted 
                              // to the top of their scope
    let letVariable = "Aman";
    letVariable = "Aman Saxena"; // can be reassigned
  }

  console.log(letVariable); // this will give an error because 
                            // let variables can only be accessed inside their nearest {}
}

hello();
{{< / highlight >}}

## const

- Variables declared with const are also block-scoped.
- 'const' variables are not hoisted to the top of the block which means they exist in the temporal dead zone until the declaration is encountered.
- 'const' variables can not be reassigned after they are initialized but the contents of a const object or array (if it's mutable) can be modified.

### Example

{{< highlight js "linenos=table" >}}
function hello() {
  const name = "Aman";
  name = 'Aman Saxena'; // This will throw an error, reassignment is not allowed 

  const myArray = [1, 2, 3];
  myArray = [1, 2, 3]; // When we try to reassign the entire array to a const variable, 
                       // it will throw an error
  myArray.push(4); // This is allowed, modifies the array

  const myObject = { key: 'value1' };
  myObject = { key: 'value2' }; // When we try to reassign the entire object to a const variable,
                                // it will throw an error
  myObject.key = 'new value'; // This is allowed, modifies the object

  console.log(myObject, myArray); // Accessible and mutable within the block
}

hello();
{{< / highlight >}}
