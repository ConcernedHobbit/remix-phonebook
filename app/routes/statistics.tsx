import { LoaderFunction } from "remix";
import { db } from "~/utils/db.server";
import { getUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return {
      loggedIn: false,
    };
  }
  const contacts = await db.contact.count({
    where: { userId },
  });

  return {
    loggedIn: true,
    contacts,
  };
};
