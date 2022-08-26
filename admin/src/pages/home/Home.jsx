import React, { useEffect, useState, useMemo } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from "axios";

export default function Home() {
  const [userStats, setUserStats] = useState([]);

  const Month = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  ); //basically we are telling here that these month is never gonna change so memorize it

  useEffect(() => {
    const fetchStats = async () => {
      const respo = await axios("./users/stats");
      //in bellow first we are sorting in a sequence because id tells which month user join and data is in form of object so we are using function
      //after sorting array we are mapping data and setting name as Month[id - 1] (because our month variable is in array and the data_id we are getting it giving value of month)

      const statsData = respo.data.sort(function (a, b) {
        return a._id - b._id;
      });
      statsData.map((item) =>
        setUserStats((prev) => [
          ...prev,
          { name: Month[item._id - 1], "New User": item.total },
        ])
      );
    };

    fetchStats();
  }, [Month]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
