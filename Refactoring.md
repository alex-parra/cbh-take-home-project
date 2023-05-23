# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
In my opinion it is clearer to avoid nesting ifs and return early when possible.  
That has been the bulk of my refactor, and I believe now it's easier to read since each "line" (section of 1-3 lines) reads independently.
I've also moved the create hash logic to it's own function since it has some duplicate values so this way we have a single source of truth.
Another possible improvement would be to allow dependency injection on the method to create hashes but that would require changing the function signature so I've opted that it was out of scope here.
