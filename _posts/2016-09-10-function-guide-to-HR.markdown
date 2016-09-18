---
layout: post
title:  A functional guide to getting into Hack Reactor
date:   2016-09-10
---
**TL; DR:** To get into Hack Reactor, learning basic Javascript syntax and data structures wasn’t sufficient. In my studying I found it extremely useful to adopt a functional programming perspective that allowed me to practice the following meta-programming skills:

* Explicit is better than implicit
* Functions should be declarative not imperative
* Minimize side effects

*This article includes a tutorial on recreating a couple native JavaScript utility methods, which is useful practice for the Hack Reactor admissions process. Code available on [GitHub](https://github.com/dengjonathan/HR_tutorial). I also wrote a blog post about the soft skills required [here](https://medium.com/operation-code/fueling-the-how-i-learned-to-code-while-deployed-to-iraq-ef71d597fcaf#.3h6uh1i64).*

## My Story
During my first Hack Reactor technical interview, I was able to complete all the challenges (function composition and debugging) and even successfully worked through problem requiring recursion. I thought I had killed it.

I didn’t.

Why didn’t I pass my first interview? I was able to compose code, but I didn’t have a intuitive understanding of function composition and the skills to improve code from something that merely works to code that is readable and extendable. While I wouldn’t go so far as to say knowing the basics of functional programming is necessary for Hack Reactor acceptance, I’ve found it a useful paradigm for thinking about composing programs, and it definitely helped me reason through my second interview.

The problem is that most introductory tutorials to JavaScript teach the language from an object oriented perspective — very few will help you from a functional perspective. While effective functional programming is a career-long effort, I wanted to share what I’ve learned about making code explicit, minimizing side effects, and making my APIs readable and how I applied it to get into Hack Reactor.

If you’re like me and learn better when you code along with a tutorial, I’ve posted all both problems and solutions on [GitHub](https://github.com/dengjonathan/HR_tutorial). Feel free to follow along!

Before we begin, you need to have a basic understanding of JavaScript data types and syntax as well as callback functions.

## What is functional programming?

From Wikipedia:

*In functional code, the output value of a function depends only on the arguments that are input to the function, so calling a function f twice with the same value for an argument x will produce the same result f(x) each time. *Eliminating side effects, i.e. changes in state that do not depend on the function inputs, can make it much easier to understand and predict the behavior of a program, which is one of the key motivations for the development of functional programming.*

Let’s unpack this a little:

##### 1. the output value of a function depends only on the arguments that are inputs to the function

Functional programming seeks to make all the inputs to a function explicit. The way to do this in JavaScript is to pass any data used by the function in as an argument. For example:

<script src="https://gist.github.com/dengjonathan/36abfbb3e261ee1e082d8f2b8528d4f6.js"></script>

In the above example, the first implementation of plusOne is more explicit because the function signature on line 5 specifically requires a argument called number that will be used in the body of the function.

The second implementation of plusOne still requires a variable named number to work properly, however you would only know this if you looked into the implementation of the function, i.e. the portion between the curly braces, {}. Looking at the function signature of the second implementation on line 13, it is not explicit that the function requires a variable named number as an input. If a user calling the second implementation of plusOne modified the variable named number previously, plusOne would return unintended results.
In functional programming, a pure function has all of its inputs explicitly declared as arguments. A pure function does not reference or alter variables outside the scope of the function. The first implementation of plusOne is a pure function because a call to plusOne(5) will always return 6 regardless of state, or the value of other variables stored in the computer’s memory at the time that the function plusOne is called. You cannot say the same thing about the second implementation.

Another example of a pure function:

<script src="https://gist.github.com/dengjonathan/506325caaaf1466505efc2b5e1d417cb.js"> </script>

The add function will always return the same value given the same inputs and will not alter variables outside the execution context of the function.

In most cases, code is easier to read and understand if all the inputs to a function are explicit to the user, which is anybody who uses the function. Each function signature is a contract between the programmer who created the function and the user who calls the function that states exactly what data inputs the function needs and what it will output. Otherwise, to understand what a function does, the user needs to dig into the implementation of the function, which takes away most of the benefits of abstracting part of the program into a function in the first place.
Explicit is better than implicit because we can use functions without assumptions about the state of the data in memory at the time we call the function.

##### 2. Eliminating side effects, i.e. changes in state that do not depend on the function inputs, can make it much easier to understand and predict the behavior of a program.

Suppose we have an array of the names of our friends on a social media site and want to capitalize all the names so we can display them in a list on our page.
One way to do it is to use a for loop to iterate through all the indices in our array of names and capitalize the first letter.

<script src="https://gist.github.com/dengjonathan/e51c79e76d25f05b04cd70dc342b40e8.js"> </script>

However, under the functional paradigm, this is not ideal because:

1. Our code creates a variable i in the global scope; if elsewhere our program expects i to equal some other value, this can lead to a bug.
2. Our code is imperative rather than declarative. It makes the code more concerned with implementation details rather than what our intention is, which is to return a capitalized version of each name in the names array.
3. Our code modifies the names array in-place, meaning that it changes the original array, rather than returning a new array of capitalized names. If our program uses the names array in another location, this can also lead to bugs.

Let’s try to do this in a more functional way and avoid the pitfalls above:

<script src="https://gist.github.com/dengjonathan/ca4ff50e59fa3ce7cf80779462e1d16e.js"> </script>

Using the native JavaScript Array.prototype.map method allows our code to declarative rather than imperative (it shows our intention to map, or change, each item in the array, rather than “how” we plan on going about that intention). This means the users of our function do not have to dive into the implementation details of a function. Instead they can see what the intention of the function is in the function signature.

Additionally, this implementation avoids creating new variables in the global scope, and does not modify any variables outside the scope of the map function. Minimizing side effects allows functions to act in more predictable ways.

Now that we’ve covered the basic aims of functional programming, we can define what functional programming means. From Kris Jenkins’ blog:

*Functional programming is about writing pure functions, about removing hidden inputs and outputs as far as we can, so that as much of our code as possible just describes a relationship between inputs and outputs. We accept that some side-effects are inevitable — most programs are run for what they do rather than what they return, but within our program we will exercise tight control. Let’s not hide what a piece of code needs, nor what results it will yield. If a piece of code needs something to run correctly, let it say so. If it does something useful, let it declare it as an output. When we do this, our code will be clearer. Complexity will come to the surface, where we can break it down and deal with it.*

## Examples

Now that we know what functional programming means, let’s implement these principles in a way that will help you get into Hack Reactor.

Remember that our three principles are:

1. Explicit is better than implicit
2. Functions should be declarative not imperative
3. Minimize side effects

#### Example 1 (Implement Javascript’s forEach method):

A lot of times we need to do something to all items within an array. Reviving our previous example, suppose our social media site has a list of names of all our friends and we want to log them onto the console so we can see all of them.

In the example below, we use a for loop to log all of the names in an array:

<script src="https://gist.github.com/dengjonathan/5821d2b939c85ad83120fbbd334fff0e.js"> </script>

However, this method has three major downsides:

1. Implicit rather than explicit: It is not clear where the for loop is getting data from without looking within the for loop’s implementation on line 10 to see that it is using the names array as an input.
2. Imperative rather than declarative: Although our intention is to log all the items within the names array, using a for loop makes our code more concerned with implementation rather than intention
3. Creates side effects: Our code creates a variable named i in the global namespace. If another part of the program depends on a variable named i, we have altered the variable i in the global namespace, and this could cause a bug.

We can do better by abstracting our implementation details into a function. To approach this problem from a functional perspective we have three main goals:

1. Be explicit: Given the same two arguments — an array and a function — our new each function should do the same thing every time.
2. Be declarative: Our function signature should be clear about what the functions intention is.
Minimize side effects: We don’t want to create a new variable in the global namespace or modify 3. the existing names array.

<script src="https://gist.github.com/dengjonathan/5ade6b03f4ed135caed2f25f634eeee0.js"> </script>

There! Although we still use a for loop within our function, it only exists in a local scope, so the user does not have to worry about our implementation details. Instead, we have abstracted the implementation of our function away so the user can depend on our function to do what it says it will do, based on the function signature. Additionally, calling each instead of using a for loop allows the user to tell the computer what they want done, instead of how to do it.
Isn't the code `each(names, log)` much more clear about our intention?

#### Example 2 ( Implement Javascript’s map method)

Now that we have an each method in place, we can extend it to implement our own version of the map method that we used during the functional programming function.

Remember that our each function takes two inputs as arguments: the array to iterate through, and a function to call for each item in an array.

<script src="https://gist.github.com/dengjonathan/117678ef41c4c34c0ac1ccf70cc3dbd0.js"> </script>

In line 21, we declare a new empty array call changes where we will push each transformed (changed) value from the original array that was passed to the map function as an argument.
In lines 24–26, we call our previously defined each function with 2 arguments:
The original array passed as an argument to map
A function that does something to each item in the array

In this case, we use the callback passed to the map function as the second argument to transform each value in the array. Once the value is transformed, we push the transformed value to the changes array that we declared in line 21.
Lastly, we return the array changes which now includes all the transformed values.
Now that we have defined our map function, we just have to call it:

Looking at line 7, you can see our function signature is declarative about our intention and hides all the implementation details. We want to map each value in names using our previously defined capitalize function.

## Conclusion:

I hope this was a useful exercise in thinking about how to compose functions in JavaScript and a good introduction to the super interesting world of functional programming. And I hope you are successful no matter what the next step in your programming journey is! I also wrote an article about the soft skills that helped me in my Hack Reactor application process here.

#### Below is a bunch of useful resources that helped me prepare.

**[Eric Elliot’s Two pillars of Javascript:](https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4#.atgxm1k31)**that focuses specifically on functional programming.

**[MDN Javascript guide:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)**: Everybody says this, but it is important learn to read to documentation. Blogs, like this one, can get things wrong or provide an opinion on software when the original programmers did not intend to provide one. The best way to learn about new concepts is to go straight to the docs. You’ll probably feel at first that you have no idea what the documentation is talking about. That is ok. Going back and forth between docs, stackoverflow and blogs is a great pattern to deeply grok something.

**Implement your own version of reduce:** If you completed this tutorial and would like more practice, a natural next step is to implement JavaScript’s [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) method using the each function you created during this tutorial.

**[Udacity Object Oriented JavaScript course:](https://www.udacity.com/course/object-oriented-javascript--ud015)** Surprisingly, the Hack Reactor admissions process didn’t require that great of an understanding of Javascript’s flavor of object oriented programming (they don’t even recommend you read the chapter on objects in Eloquent Javascript prior to the course). However, if you’re interested in OOP for your own projects, there is a great free course on Udacity taught by Marcus Phillips, one of HR’s founders.

**Pair program with a friend:** In person and on video chat with a shared text editor without syntax highlighting, try to recreate JavaScript utility functions. Then try to run your code in a browser console and see if it works. You overcome bugs quicker with a friend and it helps you practice your technical interview skills.