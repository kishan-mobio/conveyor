"use client";

import { useState, useMemo } from "react";
import ComponentHeader from "./ComponentHeader";
import ComponentTable from "./ComponentTable";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import ComponentFormDrawer from "./ComponentFormDrawer";
import ComponentViewDrawer from "./ComponentViewDrawer";
import { dummyComponents } from "@/data/components";
import { dummyEquipments } from "@/data/equipments";

export default function ComponentPage() {
  // State for components and equipment data
  const [components, setComponents] = useState(dummyComponents);
  const [equipments] = useState(dummyEquipments);

  // State for filtering
  const [selectedEquipment, setSelectedEquipment] = useState("1");

  // State for modals and drawers
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFormDrawer, setShowFormDrawer] = useState(false);
  const [showViewDrawer, setShowViewDrawer] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [componentToDelete, setComponentToDelete] = useState(null);

  // Filter components based on selected equipment
  const filteredComponents = useMemo(() => {
    if (selectedEquipment === "all") {
      return components;
    }
    return components.filter(
      component => component.equipmentId === parseInt(selectedEquipment)
    );
  }, [components, selectedEquipment]);

  // Handlers for equipment filter
  const handleEquipmentChange = (equipmentId) => {
    setSelectedEquipment(equipmentId);
  };

  // Handlers for component operations
  const handleAddComponent = () => {
    setFormMode("add");
    setSelectedComponent(null);
    setShowFormDrawer(true);
  };

  const handleEditComponent = (component) => {
    setFormMode("edit");
    setSelectedComponent(component);
    setShowFormDrawer(true);
  };

  const handleViewComponent = (component) => {
    setSelectedComponent(component);
    setShowViewDrawer(true);
  };

  const handleDeleteComponent = (component) => {
    setComponentToDelete(component);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (componentToDelete) {
      setComponents((prev) =>
        prev.filter((comp) => comp.id !== componentToDelete.id)
      );
      setComponentToDelete(null);
    }
    setShowConfirmModal(false);
  };

  const handleFormSubmit = (formData) => {
    if (formMode === "add") {
      const newComponent = {
        id: Math.max(...components.map((comp) => comp.id)) + 1,
        ...formData,
      };
      setComponents((prev) => [...prev, newComponent]);
    } else {
      setComponents((prev) =>
        prev.map((comp) =>
          comp.id === selectedComponent.id ? { ...comp, ...formData } : comp
        )
      );
    }
    setShowFormDrawer(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with filter */}
      <ComponentHeader
        onAdd={handleAddComponent}
        equipmentList={equipments}
        selectedEquipment={selectedEquipment}
        onEquipmentChange={handleEquipmentChange}
      />

      {/* Components Table */}
      <ComponentTable
        components={filteredComponents}
        equipmentList={equipments}
        onView={handleViewComponent}
        onEdit={handleEditComponent}
        onDelete={handleDeleteComponent}
      />

      {/* Modals and Drawers */}
      <ConfirmationModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Delete Component"
        message={`Are you sure you want to delete "${componentToDelete?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirmModal(false)}
      />

      <ComponentFormDrawer
        open={showFormDrawer}
        onClose={() => setShowFormDrawer(false)}
        mode={formMode}
        initialData={selectedComponent}
        equipmentList={equipments}
        onSubmit={handleFormSubmit}
      />

      <ComponentViewDrawer
        open={showViewDrawer}
        onClose={() => setShowViewDrawer(false)}
        data={selectedComponent}
        equipmentList={equipments}
      />
    </div>
  );
}
