export default function AvocadoMark({ size = 40, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Avocado cross-section mark"
    >
      <path
        d="M50 6
           C72 6 90 26 90 52
           C90 76 72 94 50 94
           C28 94 10 76 10 52
           C10 26 28 6 50 6 Z"
        fill="#355E3B"
      />
      <path
        d="M50 16
           C66 16 80 32 80 53
           C80 72 66 86 50 86
           C34 86 20 72 20 53
           C20 32 34 16 50 16 Z"
        fill="#C3D27A"
      />
      <circle cx="56" cy="56" r="18" fill="#5B3A29" />
    </svg>
  );
}
