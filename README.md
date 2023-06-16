# test-async-js

This is a test project to see how async JavaScript works, between bun and node.

Bun can complete the `/not-blocking` endpoint without getting timed out, but it seems the async task is not working as expected. `/ping` endpoint is not returning data.

Meanwhile Node always timed out, but when hitting `/not-blocking`, `/ping` can still return data, async task is working as expected.

To install dependencies:

```bash
bun install // Bun
yarn install // Node-Yarn
npm install // Node-NPM
```

To run:

```bash
bun start:bun // Bun
yarn start:node // Node-Yarn
npm run start:node // Node-NPM
```

This project was created using `bun init` in bun v0.6.9. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
