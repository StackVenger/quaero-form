import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const FormConfigPanel = () => {
  return (
    <div>
      <Select defaultOpen={true} open={true}>
        <SelectTrigger className="w-70">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          side="bottom"
          collisionPadding={0}
          removeViewportPadding={true}
        >
          <Input className="border-0 border-b shadow-none rounded-none focus-visible:ring-0" />
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
            <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormConfigPanel;
