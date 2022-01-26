import { Contact } from "@prisma/client";
import { Link, LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";

type LoaderData = {
  contacts: Array<Omit<Contact, "userId" | "createdAt" | "updatedAt">>;
};
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const data: LoaderData = {
    contacts: await db.contact.findMany({
      where: { userId },
      select: { id: true, name: true, phone: true },
    }),
  };
  return data;
};

export default function Contacts() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      {data?.contacts?.length > 0 && (
        <table className="border-separate border-spacing -ml-4 -mr-8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.contacts.map((contact) => (
              <tr key={contact.id}>
                <td>
                  <Link to={`/contacts/${contact.id}`}>{contact.name}</Link>
                </td>
                <td>{contact.phone}</td>
                <td>
                  <Link
                    to={`/contacts/${contact.id}/edit`}
                    className="underline text-gray-600"
                  >
                    edit
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/contacts/${contact.id}/delete`}
                    className="underline text-red-600"
                  >
                    delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {data?.contacts?.length === 0 && (
        <p>
          No contacts. Why not{" "}
          <Link to="new" className="underline">
            add one
          </Link>
          ?
        </p>
      )}
    </div>
  );
}
