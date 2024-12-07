import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);


export const formatday = (date) => {
  if (!date) return null; 
  return dayjs(date).tz("Asia/Tashkent");
};