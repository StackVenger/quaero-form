import type { LucideIcon } from "lucide-react";
import { ChevronDown, Type } from "lucide-react";

type iconType = "Type" | "ChevronDown";

const formSelectItems: { value: string; icon: iconType; text: string }[] = [
  {
    value: "input",
    icon: "Type",
    text: "Text Input",
  },
  {
    value: "dropdown",
    icon: "ChevronDown",
    text: "Dropdown",
  },
];

export default formSelectItems;

export const iconMap: Record<iconType, LucideIcon> = {
  Type,
  ChevronDown,
};
