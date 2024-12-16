import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Shared/Admin/Header/Header";
import Sidebar from "../../Shared/Admin/Sidebar/Sidebar";
import Footer from "../../Shared/Admin/Footer/Footer";
import * as echarts from "echarts";
import dashboardService from "../../Service/DashboardService";

function Dashboard() {

  const [totalUser, setTotalUser] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [monthlySales, setMonthlySales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const responses = await Promise.all([
          dashboardService.getTotalPrice(),
          dashboardService.getCountProperty(),
          dashboardService.getCountCustomer(),
          dashboardService.getOutstandingAmount(),
          dashboardService.getMonthlyTotalPrice(),
        ]);
  
        setTotalUser(responses[0].data);
        setTotalOrder(responses[1].data);
        setTotalSales(responses[2].data);
        setTotalPending(responses[3].data);
  
        const monthlyData = responses[4].data;
  
        
       
  
        
        const transformedData = Array(12).fill(0);
        monthlyData.forEach((item) => {
          const { month, totalPrice } = item;
          transformedData[month - 1] = totalPrice; 
        });
  
        setMonthlySales(transformedData);
  
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    if (monthlySales.length > 0) {
      const chartDom = document.getElementById("reportsChart");
      if (chartDom) {
        const myChart = echarts.init(chartDom);
  
        const xData = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];
  
        const option = {
          xAxis: { type: "category", data: xData },
          yAxis: {
            type: "value",
            min: 0,
            axisLabel: { formatter: "{value} VND" },  
          },
          grid: { top: 20, left: 20, right: 20, bottom: 20, containLabel: true },
          series: [
            {
              data: monthlySales, 
              type: "line",
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(67,121,238,0.16)" },
                  { offset: 1, color: "rgba(255,255,255,0.18)" },
                ]),
              },
              lineStyle: { color: "#4379EE", width: 2 },
            },
          ],
        };
  
        myChart.setOption(option);
  
        window.addEventListener("resize", myChart.resize);
  
        return () => {
          window.removeEventListener("resize", myChart.resize);
          myChart.dispose();
        };
      }
    }
  }, [monthlySales]);
  

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main" style={{ backgroundColor: "#F5F6FA" }}>
        <div className="pagetitle">
          <h1>Trang quản trị</h1>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-xxl-3 col-md-6">
              <div className="card info-card sales-card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="">
                      <h5 className="title_revenue_">Total Price</h5>
                      <h6>{totalUser}</h6>
                    </div>
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <img src="/assets/icon/icon_user_total.png" alt="" />
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-md-6">
              <div className="card info-card revenue-card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="">
                      <h5 className="title_revenue_">Total Property</h5>
                      <h6>{totalOrder}</h6>
                    </div>
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <img src="/assets/icon/icon_order_total.png" alt="" />
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-md-6">
              <div className="card info-card customers-card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="">
                      <h5 className="title_revenue_">Total Customer</h5>
                      <h6>{totalSales}</h6>
                    </div>
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <img src="/assets/icon/icon_sale_total.png" alt="" />
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-md-6">
              <div className="card info-card customers-card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="">
                      <h5 className="title_revenue_">Out Standing Amount</h5>
                      <h6>{totalPending}</h6>
                    </div>
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <img src="/assets/icon/icon_total_pending.png" alt="" />
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div id="reportsChart" style={{ height: "400px" }}>
                {monthlySales.length === 0 && <p>No data available for the chart</p>}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;