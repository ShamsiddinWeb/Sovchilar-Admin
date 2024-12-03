import React from "react";
import { Input } from "antd";
import { Controller } from "react-hook-form";

const InputField = ({ control, name, label, placeholder, type, rules, error }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              className={`mt-2 `}
              status={error && "error"}
            />
            {error && (
              <div className="text-red-500 text-sm mt-1">{error.message}</div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default InputField;