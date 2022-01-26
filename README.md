# Remix Phonebook Application

A simple web app where you can definitely 100% safely store all of your sensitive contact details. (Do not store your sensitive contact details in this app.)

Made in one night to learn the basics of Remix and what it's capable of.

## Installation & running

Install necessary packages: `npm install`

Initialize prisma database: `npm run init`

*Optional* Populate the database with user `root:password` and some example contacts: `node --require esbuild-register prisma/seed.ts`

Set `SESSION_SECRET` in `.env` to a random, secure value.

Start the development server: `npm run dev`

## Resources

* [Remix documentation](https://remix.run/docs/en/v1)
* [Remix docs: Jokes app tutorial](https://remix.run/docs/en/v1/tutorials/jokes)