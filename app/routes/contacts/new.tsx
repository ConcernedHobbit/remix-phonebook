import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
  useActionData,
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

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
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

  const contact = await db.contact.create({
    data: { ...fields, userId },
  });

  return redirect(`/contacts/${contact.id}`);
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return {};
};

export default function NewContact() {
  const actionData = useActionData<ActionData>();
  console.log(actionData);
  return (
    <div>
      <h2 className="font-bold text-xl">New Contact</h2>
      <Form submitLabel="Add contact" error={actionData?.formError}>
        <FormComponent
          name="name"
          error={actionData?.fieldErrors?.name}
          field={TextField}
          fieldProps={{ defaultValue: actionData?.fields?.name }}
        />

        <FormComponent
          name="phone"
          error={actionData?.fieldErrors?.phone}
          field={TextField}
          fieldProps={{ defaultValue: actionData?.fields?.phone }}
        />
      </Form>
    </div>
  );
}
