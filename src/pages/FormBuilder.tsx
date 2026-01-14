import FormConfigPanel from "@/components/form-builder/FormConfigPanel";
import FormPreview from "@/components/form-builder/FormPreview";
import type { QueryType } from "@/lib/types/formSelectItemstype";
import { ChevronDown, Text, X } from "lucide-react";
import { useEffect, useState } from "react";

interface AddedInput {
  id: string;
  type: QueryType;
  label: string;
}

const FormBuilder = () => {
  const [formBuilderQuery, setFormBuilderQuery] = useState<QueryType>("input");
  const [addedInputArray, setAddedInputArray] = useState<AddedInput[]>([]);

  // Automatically add input when query changes
  useEffect(() => {
    const newInput: AddedInput = {
      id: Date.now().toString(),
      type: formBuilderQuery,
      label: `${
        formBuilderQuery.charAt(0).toUpperCase() + formBuilderQuery.slice(1)
      } Field`,
    };
    setAddedInputArray((prev) => [...prev, newInput]);
  }, [formBuilderQuery]);

  const handleRemoveInput = (id: string) => {
    setAddedInputArray(addedInputArray.filter((input) => input.id !== id));
  };

  const getIcon = (type: QueryType) => {
    return type === "input" ? (
      <Text className="w-4 h-4" />
    ) : type === "dropdown" ? (
      <ChevronDown className="w-4 h-4" />
    ) : null;
  };

  return (
    <div className="flex gap-10 p-6">
      {/* form config panel */}
      <div className="space-y-4 w-80">
        <FormConfigPanel setFormBuilderQuery={setFormBuilderQuery} />

        {/* Added Inputs List */}
        {addedInputArray.length > 0 && (
          <div className="space-y-2 mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Added Fields:
            </h3>
            {addedInputArray.map((input, idx) => (
              <div
                key={input.id}
                className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2 text-gray-700">
                  {getIcon(input.type)}
                  <span className="text-sm">{input.label}</span>{" "}
                  <span>{idx + 1}</span>
                </div>
                <button
                  onClick={() => handleRemoveInput(input.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  aria-label="Remove field"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* form preview */}
      <div className="flex-1">
        <FormPreview query={formBuilderQuery} addedInputs={addedInputArray} />
      </div>
    </div>
  );
};

export default FormBuilder;
