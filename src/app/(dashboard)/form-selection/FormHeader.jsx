import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import selectionData from "@/data/selection.json";

const FormHeader = ({ handleBack, selectedEquipment, selectedComponent }) => (
  <div className="flex justify-between items-start pt-4">
    <Button
      onClick={handleBack}
      variant="outline"
      className="h-12 text-sm font-semibold border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back to Selection
    </Button>

    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center gap-4">
        <h6 className="font-semibold text-blue-900">Your Selections:</h6>
        <div className="text-sm text-blue-700">
          <span className="font-medium capitalize">
            {selectionData.find((item) => item.id === selectedEquipment)
              ?.name || selectedEquipment?.replace("-", " ")}
          </span>
          <span className="mx-2">|</span>
          <span className="font-medium capitalize">
            {selectionData
              .find((item) => item.id === selectedEquipment)
              ?.components.find(
                (component) => component.id === selectedComponent
              )?.name || selectedComponent}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default FormHeader;
