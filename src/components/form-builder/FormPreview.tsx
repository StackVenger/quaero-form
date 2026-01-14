import type { QueryType } from "@/lib/types/formSelectItemstype";
import { ChevronDown, Text } from "lucide-react";
import DropDown from "../dropdown/DropDown";
import { Input } from "../ui/input";

interface AddedInput {
  id: string;
  type: QueryType;
  label: string;
}

const renderField = (query: QueryType) => {
  switch (query) {
    case "input":
      return <Input placeholder="Enter text..." />;

    case "dropdown":
      return <DropDown />;

    default:
      return null;
  }
};

const getIcon = (type: QueryType) => {
  return type === "input" ? (
    <Text className="w-4 h-4 text-gray-600" />
  ) : type === "dropdown" ? (
    <ChevronDown className="w-4 h-4 text-gray-600" />
  ) : null;
};

const FormPreview = ({
  addedInputs = [],
}: {
  query: QueryType;
  addedInputs?: AddedInput[];
}) => {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Form Preview</h2>

        {addedInputs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No fields added yet</p>
            <p className="text-sm mt-2">
              Add fields from the config panel to see them here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {addedInputs.map((input) => (
              <div key={input.id} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  {getIcon(input.type)}
                  {input.label}
                </label>
                {renderField(input.type)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPreview;
