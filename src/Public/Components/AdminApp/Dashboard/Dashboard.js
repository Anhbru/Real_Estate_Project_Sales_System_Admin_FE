import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../Shared/Admin/Header/Header';
import Sidebar from '../../Shared/Admin/Sidebar/Sidebar';
import Footer from '../../Shared/Admin/Footer/Footer';
import * as echarts from 'echarts';

function Dashboard() {
    useEffect(() => {
        var chartDom = document.getElementById('reportsChart');
        var myChart = echarts.init(chartDom);

        const xData = ['5k', '10k', '15k', '20k', '25k', '30k', '35k', '40k', '45k', '50k', '55k', '60k'];
        const yData = [10, 15, 30, 10, 50, 20, 60, 80, 25, 90, 45, 80];

        let maxVal = '64,3664.77';
        const maxValue = Math.max(maxVal);
        const maxIndex = yData.indexOf(maxValue);

        var option = {
            xAxis: {
                type: 'category',
                data: xData,
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 100,
                axisLabel: {
                    formatter: '{value}%'
                }
            },

            grid: {
                top: 20,
                left: 0,
                right: 0,
                bottom: 20,
                containLabel: true
            },
            series: [
                {
                    data: [10, 15, 30, 10, 50, 20, 60, 80, 25, 90, 45, 80],
                    type: 'line',
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {offset: 0, color: 'rgba(67,121,238,0.16)'},
                            {offset: 1, color: 'rgba(255,255,255,0.18)'}
                        ])
                    },
                    lineStyle: {
                        color: '#4379EE',
                        width: 2
                    },
                    markPoint: {
                        data: [
                            {
                                name: 'Giá trị cực đại',
                                value: maxIndex,
                                itemStyle: {
                                    color: 'rgba(67,121,238,0.8)',
                                    borderColor: '#4379EE',
                                    borderWidth: 2,
                                    borderType: 'solid',
                                },
                                label: {
                                    show: true,
                                    formatter: `{b}: {c}%`,
                                    color: '#fff'
                                },
                                symbol: 'rect',
                                symbolSize: [50, 20]
                            }
                        ]
                    }
                },
            ]
        };
        myChart.setOption(option);
        myChart.resize();
    }, []);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main" style={{backgroundColor: "#F5F6FA"}}>
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
                                            <h5 className="title_revenue_">Total User</h5>
                                            <h6>40,689</h6>
                                        </div>
                                        <div
                                            className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <img src="/assets/icon/icon_user_total.png" alt=""/>
                                        </div>
                                    </div>
                                    <p className="mt-3">
                                        <img src="/assets/icon/icon_revenue_up.png" alt=""/>
                                        <span className="percent_ mx-2">8.5%</span>
                                        <span className="percent_content_">Up from yesterday</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-6">
                            <div className="card info-card revenue-card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="">
                                            <h5 className="title_revenue_">Total Order</h5>
                                            <h6>10293</h6>
                                        </div>
                                        <div
                                            className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <img src="/assets/icon/icon_order_total.png" alt=""/>
                                        </div>
                                    </div>
                                    <p className="mt-3">
                                        <img src="/assets/icon/icon_revenue_up.png" alt=""/>
                                        <span className="percent_ mx-2">1.3%</span>
                                        <span className="percent_content_">Up from past week</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-6">
                            <div className="card info-card customers-card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="">
                                            <h5 className="title_revenue_">Total Sales</h5>
                                            <h6>$89,000</h6>
                                        </div>
                                        <div
                                            className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <img src="/assets/icon/icon_sale_total.png" alt=""/>
                                        </div>
                                    </div>
                                    <p className="mt-3">
                                        <img src="/assets/icon/icon_revenue_down.png" alt=""/>
                                        <span className="percent_ down_ mx-2">4.3%</span>
                                        <span className="percent_content_">Down from yesterday</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-6">
                            <div className="card info-card customers-card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="">
                                            <h5 className="title_revenue_">Total Pending</h5>
                                            <h6>2040</h6>
                                        </div>
                                        <div
                                            className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <img src="/assets/icon/icon_total_pending.png" alt=""/>
                                        </div>
                                    </div>
                                    <p className="mt-3">
                                        <img src="/assets/icon/icon_revenue_up.png" alt=""/>
                                        <span className="percent_ mx-2">1.8%</span>
                                        <span className="percent_content_">Up from yesterday</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 sale_details_">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title d-flex align-items-center justify-content-between">
                                        Sales Details
                                        <select className="time_selector_" name="time" id="time">
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option>
                                        </select>
                                    </h5>
                                    <div id="reportsChart" style={{height: '400px'}}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 deal_details_">
                            <div className="card recent-sales overflow-auto">
                                <div className="card-body">
                                    <h5 className="card-title d-flex align-items-center justify-content-between">
                                        Deals Details
                                        <select className="time_selector_" name="time" id="time">
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option>
                                        </select>
                                    </h5>
                                    <table className="table table-borderless">
                                        <thead>
                                        <tr>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Date - Time</th>
                                            <th scope="col">Piece</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <img className="product_img_" src="/assets/img/apple_watch.png" alt=""/>
                                                Apple Watch
                                            </td>
                                            <td>
                                                6096 Marjolaine Landing
                                            </td>
                                            <td>
                                                12.09.2019 - 12.53 PM
                                            </td>
                                            <td>
                                                423
                                            </td>
                                            <td>
                                                $34,295
                                            </td>
                                            <td>
                                                <button className="btn_delivered">Delivered</button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Dashboard;
