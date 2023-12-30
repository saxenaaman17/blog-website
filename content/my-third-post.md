+++
title = "Redux Simplified: Basics of Redux"
date = 2023-12-29T14:48:08+05:30
draft = false
description = "Streamline your JS apps with Redux for efficient, predictable state handling."
image = "/images/redux1.webp"
imageBig = "/images/coding.webp"
categories = ["programming", "react js"]
authors = ["Aman Saxena"]
avatar="/images/avatar.webp"
+++

Redux is a pattern and library for managing and updating application state, using events called "actions" so that the state can only be updated in a predictable fashion. *"Application state"* here means state which needs to be used across your entire application or many parts of your application.so we can consider this state as *"global state"* for our application. And to update the state in predictable fashion, we don't directly modify the state. Instead, we can dispatch actions to let Redux know what changes need to be made.

An action is a plain JavaScript object that has a type field. We can think of an action as an event that describes something that happened in the application. type field should be a string and this action object can have other fields too for additional information to let redux know about what happened.

### Example of an action object:-
{{< highlight js "linenos=table" >}}
const addProductToCartAction = {
  type: "cart/productAdded",
  payload: "butter",
};
{{</ highlight >}}

Application state in Redux lives in an object called the store. We can create this store by passing in a reducer and this store object has a method called getState() that returns the current state value.
So the question arises - what is a reducer ? 
A reducer is a function that receives the current state and an action object and decides how to update the state if necessary, and returns the new state. We must follow some rules in regards to reducer:-
- reducer should only calculate the new state based on state and action arguments.
- reducer are not allowed to modify the existing state. Instead we should make a copy of the existing state and make changes to the copied values and then return it.
- we should avoid doing random calculations, async tasks and side effects in reducer.

### Example of a reducer:-
{{< highlight js "linenos=table" >}}
const initialState = { value: "" };

function cartReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === "cart/productAdded") {
    // If so, make a copy of 'state'
    return {
      ...state,
      // and update the copy with the new value
      value: action.payload
    };
  }
  // otherwise return the existing state unchanged
  return state;
}
{{</ highlight >}}

### Example of a store:-
{{< highlight js "linenos=table" >}}
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: cartReducer });

console.log(store.getState());
{{</ highlight >}}

The Redux store has a method called dispatch. The only way to update the state is to call store.dispatch() and pass in an action object. The store will run its reducer function and save the new state value inside, and we can call getState() to retrieve the updated value.
{{< highlight js "linenos=table" >}}
store.dispatch({ type: "cart/productAdded" });

console.log(store.getState());
{{< / highlight >}}

Now, to access the application state stored in store object, we mostly use *Selectors*. Selectors are functions which can extract specific piece of information from store state value. So in large applications, this can help us in avoiding repeating logic if different parts of the app need to read the same data from state.

{{< highlight js "linenos=table" >}}
const selectCartValue = state => state.value;

const currentCartValue = selectCartValue(store.getState());
console.log(currentCartValue);
{{< / highlight >}}

***Note:-*** almost all the stuff here in this post, can also be found on official redux js documentation on this link - <a href="https://redux.js.org/tutorials/essentials/part-1-overview-concepts" target="_blank" rel="noopener noreferrer">click here</a>

