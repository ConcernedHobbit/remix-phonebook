import { Contact } from "@prisma/client";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";
import { Form, FormComponent, TextField } from "~/components/Forms";
import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    name: string | undefined;
    phone: string | undefined;
  };
  fields?: {
    name: string;
    phone: string;
  };
};

function validateName(name: unknown) {
  if (typeof name !== "string" || name.length < 3) {
    return `Name must be at least 3 characters long.`;
  }
}

function validatePhone(phone: unknown) {
  if (typeof phone !== "string" || phone.length < 3) {
    return `Phone must be at least 3 characters long.`;
  }
}

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const contactId = params.id;
  const form = await request.formData();
  const name = form.get("name");
  const phone = form.get("phone");

  if (typeof name !== "string" || typeof phone !== "string") {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { name, phone };
  const fieldErrors = {
    name: validateName(name),
    phone: validatePhone(phone),
  };

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  const contact = await db.contact.findFirst({
    where: { id: contactId, userId },
  });

  if (!contact) {
    return json({ formError: `Contact not found.` }, { status: 404 });
  }

  await db.contact.update({
    where: { id: contactId },
    data: { ...fields },
  });

  return redirect(`/contacts/${contact.id}`);
};

type LoaderData = {
  error?: string;
  contact?: Contact;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const contactId = params.id;

  const contact = await db.contact.findFirst({
    where: { id: contactId, userId },
  });

  if (!contact) {
    return json({ error: `Contact not found.` }, { status: 404 });
  }

  return { contact };
};

export default function EditContact() {
  const loaderData = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();

  const defaultName =
    actionData?.fields?.name || loaderData?.contact?.name || "";
  const defaultPhone =
    actionData?.fields?.phone || loaderData?.contact?.phone || "";

  if (loaderData?.error) {
    return <p>{loaderData.error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Edit Contact</h2>
      <Form submitLabel="Update contact" error={actionData?.formError}>
        <FormComponent
          name="name"
          error={actionData?.fieldErrors?.name}
          field={TextField}
          fieldProps={{ defaultValue: defaultName }}
        />

        <FormComponent
          name="phone"
          error={actionData?.fieldErrors?.phone}
          field={TextField}
          fieldProps={{ defaultValue: defaultPhone }}
        />
      </Form>
    </div>
  );
}
