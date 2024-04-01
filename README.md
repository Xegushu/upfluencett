# 3D Social Post Visualization

This project is a submission to the coding challenged proposed by Upluence during their recruitment process.

The goal of this challenge is to develop a front-end application that draws a 3-dimensional visualization of social posts, based on given SSE endpoint.

## How to run

```bash
npm install

npm run dev
```

Then open http://localhost:3000 with your browser

## Solution Description

This project has been scaffolded using Next.JS scaffolder. It uses most of the default configuration.
It has been developped with ReactJS and TypeScript.

The project's logic is primarily implemented in two files: SseComponent.tsx and ActivityArray.tsx.

SseComponent.tsx connects to the SSE stream, store events in an array, and split this array by social post to be transmited to a number of ActivityArray.tsx.

ActivityArray.tsx is given a list of posts for a given medium, split it by day of the week and by hour, and display it in a punch card.

Tailwind CSS is used for styling. I'm no UX designer but I looked for a simple way to display the data. The app is slightly responsive and will display as much cards as it can on a single line.

The code is fully ESLint complient.

Tests have been written for good measure but do not provide a satisfying coverage. More on this on the Trade-offs section.

## Technical Choices

I chose to develop this project in ReactJS because it's the front-end framework that I'm most proficient in. I have no prior experence in EmberJS, and gaining skill will take time. As I understood it, it wasn't the point of this coding challenge.

I used Next.JS to quickly scaffold a working project. It was the simplest solution and it comes bundled with everything I needed.

The punchcard is generated using react-chartjs-2, which provides React components for Chart.js. I chose this library because it's a popular library, and is well documented.

I used Tailwind for CSS because I'm deeply convinced that it is the best CSS tool as of now. It's clean and intuitive, though quite heavy.

I used Jest and React Testing Library for functionnal tests, but it wasn't a success, as explained below.

## Trade-offs

Testing remains an area for improvement in this project, mostly for three main reasons.

Firstly, I'm not used to build full projects from scratch, and I encountered a lot of problems to configure Jest and React Testing Library correctly. As of now, it's not even working properly. To run tests, one must first edit tsconfig.json to replace "jsx": "preserve" by "jsx": "react", and then run npm run test. But when the project is built, the preserved keyword is restored. I haven't found a solution yet.

Secondly, it was my first time working with SSE, and I didn't know how to mock the behaviour properly. This part is left untested.

Lastly, this project isn't very interactive, so there wasn't any user behaviour to replicate, what functional tests are made for. The only test I could think of was to snapshot the punchcard.

## Thank you for your time.
