import type { AddedInput, QueryType } from "@/lib/types/formSelectItemstype";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";

const SortableItem = ({
  input,
  onRemove,
  getIcon,
}: {
  input: AddedInput;
  onRemove: (id: string) => void;
  getIcon: (type: QueryType) => React.ReactNode;
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

export default SortableItem;
