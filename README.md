
# READ ME

### App Demo: [https://cantaloupe-store.herokuapp.com/]

---

## Concept:

Cantaloupe is an e-commerce store leveraging Stripe's payment platform.

## Technologies Used:

* MERN Stack: Node.js, MongoDB/Mongoose, Express and React
* Stripe Elements
* SCSS

##### Credits:

    Unsplash.com
    Coolors.co
    Anthropologie.com

## Approach:

#### Overview
I started off by defining my model and controllers. Did some testing in Postman to make sure my APIs worked. Then tied everything together in the front end using React.

#### Wireframe

<img src="/img/journal-wireframe.pdf" width="50%" >

Color Pallet:

```
    #E29578
    #006D77
    #463F3A
```

#### User Stories

1. As a user, I want to create a new journal entry.
2. As a user, I want to be able to see all my journal entries and sort them.
3. As a user, I want to be able to modify any journal entries.
4. As a user, I want to be able to delete a journal entry.
   

#### MVP

* A working full-stack application
* One model with full CRUD
* Integrating a third party API
* Use React Router

#### Stretch goals

* Add authorization
* Integrate an additional weather API (since weather effects mood)

## Challenges:

I wanted to create a journal form where each category had a dynamic number of inputs so that users could split each item in an input box rather than a single comma seperated input box. For example, for the Feelings section, I would have preferred it to look like:

    Feelings:
        1. Happy
        2. Excited
        3. Joy
    + (option to add additional input box)
   
   And the request would look like:
   { ...
     feelings: ['happy', 'excited', 'joy']}

However, I could not figure out how to reference each input box and add it to the array. After realizing I was spending too much time trying to get this to work, I had to pivot my idea to use one input box per section. 

