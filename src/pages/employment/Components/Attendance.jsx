import { Button, Table } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import useAttendance from "../hooks/useAttendance";
import CRangePicker from "../../../components/RangePicker";

const Attendance = () => {
  const { getAttendance, isLoading } = useAttendance();
  const [attendance, setAttendance] = useState([]);
  const [dates, setDates] = useState([null, null]);

  const fetchAttendance = useCallback(async () => {
    const from = dates[0] ? moment(dates[0]).format("YYYY-MM-DD") : null;
    const to = dates[1] ? moment(dates[1]).format("YYYY-MM-DD") : null;

    const query = from && to ? { startDate: from, endDate: to } : null;
    const response = await getAttendance(query);
    const data = response?.data || {};

    // Transform API data into the required format
    const transformedData = Object.keys(data).map((key) => {
      const attendanceDays = data[key];
      const attendanceRecord = {
        fullName: key,
        attendance: {},
      };

      attendanceDays.forEach((entry) => {
        attendanceRecord.attendance[entry.date] = entry.isCame;
      });

      return attendanceRecord;
    });

    setAttendance(transformedData);
  }, [dates, getAttendance]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const getDaysInRange = (startDate, endDate) => {
    const days = [];
    const date = new Date(startDate);

    while (date <= new Date(endDate)) {
      days.push({
        date: date.getDate(),
        fullDate: date.toISOString().split("T")[0], // YYYY-MM-DD
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const defaultDays = getDaysInRange(
    `${year}-${month + 1}-01`,
    `${year}-${month + 1}-${new Date(year, month + 1, 0).getDate()}`
  );

  const days =
    dates[0] && dates[1] ? getDaysInRange(dates[0], dates[1]) : defaultDays;

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      fixed: "left",
    },
    ...days.map((day) => ({
      title: day.date,
      dataIndex: ["attendance", day.fullDate],
      key: day.fullDate,
      render: (isCame) =>
        isCame ? (
          <Button type="primary" shape="circle">
            ✓
          </Button>
        ) : (
          <Button danger shape="circle">
            X
          </Button>
        ),
    })),
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <h2>Hodimlar davomati</h2>
        <div className="flex gap-4">
          <CRangePicker setDates={setDates} />
          <Button type="primary" onClick={fetchAttendance}>
            Yangilash
          </Button>
        </div>
      </div>
      <Table
        dataSource={attendance}
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={false}
        bordered
        loading={isLoading}
        rowKey="fullName"
      />
    </div>
  );
};

export default Attendance;
