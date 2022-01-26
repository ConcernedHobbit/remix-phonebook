# Remix Phonebook Application

A simple web app where you can definitely 100% safely store all of your sensitive contact details. (Do not store your sensitive contact details in this app.)

Made in one night to learn the basics of Remix and what it's capable of.

## Installation & running

Install necessary packages: `npm install`

*SQLite*: Initialize prisma database: `npm run init`

*PostgreSQL*: Update `DATABASE_URL` in `.env` to a postgres URL and run `npm run init:postgresql`

Set `SESSION_SECRET` in `.env` to a random, secure value.

Start the development server: `npm run dev`

The database has been seeded with the user `root:password` and a couple of contacts for `root`. Have fun!

## Resources

* [Remix documentation](https://remix.run/docs/en/v1)
* [Remix docs: Jokes app tutorial](https://remix.run/docs/en/v1/tutorials/jokes)