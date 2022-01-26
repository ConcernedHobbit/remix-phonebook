import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";
import type { Contact } from "@prisma/client";

type LoaderData = {
  contact: Contact | null;
};
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const contactId = params.id;
  const contact = await db.contact.findFirst({
    where: { id: contactId, userId },
  });
  return { contact };
};

// Have to cast to date because of prisma DateTime weirdness (can be string in runtime)
const formatDate = (date: Date): string =>
  new Date(date).toLocaleString(undefined, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function Contact() {
  const data = useLoaderData<LoaderData>();

  if (!data.contact) {
    return (
      <div>
        <h2>Contact not found.</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">{data.contact.name}</h2>
        <p>{data.contact.phone}</p>
      </div>
      <div className="mb-4">
        <p>Added {formatDate(data.contact.createdAt)}</p>
        <p>Last updated {formatDate(data.contact.updatedAt)}</p>
      </div>
      <div className="flex gap-4">
        <form action={`${data.contact.id}/delete`} method="post">
          <button type="submit" className="underline text-red-600">
            delete
          </button>
        </form>
        <Link to="edit" className="underline text-gray-600">
          edit
        </Link>
      </div>
    </div>
  );
}
