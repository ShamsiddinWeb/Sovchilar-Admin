import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

const CRangePicker = ({setDates}) => {
  const handleDateChange = (dates, dateStrings) => {
    if (dates) {
      const [startDate, endDate] = dates;
      setDates([startDate.toISOString(),
        endDate.toISOString()])
    } else {
      setDates([null, null])
    }
  };

  return <RangePicker onChange={handleDateChange} />;
};

export default CRangePicker;
