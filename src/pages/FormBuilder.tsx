import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ChevronDown, Text } from 'lucide-react';
import { useEffect, useState } from 'react';
import FormConfigPanel from '@/components/form-builder/FormConfigPanel';
import FormPreview from '@/components/form-builder/FormPreview';
import FormValidation from '@/components/form-builder/FormValidation';
import SortableItem from '@/components/sortableItem/SortableItem';
import type { AddedInput, QueryType } from '@/lib/types/formSelectItemstype';

const FormBuilder = () => {
  const [formBuilderQuery, setFormBuilderQuery] = useState<QueryType>('input');
  const [addedInputArray, setAddedInputArray] = useState<AddedInput[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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

  const handleAddField = () => {
    const newInput: AddedInput = {
      id: Date.now().toString(),
      type: formBuilderQuery,
      label: `${
        formBuilderQuery.charAt(0).toUpperCase() + formBuilderQuery.slice(1)
      } Field`,
    };

    setAddedInputArray((prev) => [...prev, newInput]);
  };

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
    return type === 'input' ? (
      <Text className="w-4 h-4" />
    ) : type === 'dropdown' ? (
      <ChevronDown className="w-4 h-4" />
    ) : null;
  };

  return (
    <div className="flex gap-10 p-6">
      {/* form config panel */}
      <div className="space-y-4 w-80">
        <FormConfigPanel
          setFormBuilderQuery={setFormBuilderQuery}
          onAddField={handleAddField}
        />

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
                  {addedInputArray.map((input) => (
                    <SortableItem
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

      {/* Validate Form */}
      <div className="flex-1">
        <FormValidation formBuilderQuery={formBuilderQuery} />
      </div>
    </div>
  );
};

export default FormBuilder;
