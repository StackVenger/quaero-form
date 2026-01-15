import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import type { QueryType } from '@/lib/types/formSelectItemstype';

const inputAttributes = [
  'accept',
  'alt',
  'autocomplete',
  'autofocus',
  'capture',
  'checked',
  'dirname',
  'disabled',
  'form',
  'formaction',
  'formenctype',
  'formmethod',
  'formnovalidate',
  'formtarget',
  'height',
  'list',
  'max',
  'maxlength',
  'min',
  'minlength',
  'multiple',
  'name',
  'pattern',
  'placeholder',
  'popovertarget',
  'popovertargetaction',
  'readonly',
  'required',
  'size',
  'src',
  'step',
  'type',
  'value',
  'width',
];
const selectAttributes = [
  'autocomplete',
  'autofocus',
  'disabled',
  'form',
  'multiple',
  'name',
  'required',
  'size',
];

const FormValidation = ({
  formBuilderQuery,
}: {
  formBuilderQuery: QueryType;
}) => {
  // Track which attributes are enabled
  const [enabledAttrs, setEnabledAttrs] = useState<Record<string, boolean>>(
    () =>
      formBuilderQuery === 'input'
        ? inputAttributes.reduce((acc, attr) => ({ ...acc, [attr]: false }), {})
        : selectAttributes.reduce(
            (acc, attr) => ({ ...acc, [attr]: false }),
            {}
          )
  );

  // Track collapse/expand of sections (optional)
  const [collapsed, setCollapsed] = useState(false);

  const attributes =
    formBuilderQuery === 'input' ? inputAttributes : selectAttributes;

  const toggleAttr = (attr: string) => {
    setEnabledAttrs((prev) => ({
      ...prev,
      [attr]: !prev[attr],
    }));
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-md">
      {/* Header with collapse */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <h3 className="text-lg font-semibold text-gray-800">
          {formBuilderQuery === 'input'
            ? 'Input Attributes'
            : 'Select Attributes'}
        </h3>
        {collapsed ? <ChevronDown /> : <ChevronUp />}
      </div>

      {!collapsed && (
        <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
          {attributes.map((attr) => (
            <div
              key={attr}
              className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-700">{attr}</span>
              <Switch
                checked={enabledAttrs[attr]}
                onCheckedChange={() => toggleAttr(attr)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormValidation;
