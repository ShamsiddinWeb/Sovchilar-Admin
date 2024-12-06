import { DatePicker } from "antd";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

const ControlledDatePicker = ({ control, name, rules, error }) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => {
          const handleChange = (date) => {
            field.onChange(date ? dayjs(date).toISOString() : null);
          };
          
          return (
            <div>
              <DatePicker
                className="w-full"
                showTime
                format="DD-MM-YYYY HH:mm"
                value={field.value ? dayjs(field.value) : null}
                onChange={handleChange}
              />
              {error && <span style={{ color: 'red' }}>{error.message}</span>}
            </div>
          );
        }}
      />
    </div>
  );
};

export default ControlledDatePicker;
