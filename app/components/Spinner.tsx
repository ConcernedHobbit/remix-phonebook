type Props = JSX.IntrinsicElements["svg"] & {
  stroke?: string;
};

const Spinner: React.FC<Props> = ({ stroke = "#cbd5e1", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    height={26}
    {...props}
  >
    <circle
      cx="50"
      cy="50"
      r="32"
      strokeWidth="10"
      stroke={stroke}
      strokeDasharray="50.26548245743669 50.26548245743669"
      fill="none"
      strokeLinecap="round"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        keyTimes="0;1"
        values="0 50 50;360 50 50"
      ></animateTransform>
    </circle>
  </svg>
);

export default Spinner;
