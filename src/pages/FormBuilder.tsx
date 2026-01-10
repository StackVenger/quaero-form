import FormConfigPanel from "@/components/form-builder/FormConfigPanel";
import FormPreview from "@/components/form-builder/FormPreview";
import { useState } from "react";

const FormBuilder = () => {
  const [formBuilderQuery, setFormBuilderQuery] = useState<string>("input");

  return (
    <div className="flex gap-10">
      {/* form config panel */}
      <div>
        <FormConfigPanel setFormBuilderQuery={setFormBuilderQuery} />
      </div>
      {/* form preview */}
      <div>
        <FormPreview query={formBuilderQuery} />
      </div>
    </div>
  );
};

export default FormBuilder;
