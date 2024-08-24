/* eslint-disable */
import React, { useEffect, useState } from "react";
import Card from "../../components/cards/cards";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  fetchSellerCollectionProduct,
  sellerGetAllProducts,
  sellerGetOrderHistory,
} from "../../store/features/product/sellerCollectionProductsSlice";
import { useNavigate } from "react-router-dom";
import { FaFileExcel, FaFileCsv, FaFilePdf, FaFileWord } from "react-icons/fa";
import exportToExcel from "../../utils/export/exportToExcel";
import exportToCSV from "../../utils/export/exportToCSV";
import exportToPDF from "../../utils/export/exportToPDF";
import exportToWord from "../../utils/export/exportToWord";

const SellerDashboard = () => {
  const { OrderHistory, message, data, isError } = useAppSelector(
    (state) => state?.sellerCollectionProducts
  );
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

  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "short" });
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [numberOfProducts, setNumberOfProducts] = useState(null);
  const [orderStats, setOrderStats] = useState([]);
  const [numberOfOrders, setNumberOfOrders] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [revenue, setRevenue] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [orderPercentage, setOrderPercentage] = useState(0);
  const [productPercentage, SetProductPercentage] = useState(0);

  useEffect(() => {
    dispatch(sellerGetOrderHistory());
    dispatch(fetchSellerCollectionProduct());
    dispatch(sellerGetAllProducts());
  }, [dispatch]);
  useEffect(() => {
    try {
      const countData = async () => {
        if (OrderHistory) {
          const orderNumber = OrderHistory.order.length;
          setNumberOfOrders(orderNumber);
          const numberOfProduct = data?.products?.length;
          setNumberOfProducts(numberOfProduct);
          const aggregatedData = OrderHistory.order.reduce(
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
          setRevenue(0)
          setPercentage(10)
          setOrderPercentage(80)
          SetProductPercentage(76)
        }
        if (isError && OrderHistory == null && message === "No shop found") {
          setNumberOfOrders(0);
          setNumberOfProducts(0);
          setOrderStats(predefinedMonths);
          setRevenue(0)
          setPercentage(0)
          setPercentage(0)
          setOrderPercentage(0)
          SetProductPercentage(0)
        }
      };
      countData();
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [OrderHistory, isError, message]);

  const [isExportOpen, setIsExportOpen] = useState(false);

  const toggleExportDropdown = () => {
    setIsExportOpen(!isExportOpen);
  };

  const handleExport = (exportType) => {
    switch (exportType) {
      case 'excel':
        exportToExcel(OrderHistory);
        break;
      case 'csv':
        exportToCSV(OrderHistory);
        break;
      case 'pdf':
        exportToPDF(OrderHistory);
        break;
      case 'word':
        exportToWord(OrderHistory);
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
      <div className="seller-dashboard-container">
        <div className="statisticCards">
          <Card
            title="Total Orders"
            value={numberOfOrders}
            percentage={`${orderPercentage}`}
            isPositive={true}
          />
          <Card
            title="Total Revenue"
            value={`${revenue} RWF`}
            percentage={`${percentage}`}
            isPositive={false}
          />
          <Card
            title="Total Products"
            value={numberOfProducts}
            percentage={`${productPercentage}`}
            isPositive={true}
            onClick={() => navigate("/seller/products")}
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

export default SellerDashboard;
