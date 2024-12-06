import React from "react";
import { DatePicker } from "antd";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);

const SingleDatePickerField = ({
  control,
  name,
  label,
  placeholder,
  rules,
  error,
}) => {
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
            <DatePicker
              {...field}
              onChange={(date) =>
                field.onChange(
                  date ? dayjs(date).tz("Asia/Tashkent").format() : null
                )
              }
              placeholder={placeholder}
              format="YYYY-MM-DD HH:mm:ss"
              className={`mt-2 w-full ${error ? "border-red-500" : ""}`}
              status={error ? "error" : ""}
              value={
                field.value
                  ? dayjs(field.value).tz("Asia/Tashkent")
                  : null
              }
            />
            {error && (
              <div className="text-red-500 text-sm mt-1">{error?.message}</div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default SingleDatePickerField;