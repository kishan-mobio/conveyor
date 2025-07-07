
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { builderFieldsBase, builderFieldsByType } from "@/data/builderFields";

// FormBuilder component: handles the form builder fields UI and logic
const FormBuilder = ({ builderData, setBuilderData, handleBuilderChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {builderFieldsBase.map((field) => (
        <div className="space-y-2" key={field.id}>
          <Label
            htmlFor={field.id}
            className="text-md font-semibold text-gray-700"
          >
            {field.label}
          </Label>
          {field.type === "checkbox" ? (
            <input
              id={field.id}
              type="checkbox"
              checked={builderData[field.id]}
              onChange={() =>
                handleBuilderChange(field.id, null, "checkbox")
              }
              className="h-5 w-5 border-2 border-gray-200 focus:border-blue-500"
            />
          ) : field.type === "dropdown" ? (
            <select
              id={field.id}
              value={builderData[field.id]}
              onChange={(e) =>
                handleBuilderChange(field.id, e.target.value, "dropdown")
              }
              required={field.required}
              className="h-10 border-2 border-gray-200 focus:border-blue-500 text-sm rounded w-full px-2"
            >
              <option value="" disabled>
                {field.placeholder}
              </option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={builderData[field.id]}
              onChange={(e) =>
                handleBuilderChange(field.id, e.target.value, field.type)
              }
              className="h-10 border-2 border-gray-200 focus:border-blue-500 text-sm"
            />
          )}
        </div>
      ))}

      {/* Show additional fields based on type */}
      {builderData.type &&
        builderFieldsByType[builderData.type]?.map((field) => (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id} className="text-md font-semibold text-gray-700">
              {field.label}
            </Label>
            {builderData.type === "dropdown" && field.id === "options" ? (
              <>
                {/* For dropdown, show multiple value/label pairs */}
                {(builderData.optionsArr || [""]).map((opt, idx) => (
                  <div className="flex gap-2 mb-2" key={idx}>
                    <Input
                      type="text"
                      value={opt.value || ""}
                      placeholder="Value"
                      onChange={e => {
                        const arr = builderData.optionsArr ? [...builderData.optionsArr] : [""];
                        arr[idx] = { ...arr[idx], value: e.target.value };
                        setBuilderData(prev => ({ ...prev, optionsArr: arr, options: arr.map(o => `${o.value}:${o.label}`).join(",") }));
                      }}
                      className="w-1/2 h-10 border-2 border-gray-200 text-sm"
                    />
                    <Input
                      type="text"
                      value={opt.label || ""}
                      placeholder="Label"
                      onChange={e => {
                        const arr = builderData.optionsArr ? [...builderData.optionsArr] : [""];
                        arr[idx] = { ...arr[idx], label: e.target.value };
                        setBuilderData(prev => ({ ...prev, optionsArr: arr, options: arr.map(o => `${o.value}:${o.label}`).join(",") }));
                      }}
                      className="w-1/2 h-10 border-2 border-gray-200 text-sm"
                    />
                    <Button
                      type="button"
                      className="h-8 px-2 text-xs bg-red-100 text-red-700 border border-red-200 rounded"
                      onClick={() => {
                        const arr = builderData.optionsArr ? [...builderData.optionsArr] : [];
                        arr.splice(idx, 1);
                        setBuilderData(prev => ({ ...prev, optionsArr: arr, options: arr.map(o => `${o.value}:${o.label}`).join(",") }));
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  className="h-8 px-2 text-xs bg-blue-100 text-blue-700 border border-blue-200 rounded"
                  onClick={() => {
                    const arr = builderData.optionsArr ? [...builderData.optionsArr] : [];
                    arr.push({ value: "", label: "" });
                    setBuilderData(prev => ({ ...prev, optionsArr: arr, options: arr.map(o => `${o.value}:${o.label}`).join(",") }));
                  }}
                >
                  + Add Option
                </Button>
              </>
            ) : (
              <Input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                value={builderData[field.id] || ""}
                onChange={e => handleBuilderChange(field.id, e.target.value, field.type)}
                className="h-10 border-2 border-gray-200 focus:border-blue-500 text-sm"
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default FormBuilder;
