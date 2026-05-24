interface WhatsAppIconProps {
  className?: string;
  size?: number;
}

export default function WhatsAppIcon({
  className,
  size = 24,
}: WhatsAppIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10c0 .6.4 1 1 1h.01" />
      <path d="M14 10c0 .6.4 1 1 1h.01" />
      <path d="M9.5 15s.8 1 2.5 1 2.5-1 2.5-1" />
    </svg>
  );
}
