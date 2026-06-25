import AvocadoMark from "./AvocadoMark";

export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2" aria-hidden="true">
      <span className="h-px w-16 bg-line" />
      <AvocadoMark size={24} />
      <span className="h-px w-16 bg-line" />
    </div>
  );
}
