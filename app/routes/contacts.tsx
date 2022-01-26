import { User } from "@prisma/client";
import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Main from "~/components/Main";
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

export default function Contacts() {
  const data = useLoaderData<LoaderData>();
  return (
    <>
      <Header>
        <Link to="/contacts" className="underline">
          contacts
        </Link>
        <Link to="/contacts/new" className="underline">
          add contact
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
        <Outlet />
      </Main>

      <Footer />
    </>
  );
}
