import formSelectItems, { iconMap } from '@data/formSelectItems';
import { Search } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { QueryType } from '@/lib/types/formSelectItemstype';
import { Input } from '../ui/input';

const FormConfigPanel = ({
  setFormBuilderQuery,
  onAddField,
}: {
  setFormBuilderQuery: (query: QueryType) => void;
  onAddField: () => void;
}) => {
  const [query, setQuery] = useState('');

  const formItems = formSelectItems
    .filter((item) => item.text.includes(query))
    .map((item, idx) => {
      const Icon = iconMap[item.icon];

      return (
        <SelectItem value={item.value} key={idx}>
          {<Icon />}
          <span>{item.text}</span>
        </SelectItem>
      );
    });

  return (
    <div>
      <Select
        onValueChange={(value) => {
          setFormBuilderQuery(value as QueryType);
          onAddField();
        }}
      >
        <SelectTrigger className="w-70 shadow-none">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          side="bottom"
          collisionPadding={0}
          removeViewportPadding={true}
          className="shadow-none"
        >
          <div className="px-3 bg-gray-100 border-0 border-b flex justify-center items-center gap-2.5">
            <Search size={16} className="text-gray-500" />
            <Input
              autoFocus={true}
              className="border-0 p-0 shadow-none rounded-none focus-visible:ring-0"
              value={query}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </div>
          <SelectGroup className="p-1">
            {formItems.length ? (
              formItems
            ) : (
              <span className="text-sm text-center p-1 block">
                No items found
              </span>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormConfigPanel;
