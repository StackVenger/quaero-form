import type { QueryType } from "@/lib/types/formSelectItemstype";
import DropDown from "../dropdown/DropDown";
import { Input } from "../ui/input";

const renderField = (query: QueryType) => {
  switch (query) {
    case "input":
      return <Input />;

    case "dropdown":
      return <DropDown />;

    default:
      return null;
  }
};

const FormPreview = ({ query }: { query: QueryType }) => {
  return <div>{renderField(query)}</div>;
};

export default FormPreview;
