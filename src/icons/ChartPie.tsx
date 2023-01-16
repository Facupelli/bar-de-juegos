export default function ChartPie({
  size,
  active,
}: {
  size: number;
  active?: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-credit-card"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={active ? "#2b2c2b" : "#e0e0e0"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12l-6.5 5.5" />
      <path d="M12 3v9h9" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}
