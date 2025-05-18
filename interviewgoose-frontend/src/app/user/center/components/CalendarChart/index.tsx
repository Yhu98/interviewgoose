import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import { message } from "antd";
import { getUserClockOnRecordUsingGet } from "@/api/userController";
import "./index.css";

interface Props {}

/**
 * Clock-on records Calendar Map
 * @param props
 * @constructor
 */
const CalendarChart = (props: Props) => {
  const {} = props;

  // clock-on date list ([1,200] represents there are clock-on records for 1st day and 200th day of year)
  const [dataList, setDataList] = useState<number[]>([]);

  // Current Year
  const year = new Date().getFullYear();

  // Request data from backend
  const fetchDataList = async () => {
    try {
      const res = await getUserClockOnRecordUsingGet({
        year,
      });
      setDataList(res.data);
    } catch (e) {
      message.error("Couldn't get clock-on records. " + e.message);
    }
  };

  // Request only once
  useEffect(() => {
    fetchDataList();
  }, []);

  // Calculate data required for Calendar
  const optionsData = dataList.map((dayOfYear, index) => {
    // Calculate data string
    const dateStr = dayjs(`${year}-01-01`)
      .add(dayOfYear - 1, "day")
      .format("YYYY-MM-DD");
    return [dateStr, 1];
  });

  // Calendar Map Config
  const options = {
    tooltip: {
      position: "top",
      formatter: function (p: any) {
        return echarts.time.format(p.data[0], "{yyyy}-{MM}-{dd}", false);
      },
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        // grey to light green
        color: ["#grey", "lightgreen"],
      },
    },
    calendar: {
      range: year,
      left: 20,
      // cell: auto width, 16px height
      cellSize: ["auto", 16],
      yearLabel: {
        position: "top",
        formatter: `${year} Clock-on Records`,
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: optionsData,
    },
  };

  return <ReactECharts className="calendar-chart" option={options} />;
};

export default CalendarChart;