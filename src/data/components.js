// Units for component measurements
export const units = [
  { value: "mm", label: "Millimeters (mm)" },
  { value: "cm", label: "Centimeters (cm)" },
  { value: "m", label: "Meters (m)" },
  { value: "kg", label: "Kilograms (kg)" },
  { value: "g", label: "Grams (g)" },
  { value: "ltr", label: "Liters (ltr)" },
  { value: "ml", label: "Milliliters (ml)" },
  { value: "pcs", label: "Pieces (pcs)" },
  { value: "hrs", label: "Hours (hrs)" },
  { value: "min", label: "Minutes (min)" },
  { value: "sec", label: "Seconds (sec)" },
  { value: "rpm", label: "RPM" },
  { value: "v", label: "Volts (V)" },
  { value: "a", label: "Amperes (A)" },
  { value: "w", label: "Watts (W)" },
];

// Entry types for components
export const entryTypes = [
  { 
    value: "manual", 
    label: "Manual",
    color: "bg-blue-100 text-blue-800 border-blue-200"
  },
  { 
    value: "auto", 
    label: "Auto",
    color: "bg-green-100 text-green-800 border-green-200"
  },
];

// Dummy component data
export const dummyComponents = [
  {
    id: 1,
    name: "Motor Speed",
    unit: "rpm",
    inputs: ["Speed Sensor", "Control Signal"],
    entryType: "auto",
    remarks: "Automatically controlled by system",
    equipmentId: 1, // Conveyor Belt A1
  },
  {
    id: 2,
    name: "Belt Tension",
    unit: "kg",
    inputs: ["Tension Sensor"],
    entryType: "manual",
    remarks: "Requires manual adjustment",
    equipmentId: 1, // Conveyor Belt A1
  },
  {
    id: 3,
    name: "Roller Diameter",
    unit: "mm",
    inputs: ["Measurement Tool"],
    entryType: "manual",
    remarks: "Physical measurement required",
    equipmentId: 1, // Conveyor Belt A1
  },
  {
    id: 4,
    name: "Sensor Sensitivity",
    unit: "v",
    inputs: ["Calibration Signal"],
    entryType: "auto",
    remarks: "Auto-calibrated during startup",
    equipmentId: 2, // Sorting Machine B2
  },
  {
    id: 5,
    name: "Actuator Force",
    unit: "kg",
    inputs: ["Force Sensor", "Position Feedback"],
    entryType: "auto",
    remarks: "Controlled by feedback loop",
    equipmentId: 2, // Sorting Machine B2
  },
  {
    id: 6,
    name: "Display Brightness",
    unit: "ltr",
    inputs: ["Light Sensor", "User Setting"],
    entryType: "manual",
    remarks: "User configurable setting",
    equipmentId: 2, // Sorting Machine B2
  },
  {
    id: 7,
    name: "Wrapper Temperature",
    unit: "°C",
    inputs: ["Temperature Sensor", "Heater Control"],
    entryType: "auto",
    remarks: "Temperature controlled automatically",
    equipmentId: 3, // Packaging Unit C3
  },
  {
    id: 8,
    name: "Sealing Pressure",
    unit: "kg",
    inputs: ["Pressure Sensor"],
    entryType: "manual",
    remarks: "Manually set based on material",
    equipmentId: 3, // Packaging Unit C3
  },
  {
    id: 9,
    name: "Cutting Length",
    unit: "mm",
    inputs: ["Position Encoder"],
    entryType: "auto",
    remarks: "Automatically calculated",
    equipmentId: 3, // Packaging Unit C3
  },
  {
    id: 10,
    name: "Feed Rate",
    unit: "pcs",
    inputs: ["Counter", "Timer"],
    entryType: "auto",
    remarks: "Monitored continuously",
    equipmentId: 3, // Packaging Unit C3
  },
];

// Helper function to get entry type configuration
export const getEntryTypeConfig = (entryType) => {
  return entryTypes.find(type => type.value === entryType) || entryTypes[0];
};

// Helper function to get unit label
export const getUnitLabel = (unitValue) => {
  const unit = units.find(u => u.value === unitValue);
  return unit ? unit.label : unitValue;
};
