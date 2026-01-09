import FormConfigPanel from "@/components/form-builder/FormConfigPanel";
import FormPreview from "@/components/form-builder/FormPreview";

const FormBuilder = () => {
  return (
    <div>
      {/* form config panel */}
      <div>
        <FormConfigPanel />
      </div>
      {/* form preview */}
      <div>
        <FormPreview />
      </div>
    </div>
  );
};

export default FormBuilder;
