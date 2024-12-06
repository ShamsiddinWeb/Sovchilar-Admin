import { DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;

const CRangePicker = ({ setDates }) => {
  const handleDateChange = (dates, dateStrings) => {

    if (dates) {
      const [startDate, endDate] = dates;
      // Moment.js yordamida lokal formatda saqlash
      setDates([startDate.format("YYYY-MM-DD HH:mm"), endDate.format("YYYY-MM-DD HH:mm")]);
    } else {
      setDates([null, null]);
    }
  };

  return (
    <RangePicker 
      onChange={handleDateChange} 
      showTime 
      format="YYYY-MM-DD HH:mm" 
    />
  );
};

export default CRangePicker;
