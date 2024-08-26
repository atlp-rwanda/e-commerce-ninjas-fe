/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Meta } from "../../components/Meta";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../../components/cards/cards";
import {
  getAllShops,
  getAllUsers,
  getOrderHistory,
} from "../../store/features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useNavigate } from 'react-router-dom';
import { FaFileExcel, FaFileCsv, FaFilePdf, FaFileWord } from "react-icons/fa";
import exportToExcel from "../../utils/export/exportToExcel";
import exportToCSV from "../../utils/export/exportToCSV";
import exportToPDF from "../../utils/export/exportToPDF";
import exportToWord from "../../utils/export/exportToWord";

export const OverViewDashboard = () => {
  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "short" });
  };

  const predefinedMonths = [
    { name: "Jan", Completed: 0, Cancelled: 0 },
    { name: "Feb", Completed: 0, Cancelled: 0 },
    { name: "Mar", Completed: 0, Cancelled: 0 },
    { name: "Apr", Completed: 0, Cancelled: 0 },
    { name: "May", Completed: 0, Cancelled: 0 },
    { name: "Jun", Completed: 0, Cancelled: 0 },
    { name: "Jul", Completed: 0, Cancelled: 0 },
    { name: "Aug", Completed: 0, Cancelled: 0 },
    { name: "Sep", Completed: 0, Cancelled: 0 },
    { name: "Oct", Completed: 0, Cancelled: 0 },
    { name: "Nov", Completed: 0, Cancelled: 0 },
    { name: "Dec", Completed: 0, Cancelled: 0 },
  ];

  const [orderStats, setOrderStats] = useState([]);
  const [numberOfBuyers, setNumberOfBuyers] = useState(null);
  const [numberOfSellers, setNumberOfSellers] = useState(null);
  const [numberOfShops, setNumberOfShops] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [orderHistory, setOrderHistory] = useState({ order: [] })
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

useEffect(() => {
  const countUsers = async () => {
    try {
      const [usersResponse, shopResponse] = await Promise.all([
        dispatch(getAllUsers()),
        dispatch(getAllShops()),
      ]);

      const shops = shopResponse?.payload?.data?.shops ?? [];
      const users = usersResponse?.payload?.data?.user ?? [];

      const buyerCount = users.filter((user) => user.role === "buyer").length;
      const sellerCount = users.filter((user) => user.role === "seller").length;
      const shopNumber = shops.length;

      setNumberOfBuyers(buyerCount);
      setNumberOfSellers(sellerCount);
      setNumberOfShops(shopNumber);
    } catch (error) {
      console.error("Failed to fetch users or shops:", error);
    }
  };

  countUsers();
}, [dispatch, getAllUsers, getAllShops]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getOrderHistory()).unwrap();
        setOrderHistory({ order: response.data.OrderHistory })
        const aggregatedData = response.data.OrderHistory.reduce(
          (acc, order) => {
            const monthName = getMonthName(order.orderDate);
            const month = acc.find((m) => m.name === monthName);
            if (month) {
              if (order.status === "completed") {
                month.Completed += 1;
              } else if (order.status === "canceled") {
                month.Cancelled += 1;
              }
            }
            return acc;
          },
          [...predefinedMonths]
        );
        setOrderStats(aggregatedData);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const toggleExportDropdown = () => {
    setIsExportOpen(!isExportOpen);
  };

  const handleExport = (exportType) => {
    console.dir(orderHistory)
    switch (exportType) {
      case 'excel':
        exportToExcel(orderHistory, "admin_orders_report");
        break;
      case 'csv':
        exportToCSV(orderHistory, "admin_orders_report");
        break;
      case 'pdf':
        exportToPDF(orderHistory, "admin_orders_report");
        break;
      case 'word':
        exportToWord(orderHistory, "admin_orders_report");
        break;
      default:
        console.error('Invalid export type');
    }
    setIsExportOpen(false);
  };


  const MonthDropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const months = [
      "All",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleMonthSelect = (month) => {
      setSelectedMonth(month);
      setIsOpen(false);
    };

    return (
      <div className="monthDropDown">
        <button className="dropdown-button" onClick={toggleDropdown}>
          {selectedMonth} <span className="arrow-down">▼</span>
        </button>
        {isOpen && (
          <ul className="dropdown-menu">
            {months.map((month, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => handleMonthSelect(month)}
              >
                {month}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const filteredOrderStats =
    selectedMonth === "All"
      ? orderStats
      : orderStats.filter(
        (stat) => stat.name === selectedMonth.substring(0, 3)
      );

  return (
    <>
      <div className="adminOverview">
        <Meta title="OverView - Dashboard" />

        <div className="statisticCards">
          <Card
            title="Total Sellers"
            value={numberOfSellers}
            percentage="70"
            isPositive={true}
            onClick={() => navigate("/admin/dashboard/users")}
          />
          <Card
            title="Total Shops"
            value={numberOfShops}
            percentage="20"
            isPositive={true}
          />
          <Card
            title="Total Buyers"
            value={numberOfBuyers}
            percentage="65"
            isPositive={true}
            onClick={() => navigate("/admin/dashboard/users")}
          />
          <Card
            title="Total Revenue"
            value="150 $"
            percentage="10"
            isPositive={false}
          />
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <div className="sub-header">
              <h1>Overview sales</h1>
              <div className="legend">
                <span className="dot completed"></span> Completed
                <span className="dot cancelled"></span> Cancelled
              </div>
            </div>

            <div className="export-section">
              <MonthDropDown />
              <div className="export-dropdown">
                <button type="button" className="export-btn" onClick={toggleExportDropdown}>
                  Export <span className="arrow-down">▼</span>
                </button>
                {isExportOpen && (
                  <ul className="export-menu">
                    <li onClick={() => handleExport('excel')}><FaFileExcel color="green" /> Excel</li>
                    <li onClick={() => handleExport('csv')}><FaFileCsv /> CSV</li>
                    <li onClick={() => handleExport('pdf')}><FaFilePdf color='red' /> PDF</li>
                    <li onClick={() => handleExport('word')}><FaFileWord color='blue' /> Word</li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          <ResponsiveContainer width="99%" height={250}>
            <BarChart
              data={filteredOrderStats}
              margin={{
                top: 20,
                right: 10,
                left: -20,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="0" />
              <XAxis
                dataKey="name"
                axisLine={{ stroke: "#bfbfbf" }}
                tickLine={false}
              />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar
                dataKey="Completed"
                fill="#ff7300"
                radius={[30, 30, 30, 30]}
              />
              <Bar
                dataKey="Cancelled"
                fill="#bfbfbf"
                radius={[30, 30, 30, 30]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};
