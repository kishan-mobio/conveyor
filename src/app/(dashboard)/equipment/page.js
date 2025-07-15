"use client";

import { useState } from "react";
import EquipmentHeader from "./EquipmentHeader";
import EquipmentTable from "./EquipmentTable";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import EquipmentFormDrawer from "./EquipmentFormDrawer";
import ViewDrawer from "./ViewDrawer";
import { dummyEquipments } from "@/data/equipments";

export default function EquipmentPage() {
  // Sample equipment data
  const [equipments, setEquipments] = useState(dummyEquipments);

  // State for modals and drawers
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFormDrawer, setShowFormDrawer] = useState(false);
  const [showViewDrawer, setShowViewDrawer] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [equipmentToDelete, setEquipmentToDelete] = useState(null);

  // Handlers
  const handleAddEquipment = () => {
    setFormMode("add");
    setSelectedEquipment(null);
    setShowFormDrawer(true);
  };

  const handleEditEquipment = (equipment) => {
    setFormMode("edit");
    setSelectedEquipment(equipment);
    setShowFormDrawer(true);
  };

  const handleViewEquipment = (equipment) => {
    setSelectedEquipment(equipment);
    setShowViewDrawer(true);
  };

  const handleDeleteEquipment = (equipment) => {
    setEquipmentToDelete(equipment);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (equipmentToDelete) {
      setEquipments((prev) =>
        prev.filter((eq) => eq.id !== equipmentToDelete.id)
      );
      setEquipmentToDelete(null);
    }
    setShowConfirmModal(false);
  };

  const handleFormSubmit = (formData) => {
    if (formMode === "add") {
      const newEquipment = {
        id: Math.max(...equipments.map((eq) => eq.id)) + 1,
        ...formData,
      };
      setEquipments((prev) => [...prev, newEquipment]);
    } else {
      setEquipments((prev) =>
        prev.map((eq) =>
          eq.id === selectedEquipment.id ? { ...eq, ...formData } : eq
        )
      );
    }
    setShowFormDrawer(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <EquipmentHeader onAdd={handleAddEquipment} />

      {/* Equipment Table */}
      <EquipmentTable
        equipments={equipments}
        onView={handleViewEquipment}
        onEdit={handleEditEquipment}
        onDelete={handleDeleteEquipment}
      />

      {/* Modals and Drawers */}
      <ConfirmationModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Delete Equipment"
        message={`Are you sure you want to delete "${equipmentToDelete?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirmModal(false)}
      />

      <EquipmentFormDrawer
        open={showFormDrawer}
        onClose={() => setShowFormDrawer(false)}
        mode={formMode}
        initialData={selectedEquipment}
        onSubmit={handleFormSubmit}
      />

      <ViewDrawer
        open={showViewDrawer}
        onClose={() => setShowViewDrawer(false)}
        data={selectedEquipment}
      />
    </div>
  );
}
