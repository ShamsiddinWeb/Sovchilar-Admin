import React from "react";
import { Table, Button } from "antd";

const Attendance = () => {
  // Helper to get full days of the current month
  const getDaysInMonth = (year, month) => {
    const days = [];
    const date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      days.push({
        date: date.getDate(),
        fullDate: date.toISOString().split("T")[0], // YYYY-MM-DD
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Example Data
  const year = new Date().getFullYear();
  const month = new Date().getMonth(); // Current month
  const days = getDaysInMonth(year, month);

  const dataSource = [
    {
      key: "1",
      fullName: "John Doe",
      attendance: {
        "2024-12-01": true,
        "2024-12-02": false,
        // Add other dates
      },
    },
    {
      key: "2",
      fullName: "Jane Smith",
      attendance: {
        "2024-12-01": false,
        "2024-12-02": true,
        "2024-12-04": true,
        // Add other dates
      },
    },
  ];

  // Define columns
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
          <Button type="default" shape="circle">
            X
          </Button>
        ),
    })),
  ];

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default Attendance;

