import { Select } from "antd";
import { Controller } from "react-hook-form";

const { Option } = Select;

const SelectField = ({ control, name, label, placeholder, options, rules, error, className }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 font-medium mb-1">{label}</label>} 
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <Select
            {...field}
            className={className || "w-full"}
            placeholder={placeholder}
            allowClear
            status={error && "error"}
            value={field.value || undefined}
          >
            {options?.map((option, index) => (
              <Option key={index} value={option?.id}>
                {option?.category}
              </Option>
            ))}
          </Select>
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default SelectField;