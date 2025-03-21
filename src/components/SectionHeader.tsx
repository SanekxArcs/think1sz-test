import { SectionHeaderProps } from "../types/components";

export default function SectionHeader({ title, id }: SectionHeaderProps) {
  return (
    <h2 className="text-2xl select-none font-medium text-foreground pb-6" id={id}>
      {title}
    </h2>
  );
}
