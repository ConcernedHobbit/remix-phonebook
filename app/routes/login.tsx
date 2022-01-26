import { json, useActionData, useSearchParams } from "remix";
import type { ActionFunction } from "remix";
import { createUserSession, login, register } from "~/utils/session.server";
import { db } from "~/utils/db.server";
import Header from "~/components/Header";
import {
  Form,
  FormComponent,
  TextField,
  PasswordField,
} from "~/components/Forms";
import Main from "~/components/Main";
import Footer from "~/components/Footer";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    type: string;
    username: string;
    password: string;
  };
};

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const type = form.get("type");
  const username = form.get("username");
  const password = form.get("password");
  const redirect = form.get("redirect") || "/contacts";

  if (
    typeof type !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof redirect !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { type, username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  switch (type) {
    case "login": {
      const user = await login({ username, password });
      if (!user) {
        return badRequest({
          fields,
          formError: `Invalid credentials.`,
        });
      }
      return createUserSession(user.id, redirect);
    }

    case "register": {
      const userExists = await db.user.findFirst({
        where: { username },
      });
      if (userExists) {
        return badRequest({
          fields,
          formError: `User with username ${username} already exists.`,
        });
      }
      const user = await register({ username, password });
      if (!user) {
        return badRequest({
          fields,
          formError: `Something went wrong trying to register.`,
        });
      }
      return createUserSession(user.id, redirect);
    }

    default:
      return badRequest({ fields, formError: `Invalid type.` });
  }
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();

  return (
    <>
      <Header />

      <Main className="bg-slate-400 shadow-slate-700 shadow-lg rounded p-4 m-auto mt-32 w-fit h-fit flex flex-col items-center">
        <div className="mb-4">
          <h2 className="text-4xl text-slate-800 font-bold">Login</h2>
        </div>
        <Form error={actionData?.formError}>
          <input
            type="hidden"
            name="redirect"
            value={searchParams.get("redirect") ?? undefined}
          />

          <fieldset className="flex justify-center gap-4">
            <label>
              <input
                className="border-slate-800 bg-slate-300"
                type="radio"
                name="type"
                value="login"
                defaultChecked={
                  !actionData?.fields?.type ||
                  actionData?.fields?.type === "login"
                }
              />{" "}
              Login
            </label>
            <label>
              <input
                className="border-slate-800 bg-slate-300"
                type="radio"
                name="type"
                value="register"
                defaultChecked={actionData?.fields?.type === "register"}
              />{" "}
              Register
            </label>
          </fieldset>

          <FormComponent
            name="username"
            error={actionData?.fieldErrors?.username}
            field={TextField}
            fieldProps={{ defaultValue: actionData?.fields?.username }}
          />

          <FormComponent
            name="password"
            error={actionData?.fieldErrors?.password}
            field={PasswordField}
            fieldProps={{ defaultValue: actionData?.fields?.password }}
          />
        </Form>
      </Main>

      <Footer />
    </>
  );
}
