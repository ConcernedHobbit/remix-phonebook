import { useEffect, useState } from "react";
import { useFetcher } from "remix";
import Spinner from "./Spinner";

const Statistics: React.FC<JSX.IntrinsicElements["div"]> = ({ ...props }) => {
  const fetcher = useFetcher();
  const [showSpinner, setSpinner] = useState(false);

  useEffect(() => {
    fetcher.load("/statistics");
    // Mainly to not have it show up with JavaScript disabled
    setSpinner(true);
  }, []);

  if (fetcher.type === "done") {
    return (
      <div {...props}>
        <p className="font-semibold">Your statistics</p>
        {fetcher.data.loggedIn ? (
          <p>{fetcher.data.contacts} {fetcher.data.contacts === 1 ? "contact" : "contacts"}</p>
        ) : (
          <em>Please log in.</em>
        )}
      </div>
    );
  } else if (showSpinner) {
    return (
      <div {...props}>
        <Spinner stroke="#475569" />
      </div>
    );
  }

  return null;
};

export default Statistics;
