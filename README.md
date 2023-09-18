## Overview

The code in this repository is very similar to the starter code you'll be given to develop the backend for your social media app. 

For the prep, you will only need to change `src/concepts/websession.ts` and `src/routes.ts`, but here's an overview of the repository setup:

- `app.ts` holds our app definition using concepts. We'll discuss how to define an app using concepts in the next recitation.
- `routes.ts` contains REST API definitions for our concepts' actions and synchronizations. We'll cover REST APIs and concept synchronizations soon.
- `main.ts` contains boilerplate code for setting up an Express app. In this file, we import our routes (which we defined in `routes.ts`) for our concepts.
- The `public` directory contains code for rendering the basic frontend where we can test our backend API operations. You won't need to modify anything within this directory for the purposes of this prep.
- The `framework` directory contains code for converting concept actions into Express handler functions. You shouldn't touch this.
- The `concepts` directory is where you define and implement your concepts. Add a new `.ts` file for each concept. If you add new concepts (which we are NOT doing in this prep), remember to add the REST API definitions of the necessary actions as routes in `routes.ts` and add your concept to your app definition in `app.ts`. You'll also need to update `public/util.ts` with your new operations to be able to test them.

## Running the code

1. Run `npm install`
2. Run `npm start`
3. Navigate to `localhost:3000` (or whichever port you see in the terminal).