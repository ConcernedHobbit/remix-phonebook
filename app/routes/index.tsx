import { User } from "@prisma/client";
import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Main from "~/components/Main";
import Statistics from "~/components/Statistics";
import { getUser } from "~/utils/session.server";

type LoaderData = {
  user: User | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const data: LoaderData = {
    user,
  };
  return data;
};

export default function Index() {
  const data = useLoaderData<LoaderData>();
  return (
    <>
      <Header>
        <Link to="/contacts" className="underline">
          contacts
        </Link>
        {data.user ? (
          <div className="ml-auto">
            logged in as <span className="font-bold">{data.user.username}</span>
            <form action="/logout" method="post" className="inline ml-4">
              <button type="submit" className="underline">
                log out
              </button>
            </form>
          </div>
        ) : (
          <Link to="/login" className="underline ml-auto">
            log in
          </Link>
        )}
      </Header>

      <Main>
        <div className="max-w-xl break-words">
          <h2 className="font-semibold">Welcome to Phonebook!</h2>
          <p>
            Phonebook is a project I created in one night to help learn{" "}
            <a
              href="https://remix.run"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              remix
            </a>
            .
          </p>
          <p>
            The time could've probably been spent studying but... well, I can't
            change the past.
          </p>
          <p>
            Thanks to remix, you can disable JavaScript and the page doesn't
            break. Amazing! It's like browsing the web in 1992 all over again.
          </p>
          <p>
            There's still a bunch of optimizations that could be done. For
            example, every template page has to seperately get the user in a
            loader to display login status in the header.
          </p>
          <p>
            The Statistics component below this text uses JavaScript. In fact,
            if you have JavaScript disabled you won't see a thing. It could
            probably be modified to show statistics even if JavaScript is
            disabled.
          </p>
          <Statistics className="bg-slate-500 bg-opacity-30 w-fit p-2 rounded my-2" />
          <p>
            The GitHub repo can be found at{" "}
            <a
              className="underline"
              href="https://github.com/ConcernedHobbit/remix-phonebook"
              target="_blank"
              rel="noreferrer"
            >
              ConcernedHobbit/remix-phonebook
            </a>
            .
          </p>
          <p>
            Hey, I just thought of another good idea:{" "}
            <code className="bg-slate-500 bg-opacity-50 p-1 rounded text-slate-800 text-xs">
              _blank
            </code>{" "}
            links should probably be a component so I don't have to copy-paste
            the{" "}
            <code className="bg-slate-500 bg-opacity-50 p-1 rounded text-slate-800 text-xs">
              a
            </code>{" "}
            tags with all of their properties every time. In fact, those code
            tags I just created could probably be components too.
          </p>
          <p>
            This project might be updated or it might not. It's probably running
            somewhere in the cloud, check the GitHub page for demo details. If
            you're running this locally, wow, I'm humbled! If this is the demo
            page, well... You might get credentials if you ask me nicely. Maybe
            I shouldn't promise that.
          </p>
          <p>
            This project was very much based on the example Jokes app from remix
            docs. It's a great introduction to remix, check it out!
          </p>
          <p>
            <em>
              -{" "}
              <a
                className="underline"
                href="https://github.com/ConcernedHobbit"
                target="_blank"
                rel="noreferrer"
              >
                chobbit
              </a>
            </em>
          </p>
        </div>
      </Main>

      <Footer />
    </>
  );
}
