import { ActionFunction, json, LoaderFunction, redirect } from "remix";
import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const contactId = params.id;

  const contact = await db.contact.findFirst({
    where: { id: contactId, userId },
  });

  if (!contact) {
    return json({ error: `Contact not found.` }, { status: 404 });
  }

  await db.contact.delete({
    where: { id: contactId },
  });

  return redirect("/contacts");
};

export const loader: LoaderFunction = async () => {
  return redirect("/");
};
