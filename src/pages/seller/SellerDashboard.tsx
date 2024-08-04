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
import { useNavigate } from 'react-router-dom';
import productSlice from "../../store/features/product/productSlice";



const SellerDashboard = () => {

 
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
 

  useEffect(() => {
    try {
      const countData = async () => {
        const orderHistoryResponse = await dispatch(sellerGetOrderHistory());
        const orderNumber = orderHistoryResponse.payload.data.order.length;        
        setNumberOfOrders(orderNumber);
        const porductResponse = await dispatch(fetchSellerCollectionProduct());
        const data:any = porductResponse.payload;
        const numberOfProduct = data.data.products.length;
        setNumberOfProducts(numberOfProduct);
        
        const aggregatedData = orderHistoryResponse.payload.data.order.reduce(
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
      };
      countData();
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [dispatch]);

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
          percentage="80"
          isPositive={true}
        />
        <Card
          title="Total Revenue"
          value="50$"
          percentage="5"
          isPositive={false}
        />
        <Card
  title="Total Products"
  value={numberOfProducts}
  percentage="76"
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
          <MonthDropDown />
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
            <Bar dataKey="Completed" fill="#ff7300" radius={[30, 30, 30, 30]} />
            <Bar dataKey="Cancelled" fill="#bfbfbf" radius={[30, 30, 30, 30]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>
    </>
  );
};

export default SellerDashboard;