import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const CRangePicker = ({ setDates }) => {
  const handleDateChange = (dates) => {

    if (dates) {
      const [startDate, endDate] = dates;
      // Moment.js yordamida lokal formatda saqlash
      setDates([startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD")]);
    } else {
      setDates([null, null]);
    }
  };

  return (
    <RangePicker 
      onChange={handleDateChange} 
      format="YYYY-MM-DD" 
    />
  );
};

export default CRangePicker;
