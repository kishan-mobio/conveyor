"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowRight, Settings, FileText } from "lucide-react";

export default function Selection({
  setShowForm,
  selectedEquipment,
  setSelectedEquipment,
  selectedComponent,
  setSelectedComponent,
  getEquipments,
  getComponents,
}) {
  const equipments = getEquipments();
  const components = getComponents();

  const handleEquipmentChange = (value) => {
    setSelectedEquipment(value);
    const selectedFormType = equipments.find((item) => item.id === value);
    if (selectedFormType && selectedFormType.components.length > 0) {
      setSelectedComponent(selectedFormType.components[0].id);
    } else {
      setSelectedComponent(undefined);
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedComponent(value);
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const isSelectionValid = selectedEquipment && selectedComponent;
  const isFormTypeSelected = !!selectedEquipment;

  return (
    <div className="w-full h-full flex flex-col items-start justify-start p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Form Selection</h1>
      <p className="text-gray-600 text-lg mb-8">
        Please select your preferences below
      </p>
      <div className="flex flex-row w-full gap-12">
        <div className="flex flex-col space-y-8 w-1/2">
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Select Equipment
            </Label>
            <Select
              onValueChange={handleEquipmentChange}
              value={selectedEquipment || ""}
            >
              <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-blue-500 text-lg rounded-md">
                <SelectValue placeholder="Choose equipment" />
              </SelectTrigger>
              <SelectContent>
                {equipments.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-600" />
              Select component
            </Label>
            <Select
              onValueChange={handleCategoryChange}
              value={selectedComponent || ""}
              disabled={!isFormTypeSelected}
            >
              <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-purple-500 text-lg rounded-md">
                <SelectValue placeholder="Choose component" />
              </SelectTrigger>
              <SelectContent>
                {components.map((component) => (
                  <SelectItem key={component.id} value={component.id}>
                    {component.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="pt-8">
            <Button
              onClick={handleOpenForm}
              disabled={!isSelectionValid}
              className="w-full h-16 text-xl font-semibold gradient-primary border-0 text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
            >
              <span>Open Form</span>
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
