import FormConfigPanel from "@/components/form-builder/FormConfigPanel";
import FormPreview from "@/components/form-builder/FormPreview";
import type { QueryType } from "@/lib/types/formSelectItemstype";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, GripVertical, Text, X } from "lucide-react";
import { useEffect, useState } from "react";

const inputTypeArray = [{ text: "input" }, { text: "dropdown" }];

interface AddedInput {
  id: string;
  type: QueryType;
  label: string;
}

// Sortable Item Component
const SortableItem = ({
  input,
  onRemove,
  getIcon,
  idx,
}: {
  input: AddedInput;
  onRemove: (id: string) => void;
  getIcon: (type: QueryType) => React.ReactNode;
  idx: number;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: input.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-2 text-gray-700 flex-1">
        {getIcon(input.type)}
        <span className="text-sm">{input.label}</span>
        <span>{idx + 1}</span>
      </div>
      <button
        onClick={() => onRemove(input.id)}
        className="text-gray-400 hover:text-red-600 transition-colors"
        aria-label="Remove field"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const FormBuilder = () => {
  const [formBuilderQuery, setFormBuilderQuery] = useState<QueryType>("input");
  const [addedInputArray, setAddedInputArray] = useState<AddedInput[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const icon =
    formBuilderQuery === "input" ? (
      <Text className="w-5 h-5" />
    ) : formBuilderQuery === "dropdown" ? (
      <ChevronDown className="w-5 h-5" />
    ) : (
      ""
    );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setAddedInputArray((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

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

        {/* Added Inputs List with Drag and Drop */}
        {addedInputArray.length > 0 && (
          <div className="space-y-2 mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Added Fields:
            </h3>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={addedInputArray.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {addedInputArray.map((input, idx) => (
                    <SortableItem
                      idx={idx}
                      key={input.id}
                      input={input}
                      onRemove={handleRemoveInput}
                      getIcon={getIcon}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
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
