import { Form as RemixForm, useTransition } from "remix";
import Spinner from "../Spinner";
import Button from "./Button";

type Props = {
  error?: string;
  submitLabel?: string;
};

const Base: React.FC<JSX.IntrinsicElements["div"]> = ({ children }) => (
  <div className="bg-slate-500 text-slate-300 font-bold p-2 rounded shadow-sm shadow-slate-900 h-10 flex items-center justify-center">
    {children}
  </div>
);

const FormSpinner = () => (
  <Base>
    <Spinner />
  </Base>
);

const Checkmark = () => (
  <Base>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17.837 17.837"
      height={26}
    >
      <path
        style={{ fill: "rgb(203, 213, 225)" }}
        d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27
		c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0
		L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z"
      />
    </svg>
  </Base>
);

const Form: React.FC<Props> = ({ error, children, submitLabel = "Submit" }) => {
  const transition = useTransition();

  return (
    <RemixForm
      method="post"
      aria-describedby={error ? "form-error-message" : undefined}
      className="flex flex-col gap-4 w-fit"
    >
      {children}

      {error !== undefined && (
        <div id="form-error-message" className="text-red-600">
          <p role="alert">{error}</p>
        </div>
      )}

      {transition.state === "submitting" ? (
        <FormSpinner />
      ) : transition.state === "loading" &&
        transition.type === "actionRedirect" ? (
        <Checkmark />
      ) : (
        <Button type="submit">{submitLabel}</Button>
      )}
    </RemixForm>
  );
};

export default Form;
