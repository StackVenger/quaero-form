import { ChevronDown, Type } from "lucide-react";
import type { FormSelectItem, IconMapType } from "../types/formSelectItemstype";

const formSelectItems: FormSelectItem[] = [
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

export const iconMap: IconMapType = {
  Type,
  ChevronDown,
};
