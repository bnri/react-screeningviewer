import React from "react";
import './ScreeningViewer.scss';
import { imgbase64forPDF } from './img/base64';

import ChartComponent from "react-chartjs-2"
import { Line } from "react-chartjs-2";
import "chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js";
import "chartjs-plugin-datalabels";
import "chartjs-plugin-annotation";
import html2canvas from "html2canvas"
import GazeViewer from "react-gazeviewer";
import Iframe from 'react-iframe'
import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts_jejumyungjogodic.js";
import pdfFonts from "./vfs_fonts_jejumj_gd_cn.js";

const vfs = pdfFonts.pdfMake.vfs;
// console.log("vfs",vfs);
pdfMake.vfs = vfs;
pdfMake.fonts = {
    '제주명조': {
        normal: "jejumyungjo.ttf",
        bold: "jejugothic.ttf",
        italics: 'cjk.ttf'
    }
}
pdfMake.tableLayouts = {
    showblackline: {
        hLineWidth: function (i, node) {
            if (i === 0 || i === node.table.body.length) {
                //맨앞 맨뒤 
                return 1;
            }
            return (i === node.table.headerRows) ? 1 : 1;
        },
        vLineWidth: function (i) {
            return 1;
        },
        hLineColor: function (i) {
            let color = 'black';
            // if(i===2) color='red';
            // else if(i===3) color='blue';
            // else if(i===4) color='green';

            return color;
        },
        vLineColor: function (i) {
            let color = 'black';
            // if(i===2) color='red';
            // else if(i===3) color='blue';
            // else if(i===4) color='green';

            return color;
        },
    },
    showline: {
        hLineWidth: function (i, node) {
            if (i === 0 || i === node.table.body.length) {
                //맨앞 맨뒤 
                return 1;
            }
            return (i === node.table.headerRows) ? 1 : 1;
        },
        vLineWidth: function (i) {
            return 1;
        },
        hLineColor: function (i) {
            let color = '#1A408E';
            // if(i===2) color='red';
            // else if(i===3) color='blue';
            // else if(i===4) color='green';

            return color;
        },
        vLineColor: function (i) {
            let color = '#1A408E';
            // if(i===2) color='red';
            // else if(i===3) color='blue';
            // else if(i===4) color='green';

            return color;
        },
    },
    hideline: {
        hLineWidth: function (i, node) {
            if (i === 0 || i === node.table.body.length) {
                //맨앞 맨뒤 
                return 0;
            }
            return (i === node.table.headerRows) ? 0 : 0;
        },
        vLineWidth: function (i) {
            return 0;
        },
        hLineColor: function (i) {
            let color = '#1A408E';
            // if(i===2) color='red';
            // else if(i===3) color='blue';
            // else if(i===4) color='green';

            return color;
        },
    },
    headerunderline: {
        hLineWidth: function (i, node) {
            if (i === 0 || i === node.table.body.length) {
                return 0;
            }
            return (i === node.table.headerRows) ? 2 : 0;
        },
        hLineHeight: function (i, node) {
            return 0;
        },
        vLineWidth: function (i) {
            return 0;
        },
        hLineColor: function (i) {
            return '#1A408E';
            //                  return i === 1 ? 'red' : '#aaa';
        }
    },
    titletable: {
        hLineWidth: function (i, node) {
            if (i === 0 || i === node.table.body.length) {
                return 0;
            }
            return (i === node.table.headerRows) ? 0 : 1;
        },
        vLineWidth: function (i) {
            return 0;
        },
        hLineColor: function (i) {
            return '#1A408E';
            // return '#7367f0';
            // return i === 1 ? 'black' : 'black';
        },
        //   paddingTop: function (i) {
        //     return 40;
        //   },
        //   paddingLeft: function (i) {
        //      return i === 0 ? 0 : 8;
        //    },
        //   paddingRight: function (i, node) {
        //     return (i === node.table.widths.length - 1) ? 0 : 8;
        //   }
    }
};

var moment = require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");


const getGaussianMyPercent = function (mean, std, x) {

    // let variance = std*std;

    var erfc = function (x) {
        var z = Math.abs(x);
        var t = 1 / (1 + z / 2);
        var r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 +
            t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
                t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
                    t * (-0.82215223 + t * 0.17087277)))))))))
        return x >= 0 ? r : 2 - r;
    };
    let cdf = 0.5 * erfc(-(x - mean) / (std * Math.sqrt(2)));

    // return {
    //     cdf: cdf,
    //     myPercent: ((1- cdf) * 100).toFixed(2)*1
    // }
    return ((1 - cdf) * 100).toFixed(2) * 1;
}

function getGaussian(std, avg, xArr) {
    let a = 1 / (Math.sqrt(2 * Math.PI) * std);
    let b = Math.E;
    let yArr = [];
    for (let i = 0; i < xArr.length; i++) {
        let x = xArr[i];
        let c = -  ((Math.pow((x - avg), 2)) / (2 * Math.pow(std, 2)));
        let y = a * Math.pow(b, c);
        yArr.push(y * 1000);
    }
    return yArr;
}

function get_blink_arr(obj) {
    let rawGaze = obj;
    var blk_arr = [];
    let BLKID = 0;
    let blink = {
        BLKID: null,
        BLKS: null,
        BLKD: null,
        GRB_start_index: null,
        GRB_end_index: null,
    }
    let ingblink = false;
    for (let i = 0; i < rawGaze.length; i++) {

        if (rawGaze[i].BLKV) {
            if (BLKID !== rawGaze[i].BLKID) {
                //처음 눈을감음
                ingblink = true;
                BLKID = rawGaze[i].BLKID;
                blink.BLKID = BLKID;
                blink.BLKS = rawGaze[i].relTime;
                blink.GRB_start_index = i;

            }
        }
        else {
            if (ingblink === true) {
                ingblink = false;
                blink.GRB_end_index = i - 1 + 12;
                blink.BLKD = rawGaze[i - 1].BLKD + 0.1;
                blk_arr.push(JSON.parse(JSON.stringify(blink)));
                blink = {
                    BLKID: null,
                    BLKS: null,
                    BLKD: null,
                    GRB_start_index: null,
                    GRB_end_index: null,
                }
            }
        }

    }
    //console.log(blk_arr.length);
    return blk_arr;
}

function customCallbackXtick(val, index) {


    if (index % 120 === 0) {
        return ((((val * 1).toFixed(2) * 1).toFixed(2) - 0.5) * 1).toFixed(2) * 1;
    }
}

function dataToTaskArr(data) {
    // console.log("허허data",data);
    const MONITOR_PX_PER_CM = data.monitorInform.MONITOR_PX_PER_CM;
    const pixel_per_cm = data.monitorInform.MONITOR_PX_PER_CM; //1cm 당 pixel
    const degree_per_cm = Math.atan(1 / data.defaultZ) * 180 / Math.PI;
    const w = data.screenW;
    const h = data.screenH;

    const screeningObjectList = data.screeningObjectList;


    let taskArr = {
        left: [],
        right: [],
        bottom: [],
        top: []
    };
    for (let i = 0; i < screeningObjectList.length; i++) {
        // console.log("screeningObjectList[i].analysis.direction",screeningObjectList[i].analysis.direction);
        taskArr[screeningObjectList[i].analysis.direction].push({
            ...screeningObjectList[i],
            gazeData: data.taskArr[i],
            analysis: data.analysisArr[i]
        });
    }


    for (let key in taskArr) {

        for (let i = 0; i < taskArr[key].length; i++) {
            const task = taskArr[key][i];

            const type = task.type;
            let gazeArr = task.gazeData;

            let blink_arr = get_blink_arr(gazeArr);
            task.blinkArr = blink_arr;

            // % 로되어있는걸 degree 로 변환작업, 중점이 0,0 x,y degree
            for (let j = 0; j < gazeArr.length; j++) {
                let target_pixels = {
                    x: null,
                    y: null,
                };
                if (type === "teleport") {
                    //2~5 고정임

                    if (gazeArr[j].relTime * 1 < task.startWaitTime * 1) {
                        target_pixels.x = task.startCoord.x - w / 2;
                        target_pixels.y = task.startCoord.y - h / 2;
                    } else if (gazeArr[j].relTime * 1 < task.duration * 1 + task.startWaitTime * 1) {
                        target_pixels.x = task.endCoord.x - w / 2;
                        target_pixels.y = task.endCoord.y - h / 2;
                    } else {
                        if (task.isReturn) {
                            target_pixels.x = task.startCoord.x - w / 2;
                            target_pixels.y = task.startCoord.y - h / 2;
                        } else {
                            target_pixels.x = task.endCoord.x - w / 2;
                            target_pixels.y = task.endCoord.y - h / 2;
                        }
                    }
                    let target_xcm = target_pixels.x / pixel_per_cm;
                    let target_ycm = target_pixels.y / pixel_per_cm;
                    let target_xdegree = target_xcm * degree_per_cm;
                    let target_ydegree = target_ycm * degree_per_cm;
                    gazeArr[j].target_xdegree = target_xdegree;
                    gazeArr[j].target_ydegree = target_ydegree;
                } else if (type === "circular") {
                    const radian = Math.PI / 180;
                    const radius = task.radius;

                    if (gazeArr[j].relTime * 1 < task.startWaitTime) {
                        const cosTheta = Math.cos(task.startDegree * radian);
                        const sineTheta = Math.sin(task.startDegree * radian);
                        target_pixels.x = task.centerCoord.x + radius * cosTheta * MONITOR_PX_PER_CM - w / 2;
                        target_pixels.y = task.centerCoord.y - radius * sineTheta * MONITOR_PX_PER_CM - h / 2;
                    } else if (gazeArr[j].relTime * 1 < task.duration * 1 + task.startWaitTime * 1) {
                        let nowDegree = -(
                            ((task.startDegree - task.endDegree) * (gazeArr[j].relTime - task.startWaitTime)) / task.duration -
                            task.startDegree
                        );
                        const cosTheta = Math.cos(nowDegree * radian);
                        const sineTheta = Math.sin(nowDegree * radian);
                        target_pixels.x = task.centerCoord.x + radius * cosTheta * MONITOR_PX_PER_CM - w / 2;
                        target_pixels.y = task.centerCoord.y - radius * sineTheta * MONITOR_PX_PER_CM - h / 2;
                    } else {
                        const cosTheta = Math.cos(task.endDegree * radian);
                        const sineTheta = Math.sin(task.endDegree * radian);
                        target_pixels.x = task.centerCoord.x + radius * cosTheta * MONITOR_PX_PER_CM - w / 2;
                        target_pixels.y = task.centerCoord.y - radius * sineTheta * MONITOR_PX_PER_CM - h / 2;
                    }
                    let target_xcm = target_pixels.x / pixel_per_cm;
                    let target_ycm = target_pixels.y / pixel_per_cm;
                    let target_xdegree = target_xcm * degree_per_cm;
                    let target_ydegree = target_ycm * degree_per_cm;
                    gazeArr[j].target_xdegree = target_xdegree;
                    gazeArr[j].target_ydegree = target_ydegree;
                }

                if (gazeArr[j].RPOGV) {
                    let xpixel = (gazeArr[j].RPOGX - 0.5) * w;
                    let ypixel = (gazeArr[j].RPOGY - 0.5) * h;

                    let xcm = xpixel / pixel_per_cm;
                    let ycm = ypixel / pixel_per_cm;
                    let xdegree = xcm * degree_per_cm;
                    let ydegree = ycm * degree_per_cm;

                    gazeArr[j].xdegree = xdegree;
                    gazeArr[j].ydegree = ydegree;
                } else {
                    gazeArr[j].xdegree = null;
                    gazeArr[j].ydegree = null;
                }
            }
            // const startRelTime = task.startWaitTime - 1;
            // const endRelTime = task.relativeEndTime - task.endWaitTime-1.5;
            const startRelTime = task.startWaitTime - 0.5;
            const endRelTime = task.relativeEndTime - task.endWaitTime - 2;
            if (key === 'top' || key === 'bottom') {
                let target_ydegreeChartArr = [];
                let ydegreeChartArr = [];

                for (let j = 0; j < gazeArr.length; j++) {
                    if (gazeArr[j].relTime >= startRelTime && gazeArr[j].relTime <= endRelTime) {
                        target_ydegreeChartArr.push({
                            x: (gazeArr[j].relTime - startRelTime) * 1000,
                            y: gazeArr[j].target_ydegree,
                        })
                        ydegreeChartArr.push({
                            x: (gazeArr[j].relTime - startRelTime) * 1000,
                            y: gazeArr[j].ydegree,
                        })



                    }



                }

                task.target_ydegreeChartArr = target_ydegreeChartArr;
                task.ydegreeChartArr = ydegreeChartArr;
            }
            else {
                //right || left
                let target_xdegreeChartArr = [];
                let xdegreeChartArr = [];

                for (let j = 0; j < gazeArr.length; j++) {
                    if (gazeArr[j].relTime >= startRelTime && gazeArr[j].relTime <= endRelTime) {
                        target_xdegreeChartArr.push({
                            x: (gazeArr[j].relTime - startRelTime) * 1000,
                            y: gazeArr[j].target_xdegree,
                        })
                        xdegreeChartArr.push({
                            x: (gazeArr[j].relTime - startRelTime) * 1000,
                            y: gazeArr[j].xdegree,
                        })



                    }



                }

                task.target_xdegreeChartArr = target_xdegreeChartArr;
                task.xdegreeChartArr = xdegreeChartArr;
            }


            let blkChartArr = [];
            for (let j = 0; j < task.blinkArr.length; j++) {
                if (task.blinkArr[j].BLKS >= endRelTime) {
                    // console.log("찾음",task.blinkArr[j].BLKS)
                }
                else if (task.blinkArr[j].BLKS >= startRelTime && task.blinkArr[j].BLKS + task.blinkArr[j].BLKD >= endRelTime) {
                    blkChartArr.push({
                        x: (task.blinkArr[j].BLKS - startRelTime) * 1000,
                        y: 0
                    });
                    blkChartArr.push({
                        x: (task.blinkArr[j].BLKS - startRelTime) * 1000,
                        y: 1
                    })
                    blkChartArr.push({
                        x: endRelTime * 1000,
                        y: 1
                    })
                    blkChartArr.push({
                        x: endRelTime * 1000,
                        y: 0
                    })
                }
                else if ((task.blinkArr[j].BLKS - startRelTime) >= 0) {

                    blkChartArr.push({
                        x: (task.blinkArr[j].BLKS - startRelTime) * 1000,
                        y: 0
                    });
                    blkChartArr.push({
                        x: (task.blinkArr[j].BLKS - startRelTime) * 1000,
                        y: 1
                    })
                    blkChartArr.push({
                        x: (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) * 1000,
                        y: 1
                    })
                    blkChartArr.push({
                        x: (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) * 1000,
                        y: 0
                    })
                }
                else if ((task.blinkArr[j].BLKS - startRelTime) <= 0 && (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) >= 0) {
                    blkChartArr.push({
                        x: 0,
                        y: 0
                    });
                    blkChartArr.push({
                        x: 0,
                        y: 1
                    })
                    blkChartArr.push({
                        x: (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) * 1000,
                        y: 1
                    })
                    blkChartArr.push({
                        x: (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) * 1000,
                        y: 0
                    })
                }
            }
            task.blkChartArr = blkChartArr;

            let latencyChart = {
                s: (task.analysis.startTime - startRelTime) * 1000,

            };


            task.latencyChart = latencyChart;
        }

    }
    return taskArr;
}

const BarChartGrade = ({ ...props }) => {
    const { myScore, avgGroupScore, stdGroupScore } = props;

    const chartOption = React.useMemo(() => {
        return {
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        return null;
                        //return value !== 0 ? value.toLocaleString(/* ... */) : ''
                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#000000'
                },
            },
            maintainAspectRatio: false,
            // devicePixelRatio: window.devicePixelRatio * 3,
            annotation: {
                annotations: [
                    {
                        drawTime: "afterDatasetsDraw",
                        type: 'line',
                        mode: 'vertical',
                        scaleID: "x1",
                        value: myScore,
                        borderColor: 'red',
                        borderWidth: 1,
                        label: {
                            content: '내점수 : ' + (myScore * 1).toFixed(1) + '점',
                            enabled: true,
                            fontSize: 12,
                            position: "top"
                        },
                    },
                    {
                        drawTime: "afterDatasetsDraw",
                        type: 'line',
                        mode: 'vertical',
                        scaleID: "x1",

                        value: avgGroupScore,
                        borderColor: 'green',
                        /*borderDash: [2,6], */

                        borderWidth: 1,
                        label: {
                            content: "그룹평균 : " + (avgGroupScore * 1).toFixed(1) + '점',
                            enabled: true,
                            fontSize: 12,
                            position: "middle"
                        },
                    },
                    {
                        drawTime: "afterDatasetsDraw",
                        type: 'line',
                        mode: 'vertical',
                        scaleID: "x1",

                        value: avgGroupScore - stdGroupScore,
                        borderColor: 'green',
                        borderDash: [2, 6],
                        borderWidth: 1,
                        label: {
                            content: "Q1",
                            enabled: false,
                            fontSize: 8,
                            position: "top"
                        },
                    },
                    {
                        drawTime: "afterDatasetsDraw",
                        type: 'line',
                        mode: 'vertical',
                        scaleID: "x1",
                        value: avgGroupScore + stdGroupScore,
                        borderColor: 'green',
                        borderDash: [2, 6],
                        borderWidth: 1,
                        label: {
                            content: "Q3",
                            enabled: false,
                            fontSize: 8,
                            position: "top"
                        },
                    },
                ]
            },
            animation: {
                duration: 0,
            },
            tooltips: {
                callbacks: {

                    title: function (tooltipItem, data) {
                        return '';
                    }
                }
            },
            legend: {
                display: false,
                labels: {
                    fontSize: 14,
                }

            },
            scales: {
                xAxes: [
                    {
                        id: "x1",
                        display: true,       // 실제시간 임시로 true//
                        type: 'linear',

                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0)",
                        },
                        ticks: {
                            source: 'data', //auto,data,labels
                            suggestedMin: 0,
                            suggestedMax: 100,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: '부족                                  우수',
                            fontSize: 15,
                        },
                    }
                ],
                yAxes: [
                    {
                        id: "y1",
                        position: 'left',
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0)",
                        },
                        scaleLabel: { /////////////////x축아래 라벨
                            display: true,
                            labelString: '비율 (%)',
                            //fontStyle: 'bold',
                            fontSize: 15,
                        },
                    },
                ]
            },

        }
    }, [myScore, avgGroupScore, stdGroupScore])
    const chartData = React.useMemo(() => {
        let groupavg = avgGroupScore;
        let groupstd = stdGroupScore ? stdGroupScore : 1;
        // console.log("groupstd",groupstd);
        let xarr = [];
        for (let i = 0; i <= 100; i++) {
            xarr.push(i);
        }
        let yarr = getGaussian(groupstd, groupavg, xarr);

        //    console.log(xarr);
        //    console.log(yarr);

        let newdata = [];
        for (let i = 0; i <= 100; i++) {
            newdata.push({
                x: xarr[i],
                y: yarr[i]
            });
        };

        let chartdata = {
            datasets: [
                {
                    data: newdata,
                    //steppedLine: "before",
                    steppedLine: false,
                    label: '',

                    borderColor: "rgba(0,0,255,0.4)",//"#0000ff",
                    backgroundColor: 'rgba(0,0,255,0.4)',
                    fill: false,
                    yAxisID: "y1",
                    xAxisID: "x1",
                    borderWidth: 1.5,
                    pointRadius: 0, //데이터 포인터크기
                    pointHoverRadius: 0, //hover 데이터포인터크기
                }
            ],
        }
        return chartdata;
    }, [avgGroupScore, stdGroupScore])
    return (<>
        <Line

            data={chartData} options={chartOption} ref={(reference) => {
                //console.log("~~~~~~~~~~~~~");

                //       console.log(reference);
                //lineChart = reference;

            }}

        />
    </>)
}


const ScreeningViewer = ({ ...props }) => {
    const { dataArr } = props;
    const { onClose } = props;
    const { groupData, userInform, AgencyLogoBase64, resultInform } = props;

    const [selDataIndex, set_selDataIndex] = React.useState(0);

    const selScreeningType = React.useMemo(() => {
        if (selDataIndex === dataArr.length) {
            return "보고서 다운로드"
        }
        else if (dataArr && dataArr[selDataIndex]) {
            return dataArr[selDataIndex].screeningType;
        }
        else {
            return null;
        }
    }, [dataArr, selDataIndex])
    const targetGroupData = React.useMemo(() => {
        //groupData에서 알맞은 그룹을 찾아야함
        const testeeMomentAge = Math.floor(userInform.testeeMomentAge);

        let target = null;
        for (let i = 0; i < groupData.length; i++) {
            if (testeeMomentAge < 7) {
                if (groupData[i].s_age === 0 && groupData[i].e_age === 7) {

                    target = groupData[i];
                    break;
                }
            } else if (testeeMomentAge >= 20) {
                if (groupData[i].s_age === 20 && groupData[i].e_age === 1000) {
                    target = groupData[i];
                    break;
                }
            } else {
                if (groupData[i].s_age === testeeMomentAge && groupData[i].e_age === (testeeMomentAge + 1)) {
                    target = groupData[i];
                    break;
                }
            }
        }
        // console.log("targetGroupData",target)
        return target;
    }, [userInform, groupData]);

    const everyGroupData = React.useMemo(() => {

        return groupData[groupData.length - 1];
    }, [groupData])

    const [isPDFing, set_isPDFing] = React.useState(null);
    const [docDefinition, set_docDefinition] = React.useState(null);
    const [progressNow, set_progressNow] = React.useState(null);
    const [PDFURL, set_PDFURL] = React.useState(null);

    const progressMax = React.useMemo(() => {
        if (!dataArr) return 0;
        return dataArr.length;
    }, [dataArr]);

    const myPercentArr = React.useMemo(() => {
        let pArr = [];
        for (let i = 0; i < dataArr.length; i++) {
            let data = dataArr[i];
            //
            const pageType = data.screeningType;
            let x = data.analysis[`${pageType}_score`];
            let avg = targetGroupData[`avg_${pageType}_score`];
            let std = targetGroupData[`std_${pageType}_score`] || 1;
            let p = getGaussianMyPercent(avg, std, x);
            pArr.push(p);
        }

        // console.log("p",p);
        return pArr;
    }, [dataArr, targetGroupData]);

    const myStateArr = React.useMemo(() => {
        // if(!myPercentArr) return null;

        let stateArr = [];
        for (let i = 0; i < myPercentArr.length; i++) {
            let myPercent = myPercentArr[i];
            let mystate;
            if (myPercent <= 10) {
                mystate = '최우수'


            }
            else if (myPercent > 10 && myPercent <= 25) {
                mystate = '우수'


            }
            else if (myPercent > 25 && myPercent <= 75) {
                mystate = "양호"


            }
            else if (myPercent > 75 && myPercent <= 90) {
                mystate = "미흡"


            }
            else {
                mystate = "주의"


            }
            stateArr.push(mystate);
        }
        return stateArr;
    }, [myPercentArr])

    const handlePDFstart = () => {
        set_progressNow(0);
        set_isPDFing(true);
        set_docDefinition({
            pageSize: 'A4',
            info: {
                title: '진단 요약 결과',
                author: 'bnri',
                subject: '진단 요약 결과',
                keywords: '',
            },
            background: function (currentPage, pageCount) {
                if (currentPage * 1 === 1) {
                    return ([
                        {
                            margin: [20, 26],
                            layout: 'headerunderline', // optional
                            table: {
                                // headers are automatically repeated if the table spans over multiple pages
                                // you can declare how many rows should be treated as headers
                                headerRows: 1,
                                widths: ['*', '*'],
                                body: [
                                    [{
                                        text: '',
                                        margin: [0, 10, 0, 10],
                                        border: [false, false, false, false]
                                    }, {
                                        text: ' ',
                                        margin: [0, 10, 0, 10],
                                        border: [false, false, false, false]
                                    }
                                    ],
                                    [{
                                        text: '',
                                        border: [false, false, false, false],
                                    }, {
                                        text: '',
                                        border: [false, false, false, false]
                                    }],
                                ]
                            }
                        },
                        {

                            image: 'readerseyeLogo',
                            //fit: [200, 200],
                            fit: [100, 180],
                            opacity: 1, //흐림 배경이미지.
                            absolutePosition: { x: 470, y: 28 },
                            //absolutePosition: { x: 550, y: 800 },
                        },
                        {
                            text: userInform && userInform.testeeName ? `${userInform.testeeName} (${userInform.testeeID}) ${userInform.testeeClass}` : `testeeName (testeeID) testeeClass`,
                            bold: true,
                            // color: '#7367f0',
                            color: 'black',
                            absolutePosition: { x: 46, y: 41 },
                        },
                        {
                            text: resultInform && resultInform.savetime ? `${resultInform.savetime}` : "saveTime",
                            bold: true,
                            // color: '#7367f0',
                            color: 'black',
                            absolutePosition: { x: 46, y: 61 },
                        }
                    ]);
                }
                else {

                    return ([
                        {
                            margin: [20, 26],
                            layout: 'headerunderline', // optional
                            table: {
                                // headers are automatically repeated if the table spans over multiple pages
                                // you can declare how many rows should be treated as headers
                                headerRows: 1,
                                widths: ['*', '*'],
                                body: [
                                    [{
                                        text: '',
                                        margin: [0, 10, 0, 10]
                                    }, { text: ' ', margin: [0, 10, 0, 10] }],
                                    ['', ''],
                                ]
                            }
                        },
                        {
                            image: '학원로고',
                            // image: 'agencyLogo',
                            //fit: [200, 200],
                            fit: [20, 20],
                            opacity: 1, //흐림 배경이미지.
                            absolutePosition: { x: 21, y: 37 },
                            //absolutePosition: { x: 550, y: 800 },
                        },
                        {
                            text: userInform.agencyName ? userInform.agencyName : "agencyName",
                            bold: true,
                            // color: '#7367f0',
                            color: 'black',
                            absolutePosition: { x: 46, y: 41 },
                        },
                        {

                            image: 'readerseyeLogo',
                            //fit: [200, 200],
                            fit: [100, 180],
                            opacity: 1, //흐림 배경이미지.
                            absolutePosition: { x: 470, y: 28 },
                            //absolutePosition: { x: 550, y: 800 },
                        },
                    ]);



                }

            },
            footer: function (currentPage, pageCount) {
                if (currentPage === 1) {
                    return null;
                }


                return {
                    table: {
                        widths: [600, 100],
                        body: [
                            [
                                {
                                    text: (currentPage - 1) + ' / ' + (pageCount - 1),
                                    alignment: 'center',
                                    fontSize: 10
                                }
                            ]
                        ]
                    },
                    layout: 'noBorders'
                };
            },

            compress: true, //압축 저용량
            content: [
                {
                    name: 'mainpage',
                    margin: [30, 30, 30, 30],

                    table: {
                        widths: ['*', '*'],
                        headerRows: 1,

                        body: [
                            [{
                                text: ' '
                            },
                            {
                                text: ' '
                            }
                            ],
                            [

                                {
                                    margin: [10, 220, 10, 270],
                                    text: "스크리닝 검사 리포트",
                                    bold: true,
                                    fontSize: 26,
                                    alignment: 'center',
                                    colSpan: 2
                                },
                            ],
                            [
                                {
                                    margin: [10, 10, 10, 20],
                                    text: moment().format('YYYY.MM.DD'),
                                    alignment: 'center',
                                    fontSize: 16,
                                    colSpan: 2
                                },

                            ],
                            [
                                {
                                    margin: [10, 20, 10, 10],
                                    columns: [
                                        { width: '*', text: '' },
                                        {
                                            width: 'auto',
                                            image: '학원로고',
                                            // image: 'agencyLogo',
                                            //fit: [200, 200],
                                            fit: [60, 60],
                                        },
                                        {
                                            margin: [8, 20, 0, 0],
                                            width: 'auto',
                                            text: userInform.agencyName ? userInform.agencyName : "agencyName",
                                            fontSize: 20,
                                            bold: true,
                                        },
                                        { width: '*', text: '' },
                                    ],
                                    colSpan: 2

                                }
                            ]
                        ],

                    },
                    layout: {
                        hLineWidth: function (i, node) {
                            if (i === 0 || i === node.table.body.length) {
                                return 0;
                            }
                            return (i === node.table.headerRows) ? 0 : 0;
                        },
                        hLineHeight: function (i, node) {
                            return 2;
                        },
                        vLineWidth: function (i) {
                            return 0;
                        },
                        hLineColor: function (i) {
                            return i === 1 ? 'black' : '#aaa';
                        },
                    },
                    pageBreak: 'after'
                }, //main page
            ],

            images: {
                'readerseyeLogo': imgbase64forPDF['리더스아이로고가로'],
                '학원로고': AgencyLogoBase64 ? AgencyLogoBase64 : imgbase64forPDF['기본로고'],
                // defaultAgencyLogo: defaultagencylogo,
                '최우수': imgbase64forPDF['최우수'],
                '우수': imgbase64forPDF['우수'],
                '양호': imgbase64forPDF['양호'],
                '미흡': imgbase64forPDF['미흡'],
                '주의': imgbase64forPDF['주의'],
                '센텐스마스크': imgbase64forPDF['센텐스마스크'],
                '지구력': imgbase64forPDF['지구력'],
                '키워드파인딩': imgbase64forPDF['키워드파인딩'],
                '많이읽기': imgbase64forPDF['많이읽기'],
                '비주얼스팬': imgbase64forPDF['비주얼스팬'],
                '어휘력': imgbase64forPDF['어휘력'],
                '유창한': imgbase64forPDF['유창한'],
                '어려운': imgbase64forPDF['어려운'],
                '미숙한': imgbase64forPDF['미숙한'],
                '읽기능력피라미드': imgbase64forPDF['읽기능력피라미드']
            },
            styles: {
                header: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'left'
                },
                tableExample: {
                    margin: [0, 20, 0, 10]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 12,
                    color: 'black'
                },
                tableParagraph: {
                    bold: false,
                    fontSize: 9,
                    lineHeight: 1.6,
                    color: 'black'
                }
            },
            pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
                return currentNode.headlineLevel === 1
            },
            //headlineLevel: 1,
            defaultStyle: {
                font: '제주명조'
            },
        });
    }

    const [isfinishThisPage, set_isfinishThisPage] = React.useState(null);

    React.useEffect(() => {
        if (isPDFing) {
            if (progressNow === progressMax) {
                //마지막 페이지 돌아오는경우임.. 
                set_isPDFing('exit');
            }
            else if (progressNow < progressMax) {
                //지금 pdf 에 만들어야 하는 것이..

                //dataArr[progressNow].screeningType 에 관한것
                set_selDataIndex(progressNow);
                set_isfinishThisPage(false);
                if (isfinishThisPage === true) {
                    console.log("끝난progressNow", progressNow);
                    set_progressNow(progressNow + 1);
                    set_isfinishThisPage(null);
                    console.log("=============================================");
                }
            }
        }
    }, [isPDFing, progressNow, progressMax, dataArr, isfinishThisPage]);


    React.useEffect(() => {
        if (progressNow !== null) {
            set_selDataIndex(progressNow);
        }
    }, [progressNow])


    React.useEffect(() => {
        async function doit() {
            if (isPDFing && progressMax !== selDataIndex) {

                //여기가 랜더가 끝남 docDefinition을 위한
                if (isfinishThisPage === false) {
                    const isLast = selDataIndex+1 === dataArr.length?true:false;


                    const data = dataArr[selDataIndex];
                    
                    const pageType = data.screeningType;
                    const myState = myStateArr[selDataIndex];
                    const myPercent = myPercentArr[selDataIndex];
                    const myScore = data.analysis[`${pageType}_score`].toFixed(2);
                    const targetScore = targetGroupData[`avg_${pageType}_score`].toFixed(2);
                    console.log("@작업을시작한 pageType : ", pageType);
                    console.log("data", data);
                    console.log("Inform", userInform, resultInform);
                    // console.log("@selDataIndex",selDataIndex);
                    let pageTitle;
                    if (pageType === 'saccade') {
                        pageTitle = `도약안구운동 saccade 분석`
                    }
                    else if (pageType === 'pursuit') {
                        pageTitle = `추적안구운동 pursuit 분석`
                    }
                    else if (pageType === 'antisaccade') {
                        pageTitle = `반대로보기 anti saccade 분석`
                    }


                    //유저정보 삽입
                    docDefinition.content.push({
                        // pageBreak: 'after',
                        name: '종합 요약',
                        margin: [5, 20, 0, 5],
                        columns: [
                            {
                                width: '80%',
                                table: {
                                    dontBreakRows: true,
                                    widths: ['10%', '32%', '10%', '17%', '10%', '21%'],
                                    margin: [0, 0, 0, 0],
                                    headerRows: 0,
                                    body: [
                                        [
                                            {
                                                text: '',
                                                border: [false, false, false, false]
                                            },
                                            {
                                                text: '',
                                                border: [false, false, false, false]
                                            },
                                            {
                                                text: '',
                                                border: [false, false, false, false]
                                            },
                                            {
                                                text: '',
                                                border: [false, false, false, false]
                                            },
                                            {
                                                text: '',
                                                border: [false, false, false, false]
                                            },
                                            {
                                                text: '',
                                                border: [false, false, false, false]
                                            }
                                        ],//빈것
                                        [
                                            {
                                                margin: [10, 10, 0, 10],
                                                text: '\t\t\t\t\t\t' + pageTitle, alignment: 'center',
                                                bold: true,
                                                colSpan: 6,
                                                fontSize: 16,
                                                border: [false, false, false, false]
                                            }
                                        ],//타이틀
                                        [
                                            {
                                                text: '소속',
                                                colSpan: 1,
                                                fontSize: 9,
                                                alignment: 'right',
                                                margin: [0, 5, 0, 5],
                                                border: [false, true, false, false],
                                                bold: true
                                            },
                                            {
                                                text: `${userInform.agencyName}(${userInform.agencyID})`,
                                                colSpan: 1,
                                                fontSize: 9,
                                                margin: [0, 5, 0, 5],
                                                border: [false, true, false, false]
                                            },//agencyName agencyID
                                            {
                                                text: '수행일',
                                                colSpan: 1,
                                                fontSize: 9,
                                                alignment: 'right',
                                                margin: [0, 5, 0, 5],
                                                border: [false, true, false, false],
                                                bold: true
                                            },
                                            {
                                                text: `${resultInform.savetime.split(' ')[0]}`,
                                                colSpan: 1,
                                                fontSize: 9,
                                                margin: [0, 5, 0, 5],
                                                border: [false, true, false, false]
                                            },//수행일
                                            {
                                                text: '종합결과',
                                                colSpan: 1,
                                                fontSize: 9,
                                                alignment: 'right',
                                                margin: [0, 5, 0, 5],
                                                border: [false, true, false, false],
                                                bold: true
                                            },
                                            {
                                                text: `${myState}`,
                                                colSpan: 1,
                                                fontSize: 9,
                                                margin: [0, 5, 0, 5],
                                                border: [false, true, false, false],

                                            },//종합결과



                                        ], //1줄
                                        [
                                            {
                                                text: '피험자',
                                                colSpan: 1,
                                                fontSize: 9,
                                                alignment: 'right',
                                                margin: [0, 5, 0, 5],
                                                border: [false, false, false, false],
                                                bold: true
                                            },
                                            {
                                                text: `${userInform.testeeName}(${userInform.testeeID})`,
                                                colSpan: 1,
                                                fontSize: 9,
                                                margin: [0, 5, 0, 5],
                                                border: [false, false, false, false]
                                            },
                                            {
                                                text: '수행시각',
                                                colSpan: 1,
                                                fontSize: 9,
                                                alignment: 'right',
                                                margin: [0, 5, 0, 5],
                                                border: [false, false, false, false],
                                                bold: true
                                            },
                                            {
                                                text: `${resultInform.savetime.split(' ')[1]}`,
                                                colSpan: 1,
                                                fontSize: 9,
                                                margin: [0, 5, 0, 5],
                                                border: [false, false, false, false]
                                            },
                                            {
                                                text: '내 점수',
                                                colSpan: 1,
                                                fontSize: 9,
                                                alignment: 'right',
                                                margin: [0, 5, 0, 5],
                                                border: [false, false, false, false],
                                                bold: true
                                            },
                                            {
                                                text: `${myScore} 점(${myPercent}%)`,
                                                colSpan: 1,
                                                fontSize: 9,
                                                margin: [0, 5, 0, 5],
                                                border: [false, false, false, false],

                                            }//내점수

                                        ], //2줄
                                        [
                                            {
                                                text: '성별',
                                                colSpan: 1,
                                                fontSize: 9,
                                                alignment: 'right',
                                                margin: [0, 5, 0, 5],
                                                border: [false, false, false, false],
                                                bold: true
                                            },
                                            {
                                                text: `${userInform.testeeSex}`,
                                                colSpan: 1,
                                                fontSize: 9,
                                                margin: [0, 5, 0, 5],
                                                border: [false, false, false, false]
                                            },//성별
                                            {
                                                text: '당시연령',
                                                colSpan: 1,
                                                fontSize: 9,
                                                alignment: 'right',
                                                margin: [0, 5, 0, 5],
                                                border: [false, false, false, false],
                                                bold: true
                                            },
                                            {
                                                text: `${userInform.testeeMomentAge} 세`,
                                                colSpan: 1,
                                                fontSize: 9,
                                                margin: [0, 5, 0, 5],
                                                border: [false, false, false, false]
                                            },
                                            {
                                                text: '또래평균',
                                                colSpan: 1,
                                                fontSize: 9,
                                                alignment: 'right',
                                                margin: [0, 5, 0, 5],
                                                border: [false, false, false, false],
                                                bold: true
                                            },
                                            {
                                                text: `${targetScore} 점`,
                                                colSpan: 1,
                                                fontSize: 9,
                                                margin: [0, 5, 0, 5],
                                                border: [false, false, false, false],

                                            }//또래평균점수

                                        ],  //3줄             
                                    ]

                                },
                                layout: 'showblackline',
                            },
                            {
                                width: '20%',
                                table: {
                                    dontBreakRows: true,
                                    widths: ['*', '*'],
                                    margin: [0, 0, 50, 0],
                                    headerRows: 0,
                                    body: [
                                        [{
                                            text: '',
                                            border: [false, false, false, false],
                                            colSpan: 2,
                                        }],
                                        [
                                            {
                                                margin: [0, 10, 20, 10],
                                                text: '\t', alignment: 'center',
                                                bold: true,
                                                // colSpan: 6,
                                                fontSize: 16,
                                                border: [false, false, false, false],
                                                colSpan: 2,
                                            }
                                        ],
                                        [{
                                            margin: [0, 0, 0, 0],
                                            // width:60,
                                            fit: [100, 70],
                                            image: `${myState}`,
                                            alignment: 'center',
                                            colSpan: 2,
                                            // colSpan:2
                                        }]
                                    ]
                                },
                                layout: {
                                    hLineColor: function (i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 'white' : 'white';
                                    },
                                    vLineColor: function (i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 'white' : 'white';
                                    },
                                },
                                // layout: 'showblackline',
                            }

                        ],



                    });

                    //아래 종류에 따라 삽입이 달라야함
                    if (pageType === 'saccade') {
                        //html2canvas


                        let p = [];
                        p.push(html2canvas(document.getElementById("saccadeGradeChart")));
                        p.push(html2canvas(document.getElementById("saccadeRadarChart")));
                        p.push(html2canvas(document.getElementById("saccadeDirectionChart")));
                        p.push(html2canvas(document.getElementById("saccadeRealChart")));
                        // p.push(html2canvas(document.getElementById("saccadeLatencyChart")));
                        // p.push(html2canvas(document.getElementById("saccadeSpeedChart")));
                        // p.push(html2canvas(document.getElementById("saccadeFEChart")));
                        let canvsArr = await Promise.all(p);


                        const saccadeGradeChart_base64 = canvsArr[0].toDataURL();
                        const saccadeRadarChart_base64 = canvsArr[1].toDataURL();
                        const saccadeDirectionChart_base64 = canvsArr[2].toDataURL();
                        const saccadeRealChart_base64 = canvsArr[3].toDataURL();
                        // console.log("saccadeDirectionChart_base64",saccadeDirectionChart_base64);
                        // const saccadeLatencyChart_base64=canvsArr[1].toDataURL();
                        // const saccadeSpeedChart_base64=canvsArr[2].toDataURL();
                        // const saccadeFEChart_base64=canvsArr[3].toDataURL();
                        //

                        //

                        //스샷 + 타이틀테이블
                        docDefinition.content.push({
                            name: '도약안구운동 1줄 파랑메뉴',
                            margin: [5, 5, 5, 5],

                            table: {
                                dontBreakRows: true,
                                widths: ['33%', '1%', '65%'],
                                headerRows: 0,
                                body: [

                                    [
                                        {
                                            margin: [0, 3, 0, 0],
                                            text: '도약안구운동 점수 분포',
                                            fontSize: 11,
                                            bold: true,
                                            border: [true, true, true, false],
                                            alignment: 'center',
                                            fillColor: '#1A408E',
                                            color: 'white',
                                            colSpan: 1,
                                        },
                                        {
                                            text: '',
                                            colSpan: 1,
                                            border: [false, false, false, false]
                                        },
                                        {
                                            text: '',
                                            colSpan: 1,
                                            // rowSpan:2,
                                            border: [false, false, false, true],
                                            table: {
                                                widths: ['*', '*'],
                                                headerRows: 0,

                                                body: [
                                                    [{
                                                        margin: [3, 0, 3, 0],
                                                        fontSize: 11,
                                                        text: "도약안구운동 (saccade)은 무엇인가요?", alignment: 'left',
                                                        colSpan: 2,
                                                        bold: true,
                                                    }
                                                    ],

                                                ],

                                            },
                                            layout: 'titletable'
                                        },
                                    ],
                                    [
                                        {
                                            image: saccadeGradeChart_base64,
                                            colSpan: 1,
                                            alignment: 'center',
                                            // text: '사진',
                                            fit: [165, 140],
                                            // width:'100%',
                                            margin: [0, 4, 0, 0],
                                            border: [true, false, true, true]
                                        },
                                        {
                                            text: '',
                                            border: [false, false, false, false],

                                            colSpan: 1,
                                        },

                                        {
                                            fontSize: 10,
                                            margin: [10, 10, 10, 10],
                                            lineHeight: 1.6,
                                            ul: [
                                                "글을 읽는 동안 시선은 끊임없이 빠르게 이동(saccade, 도약이동)하며 글자에 고정(fixation, 응시)하는 것을 반복합니다. 글을 유창하게 읽기 위해서는 정확한 위치에 눈을 빠르고 정확한 위치로 옮기고, 안정적으로 시선을 유지하는 운동제어 능력이 필요합니다. 시력 저하, 피로, 집중력 부족, 안구진탕증 및 각종 신경계 이상 등의 이유로 도약안구운동에 문제가 생길 수 있으며, 이 능력이 저하되면 글을 유창하게 읽는데 방해가 될 수 있습니다. ",
                                                // { text: 'Item 4', bold: true },
                                            ],
                                            colSpan: 1,
                                            border: [false, false, false, false],
                                        },



                                    ]
                                ]

                            },
                            layout: 'showline'

                        });

                        //파랑테이블 radar 3개
                        docDefinition.content.push({
                            name: '도약안구운동 1줄 파랑메뉴',
                            margin: [5, 5, 5, 5],
                            table: {
                                dontBreakRows: true,
                                widths: ['100%'],
                                headerRows: 0,
                                body: [

                                    [
                                        {
                                            margin: [0, 3, 0, 0],
                                            text: '도약안구운동 점수 분포',
                                            fontSize: 11,
                                            bold: true,
                                            border: [true, true, true, false],
                                            alignment: 'center',
                                            fillColor: '#1A408E',
                                            color: 'white',
                                            colSpan: 1,
                                        },
                                    ],
                                    [
                                        {
                                            image: saccadeRadarChart_base64,
                                            colSpan: 1,
                                            alignment: 'center',
                                            // text: '사진',
                                            fit: [635, 152],
                                            // width:'100%',
                                            margin: [0, 0, 0, 0],
                                            border: [true, false, true, true]

                                        },

                                    ]
                                ]

                            },
                            layout: 'showline'

                        });


                        //타이틀테입믈2번
                        docDefinition.content.push({
                            name: '두번째 타이틀테이블',
                            margin: [5, 10, 5, 0],

                            table: {
                                widths: ['*', '*'],
                                headerRows: 0,

                                body: [
                                    [{
                                        margin: [3, 0, 3, 0],
                                        fontSize: 11,
                                        text: "어느정도가 적당한가요?", alignment: 'left',
                                        colSpan: 2,
                                        bold: true,
                                    }
                                    ],
                                    [
                                        {
                                            fontSize: 10,
                                            margin: [10, 10, 10, 10],
                                            lineHeight: 1.6,
                                            ul: [
                                                "지연시간 (latency time) : 시각 자극물을 발견한 뒤, 목표를 향해 시선이 출발할 때까지 걸리는 시간입니다. 반응처리 및 운동능력이 우수할수록 짧으며, 대체로 150ms ~ 250ms정도입니다.",
                                                "시선이동속도 (saccade speed) : 시선이 목표를 향해 이동할 때, 목표에 다다를 때까지의 속도입니다. 운동제어능력이 우수할수록 속도가 빠르며, 이동할 거리가 가까울수록 속도는 느려집니다. 대체로 50도/초~200도/초 정도입니다.",
                                                "응시안정성 (fixation stability) : 대상을 응시할 때, 시선이 얼마나 안정적으로 유지하는지를 측정한 척도입니다. 목표위치로부터의 2초간 시선위치 편차로 측정합니다. 집중력이 강하고 운동제어능력이 우수할수록 편차가 작으며, 대체로 0.5도 내외입니다."
                                            ],
                                            colSpan: 2
                                        },

                                    ],
                                ],

                            },
                            layout: 'titletable'
                        });
                        //타이틀테입믈3번
                        docDefinition.content.push({
                            name: '두번째 타이틀테이블',
                            margin: [5, 5, 5, 0],
                            pageBreak: 'after',
                            table: {
                                widths: ['*', '*'],
                                headerRows: 0,

                                body: [
                                    [{
                                        margin: [3, 0, 3, 0],
                                        fontSize: 11,
                                        text: "어떻게 개선할 수 있나요?", alignment: 'left',
                                        colSpan: 2,
                                        bold: true,
                                    }
                                    ],
                                    [
                                        {
                                            fontSize: 10,
                                            margin: [10, 10, 10, 10],
                                            lineHeight: 1.6,
                                            ul: [
                                                "즉각적 피드백이 있는 추적안구운동 훈련을 합니다.",
                                            ],
                                            colSpan: 2
                                        },

                                    ],
                                ],

                            },
                            layout: 'titletable'
                        });



                        /////2번째 page
                        ///////2번째ㅑ 테이블
                        //스샷테이블 큰사진 + 옆에 추가할 설명
                        docDefinition.content.push({
                            name: '도약안구운동 1줄 파랑메뉴',
                            margin: [5, 35, 5, 5],

                            table: {
                                dontBreakRows: true,
                                widths: ['60%', '1%', '39%'],
                                headerRows: 0,
                                body: [
                                    [
                                        {
                                            text: '',
                                            border: [false, false, false, false]
                                        },
                                        {
                                            text: '',
                                            border: [false, false, false, false]
                                        },
                                        {
                                            text: '',
                                            border: [false, false, false, false]
                                        }
                                    ],
                                    [

                                        {
                                            text: '도약 안구운동 시선궤적',
                                            fontSize: 11,
                                            bold: true,
                                            border: [true, true, true, false],
                                            alignment: 'center',
                                            fillColor: '#1A408E',
                                            color: 'white',
                                            colSpan: 1,
                                            margin: [0, 3, 0, 0],
                                        },
                                        {
                                            text: '',
                                            colSpan: 1,
                                            border: [false, false, false, false]
                                        },
                                        {
                                            text: '',
                                            colSpan: 1,
                                            // rowSpan:2,
                                            border: [false, false, false, true],
                                            table: {
                                                widths: ['*', '*'],
                                                headerRows: 0,

                                                body: [
                                                    [{
                                                        margin: [3, 0, 3, 0],
                                                        fontSize: 11,
                                                        text: "어떤질문을 쓰고", alignment: 'left',
                                                        colSpan: 2,
                                                        bold: true,
                                                    }
                                                    ],

                                                ],

                                            },
                                            layout: 'titletable'
                                        },
                                    ],
                                    [

                                        {
                                            margin: [0, 0, 0, 0],
                                            colSpan: 1,
                                            alignment: 'center',
                                            image: saccadeRealChart_base64,
                                            fit: [300, 273],
                                            border: [true, false, true, true]
                                        },
                                        {
                                            text: '',
                                            border: [false, false, false, false],

                                            colSpan: 1,
                                        },
                                        {
                                            fontSize: 10,
                                            margin: [10, 10, 10, 10],
                                            lineHeight: 1.6,
                                            ul: [
                                                "여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요. ",
                                                // { text: 'Item 4', bold: true },
                                            ],
                                            colSpan: 1,
                                            border: [false, false, false, false],
                                        },

                                    ]
                                ]

                            },
                            layout: 'showline'

                        });
                        //4개짜리 방향별 분석
                        docDefinition.content.push({
                            pageBreak: isLast?null:'after',
                            name: '도약안구운동 1줄 파랑메뉴',
                            margin: [5, 20, 5, 5],

                            table: {
                                dontBreakRows: true,
                                widths: ['100%'],
                                headerRows: 0,
                                body: [
                                    [
                                        {
                                            text: '',
                                            border: [false, false, false, false]
                                        },

                                    ],
                                    [

                                        {
                                            text: '도약 안구운동 시선',
                                            fontSize: 11,
                                            bold: true,
                                            border: [true, true, true, false],
                                            alignment: 'center',
                                            fillColor: '#1A408E',
                                            color: 'white',
                                            colSpan: 1,
                                            margin: [0, 3, 0, 0],
                                        },


                                    ],
                                    [

                                        {
                                            margin: [0, 0, 0, 0],
                                            colSpan: 1,
                                            alignment: 'center',
                                            image: saccadeDirectionChart_base64,
                                            fit: [600, 205],
                                            border: [true, false, true, true]
                                        },

                                    ]
                                ]

                            },
                            layout: 'showline'

                        });

                        set_isfinishThisPage(true);
                    }
                    else if (pageType === 'pursuit') {

                        //pursuitGradeChart
                        let p = [];
                        p.push(html2canvas(document.getElementById("pursuitGradeChart")));
                        p.push(html2canvas(document.getElementById("pursuitErrChart")));
                        p.push(html2canvas(document.getElementById("pursuitDirectionChart")));
                        p.push(html2canvas(document.getElementById("pursuitRealChart")));
                        let canvsArr = await Promise.all(p);
                        const pursuitGradeChart_base64 = canvsArr[0].toDataURL();
                        const pursuitErrChart_base64 = canvsArr[1].toDataURL();
                        const pursuitDirectionChart_base64 = canvsArr[2].toDataURL();
                        const pursuitRealChart_base64 = canvsArr[3].toDataURL();

                        //스샷2개
                        docDefinition.content.push({
                            name: '추적안구운동점수와 설명',
                            margin: [5, 5, 5, 5],

                            table: {
                                dontBreakRows: true,
                                widths: ['40%', '1%', '59%'],
                                headerRows: 0,
                                body: [

                                    [
                                        {
                                            margin: [0, 3, 0, 0],
                                            text: '추적안구운동 점수 분포',
                                            fontSize: 11,
                                            bold: true,
                                            border: [true, true, true, false],
                                            alignment: 'center',
                                            fillColor: '#1A408E',
                                            color: 'white',
                                            colSpan: 1,
                                        },
                                        {
                                            text: '',
                                            colSpan: 1,
                                            border: [false, false, false, false]
                                        },
                                        {
                                            margin: [0, 3, 0, 0],
                                            text: '추적안구운동 점수 분포',
                                            fontSize: 11,
                                            bold: true,
                                            border: [true, true, true, false],
                                            alignment: 'center',
                                            fillColor: '#1A408E',
                                            color: 'white',
                                            colSpan: 1,
                                        },
                                    ],
                                    [
                                        {
                                            image: pursuitGradeChart_base64,
                                            colSpan: 1,
                                            alignment: 'center',
                                            // text: '사진',
                                            fit: [183, 157],
                                            // width:'100%',
                                            margin: [0, 20, 0, 0],
                                            border: [true, false, true, true]
                                        },
                                        {
                                            text: '',
                                            border: [false, false, false, false],

                                            colSpan: 1,
                                        },

                                        {
                                            image: pursuitErrChart_base64,
                                            colSpan: 1,
                                            alignment: 'center',
                                            // text: '사진',
                                            fit: [285, 260],
                                            // width:'100%',
                                            margin: [0, 0, 0, 0],
                                            border: [true, false, true, true]
                                        },



                                    ]
                                ]

                            },
                            layout: 'showline'

                        });

                        //설명1
                        docDefinition.content.push({
                            name: '두번째 타이틀테이블',
                            margin: [5, 10, 5, 0],

                            table: {
                                widths: ['*', '*'],
                                headerRows: 0,

                                body: [
                                    [{
                                        margin: [3, 0, 3, 0],
                                        fontSize: 11,
                                        text: "추적안구운동 (pursuit)은 무엇인가요?", alignment: 'left',
                                        colSpan: 2,
                                        bold: true,
                                    }
                                    ],
                                    [
                                        {
                                            fontSize: 10,
                                            margin: [10, 10, 10, 10],
                                            lineHeight: 1.6,
                                            ul: [
                                                "추적안구운동(pursuit)은 천천히 움직이는 대상을 따라 부드럽고 연속적으로 시선을 움직이는 것입니다. 일반적으로 시선은 빠르게 점프하며 움직이며, 부드럽게 추적하는 추적안구운동은 어려운 기술이기 때문에, 영장류나 고양이 정도의 고등동물에게서 나타나는 능력입니다. 추적안구운동은 보통 노화에 의해 저하되지만, 시력 저하나 안진(안구 진탕)  및 각종 신경계 이상으로 인해 나타나기도 합니다. ",
                                                "추적안구운동은 글을 읽을 때 직접적으로 사용되지는 않지만, 안구운동을 정교하게 통제할 수 있는 능력이기 때문에, 이 능력이 부족하면 전반적인 안구운동이 저하되었을 가능성이 있습니다. ",
                                            ],
                                            colSpan: 2
                                        },

                                    ],
                                ],

                            },
                            layout: 'titletable'
                        });
                        docDefinition.content.push({
                            name: '설명2',
                            margin: [5, 10, 5, 0],

                            table: {
                                widths: ['*', '*'],
                                headerRows: 0,

                                body: [
                                    [{
                                        margin: [3, 0, 3, 0],
                                        fontSize: 11,
                                        text: "어느 정도가 적당한가요?", alignment: 'left',
                                        colSpan: 2,
                                        bold: true,
                                    }
                                    ],
                                    [
                                        {
                                            fontSize: 10,
                                            margin: [10, 10, 10, 10],
                                            lineHeight: 1.6,
                                            ul: [
                                                "위치편차는 평균 **도, 도약안구운동 발생률은 5% 이하입니다. "
                                            ],
                                            colSpan: 2
                                        },

                                    ],
                                ],

                            },
                            layout: 'titletable'
                        });
                        docDefinition.content.push({
                            pageBreak: 'after',
                            name: '설명2',
                            margin: [5, 10, 5, 0],

                            table: {
                                widths: ['*', '*'],
                                headerRows: 0,

                                body: [
                                    [{
                                        margin: [3, 0, 3, 0],
                                        fontSize: 11,
                                        text: "어떻게 개선할 수 있나요?", alignment: 'left',
                                        colSpan: 2,
                                        bold: true,
                                    }
                                    ],
                                    [
                                        {
                                            fontSize: 10,
                                            margin: [10, 10, 10, 10],
                                            lineHeight: 1.6,
                                            ul: [
                                                "즉각적 피드백이 있는 추적안구운동 훈련을 합니다. ",
                                                "집중력을 기릅니다. "
                                            ],
                                            colSpan: 2
                                        },

                                    ],
                                ],

                            },
                            layout: 'titletable'
                        });

                        //2페이지 시작
                        docDefinition.content.push({
                            name: '도약안구운동 1줄 파랑메뉴',
                            margin: [5, 35, 5, 5],

                            table: {
                                dontBreakRows: true,
                                widths: ['60%', '1%', '39%'],
                                headerRows: 0,
                                body: [
                                    [
                                        {
                                            text: '',
                                            border: [false, false, false, false]
                                        },
                                        {
                                            text: '',
                                            border: [false, false, false, false]
                                        },
                                        {
                                            text: '',
                                            border: [false, false, false, false]
                                        }
                                    ],
                                    [

                                        {
                                            text: '추적 안구운동 시선궤적',
                                            fontSize: 11,
                                            bold: true,
                                            border: [true, true, true, false],
                                            alignment: 'center',
                                            fillColor: '#1A408E',
                                            color: 'white',
                                            colSpan: 1,
                                            margin: [0, 3, 0, 0],
                                        },
                                        {
                                            text: '',
                                            colSpan: 1,
                                            border: [false, false, false, false]
                                        },
                                        {
                                            text: '',
                                            colSpan: 1,
                                            // rowSpan:2,
                                            border: [false, false, false, true],
                                            table: {
                                                widths: ['*', '*'],
                                                headerRows: 0,

                                                body: [
                                                    [{
                                                        margin: [3, 0, 3, 0],
                                                        fontSize: 11,
                                                        text: "어떤질문을 쓰고", alignment: 'left',
                                                        colSpan: 2,
                                                        bold: true,
                                                    }
                                                    ],

                                                ],

                                            },
                                            layout: 'titletable'
                                        },
                                    ],
                                    [

                                        {
                                            margin: [0, 0, 0, 0],
                                            colSpan: 1,
                                            alignment: 'center',
                                            image: pursuitRealChart_base64,
                                            fit: [300, 273],
                                            border: [true, false, true, true]
                                        },
                                        {
                                            text: '',
                                            border: [false, false, false, false],

                                            colSpan: 1,
                                        },
                                        {
                                            fontSize: 10,
                                            margin: [10, 10, 10, 10],
                                            lineHeight: 1.6,
                                            ul: [
                                                "여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요. ",
                                                // { text: 'Item 4', bold: true },
                                            ],
                                            colSpan: 1,
                                            border: [false, false, false, false],
                                        },

                                    ]
                                ]

                            },
                            layout: 'showline'

                        });
                        //4개짜리 방향별 분석
                        docDefinition.content.push({
                            pageBreak: isLast?null:'after',
                            name: '도약안구운동 1줄 파랑메뉴',
                            margin: [5, 20, 5, 5],

                            table: {
                                dontBreakRows: true,
                                widths: ['100%'],
                                headerRows: 0,
                                body: [
                                    [
                                        {
                                            text: '',
                                            border: [false, false, false, false]
                                        },

                                    ],
                                    [

                                        {
                                            text: '추적 안구운동 수평수직 시선',
                                            fontSize: 11,
                                            bold: true,
                                            border: [true, true, true, false],
                                            alignment: 'center',
                                            fillColor: '#1A408E',
                                            color: 'white',
                                            colSpan: 1,
                                            margin: [0, 3, 0, 0],
                                        },


                                    ],
                                    [

                                        {
                                            margin: [0, 0, 0, 0],
                                            colSpan: 1,
                                            alignment: 'center',
                                            image: pursuitDirectionChart_base64,
                                            fit: [600, 205],
                                            border: [true, false, true, true]
                                        },

                                    ]
                                ]

                            },
                            layout: 'showline'

                        });


                        set_isfinishThisPage(true);
                    }
                    else if (pageType === "antisaccade") {

                        //antisaccadeGradeChart
                        //#@!
                        let p = [];
                        p.push(html2canvas(document.getElementById("antisaccadeGradeChart")));
                        p.push(html2canvas(document.getElementById("antisaccadeErrDirectionChart")));
                        p.push(html2canvas(document.getElementById("antisaccadeLatencyChart")));
                        p.push(html2canvas(document.getElementById("antisaccadeDirectionChart")));
                        p.push(html2canvas(document.getElementById("antisaccadeRealChart")));
                        //antisaccadeErrDirectionChart
                        //antisaccadeLatencyChart
                        let canvsArr = await Promise.all(p);
                        const antisaccadeGradeChart_base64 = canvsArr[0].toDataURL();
                        const antisaccadeErrDirectionChart_base64 = canvsArr[1].toDataURL();
                        const antisaccadeLatencyChart_base64 = canvsArr[2].toDataURL();
                        const antisaccadeDirectionChart_base64 = canvsArr[3].toDataURL();
                        const antisaccadeRealChart_base64 = canvsArr[4].toDataURL();

                        //스샷3개
                        docDefinition.content.push({
                            name: '추적안구운동점수와 설명',
                            margin: [5, 5, 5, 5],

                            table: {
                                dontBreakRows: true,
                                widths: ['32%', '1%', '33%', '1%', '33%'],
                                headerRows: 0,
                                body: [

                                    [
                                        {
                                            margin: [0, 3, 0, 0],
                                            text: '반대로보기 점수 분포',
                                            fontSize: 11,
                                            bold: true,
                                            border: [true, true, true, false],
                                            alignment: 'center',
                                            fillColor: '#1A408E',
                                            color: 'white',
                                            colSpan: 1,
                                        },
                                        {
                                            text: '',
                                            colSpan: 1,
                                            border: [false, false, false, false]
                                        },
                                        {
                                            margin: [0, 3, 0, 0],
                                            text: '이동방향 오류',
                                            fontSize: 11,
                                            bold: true,
                                            border: [true, true, true, false],
                                            alignment: 'center',
                                            fillColor: '#1A408E',
                                            color: 'white',
                                            colSpan: 1,
                                        },
                                        {
                                            text: '',
                                            colSpan: 1,
                                            border: [false, false, false, false]
                                        },
                                        {
                                            margin: [0, 3, 0, 0],
                                            text: '평균 지체시간',
                                            fontSize: 11,
                                            bold: true,
                                            border: [true, true, true, false],
                                            alignment: 'center',
                                            fillColor: '#1A408E',
                                            color: 'white',
                                            colSpan: 1,
                                        },
                                    ],
                                    [
                                        {
                                            image: antisaccadeGradeChart_base64,
                                            colSpan: 1,
                                            alignment: 'center',
                                            // text: '사진',
                                            fit: [183, 117],
                                            // width:'100%',
                                            margin: [0, 20, 0, 0],
                                            border: [true, false, true, true]
                                        },
                                        {
                                            text: '',
                                            border: [false, false, false, false],

                                            colSpan: 1,
                                        },

                                        {
                                            image: antisaccadeErrDirectionChart_base64,
                                            colSpan: 1,
                                            alignment: 'center',
                                            // text: '사진',
                                            fit: [285, 90],
                                            // width:'100%',
                                            margin: [0, 30, 0, 0],
                                            border: [true, false, true, true]
                                        },
                                        {
                                            text: '',
                                            border: [false, false, false, false],

                                            colSpan: 1,
                                        },

                                        {
                                            image: antisaccadeLatencyChart_base64,
                                            colSpan: 1,
                                            alignment: 'center',
                                            // text: '사진',
                                            fit: [285, 90],
                                            // width:'100%',
                                            margin: [0, 30, 0, 0],
                                            border: [true, false, true, true]
                                        },

                                    ]
                                ]

                            },
                            layout: 'showline'

                        });

                        //설명1,2,3
                        docDefinition.content.push({
                            name: '두번째 타이틀테이블',
                            margin: [5, 10, 5, 0],

                            table: {
                                widths: ['*', '*'],
                                headerRows: 0,

                                body: [
                                    [{
                                        margin: [3, 0, 3, 0],
                                        fontSize: 11,
                                        text: "반대로 보기 (anti - saccade)은 무엇인가요?", alignment: 'left',
                                        colSpan: 2,
                                        bold: true,
                                    }
                                    ],
                                    [
                                        {
                                            fontSize: 10,
                                            margin: [10, 10, 10, 10],
                                            lineHeight: 1.6,
                                            ul: [
                                                "반대로 보기는 지각된 사물을 자동적으로 바라보는 것을 통제하는 능력을 측정합니다. ",
                                                "따라보기(pro saccade)과제는 지각된 대상을 바라보는 과제이고, 반대로 보기(anti saccade)과제는 지각된 대상을 보지 않고 반대로 시선을 이동하는 과제입니다. 무언가 보이면 반사적으로 시선이 가려는 경향이 있기 때문에, 지각에 대한 행동을 통제하는 능력이나 집중력이 낮으면 반대보기 과제를 하기 어렵습니다. 집중력 저하, 난독증, ADHD 등의 증상과 관련이 있는 경우가 있습니다. ",
                                            ],
                                            colSpan: 2
                                        },

                                    ],
                                ],

                            },
                            layout: 'titletable'
                        });
                        docDefinition.content.push({
                            name: '두번째 타이틀테이블',
                            margin: [5, 10, 5, 0],

                            table: {
                                widths: ['*', '*'],
                                headerRows: 0,

                                body: [
                                    [{
                                        margin: [3, 0, 3, 0],
                                        fontSize: 11,
                                        text: "어느 정도가 적당한가요?", alignment: 'left',
                                        colSpan: 2,
                                        bold: true,
                                    }
                                    ],
                                    [
                                        {
                                            fontSize: 10,
                                            margin: [10, 10, 10, 10],
                                            lineHeight: 1.6,
                                            ul: [
                                                "방향 정확성 : 따라보기는 대상이 있는 쪽으로, 반대보기는 대상의 반대쪽으로 시선이 움직였는지를 측정한 비율입니다. 반대보기의 정확도가 높은 것이 바람직하며, 대체로 85% 이상입니다. ",
                                                "지체시간(latency) : 대상을 보고 시선을 움직이기 전까지 소요되는 시간입니다. 보통 반대로보기시 따라보기보다 더 오래 걸리며,  300ms 이하인 것이 좋습니다. ",
                                            ],
                                            colSpan: 2
                                        },

                                    ],
                                ],

                            },
                            layout: 'titletable'
                        });
                        docDefinition.content.push({
                            pageBreak: 'after',
                            name: '설명2',
                            margin: [5, 10, 5, 0],

                            table: {
                                widths: ['*', '*'],
                                headerRows: 0,

                                body: [
                                    [{
                                        margin: [3, 0, 3, 0],
                                        fontSize: 11,
                                        text: "어떻게 개선할 수 있나요?", alignment: 'left',
                                        colSpan: 2,
                                        bold: true,
                                    }
                                    ],
                                    [
                                        {
                                            fontSize: 10,
                                            margin: [10, 10, 10, 10],
                                            lineHeight: 1.6,
                                            ul: [
                                                "즉각적 피드백이 있는 반대로 보기 훈련을 합니다. ",
                                                "집중력을 기릅니다. "
                                            ],
                                            colSpan: 2
                                        },

                                    ],
                                ],

                            },
                            layout: 'titletable'
                        });

                        //2페이지
                        docDefinition.content.push({
                            name: '도약안구운동 1줄 파랑메뉴',
                            margin: [5, 35, 5, 5],

                            table: {
                                dontBreakRows: true,
                                widths: ['60%', '1%', '39%'],
                                headerRows: 0,
                                body: [
                                    [
                                        {
                                            text: '',
                                            border: [false, false, false, false]
                                        },
                                        {
                                            text: '',
                                            border: [false, false, false, false]
                                        },
                                        {
                                            text: '',
                                            border: [false, false, false, false]
                                        }
                                    ],
                                    [

                                        {
                                            text: '반대로 보기 시선궤적',
                                            fontSize: 11,
                                            bold: true,
                                            border: [true, true, true, false],
                                            alignment: 'center',
                                            fillColor: '#1A408E',
                                            color: 'white',
                                            colSpan: 1,
                                            margin: [0, 3, 0, 0],
                                        },
                                        {
                                            text: '',
                                            colSpan: 1,
                                            border: [false, false, false, false]
                                        },
                                        {
                                            text: '',
                                            colSpan: 1,
                                            // rowSpan:2,
                                            border: [false, false, false, true],
                                            table: {
                                                widths: ['*', '*'],
                                                headerRows: 0,

                                                body: [
                                                    [{
                                                        margin: [3, 0, 3, 0],
                                                        fontSize: 11,
                                                        text: "어떤질문을 쓰고", alignment: 'left',
                                                        colSpan: 2,
                                                        bold: true,
                                                    }
                                                    ],

                                                ],

                                            },
                                            layout: 'titletable'
                                        },
                                    ],
                                    [

                                        {
                                            margin: [0, 0, 0, 0],
                                            colSpan: 1,
                                            alignment: 'center',
                                            image: antisaccadeRealChart_base64,
                                            fit: [300, 273],
                                            border: [true, false, true, true]
                                        },
                                        {
                                            text: '',
                                            border: [false, false, false, false],

                                            colSpan: 1,
                                        },
                                        {
                                            fontSize: 10,
                                            margin: [10, 10, 10, 10],
                                            lineHeight: 1.6,
                                            ul: [
                                                "여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요. ",
                                                // { text: 'Item 4', bold: true },
                                            ],
                                            colSpan: 1,
                                            border: [false, false, false, false],
                                        },

                                    ]
                                ]

                            },
                            layout: 'showline'

                        });
                        //4개짜리 방향별 분석
                        docDefinition.content.push({
                            pageBreak: isLast?null:'after',
                            name: '도약안구운동 1줄 파랑메뉴',
                            margin: [5, 20, 5, 5],

                            table: {
                                dontBreakRows: true,
                                widths: ['100%'],
                                headerRows: 0,
                                body: [
                                    [
                                        {
                                            text: '',
                                            border: [false, false, false, false]
                                        },

                                    ],
                                    [

                                        {
                                            text: '도약 안구운동 시선',
                                            fontSize: 11,
                                            bold: true,
                                            border: [true, true, true, false],
                                            alignment: 'center',
                                            fillColor: '#1A408E',
                                            color: 'white',
                                            colSpan: 1,
                                            margin: [0, 3, 0, 0],
                                        },


                                    ],
                                    [

                                        {
                                            margin: [0, 0, 0, 0],
                                            colSpan: 1,
                                            alignment: 'center',
                                            image: antisaccadeDirectionChart_base64,
                                            fit: [600, 205],
                                            border: [true, false, true, true]
                                        },

                                    ]
                                ]

                            },
                            layout: 'showline'

                        });
                        set_isfinishThisPage(true);
                    }
                    else {
                        set_isfinishThisPage(true);
                    }
                }
            }
        }
        doit();

    }, [isPDFing, selDataIndex, progressMax, docDefinition, isfinishThisPage, dataArr
        , resultInform, userInform, myPercentArr, myStateArr, targetGroupData])


    React.useEffect(() => {
        if (isPDFing === 'exit') {
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);

            pdfDocGenerator.getBlob((blob) => {
                // console.log(blob);
                set_isPDFing(null);
                set_progressNow(null);
                set_PDFURL(URL.createObjectURL(blob));
                console.log("보고서 변환종료!");
                set_docDefinition(null);
            });
            // let downloadfilename ;
            // //Agency_클래스_사용자이름(아이디)_날짜시간.pdf

            // downloadfilename=`${userinform.agencyName}_${userinform.testeeClass?userinform.testeeClass:'클래스'}_[${userinform.testeeName}(${userinform.testeeID})]_${moment(textSetResultsData[0].savetime).format("YYYY년MM월DD일HH시mm분ss초")+'.pdf'}`;


            // pdfDocGenerator.download(downloadfilename);
        }
    }, [isPDFing, docDefinition])

    return (<div className="ScreeningViewer">
        <div className="contents">
            <div className="leftbar no-drag">
                {dataArr && dataArr.map((data, index) => {
                    // console.log(data);
                    let cn = "oneLeftBarList"
                    // console.log("selDataIndex",selDataIndex,index);

                    if (selDataIndex === index) {
                        cn += " selected"
                    }
                    return (<div className={cn} key={"onLeftBar" + index}
                        onClick={() => { set_selDataIndex(index) }}>
                        {data.screeningType}
                    </div>)
                })}
                {dataArr && selDataIndex !== null &&
                    (() => {
                        let cn = "oneLeftBarList";

                        if (selDataIndex === dataArr.length) {
                            cn += " selected"
                        }

                        return (<div className={cn} style={{ marginTop: '10px' }} key={"oneLeftBar" + (dataArr.length)}
                            onClick={() => {
                                set_selDataIndex(dataArr.length)
                            }}>
                            보고서 다운로드
                        </div>)
                    })()
                }

                <div className="oneLeftBarList" style={{ marginTop: '5px' }} onClick={onClose} >
                    나가기
                </div>
            </div>
            <div className="rightContents">
                {selScreeningType === 'saccade' && targetGroupData &&
                    <SaccadeView data={dataArr[selDataIndex]} targetGroupData={targetGroupData} everyGroupData={everyGroupData} />
                }
                {selScreeningType === 'pursuit' &&
                    <PursuitView data={dataArr[selDataIndex]} targetGroupData={targetGroupData} everyGroupData={everyGroupData} />
                }
                {selScreeningType === 'antisaccade' &&
                    <AntiSaccadeView data={dataArr[selDataIndex]} targetGroupData={targetGroupData} everyGroupData={everyGroupData} />
                }
                {selScreeningType === "보고서 다운로드" &&
                    <DownLoadPDF dataArr={dataArr}
                        handlePDFstart={handlePDFstart}
                        iframesrc={PDFURL}
                        targetGroupData={targetGroupData} everyGroupData={everyGroupData}
                    />
                }
            </div>
        </div>
    </div>)
}


const SaccadeView = ({ ...props }) => {
    const { data, targetGroupData, everyGroupData } = props;

    const radarChartOption = React.useMemo(() => {
        return {
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        return null;
                        //return value !== 0 ? value.toLocaleString(/* ... */) : ''
                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#000000'
                },
            },
            maintainAspectRatio: false,
            responsive: true,
            devicePixelRatio: window.devicePixelRatio * 3,
            animation: {
                duration: 0,
            },
            layout: {
                padding: 0
            },
            scale: {
                // r: {
                //     angleLines: {
                //         display: false
                //     },
                //     suggestedMin: 50,
                //     suggestedMax: 100
                // }
                // angleLines: {
                //     color: "rgba(0, 0, 0, 0.3)"
                // },
                ticks: {
                    fontSize: 10,
                    stepSize: 100,
                    beginAtZero: true,
                    min: 0,
                },
                pointLabels: { fontSize: 14, weight: '700' } //left,right,down,up
            },
            legend: {
                // display:false,
                position: 'top',
                labels: {
                    boxWidth: 10,
                    fontSize: 12,
                    fontStyle: "bold",
                }
            },
        }
    }, []);

    const radarChartOption2 = React.useMemo(() => {
        return {
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        return null;
                        //return value !== 0 ? value.toLocaleString(/* ... */) : ''
                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#000000'
                },
            },
            animation: {
                duration: 0,
            },
            maintainAspectRatio: false,
            responsive: true,
            devicePixelRatio: window.devicePixelRatio * 3,
            layout: {
                padding: 0
            },
            scale: {
                // r: {
                //     angleLines: {
                //         display: false
                //     },
                //     suggestedMin: 50,
                //     suggestedMax: 100
                // }
                // angleLines: {
                //     color: "rgba(0, 0, 0, 0.3)"
                // },
                ticks: {
                    fontSize: 10,
                    // stepSize: 0.01,
                    beginAtZero: true,
                    min: 0,
                },
                pointLabels: { fontSize: 14, weight: '700' } //left,right,down,up
            },
            legend: {
                // display:false,
                position: 'top',
                labels: {
                    boxWidth: 10,
                    fontSize: 12,
                    fontStyle: "bold",
                }
            },
        }
    }, []);


    const taskArr = React.useMemo(() => {

        const MONITOR_PX_PER_CM = data.monitorInform.MONITOR_PX_PER_CM;
        const pixel_per_cm = data.monitorInform.MONITOR_PX_PER_CM; //1cm 당 pixel
        const degree_per_cm = Math.atan(1 / data.defaultZ) * 180 / Math.PI;
        const w = data.screenW;
        const h = data.screenH;

        const screeningObjectList = data.screeningObjectList;


        let taskArr = {
            top: [],
            bottom: [],
            left: [],
            right: []
        };
        for (let i = 0; i < screeningObjectList.length; i++) {

            taskArr[screeningObjectList[i].analysis.direction].push({
                ...screeningObjectList[i],
                gazeData: data.taskArr[i],
                analysis: data.analysisArr[i]
            });
        }


        for (let key in taskArr) {

            for (let i = 0; i < taskArr[key].length; i++) {
                const task = taskArr[key][i];

                const type = task.type;
                let gazeArr = task.gazeData;

                let blink_arr = get_blink_arr(gazeArr);
                task.blinkArr = blink_arr;

                // % 로되어있는걸 degree 로 변환작업, 중점이 0,0 x,y degree
                for (let j = 0; j < gazeArr.length; j++) {
                    let target_pixels = {
                        x: null,
                        y: null,
                    };
                    if (type === "teleport") {
                        //2~5 고정임

                        if (gazeArr[j].relTime * 1 < task.startWaitTime * 1) {
                            target_pixels.x = task.startCoord.x - w / 2;
                            target_pixels.y = task.startCoord.y - h / 2;
                        } else if (gazeArr[j].relTime * 1 < task.duration * 1 + task.startWaitTime * 1) {
                            target_pixels.x = task.endCoord.x - w / 2;
                            target_pixels.y = task.endCoord.y - h / 2;
                        } else {
                            if (task.isReturn) {
                                target_pixels.x = task.startCoord.x - w / 2;
                                target_pixels.y = task.startCoord.y - h / 2;
                            } else {
                                target_pixels.x = task.endCoord.x - w / 2;
                                target_pixels.y = task.endCoord.y - h / 2;
                            }
                        }
                        let target_xcm = target_pixels.x / pixel_per_cm;
                        let target_ycm = target_pixels.y / pixel_per_cm;
                        let target_xdegree = target_xcm * degree_per_cm;
                        let target_ydegree = target_ycm * degree_per_cm;
                        gazeArr[j].target_xdegree = target_xdegree;
                        gazeArr[j].target_ydegree = target_ydegree;
                    } else if (type === "circular") {
                        const radian = Math.PI / 180;
                        const radius = task.radius;

                        if (gazeArr[j].relTime * 1 < task.startWaitTime) {
                            const cosTheta = Math.cos(task.startDegree * radian);
                            const sineTheta = Math.sin(task.startDegree * radian);
                            target_pixels.x = task.centerCoord.x + radius * cosTheta * MONITOR_PX_PER_CM - w / 2;
                            target_pixels.y = task.centerCoord.y - radius * sineTheta * MONITOR_PX_PER_CM - h / 2;
                        } else if (gazeArr[j].relTime * 1 < task.duration * 1 + task.startWaitTime * 1) {
                            let nowDegree = -(
                                ((task.startDegree - task.endDegree) * (gazeArr[j].relTime - task.startWaitTime)) / task.duration -
                                task.startDegree
                            );
                            const cosTheta = Math.cos(nowDegree * radian);
                            const sineTheta = Math.sin(nowDegree * radian);
                            target_pixels.x = task.centerCoord.x + radius * cosTheta * MONITOR_PX_PER_CM - w / 2;
                            target_pixels.y = task.centerCoord.y - radius * sineTheta * MONITOR_PX_PER_CM - h / 2;
                        } else {
                            const cosTheta = Math.cos(task.endDegree * radian);
                            const sineTheta = Math.sin(task.endDegree * radian);
                            target_pixels.x = task.centerCoord.x + radius * cosTheta * MONITOR_PX_PER_CM - w / 2;
                            target_pixels.y = task.centerCoord.y - radius * sineTheta * MONITOR_PX_PER_CM - h / 2;
                        }
                        let target_xcm = target_pixels.x / pixel_per_cm;
                        let target_ycm = target_pixels.y / pixel_per_cm;
                        let target_xdegree = target_xcm * degree_per_cm;
                        let target_ydegree = target_ycm * degree_per_cm;
                        gazeArr[j].target_xdegree = target_xdegree;
                        gazeArr[j].target_ydegree = target_ydegree;
                    }

                    if (gazeArr[j].RPOGV) {
                        let xpixel = (gazeArr[j].RPOGX - 0.5) * w;
                        let ypixel = (gazeArr[j].RPOGY - 0.5) * h;

                        let xcm = xpixel / pixel_per_cm;
                        let ycm = ypixel / pixel_per_cm;
                        let xdegree = xcm * degree_per_cm;
                        let ydegree = ycm * degree_per_cm;

                        gazeArr[j].xdegree = xdegree;
                        gazeArr[j].ydegree = ydegree;
                    } else {
                        gazeArr[j].xdegree = null;
                        gazeArr[j].ydegree = null;
                    }
                }
                // const startRelTime = task.startWaitTime - 1;
                // const endRelTime = task.relativeEndTime - task.endWaitTime-1.5;
                const startRelTime = task.startWaitTime - 0.5;
                const endRelTime = task.relativeEndTime - task.endWaitTime - 2;
                if (key === 'top' || key === 'bottom') {
                    let target_ydegreeChartArr = [];
                    let ydegreeChartArr = [];

                    for (let j = 0; j < gazeArr.length; j++) {
                        if (gazeArr[j].relTime >= startRelTime && gazeArr[j].relTime <= endRelTime) {
                            target_ydegreeChartArr.push({
                                x: (gazeArr[j].relTime - startRelTime) * 1000,
                                y: gazeArr[j].target_ydegree,
                            })
                            ydegreeChartArr.push({
                                x: (gazeArr[j].relTime - startRelTime) * 1000,
                                y: gazeArr[j].ydegree,
                            })



                        }



                    }

                    task.target_ydegreeChartArr = target_ydegreeChartArr;
                    task.ydegreeChartArr = ydegreeChartArr;
                }
                else {
                    //right || left
                    let target_xdegreeChartArr = [];
                    let xdegreeChartArr = [];

                    for (let j = 0; j < gazeArr.length; j++) {
                        if (gazeArr[j].relTime >= startRelTime && gazeArr[j].relTime <= endRelTime) {
                            target_xdegreeChartArr.push({
                                x: (gazeArr[j].relTime - startRelTime) * 1000,
                                y: gazeArr[j].target_xdegree,
                            })
                            xdegreeChartArr.push({
                                x: (gazeArr[j].relTime - startRelTime) * 1000,
                                y: gazeArr[j].xdegree,
                            })



                        }



                    }

                    task.target_xdegreeChartArr = target_xdegreeChartArr;
                    task.xdegreeChartArr = xdegreeChartArr;
                }


                let blkChartArr = [];
                for (let j = 0; j < task.blinkArr.length; j++) {
                    if (task.blinkArr[j].BLKS >= endRelTime) {
                        // console.log("찾음",task.blinkArr[j].BLKS)
                    }
                    else if (task.blinkArr[j].BLKS >= startRelTime && task.blinkArr[j].BLKS + task.blinkArr[j].BLKD >= endRelTime) {
                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS - startRelTime) * 1000,
                            y: 0
                        });
                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS - startRelTime) * 1000,
                            y: 1
                        })
                        blkChartArr.push({
                            x: endRelTime * 1000,
                            y: 1
                        })
                        blkChartArr.push({
                            x: endRelTime * 1000,
                            y: 0
                        })
                    }
                    else if ((task.blinkArr[j].BLKS - startRelTime) >= 0) {

                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS - startRelTime) * 1000,
                            y: 0
                        });
                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS - startRelTime) * 1000,
                            y: 1
                        })
                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) * 1000,
                            y: 1
                        })
                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) * 1000,
                            y: 0
                        })
                    }
                    else if ((task.blinkArr[j].BLKS - startRelTime) <= 0 && (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) >= 0) {
                        blkChartArr.push({
                            x: 0,
                            y: 0
                        });
                        blkChartArr.push({
                            x: 0,
                            y: 1
                        })
                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) * 1000,
                            y: 1
                        })
                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) * 1000,
                            y: 0
                        })
                    }
                }
                task.blkChartArr = blkChartArr;

                let latencyChart = {
                    s: (task.analysis.startTime - startRelTime) * 1000,
                    e: (task.analysis.endTime - startRelTime) * 1000,
                };


                task.latencyChart = latencyChart;
            }

        }

        // console.log("taskArr",taskArr);
        return taskArr;
    }, [data])


    const saccadeTopChartOption = React.useMemo(() => {
        let annotation = [];

        let topTaskArr = taskArr.top;
        for (let i = 0; i < topTaskArr.length; i++) {
            // console.log("topTaskArr[i",topTaskArr[i]);
            annotation.push({
                drawTime: "afterDatasetsDraw", // (default)
                type: "box",
                mode: "horizontal",
                yScaleID: "degree",
                xScaleID: "timeid",
                // value: '7.5',
                borderColor: i === 0 ? "rgba(255,0,0,0.7)" : "rgba(0,0,255,0.7)",
                backgroundColor: "transparent",
                borderWidth: 1,
                xMin: topTaskArr[i].latencyChart.s,
                xMax: topTaskArr[i].latencyChart.s,
                yMin: -10,
                yMax: 10
            });
            annotation.push({
                drawTime: "afterDatasetsDraw", // (default)
                type: "box",
                mode: "horizontal",
                yScaleID: "degree",
                xScaleID: "timeid",
                // value: '7.5',
                borderColor: i === 0 ? "rgba(255,0,0,0.7)" : "rgba(0,0,255,0.7)",
                backgroundColor: "transparent",
                borderWidth: 1,
                xMin: topTaskArr[i].latencyChart.e,
                xMax: topTaskArr[i].latencyChart.e,
                yMin: -10,
                yMax: 10
            });

        }


        //groupData

        annotation.push({
            drawTime: "beforeDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',


            // borderColor: 'rgba(0,0,0,0.2)',
            backgroundColor: "rgba(0,0,0,0.2)",
            borderWidth: 1,
            xMin: (0.5 + targetGroupData.avg_up_saccade_delay) * 1000,
            xMax: (0.5 + targetGroupData.avg_up_saccade_delay + 7.63 / targetGroupData.avg_up_saccade_speed) * 1000,
            yMin: -10,
            yMax: 10,
        });
        // annotation.push({
        //     drawTime: "afterDatasetsDraw", // (default)
        //     type: "box",
        //     mode: "horizontal",
        //     yScaleID: "degree",
        //     xScaleID: "timeid",
        //     // value: '7.5',
        //     borderColor: 'gray',
        //     backgroundColor: "transparent",
        //     borderWidth: 1,
        //     xMin:800,
        //     xMax:800,
        //     yMin: -10,
        //     yMax: 10
        // });
        //taskArr

        return {
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        return null;
                        //return value !== 0 ? value.toLocaleString(/* ... */) : ''
                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#000000'
                },
            },
            annotation: {
                events: ["click"],
                annotations: annotation,
            },
            maintainAspectRatio: false,
            devicePixelRatio: window.devicePixelRatio * 3,
            animation: {
                duration: 0,
            },
            tooltips: {
                callbacks: {

                    title: function (tooltipItem, data) {
                        return '';
                    }
                }
            },
            scales: {
                xAxes: [
                    {
                        id: "timeid",
                        display: true,       // 실제시간 임시로 true//
                        type: 'time',
                        time: {

                            unit: 'mything',

                            displayFormats: {
                                mything: 'ss.SSS'
                            },

                            ///////여기서조정해야함
                            // min: 0 * 1000,
                            // max: 1.5 * 1000,
                        },
                        //x축 숨기려면 이렇게
                        // gridLines: {
                        //     color: "rgba(0, 0, 0, 0)",
                        // },
                        scaleLabel: { /////////////////x축아래 라벨
                            display: false,
                            labelString: 'Time(s)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            source: 'data', //auto,data,labels
                            // autoSkip: true,
                            // maxRotation: 0,
                            // major: {
                            //   enabled: true
                            // },
                            // stepSize: 10,
                            callback: customCallbackXtick,
                            min: 0,
                            max: 1.5 * 1000
                        }
                    }
                ],
                yAxes: [
                    {
                        id: "degree",
                        position: 'left',
                        scaleLabel: { /////////////////x축아래 라벨
                            display: true,
                            labelString: 'Position(d)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            max: 10,
                            min: -10,

                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    },
                    {
                        id: "ax_blink",
                        stepSize: 1,
                        position: 'left',
                        // 오른쪽의 Fixation 옆 Blink축
                        display: false,
                        ticks: {
                            max: 1,
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }]
            },

        };
    }, [taskArr, targetGroupData]);

    const saccadeTopData = React.useMemo(() => {
        return {
            datasets: [
                { //targety
                    data: taskArr.top[0].target_ydegreeChartArr,
                    steppedLine: "before",
                    label: "targetV",
                    borderColor: "rgba(0,255,0,0.8)",//"#0000ff",
                    backgroundColor: 'rgba(0,255,0,0.8)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.top[0].ydegreeChartArr,
                    steppedLine: false,
                    label: "gazeV1",
                    borderColor: "rgba(255,0,0,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(255,0,0,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.top[1].ydegreeChartArr,
                    steppedLine: false,
                    label: "gazeV2",
                    borderColor: "rgba(0,0,255,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(0,0,255,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
            ],
        }
    }, [taskArr]);


    const saccadeBottomChartOption = React.useMemo(() => {
        let annotation = [];

        let bottomTaskArr = taskArr.bottom;

        for (let i = 0; i < bottomTaskArr.length; i++) {
            // console.log("bottomTaskArr",bottomTaskArr);
            annotation.push({
                drawTime: "afterDatasetsDraw", // (default)
                type: "box",
                mode: "horizontal",
                yScaleID: "degree",
                xScaleID: "timeid",
                // value: '7.5',
                borderColor: i === 0 ? "rgba(255,0,0,0.7)" : "rgba(0,0,255,0.7)",
                backgroundColor: "transparent",
                borderWidth: 1,
                xMin: bottomTaskArr[i].latencyChart.s,
                xMax: bottomTaskArr[i].latencyChart.s,
                yMin: -10,
                yMax: 10
            });
            annotation.push({
                drawTime: "afterDatasetsDraw", // (default)
                type: "box",
                mode: "horizontal",
                yScaleID: "degree",
                xScaleID: "timeid",
                // value: '7.5',
                borderColor: i === 0 ? "rgba(255,0,0,0.7)" : "rgba(0,0,255,0.7)",
                backgroundColor: "transparent",
                borderWidth: 1,
                xMin: bottomTaskArr[i].latencyChart.e,
                xMax: bottomTaskArr[i].latencyChart.e,
                yMin: -10,
                yMax: 10
            });

        }


        //groupData

        annotation.push({
            drawTime: "beforeDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',


            // borderColor: 'rgba(0,0,0,0.2)',
            backgroundColor: "rgba(0,0,0,0.2)",
            borderWidth: 1,
            xMin: (0.5 + targetGroupData.avg_down_saccade_delay) * 1000,
            xMax: (0.5 + targetGroupData.avg_down_saccade_delay + 7.63 / targetGroupData.avg_down_saccade_speed) * 1000,
            yMin: -10,
            yMax: 10,
        });

        return {
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        return null;
                        //return value !== 0 ? value.toLocaleString(/* ... */) : ''
                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#000000'
                },
            },
            annotation: {
                events: ["click"],
                annotations: annotation,
            },
            maintainAspectRatio: false,
            devicePixelRatio: window.devicePixelRatio * 3,
            animation: {
                duration: 0,
            },
            tooltips: {
                callbacks: {

                    title: function (tooltipItem, data) {
                        return '';
                    }
                }
            },
            scales: {
                xAxes: [
                    {
                        id: "timeid",
                        display: true,       // 실제시간 임시로 true//
                        type: 'time',
                        time: {

                            unit: 'mything',

                            displayFormats: {
                                mything: 'ss.SSS'
                            },

                            ///////여기서조정해야함
                            // min: 0 * 1000,
                            // max: 1.5 * 1000,
                        },
                        //x축 숨기려면 이렇게
                        // gridLines: {
                        //     color: "rgba(0, 0, 0, 0)",
                        // },
                        scaleLabel: { /////////////////x축아래 라벨
                            display: false,
                            labelString: 'Time(s)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            source: 'data', //auto,data,labels
                            // autoSkip: true,
                            // maxRotation: 0,
                            // major: {
                            //   enabled: true
                            // },
                            // stepSize: 10,
                            callback: customCallbackXtick,
                            min: 0,
                            max: 1.5 * 1000
                        }
                    }
                ],
                yAxes: [
                    {
                        id: "degree",
                        position: 'left',
                        scaleLabel: { /////////////////x축아래 라벨
                            display: true,
                            labelString: 'Position(d)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            max: 10,
                            min: -10,

                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    },
                    {
                        id: "ax_blink",
                        stepSize: 1,
                        position: 'left',
                        // 오른쪽의 Fixation 옆 Blink축
                        display: false,
                        ticks: {
                            max: 1,
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }]
            },

        };
    }, [taskArr, targetGroupData]);

    const saccadeBottomData = React.useMemo(() => {
        return {
            datasets: [
                { //targety
                    data: taskArr.bottom[0].target_ydegreeChartArr,
                    steppedLine: "before",
                    label: "targetV",
                    borderColor: "rgba(0,255,0,0.8)",//"#0000ff",
                    backgroundColor: 'rgba(0,255,0,0.8)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.bottom[0].ydegreeChartArr,
                    steppedLine: false,
                    label: "gazeV1",
                    borderColor: "rgba(255,0,0,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(255,0,0,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.bottom[1].ydegreeChartArr,
                    steppedLine: false,
                    label: "gazeV2",
                    borderColor: "rgba(0,0,255,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(0,0,255,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                }
            ],
        }
    }, [taskArr]);


    const saccadeRightChartOption = React.useMemo(() => {
        let annotation = [];

        let rightTaskArr = taskArr.right;

        for (let i = 0; i < rightTaskArr.length; i++) {
            // console.log("bottomTaskArr",bottomTaskArr);
            annotation.push({
                drawTime: "afterDatasetsDraw", // (default)
                type: "box",
                mode: "horizontal",
                yScaleID: "degree",
                xScaleID: "timeid",
                // value: '7.5',
                borderColor: i === 0 ? "rgba(255,0,0,0.7)" : "rgba(0,0,255,0.7)",
                backgroundColor: "transparent",
                borderWidth: 1,
                xMin: rightTaskArr[i].latencyChart.s,
                xMax: rightTaskArr[i].latencyChart.s,
                yMin: -10,
                yMax: 10
            });
            annotation.push({
                drawTime: "afterDatasetsDraw", // (default)
                type: "box",
                mode: "horizontal",
                yScaleID: "degree",
                xScaleID: "timeid",
                // value: '7.5',
                borderColor: i === 0 ? "rgba(255,0,0,0.7)" : "rgba(0,0,255,0.7)",
                backgroundColor: "transparent",
                borderWidth: 1,
                xMin: rightTaskArr[i].latencyChart.e,
                xMax: rightTaskArr[i].latencyChart.e,
                yMin: -10,
                yMax: 10
            });

        }


        //groupData

        annotation.push({
            drawTime: "beforeDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',


            // borderColor: 'rgba(0,0,0,0.2)',
            backgroundColor: "rgba(0,0,0,0.2)",
            borderWidth: 1,
            xMin: (0.5 + targetGroupData.avg_right_saccade_delay) * 1000,
            xMax: (0.5 + targetGroupData.avg_right_saccade_delay + 7.63 / targetGroupData.avg_right_saccade_speed) * 1000,
            yMin: -10,
            yMax: 10,
        });

        return {
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        return null;
                        //return value !== 0 ? value.toLocaleString(/* ... */) : ''
                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#000000'
                },
            },
            annotation: {
                events: ["click"],
                annotations: annotation,
            },
            maintainAspectRatio: false,
            devicePixelRatio: window.devicePixelRatio * 3,
            animation: {
                duration: 0,
            },
            tooltips: {
                callbacks: {

                    title: function (tooltipItem, data) {
                        return '';
                    }
                }
            },
            scales: {
                xAxes: [
                    {
                        id: "timeid",
                        display: true,       // 실제시간 임시로 true//
                        type: 'time',
                        time: {

                            unit: 'mything',

                            displayFormats: {
                                mything: 'ss.SSS'
                            },

                            ///////여기서조정해야함

                        },
                        //x축 숨기려면 이렇게
                        // gridLines: {
                        //     color: "rgba(0, 0, 0, 0)",
                        // },
                        scaleLabel: { /////////////////x축아래 라벨
                            display: false,
                            labelString: 'Time(s)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            source: 'data', //auto,data,labels
                            // autoSkip: true,
                            // maxRotation: 0,
                            // major: {
                            //   enabled: true
                            // },
                            // stepSize: 10,
                            callback: customCallbackXtick,
                            min: 0,
                            max: 1.5 * 1000
                        }
                    }
                ],
                yAxes: [
                    {
                        id: "degree",
                        position: 'left',
                        scaleLabel: { /////////////////x축아래 라벨
                            display: true,
                            labelString: 'Position(d)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            max: 10,
                            min: -10,

                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    },
                    {
                        id: "ax_blink",
                        stepSize: 1,
                        position: 'left',
                        // 오른쪽의 Fixation 옆 Blink축
                        display: false,
                        ticks: {
                            max: 1,
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }]
            },

        };
    }, [taskArr, targetGroupData]);

    const saccadeRightData = React.useMemo(() => {
        return {
            datasets: [
                { //targety
                    data: taskArr.right[0].target_xdegreeChartArr,
                    steppedLine: "before",
                    label: "targetH",
                    borderColor: "rgba(0,255,0,0.8)",//"#0000ff",
                    backgroundColor: 'rgba(0,255,0,0.8)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.right[0].xdegreeChartArr,
                    steppedLine: false,
                    label: "gazeH1",
                    borderColor: "rgba(255,0,0,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(255,0,0,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.right[1].xdegreeChartArr,
                    steppedLine: false,
                    label: "gazeH2",
                    borderColor: "rgba(0,0,255,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(0,0,255,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                }
            ],
        }
    }, [taskArr]);

    const saccadeLeftChartOption = React.useMemo(() => {
        let annotation = [];

        let leftTaskArr = taskArr.left;

        for (let i = 0; i < leftTaskArr.length; i++) {
            // console.log("bottomTaskArr",bottomTaskArr);
            annotation.push({
                drawTime: "afterDatasetsDraw", // (default)
                type: "box",
                mode: "horizontal",
                yScaleID: "degree",
                xScaleID: "timeid",
                // value: '7.5',
                borderColor: i === 0 ? "rgba(255,0,0,0.7)" : "rgba(0,0,255,0.7)",
                backgroundColor: "transparent",
                borderWidth: 1,
                xMin: leftTaskArr[i].latencyChart.s,
                xMax: leftTaskArr[i].latencyChart.s,
                yMin: -10,
                yMax: 10
            });
            annotation.push({
                drawTime: "afterDatasetsDraw", // (default)
                type: "box",
                mode: "horizontal",
                yScaleID: "degree",
                xScaleID: "timeid",
                // value: '7.5',
                borderColor: i === 0 ? "rgba(255,0,0,0.7)" : "rgba(0,0,255,0.7)",
                backgroundColor: "transparent",
                borderWidth: 1,
                xMin: leftTaskArr[i].latencyChart.e,
                xMax: leftTaskArr[i].latencyChart.e,
                yMin: -10,
                yMax: 10
            });

        }


        //groupData

        annotation.push({
            drawTime: "beforeDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',


            // borderColor: 'rgba(0,0,0,0.2)',
            backgroundColor: "rgba(0,0,0,0.2)",
            borderWidth: 1,
            xMin: (0.5 + targetGroupData.avg_left_saccade_delay) * 1000,
            xMax: (0.5 + targetGroupData.avg_left_saccade_delay + 7.63 / targetGroupData.avg_left_saccade_speed) * 1000,
            yMin: -10,
            yMax: 10,
        });

        return {
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        return null;
                        //return value !== 0 ? value.toLocaleString(/* ... */) : ''
                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#000000'
                },
            },
            annotation: {
                events: ["click"],
                annotations: annotation,
            },
            maintainAspectRatio: false,
            devicePixelRatio: window.devicePixelRatio * 3,
            animation: {
                duration: 0,
            },
            tooltips: {
                callbacks: {

                    title: function (tooltipItem, data) {
                        return '';
                    }
                }
            },
            scales: {
                xAxes: [
                    {
                        id: "timeid",
                        display: true,       // 실제시간 임시로 true//
                        type: 'time',
                        time: {

                            unit: 'mything',

                            displayFormats: {
                                mything: 'ss.SSS'
                            },

                            ///////여기서조정해야함
                            // min: 0 * 1000,
                            // max: 1.5 * 1000,
                        },
                        //x축 숨기려면 이렇게
                        // gridLines: {
                        //     color: "rgba(0, 0, 0, 0)",
                        // },
                        scaleLabel: { /////////////////x축아래 라벨
                            display: false,
                            labelString: 'Time(s)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            source: 'data', //auto,data,labels
                            // autoSkip: true,
                            // maxRotation: 0,
                            // major: {
                            //   enabled: true
                            // },
                            // stepSize: 10,
                            callback: customCallbackXtick,
                            min: 0,
                            max: 1.5 * 1000
                        }
                    }
                ],
                yAxes: [
                    {
                        id: "degree",
                        position: 'left',
                        scaleLabel: { /////////////////x축아래 라벨
                            display: true,
                            labelString: 'Position(d)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            max: 10,
                            min: -10,

                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    },
                    {
                        id: "ax_blink",
                        stepSize: 1,
                        position: 'left',
                        // 오른쪽의 Fixation 옆 Blink축
                        display: false,
                        ticks: {
                            max: 1,
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }]
            },

        };
    }, [taskArr, targetGroupData]);

    const saccadeLeftData = React.useMemo(() => {
        return {
            datasets: [
                { //targety
                    data: taskArr.left[0].target_xdegreeChartArr,
                    steppedLine: "before",
                    label: "targetH",
                    borderColor: "rgba(0,255,0,0.8)",//"#0000ff",
                    backgroundColor: 'rgba(0,255,0,0.8)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.left[0].xdegreeChartArr,
                    steppedLine: false,
                    label: "gazeH1",
                    borderColor: "rgba(255,0,0,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(255,0,0,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.left[1].xdegreeChartArr,
                    steppedLine: false,
                    label: "gazeH2",
                    borderColor: "rgba(0,0,255,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(0,0,255,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                }
            ],
        }
    }, [taskArr]);

    const transparentCanvasRef = React.useRef();
    const [showUpward, set_showUpward] = React.useState(true);
    const [showDownward, set_showDownward] = React.useState(true);
    const [showLeftward, set_showLeftward] = React.useState(true);
    const [showRightward, set_showRightward] = React.useState(true);

    const drawTransparentCanvas = React.useCallback(() => {
        if (!data || !taskArr || !transparentCanvasRef) return;
        const canvas = transparentCanvasRef.current;
        const rctx = canvas.getContext('2d');

        const Wpx = 1020; //340 *2
        const Hpx = 1020;
        rctx.clearRect(0, 0, Wpx, Hpx);
        for (let key in taskArr) {
            for (let k = 0; k < taskArr[key].length; k++) {
                const task = taskArr[key][k];
                const startRelTime = task.startWaitTime - 0.5;
                const endRelTime = task.relativeEndTime - task.endWaitTime - 2;

                let gazeArr = task.gazeData;
                if (key === 'top') {
                    if (showUpward === false) break;
                    rctx.strokeStyle = 'rgba(255,0,0,0.3)';
                    rctx.fillStyle = 'rgba(255,0,0,0.3)';
                } else if (key === 'bottom') {
                    if (showDownward === false) break;
                    rctx.strokeStyle = 'rgba(0,255,0,0.3)';
                    rctx.fillStyle = 'rgba(0,255,0,0.3)';
                } else if (key === 'left') {
                    if (showLeftward === false) break;
                    rctx.strokeStyle = 'rgba(0,0,255,0.3)';
                    rctx.fillStyle = 'rgba(0,0,255,0.3)';
                } else if (key === 'right') {
                    if (showRightward === false) break;
                    rctx.strokeStyle = 'rgba(255,0,255,0.3)';
                    rctx.fillStyle = 'rgba(255,0,255,0.3)';
                }

                let beforeX = null, beforeY = null;
                for (let i = 0; i < gazeArr.length; i++) {
                    if (gazeArr[i].relTime >= startRelTime && gazeArr[i].relTime <= endRelTime) {
                        rctx.beginPath();
                        rctx.lineWidth = 9;

                        //340 : 20 =  x :gazeArr[i].xdegree+10
                        //340px : 20degree = xpx : 
                        // x = 340*(gazeArr[i].xdegree+10)/20 
                        let x = (gazeArr[i].xdegree + 10) * Wpx / 20;
                        let y = (gazeArr[i].ydegree + 10) * Hpx / 20;
                        rctx.arc(x,
                            y,
                            1, 0, Math.PI * 2);
                        rctx.fill();
                        rctx.stroke();

                        if (beforeX !== null && beforeY !== null) {
                            rctx.beginPath();
                            rctx.lineWidth = 9;
                            rctx.moveTo(beforeX, beforeY);
                            rctx.lineTo(x, y);
                            rctx.stroke();
                        }
                        beforeX = x;
                        beforeY = y;
                    }




                }

            }

        }
    }, [data, taskArr, showUpward, showDownward, showLeftward, showRightward]);


    React.useEffect(() => {
        if (taskArr) {
            drawTransparentCanvas();
        }
    }, [taskArr, drawTransparentCanvas])


    const [showGazeViewer, set_showGazeViewer] = React.useState(false);

    const myPercent = React.useMemo(() => {
        let x = data.analysis.saccade_score;
        let avg = targetGroupData.avg_saccade_score;
        let std = targetGroupData.std_saccade_score || 1;
        let p = getGaussianMyPercent(avg, std, x);
        // console.log("p",p);
        return p;
    }, [data, targetGroupData]);

    const myState = React.useMemo(() => {
        let mystate;
        if (myPercent <= 10) {
            mystate = '최우수'


        }
        else if (myPercent > 10 && myPercent <= 25) {
            mystate = '우수'


        }
        else if (myPercent > 25 && myPercent <= 75) {
            mystate = "양호"


        }
        else if (myPercent > 75 && myPercent <= 90) {
            mystate = "미흡"


        }
        else {
            mystate = "주의"


        }
        return mystate;
    }, [myPercent])


    return (<div className="SaccadeView">
        <div className="row">
            <div className="titleBox">
                <div className="title">
                    도약안구운동 결과
                </div>
                <div className="cbox">
                    <div style={{ height: '60%', display: 'flex' }}>
                        <div style={{ width: '55%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <img src={imgbase64forPDF[myState]} alt="" style={{ height: '50%' }} />

                        </div>
                        <div style={{ width: '45%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontSize: '19px', fontWeight: '700', paddingLeft: '7px', paddingTop: '12px' }}>
                            {myState}
                        </div>
                    </div>
                    <div style={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '15px', borderTop: '1px solid #1A408E' }}>
                        <ul>
                            <li>내 점수: {data.analysis.saccade_score.toFixed(2)}점 (상위 {myPercent}%)</li>
                            <li>또래 평균 점수: {targetGroupData.avg_saccade_score.toFixed(2)}점</li>
                            <li>전체 평균 점수: {everyGroupData.avg_saccade_score.toFixed(2)}점</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="titleBox" style={{ width: '330px' }}>
                <div className="title">
                    도약안구운동 점수 분포
                </div>
                <div id="saccadeGradeChart" className="cbox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BarChartGrade

                        myScore={data.analysis.saccade_score}
                        avgGroupScore={targetGroupData.avg_saccade_score}
                        stdGroupScore={targetGroupData.std_saccade_score}
                    />
                </div>
            </div>
            <div className="titleBox" style={{ width: '850px' }}>
                <div className="title">
                    도약안구운동 점수 분포
                </div>
                <div id="saccadeRadarChart" className="cbox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div id="saccadeLatencyChart" className="cbox3 latencyChartWrap">
                        <ChartComponent
                            type="radar"
                            height={null}
                            width={null}
                            data={{
                                labels: ['Up', 'Right', 'Down', 'Left'],
                                datasets: [{
                                    data: [data.analysis.up_saccade_delay * 1000,
                                    data.analysis.right_saccade_delay * 1000,
                                    data.analysis.down_saccade_delay * 1000,
                                    data.analysis.left_saccade_delay * 1000],
                                    label: 'my Avg Latency time (ms)',
                                    // backgroundColor:'red',
                                    borderColor: "rgba(255,0,0,0.6)",
                                    fill: false,
                                }, {
                                    data: [targetGroupData.avg_up_saccade_delay * 1000,
                                    targetGroupData.avg_right_saccade_delay * 1000,
                                    targetGroupData.avg_down_saccade_delay * 1000,
                                    targetGroupData.avg_left_saccade_delay * 1000],
                                    label: 'group Avg Latency time (ms)',
                                    // backgroundColor:'red',
                                    borderColor: "rgba(0,0,0,0.2)",
                                    fill: false,
                                }]
                            }}
                            options={radarChartOption}
                        />

                    </div>
                    <div id="saccadeSpeedChart" className="cbox3 speedChartWrap">
                        <ChartComponent
                            type="radar"
                            height={null}
                            width={null}
                            data={{
                                labels: ['Up', 'Right', 'Down', 'Left'],
                                datasets: [{
                                    data: [data.analysis.up_saccade_speed,
                                    data.analysis.right_saccade_speed,
                                    data.analysis.down_saccade_speed,
                                    data.analysis.left_saccade_speed],
                                    label: 'my Avg Speed (degree/s)',
                                    // backgroundColor:'red',
                                    borderColor: "rgba(255,0,0,0.6)",
                                    fill: false,
                                }, {
                                    data: [targetGroupData.avg_up_saccade_speed,
                                    targetGroupData.avg_right_saccade_speed,
                                    targetGroupData.avg_down_saccade_speed,
                                    targetGroupData.avg_left_saccade_speed],
                                    label: 'group Avg Speed (degree/s)',
                                    // backgroundColor:'red',
                                    borderColor: "rgba(0,0,0,0.2)",
                                    fill: false,
                                }]
                            }}
                            options={radarChartOption}
                        />
                    </div>
                    <div id="saccadeFEChart" className="cbox3 fixationErrChartWrap">
                        <ChartComponent
                            type="radar"
                            height={null}
                            width={null}
                            data={{
                                labels: ['Up', 'Right', 'Down', 'Left'],
                                datasets: [{
                                    data: [data.analysis.up_fixation_stability,
                                    data.analysis.right_fixation_stability,
                                    data.analysis.down_fixation_stability,
                                    data.analysis.left_fixation_stability],
                                    label: 'my Avg fixation_err(degree)',
                                    // backgroundColor:'red',
                                    borderColor: "rgba(255,0,0,0.6)",
                                    fill: false,
                                }, {
                                    data: [targetGroupData.avg_up_fixation_stability,
                                    targetGroupData.avg_right_fixation_stability,
                                    targetGroupData.avg_down_fixation_stability,
                                    targetGroupData.avg_left_fixation_stability],
                                    label: 'group Avg fixation_err(degree)',
                                    // backgroundColor:'red',
                                    borderColor: "rgba(0,0,0,0.2)",
                                    fill: false,
                                }]
                            }}
                            options={radarChartOption2}
                        />

                    </div>
                </div>
            </div>
        </div>

        {/* 2째줄 */}
        <div className="row">
            <div className="titleBox" style={{ width: '450px', height: '450px' }}>
                <div className="title">
                    도약 안구운동 시선 <button className="viewerbtn" onClick={() => set_showGazeViewer(true)}>Viewer</button>
                </div>
                <div id="saccadeRealChart" className="cbox">
                    <div style={{ height: '30px', display: 'flex', justifyContent: 'center', paddingLeft: '10px', paddingTop: '3px', boxSizing: 'border-box' }}>
                        Amplitude : 7.63 Degree
                    </div>
                    <div style={{ height: 'calc(100% - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="_10degreeDiv" style={{ width: '340px', height: '340px' }}>
                            <div className="target center" />
                            <div className="target left" />
                            <div className="target right" />
                            <div className="target top" />
                            <div className="target bottom" />
                            <canvas className="transparentCanvas" ref={transparentCanvasRef} width={1020} height={1020} />
                        </div>
                    </div>
                    <div className="customLabel" style={{ height: '30px', display: 'flex' }}>
                        <div className="clickzone" style={{
                            textDecoration: showUpward === true ? "" : "line-through"
                        }} onClick={() => set_showUpward(!showUpward)}><div className="upward" />Upward</div>&nbsp;&nbsp;
                        <div className="clickzone" style={{
                            textDecoration: showRightward === true ? "" : "line-through"
                        }} onClick={() => set_showRightward(!showRightward)}><div className="rightward" />Rightward</div>&nbsp;&nbsp;
                        <div className="clickzone" style={{
                            textDecoration: showDownward === true ? "" : "line-through"
                        }} onClick={() => set_showDownward(!showDownward)}><div className="downward" />Downward</div>&nbsp;&nbsp;
                        <div className="clickzone" style={{
                            textDecoration: showLeftward === true ? "" : "line-through"
                        }} onClick={() => set_showLeftward(!showLeftward)}><div className="leftward" />Leftward</div>&nbsp;&nbsp;

                    </div>
                </div>
            </div>
            <div className="titleBox" style={{ width: '1000px', height: '450px' }}>
                <div className="title">
                    시간에 따른 도약안구운동
                </div>
                <div id="saccadeDirectionChart" className="cbox">
                    <div className="cbox2r">
                        <div className="cbox2w">
                            <div className="c_label">
                                <strong>{"Upward 7.63 Degree"}</strong>
                            </div>
                            <div className="c_chart">
                                <ChartComponent
                                    type="line"
                                    height={null}
                                    width={null}
                                    data={saccadeTopData}
                                    options={saccadeTopChartOption}
                                />
                            </div>
                            <div className="c_avg">
                                myAvgLatency : <strong>{(data.analysis.up_saccade_delay * 1000).toFixed(0)} ms</strong>, myAvgSpeed : <strong>{data.analysis.up_saccade_speed.toFixed(1)} degree/s</strong>
                            </div>
                        </div>

                        <div className="cbox2w">
                            <div className="c_label">
                                <strong>{"Rightward 7.63 Degree"}</strong>
                            </div>
                            <div className="c_chart">
                                <ChartComponent
                                    type="line"
                                    height={null}
                                    width={null}
                                    data={saccadeRightData}
                                    options={saccadeRightChartOption}
                                />
                            </div>
                            <div className="c_avg">
                                myAvgLatency : <strong>{(data.analysis.right_saccade_delay * 1000).toFixed(0)} ms</strong>, myAvgSpeed : <strong>{data.analysis.right_saccade_speed.toFixed(1)} degree/s</strong>
                            </div>
                        </div>
                    </div>
                    <div className="cbox2r">
                        <div className="cbox2w">
                            <div className="c_label">
                                <strong>{"Downward 7.63 Degree"}</strong>
                            </div>
                            <div className="c_chart">
                                <ChartComponent
                                    type="line"
                                    height={null}
                                    width={null}
                                    data={saccadeBottomData}
                                    options={saccadeBottomChartOption}
                                />
                            </div>
                            <div className="c_avg">
                                myAvgLatency : <strong>{(data.analysis.down_saccade_delay * 1000).toFixed(0)} ms</strong>, myAvgSpeed : <strong>{data.analysis.down_saccade_speed.toFixed(1)} degree/s</strong>
                            </div>
                        </div>
                        <div className="cbox2w">
                            <div className="c_label">
                                <strong>{"Leftward 7.63 Degree"}</strong>
                            </div>
                            <div className="c_chart">
                                <ChartComponent
                                    type="line"
                                    height={null}
                                    width={null}
                                    data={saccadeLeftData}
                                    options={saccadeLeftChartOption}
                                />
                            </div>
                            <div className="c_avg">
                                myAvgLatency : <strong>{(data.analysis.left_saccade_delay * 1000).toFixed(0)} ms</strong>, myAvgSpeed : <strong>{data.analysis.left_saccade_speed.toFixed(1)} degree/s</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 3째줄 */}
        <div className="row">

            <div className="titleUnderline">
                <div className="title">
                    도약안구운동 측정은 무엇인가요?
                </div>
                <div className="explain">
                    <ul>
                        <li>
                            글을 읽는 동안 시선은 끊임없이 빠르게 이동(saccade, 도약이동)하며 글자에 고정(fixation, 응시)하는 것을 반복합니다. 글을 유창하게 읽기 위해서는 정확한 위치에 눈을 빠르고 정확한 위치로 옮기고, 안정적으로 시선을 유지하는 운동제어 능력이 필요합니다. 시력 저하, 피로, 집중력 부족, 안구진탕증 및 각종 신경계 이상 등의 이유로 도약안구운동에 문제가 생길 수 있으며, 이 능력이 저하되면 글을 유창하게 읽는데 방해가 될 수 있습니다.
                        </li>
                        <li>
                            <strong>지연시간 (latency time)</strong> : 시각 자극물을 발견한 뒤, 목표를 향해 시선이 출발할 때까지 걸리는 시간입니다. 반응처리 및 운동능력이 우수할수록 짧으며, 대체로 150ms ~ 250ms정도입니다.
                        </li>
                        <li>
                            <strong>시선이동속도 (saccade speed)</strong> : 시선이 목표를 향해 이동할 때, 목표에 다다를 때까지의 속도입니다. 운동제어능력이 우수할수록 속도가 빠르며, 이동할 거리가 가까울수록 속도는 느려집니다. 대체로 50도/초~200도/초 정도입니다.
                        </li>
                        <li>
                            <strong>응시안정성 (fixation stability)</strong> : 대상을 응시할 때, 시선이 얼마나 안정적으로 유지하는지를 측정한 척도입니다. 목표위치로부터의 2초간 시선위치 편차로 측정합니다. 집중력이 강하고 운동제어능력이 우수할수록 편차가 작으며, 대체로 0.5도 내외입니다.
                        </li>
                    </ul>

                </div>
            </div>
        </div>
        {
            showGazeViewer &&
            <div className="GazeViewerWrap">
                <div className="modal">
                    <div className="title"> 실제 시선 측정데이터 <button onClick={() => set_showGazeViewer(false)}>닫기</button></div>
                    <div className="view">
                        <GazeViewer data={data} />
                    </div>
                </div>


            </div>
        }
    </div>)
}


const PursuitView = ({ ...props }) => {
    const { data, targetGroupData, everyGroupData } = props;
    const [showGazeViewer, set_showGazeViewer] = React.useState(false);




    const taskArr = React.useMemo(() => {
        // console.log(data);
        const MONITOR_PX_PER_CM = data.monitorInform.MONITOR_PX_PER_CM;
        const pixel_per_cm = data.monitorInform.MONITOR_PX_PER_CM; //1cm 당 pixel
        const degree_per_cm = Math.atan(1 / data.defaultZ) * 180 / Math.PI;
        const w = data.screenW;
        const h = data.screenH;

        const screeningObjectList = data.screeningObjectList;


        let taskArr = {
            clockwise: [],
            anticlockwise: [],

        };
        for (let i = 0; i < screeningObjectList.length; i++) {

            taskArr[screeningObjectList[i].analysis.direction].push({
                ...screeningObjectList[i],
                gazeData: data.taskArr[i],
                analysis: data.analysisArr[i]
            });
        }



        for (let key in taskArr) {

            for (let i = 0; i < taskArr[key].length; i++) {
                const task = taskArr[key][i];

                const type = task.type;
                let gazeArr = task.gazeData;

                let blink_arr = get_blink_arr(gazeArr);
                task.blinkArr = blink_arr;

                // % 로되어있는걸 degree 로 변환작업, 중점이 0,0 x,y degree
                for (let j = 0; j < gazeArr.length; j++) {
                    let target_pixels = {
                        x: null,
                        y: null,
                    };
                    if (type === "teleport") {
                        //2~5 고정임

                        if (gazeArr[j].relTime * 1 < task.startWaitTime * 1) {
                            target_pixels.x = task.startCoord.x - w / 2;
                            target_pixels.y = task.startCoord.y - h / 2;
                        } else if (gazeArr[j].relTime * 1 < task.duration * 1 + task.startWaitTime * 1) {
                            target_pixels.x = task.endCoord.x - w / 2;
                            target_pixels.y = task.endCoord.y - h / 2;
                        } else {
                            if (task.isReturn) {
                                target_pixels.x = task.startCoord.x - w / 2;
                                target_pixels.y = task.startCoord.y - h / 2;
                            } else {
                                target_pixels.x = task.endCoord.x - w / 2;
                                target_pixels.y = task.endCoord.y - h / 2;
                            }
                        }
                        let target_xcm = target_pixels.x / pixel_per_cm;
                        let target_ycm = target_pixels.y / pixel_per_cm;
                        let target_xdegree = target_xcm * degree_per_cm;
                        let target_ydegree = target_ycm * degree_per_cm;
                        gazeArr[j].target_xdegree = target_xdegree;
                        gazeArr[j].target_ydegree = target_ydegree;
                    } else if (type === "circular") {
                        const radian = Math.PI / 180;
                        const radius = task.radius;

                        if (gazeArr[j].relTime * 1 < task.startWaitTime) {
                            const cosTheta = Math.cos(task.startDegree * radian);
                            const sineTheta = Math.sin(task.startDegree * radian);
                            target_pixels.x = task.centerCoord.x + radius * cosTheta * MONITOR_PX_PER_CM - w / 2;
                            target_pixels.y = task.centerCoord.y - radius * sineTheta * MONITOR_PX_PER_CM - h / 2;
                        } else if (gazeArr[j].relTime * 1 < task.duration * 1 + task.startWaitTime * 1) {
                            let nowDegree = -(
                                ((task.startDegree - task.endDegree) * (gazeArr[j].relTime - task.startWaitTime)) / task.duration -
                                task.startDegree
                            );
                            const cosTheta = Math.cos(nowDegree * radian);
                            const sineTheta = Math.sin(nowDegree * radian);
                            target_pixels.x = task.centerCoord.x + radius * cosTheta * MONITOR_PX_PER_CM - w / 2;
                            target_pixels.y = task.centerCoord.y - radius * sineTheta * MONITOR_PX_PER_CM - h / 2;
                        } else {
                            const cosTheta = Math.cos(task.endDegree * radian);
                            const sineTheta = Math.sin(task.endDegree * radian);
                            target_pixels.x = task.centerCoord.x + radius * cosTheta * MONITOR_PX_PER_CM - w / 2;
                            target_pixels.y = task.centerCoord.y - radius * sineTheta * MONITOR_PX_PER_CM - h / 2;
                        }
                        let target_xcm = target_pixels.x / pixel_per_cm;
                        let target_ycm = target_pixels.y / pixel_per_cm;
                        let target_xdegree = target_xcm * degree_per_cm;
                        let target_ydegree = target_ycm * degree_per_cm;
                        gazeArr[j].target_xdegree = target_xdegree;
                        gazeArr[j].target_ydegree = target_ydegree;
                    }

                    if (gazeArr[j].RPOGV) {
                        let xpixel = (gazeArr[j].RPOGX - 0.5) * w;
                        let ypixel = (gazeArr[j].RPOGY - 0.5) * h;

                        let xcm = xpixel / pixel_per_cm;
                        let ycm = ypixel / pixel_per_cm;
                        let xdegree = xcm * degree_per_cm;
                        let ydegree = ycm * degree_per_cm;

                        gazeArr[j].xdegree = xdegree;
                        gazeArr[j].ydegree = ydegree;
                    } else {
                        gazeArr[j].xdegree = null;
                        gazeArr[j].ydegree = null;
                    }
                }

                const startRelTime = task.startWaitTime - 0.5;
                const endRelTime = task.relativeEndTime - task.endWaitTime + 0.5; //이거도 해줘야할듯

                // console.log("endRelTime",endRelTime);
                let blkChartArr = [];
                for (let j = 0; j < task.blinkArr.length; j++) {
                    if (task.blinkArr[j].BLKS >= endRelTime) {
                        // console.log("찾음",task.blinkArr[j].BLKS)
                    }
                    else if (task.blinkArr[j].BLKS >= startRelTime && task.blinkArr[j].BLKS + task.blinkArr[j].BLKD >= endRelTime) {
                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS - startRelTime) * 1000,
                            y: 0
                        });
                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS - startRelTime) * 1000,
                            y: 1
                        })
                        blkChartArr.push({
                            x: endRelTime * 1000,
                            y: 1
                        })
                        blkChartArr.push({
                            x: endRelTime * 1000,
                            y: 0
                        })
                    }
                    else if ((task.blinkArr[j].BLKS - startRelTime) >= 0) {

                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS - startRelTime) * 1000,
                            y: 0
                        });
                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS - startRelTime) * 1000,
                            y: 1
                        })
                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) * 1000,
                            y: 1
                        })
                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) * 1000,
                            y: 0
                        })
                    }
                    else if ((task.blinkArr[j].BLKS - startRelTime) <= 0 && (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) >= 0) {
                        blkChartArr.push({
                            x: 0,
                            y: 0
                        });
                        blkChartArr.push({
                            x: 0,
                            y: 1
                        })
                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) * 1000,
                            y: 1
                        })
                        blkChartArr.push({
                            x: (task.blinkArr[j].BLKS + task.blinkArr[j].BLKD - startRelTime) * 1000,
                            y: 0
                        })
                    }

                }
                task.blkChartArr = blkChartArr;



            }

        }

        // console.log("taskArr",taskArr);
        return taskArr;
    }, [data])

    const transparentCanvasRef = React.useRef();

    const [showClockwise, set_showClockwise] = React.useState(true);
    const [showAntiClockwise, set_showAntiClockwise] = React.useState(true);

    const drawTransparentCanvas = React.useCallback(() => {
        if (!data || !taskArr || !transparentCanvasRef) return;
        const canvas = transparentCanvasRef.current;
        const rctx = canvas.getContext('2d');

        const Wpx = 1020; //340 *2
        const Hpx = 1020;
        rctx.clearRect(0, 0, Wpx, Hpx);
        for (let key in taskArr) {
            for (let k = 0; k < taskArr[key].length; k++) {
                const task = taskArr[key][k];
                const startRelTime = task.startWaitTime - 0.5;
                const endRelTime = task.relativeEndTime - task.endWaitTime + 0.5;

                let gazeArr = task.gazeData;
                if (key === 'clockwise') {
                    if (showClockwise === false) break;
                    rctx.strokeStyle = 'rgba(255,0,0,0.3)';
                    rctx.fillStyle = 'rgba(255,0,0,0.3)';
                } else if (key === 'anticlockwise') {
                    if (showAntiClockwise === false) break;
                    rctx.strokeStyle = 'rgba(0,255,0,0.3)';
                    rctx.fillStyle = 'rgba(0,255,0,0.3)';
                }

                // let beforeX = null, beforeY = null;
                for (let i = 0; i < gazeArr.length; i++) {
                    if (gazeArr[i].relTime >= startRelTime && gazeArr[i].relTime <= endRelTime) {
                        rctx.beginPath();
                        rctx.lineWidth = 9;

                        //340 : 20 =  x :gazeArr[i].xdegree+10
                        //340px : 20degree = xpx : 
                        // x = 340*(gazeArr[i].xdegree+10)/20 
                        let x = (gazeArr[i].xdegree + 10) * Wpx / 20;
                        let y = (gazeArr[i].ydegree + 10) * Hpx / 20;
                        rctx.arc(x,
                            y,
                            1, 0, Math.PI * 2);
                        rctx.fill();
                        rctx.stroke();

                        // if (beforeX !== null && beforeY !== null) {
                        //     rctx.beginPath();
                        //     rctx.lineWidth = 9;
                        //     rctx.moveTo(beforeX, beforeY);
                        //     rctx.lineTo(x, y);
                        //     rctx.stroke();
                        // }
                        // beforeX = x;
                        // beforeY = y;
                    }




                }

            }

        }

    }, [data, taskArr, showClockwise, showAntiClockwise]);

    React.useEffect(() => {
        if (taskArr) {
            drawTransparentCanvas();
        }
    }, [taskArr, drawTransparentCanvas])

    const pursuitChartOption = React.useMemo(() => {
        let annotationArr = [{
            drawTime: "afterDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',
            borderColor: "rgba(0,255,0,0.7)",
            backgroundColor: "rgba(0,255,0,0.7)",
            borderWidth: 3,
            xMin: 0.5 * 1000,
            xMax: 0.5 * 1000,
            yMin: -10,
            yMax: 10
        },
        {
            drawTime: "afterDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',
            borderColor: "rgba(0,255,0,0.7)",
            backgroundColor: "rgba(0,255,0,0.7)",
            borderWidth: 3,
            xMin: 10.5 * 1000,
            xMax: 10.5 * 1000,
            yMin: -10,
            yMax: 10
        }];

        return {
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        return null;
                        //return value !== 0 ? value.toLocaleString(/* ... */) : ''
                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#000000'
                },
            },
            annotation: {
                events: ["click"],
                annotations: annotationArr,
            },
            maintainAspectRatio: false,
            devicePixelRatio: window.devicePixelRatio * 3,
            animation: {
                duration: 0,
            },
            tooltips: {
                callbacks: {

                    title: function (tooltipItem, data) {
                        return '';
                    }
                }
            },
            scales: {
                xAxes: [
                    {
                        id: "timeid",
                        display: true,       // 실제시간 임시로 true//
                        type: 'time',
                        time: {

                            unit: 'mything',

                            displayFormats: {
                                mything: 'ss.SSS'
                            },

                            ///////여기서조정해야함
                            // min: 0,
                            // max: 10,
                        },
                        //x축 숨기려면 이렇게
                        // gridLines: {
                        //     color: "rgba(0, 0, 0, 0)",
                        // },
                        scaleLabel: { /////////////////x축아래 라벨
                            display: false,
                            labelString: 'Time(s)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            source: 'data', //auto,data,labels
                            // autoSkip: true,
                            // maxRotation: 0,
                            // major: {
                            //   enabled: true
                            // },
                            // stepSize: 10,
                            callback: function (val, index) {


                                if (index % 60 === 0) {

                                    return ((val * 1).toFixed(1) - 0.5).toFixed(1);
                                }
                            }
                        }
                    }
                ],
                yAxes: [
                    {
                        id: "degree",
                        position: 'left',
                        scaleLabel: { /////////////////x축아래 라벨
                            display: true,
                            labelString: 'Position(d)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            max: 10,
                            min: -10,

                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    },
                    {
                        id: "ax_blink",
                        stepSize: 1,
                        position: 'left',
                        // 오른쪽의 Fixation 옆 Blink축
                        display: false,
                        ticks: {
                            max: 1,
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }]
            },

        }
    }, []);
    const clockWiseData = React.useMemo(() => {
        const task = taskArr['clockwise'][0];
        const startRelTime = task.startWaitTime - 0.5;
        const endRelTime = task.relativeEndTime - task.endWaitTime + 0.5;
        let gazeArr = task.gazeData;
        let targetV_arr = [];
        let targetH_arr = [];
        let gazeV_arr = [];
        let gazeH_arr = [];
        for (let i = 0; i < gazeArr.length; i++) {
            if (gazeArr[i].relTime >= startRelTime && gazeArr[i].relTime <= endRelTime) {
                targetV_arr.push({
                    x: (gazeArr[i].relTime - startRelTime) * 1000,
                    y: gazeArr[i].target_ydegree
                });
                targetH_arr.push({
                    x: (gazeArr[i].relTime - startRelTime) * 1000,
                    y: gazeArr[i].target_xdegree
                });

                gazeV_arr.push({
                    x: (gazeArr[i].relTime - startRelTime) * 1000,
                    y: gazeArr[i].ydegree
                })

                gazeH_arr.push({
                    x: (gazeArr[i].relTime - startRelTime) * 1000,
                    y: gazeArr[i].xdegree
                })
            }
        }

        return {
            datasets: [
                { //eyex
                    data: gazeH_arr,
                    steppedLine: "before",
                    label: "gazeH",
                    borderColor: "rgba(255,0,0,0.3)",//"#0000ff",
                    backgroundColor: 'rgba(255,0,0,0.3)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //targety
                    data: gazeV_arr,
                    steppedLine: "before",
                    label: "gazeV",
                    borderColor: "rgba(0,0,255,0.3)",//"#0000ff",
                    backgroundColor: 'rgba(0,0,255,0.3)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //targety
                    data: targetV_arr,
                    steppedLine: "before",
                    label: "targetV",
                    borderColor: "cyan",//"#0000ff",
                    backgroundColor: "cyan",//"#0000ff",
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: targetH_arr,
                    steppedLine: "before",
                    label: "targetH",
                    borderColor: "pink",//"#0000ff",
                    backgroundColor: "pink",//"#0000ff",
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },

                { //BLINK
                    data: task.blkChartArr,
                    steppedLine: "before",
                    borderWidth: 0,
                    label: "Blink",
                    borderColor: "rgba(0,255,0,0.2)",//""#ff0000",
                    backgroundColor: 'rgba(0,255,0,0.2)',
                    fill: true,
                    xAxisID: "timeid",
                    yAxisID: "ax_blink",
                    pointRadius: 0, //데이터 포인터크기
                    pointHoverRadius: 0, //hover 데이터포인터크기
                },//BLINK
                // { //eyex
                //     data: taskArr.top[1].ydegreeChartArr,
                //     steppedLine: "before",
                //     label: "gazeV2",
                //     borderColor: "rgba(0,0,255,0.7)",//"#0000ff",
                //     backgroundColor: 'rgba(0,0,255,0.7)',
                //     fill: false,
                //     yAxisID: "degree",
                //     xAxisID: "timeid",
                //     borderWidth: 1.5,
                //     pointRadius: 0.3, //데이터 포인터크기
                //     pointHoverRadius: 2, //hover 데이터포인터크기
                // },
            ],
        }
    }, [taskArr]);
    const antiClockWiseData = React.useMemo(() => {
        const task = taskArr['anticlockwise'][0];
        const startRelTime = task.startWaitTime - 0.5;
        const endRelTime = task.relativeEndTime - task.endWaitTime + 0.5;
        let gazeArr = task.gazeData;
        let targetV_arr = [];
        let targetH_arr = [];
        let gazeV_arr = [];
        let gazeH_arr = [];
        for (let i = 0; i < gazeArr.length; i++) {
            if (gazeArr[i].relTime >= startRelTime && gazeArr[i].relTime <= endRelTime) {
                targetV_arr.push({
                    x: (gazeArr[i].relTime - startRelTime) * 1000,
                    y: gazeArr[i].target_ydegree
                });
                targetH_arr.push({
                    x: (gazeArr[i].relTime - startRelTime) * 1000,
                    y: gazeArr[i].target_xdegree
                });

                gazeV_arr.push({
                    x: (gazeArr[i].relTime - startRelTime) * 1000,
                    y: gazeArr[i].ydegree
                })

                gazeH_arr.push({
                    x: (gazeArr[i].relTime - startRelTime) * 1000,
                    y: gazeArr[i].xdegree
                })
            }
        }

        return {
            datasets: [
                { //eyex
                    data: gazeH_arr,
                    steppedLine: "before",
                    label: "gazeH",
                    borderColor: "rgba(255,0,0,0.3)",//"#0000ff",
                    backgroundColor: 'rgba(255,0,0,0.3)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //targety
                    data: gazeV_arr,
                    steppedLine: "before",
                    label: "gazeV",
                    borderColor: "rgba(0,0,255,0.3)",//"#0000ff",
                    backgroundColor: 'rgba(0,0,255,0.3)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //targety
                    data: targetV_arr,
                    steppedLine: "before",
                    label: "targetV",
                    borderColor: "cyan",//"#0000ff",
                    backgroundColor: "cyan",//"#0000ff",
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: targetH_arr,
                    steppedLine: "before",
                    label: "targetH",
                    borderColor: "pink",//"#0000ff",
                    backgroundColor: "pink",//"#0000ff",
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },

                { //BLINK
                    data: task.blkChartArr,
                    steppedLine: "before",
                    borderWidth: 0,
                    label: "Blink",
                    borderColor: "rgba(0,255,0,0.2)",//""#ff0000",
                    backgroundColor: 'rgba(0,255,0,0.2)',
                    fill: true,
                    xAxisID: "timeid",
                    yAxisID: "ax_blink",
                    pointRadius: 0, //데이터 포인터크기
                    pointHoverRadius: 0, //hover 데이터포인터크기
                },//BLINK
                // { //eyex
                //     data: taskArr.top[1].ydegreeChartArr,
                //     steppedLine: "before",
                //     label: "gazeV2",
                //     borderColor: "rgba(0,0,255,0.7)",//"#0000ff",
                //     backgroundColor: 'rgba(0,0,255,0.7)',
                //     fill: false,
                //     yAxisID: "degree",
                //     xAxisID: "timeid",
                //     borderWidth: 1.5,
                //     pointRadius: 0.3, //데이터 포인터크기
                //     pointHoverRadius: 2, //hover 데이터포인터크기
                // },
            ],
        }
    }, [taskArr]);

    const barChartData = React.useMemo(() => {
        return {
            labels: ['clockWise', 'AntiClockWise'],
            datasets: [
                {
                    type: 'bar',
                    label: "my err",
                    data: [data.analysis.clockwise_err, data.analysis.anticlockwise_err],
                    // backgroundColor: themeColors,
                    backgroundColor: "#2763DB",
                    barPercentage: 0.8,
                    categoryPercentage: 0.5,
                    borderColor: "transparent"
                },
                {
                    type: 'bar',
                    label: "group err",
                    data: [targetGroupData.avg_clockwise_err, targetGroupData.avg_anticlockwise_err],
                    // backgroundColor: themeColors,
                    backgroundColor: "gray",
                    barPercentage: 0.8,
                    categoryPercentage: 0.5,
                    borderColor: "transparent"
                }
            ]
        };
    }, [targetGroupData, data]);

    const barChartOption = React.useMemo(() => {
        return {

            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {

                        // console.log("value",value,ctx);
                        // if(isgroup){
                        //     return "groupAvgErr\n"+value.toFixed(2);
                        // }
                        // else{
                        //     return "myAvgErr\n"+value.toFixed(2);
                        // }
                        return value.toFixed(2);

                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#fff'
                },
            },
            tooltips: {
                // mode: 'label',
                callbacks: {
                    title: function () { },
                    label: function (tooltipItems, data) {
                        // console.log("tooltipItems",tooltipItems,data);
                        const isgroup = tooltipItems.datasetIndex === 0 ? false : true;
                        if (isgroup) {
                            return (
                                "그룹의 " + tooltipItems.xLabel + "_avg_err : " +
                                tooltipItems.yLabel.toFixed(4) + " (degree)"
                            )
                        }
                        else {
                            return (
                                "나의 " + tooltipItems.xLabel + "_avg_err : " +
                                tooltipItems.yLabel.toFixed(4) + " (degree)"
                            )
                        }

                    }
                },
                titleFontSize: 16,
                bodyFontSize: 16
            },
            elements: {
                rectangle: {
                    borderWidth: 1,
                    borderSkipped: "left",
                },
                line: {
                    fill: false
                }
            },
            responsive: true,
            responsiveAnimationDuration: 0,
            animation: {
                duration: 0

            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        gridLines: {
                            color: "transparent",
                            defaultFontStyle: "normal",
                        },
                        scaleLabel: {
                            defaultFontStyle: "normal",
                            display: false,
                            labelString: "degree",
                            fontSize: 14,
                            fontStyle: "bold",
                        },
                        ticks: {
                            stepSize: 0.2,
                            max: 2,
                            min: 0,
                            fontSize: 14,
                            fontStyle: "bold",
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        gridLines: {
                            color: "transparent"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "degree",
                            fontSize: 14,
                            fontStyle: "bold",
                        },
                        ticks: {
                            // stepSize: 2,
                            // max:30,
                            min: 0,
                            fontSize: 14,
                            fontStyle: "bold",
                        }
                    },
                ]
            },
            maintainAspectRatio: false,
            title: {
                display: true,
                text: "추적안구운동 평균 err"
            },
            legend: {
                display: true,
            }
        };
    }, []);

    const myPercent = React.useMemo(() => {
        let x = data.analysis.pursuit_score;
        let avg = targetGroupData.avg_pursuit_score;
        let std = targetGroupData.std_pursuit_score || 1;
        let p = getGaussianMyPercent(avg, std, x);
        // console.log("p",p);
        return p;
    }, [data, targetGroupData]);
    const myState = React.useMemo(() => {
        let mystate;
        if (myPercent <= 10) {
            mystate = '최우수'


        }
        else if (myPercent > 10 && myPercent <= 25) {
            mystate = '우수'


        }
        else if (myPercent > 25 && myPercent <= 75) {
            mystate = "양호"


        }
        else if (myPercent > 75 && myPercent <= 90) {
            mystate = "미흡"


        }
        else {
            mystate = "주의"


        }
        return mystate;
    }, [myPercent])

    return (<div className="PursuitView">
        <div className="row">
            <div className="titleBox">
                <div className="title">
                    추적안구운동 결과
                </div>
                <div className="cbox">
                    <div style={{ height: '60%', display: 'flex' }}>
                        <div style={{ width: '55%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <img src={imgbase64forPDF[myState]} alt="" style={{ height: '50%' }} />

                        </div>
                        <div style={{ width: '45%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontSize: '19px', fontWeight: '700', paddingLeft: '7px', paddingTop: '12px' }}>
                            {myState}
                        </div>
                    </div>
                    <div style={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '15px', borderTop: '1px solid #1A408E' }}>
                        <ul>
                            <li>내 평균: {data.analysis.pursuit_score.toFixed(2)}점 (상위 {myPercent}%)</li>
                            <li>또래 평균 점수: {targetGroupData.avg_pursuit_score.toFixed(2)}점</li>
                            <li>전체 평균 점수: {everyGroupData.avg_pursuit_score.toFixed(2)}점</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="titleBox" style={{ width: '330px' }}>
                <div className="title">
                    추적안구운동 점수 분포
                </div>
                <div id="pursuitGradeChart" className="cbox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BarChartGrade
                        myScore={data.analysis.pursuit_score}
                        avgGroupScore={targetGroupData.avg_pursuit_score}
                        stdGroupScore={targetGroupData.std_pursuit_score}
                    />
                </div>
            </div>
            <div className="titleBox" style={{ width: '850px' }}>
                <div className="title">
                    추적안구운동 점수 분포
                </div>
                <div className="cbox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div id="pursuitErrChart" className="cbox2">
                        <ChartComponent
                            type="bar"
                            height={null}
                            width={null}
                            data={barChartData}
                            options={barChartOption}
                        />
                    </div>
                    <div className="cbox2">
                        어떤컨텐츠가 들어갈예정
                    </div>
                </div>
            </div>
        </div>

        {/* 2째줄 */}
        <div className="row">
            <div className="titleBox" style={{ width: '450px', height: '450px' }}>
                <div className="title">
                    추적 안구운동 시선궤적 <button className="viewerbtn" onClick={() => set_showGazeViewer(true)}>Viewer</button>
                </div>
                <div id="pursuitRealChart" className="cbox">
                    <div style={{ height: '30px', display: 'flex', justifyContent: 'center', paddingLeft: '10px', paddingTop: '3px', boxSizing: 'border-box' }}>
                        Radius : 7.63 Degree  &nbsp;&nbsp; Speed : 72 Degree/s
                    </div>
                    <div style={{ height: 'calc(100% - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="_10degreeDiv" style={{ width: '340px', height: '340px' }}>
                            <div className="target circle" />
                            <div className="target centerx">
                                <div style={{ height: '50%', width: '100%', display: 'flex' }}>
                                    <div className="lt" /><div className="rt" />
                                </div>
                                <div style={{ height: '50%', width: '100%', display: 'flex' }}>
                                    <div className="lb" /><div className="rb" />
                                </div>
                            </div>
                            <canvas className="transparentCanvas" ref={transparentCanvasRef} width={1020} height={1020} />
                        </div>
                    </div>
                    <div className="customLabel" style={{ height: '30px', display: 'flex' }}>
                        <div className="clickzone" style={{
                            textDecoration: showClockwise === true ? "" : "line-through"
                        }} onClick={() => set_showClockwise(!showClockwise)}><div className="upward" />Clockwise</div>&nbsp;&nbsp;
                        <div className="clickzone" style={{
                            textDecoration: showAntiClockwise === true ? "" : "line-through"
                        }} onClick={() => set_showAntiClockwise(!showAntiClockwise)}><div className="downward" />AntiClockwise</div>&nbsp;&nbsp;


                    </div>
                </div>
            </div>
            <div className="titleBox" style={{ width: '1000px', height: '450px' }}>
                <div className="title">
                    시간에 따른 추적안구운동
                </div>
                <div id="pursuitDirectionChart" className="cbox">
                    <div className="cbox2r">
                        <div style={{ width: 'calc(100% - 8px)', height: '100%', marginLeft: '1px', border: '1px solid black', boxSizing: 'border-box' }}>
                            <div className="c_label">
                                <strong>{"Clockwise"}</strong>
                            </div>
                            <div className="c_chart">
                                <ChartComponent
                                    type="line"
                                    height={null}
                                    width={null}
                                    data={clockWiseData}
                                    options={pursuitChartOption}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cbox2r">
                        <div style={{ width: 'calc(100% - 8px)', height: '100%', marginLeft: '1px', border: '1px solid black', boxSizing: 'border-box' }}>
                            <div className="c_label">
                                <strong>{"AntiClockwise"}</strong>
                            </div>
                            <div className="c_chart">
                                <ChartComponent
                                    type="line"
                                    height={null}
                                    width={null}
                                    data={antiClockWiseData}
                                    options={pursuitChartOption}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 3째줄 */}
        <div className="row">

            <div className="titleUnderline">
                <div className="title">
                    추적안구운동 (pursuit)은 무엇인가요?
                </div>
                <div className="explain">
                    <ul>
                        <li>
                            추적안구운동(pursuit)은 천천히 움직이는 대상을 따라 부드럽고 연속적으로 시선을 움직이는 것입니다. 일반적으로 시선은 빠르게 도약하고 고정하는 것을 반복할 뿐이며,  부드럽고 연속적으로 이동하는 것은 고도의 안구운동 통제능력이 필요하기 때문에, 영장류나 고양이 정도의 고등동물에게서 나타나는 능력입니다.
                        </li>
                        <li>
                            추적안구운동은 집중력이 낮아지거나 노화에 의해 저하되지만, 시력 저하나 안진(안구 진탕)  및 각종 신경계 이상으로 인해 나타나기도 합니다.
                        </li>
                        <li>
                            위치편차 (position error)
                        </li>
                        <li>
                            연속성??
                        </li>
                    </ul>

                </div>
            </div>
        </div>
        {
            showGazeViewer &&
            <div className="GazeViewerWrap">
                <div className="modal">
                    <div className="title"> 실제 시선 측정데이터 <button onClick={() => set_showGazeViewer(false)}>닫기</button></div>
                    <div className="view">
                        <GazeViewer data={data} />
                    </div>
                </div>


            </div>
        }
    </div>)
}

const AntiSaccadeView = ({ ...props }) => {
    const { data, targetGroupData, everyGroupData } = props;

    const [showGazeViewer, set_showGazeViewer] = React.useState(false);
    const transparentCanvasRef = React.useRef();


    const delayBarChartData = React.useMemo(() => {
        return {
            labels: ['따라보기', '반대보기'],
            datasets: [
                {
                    type: 'bar',
                    label: "me",
                    data: [(data.analysis.left_saccade_delay + data.analysis.right_saccade_delay) * 500, (data.analysis.left_antisaccade_delay + data.analysis.right_antisaccade_delay) * 500],
                    // backgroundColor: themeColors,
                    backgroundColor: "red",
                    barPercentage: 0.8,
                    categoryPercentage: 0.5,
                    borderColor: "transparent"
                },
                {
                    type: 'bar',
                    label: "group",
                    data: [(targetGroupData.avg_left_saccade_delay + targetGroupData.avg_right_saccade_delay) * 500,
                    (targetGroupData.avg_left_antisaccade_delay + targetGroupData.avg_right_antisaccade_delay) * 500],
                    // backgroundColor: themeColors,
                    backgroundColor: "gray",
                    barPercentage: 0.8,
                    categoryPercentage: 0.5,
                    borderColor: "transparent"
                },

            ]
        };
    }, [targetGroupData, data]);

    const delayBarChartOption = React.useMemo(() => {
        return {

            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        // const isgroup =value.dataIndex===0?false:true;

                        // console.log("value",value,ctx);
                        // if(isgroup){
                        //     return "groupAvgErr\n"+value.toFixed(2);
                        // }
                        // else{
                        //     return "myAvgErr\n"+value.toFixed(2);
                        // }
                        return value.toFixed(0);

                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#fff'
                },
            },
            tooltips: {
                // mode: 'label',
                callbacks: {
                    title: function () { },
                    label: function (tooltipItems, data) {
                        // console.log("tooltipItems", tooltipItems, data);
                        const label = data.datasets[tooltipItems.datasetIndex].label;

                        return (
                            label + "(평균) : " +
                            tooltipItems.yLabel.toFixed(4) + " (ms)"
                        )


                    }
                },
                titleFontSize: 16,
                bodyFontSize: 16
            },
            elements: {
                rectangle: {
                    borderWidth: 1,
                    borderSkipped: "left",
                },
                line: {
                    fill: false
                }
            },
            responsive: true,
            responsiveAnimationDuration: 0,
            animation: {
                duration: 0

            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        gridLines: {
                            color: "transparent",
                            defaultFontStyle: "normal",
                        },
                        scaleLabel: {
                            defaultFontStyle: "normal",
                            display: false,
                            labelString: "???",
                            fontSize: 14,
                            fontStyle: "bold",
                        },
                        ticks: {
                            stepSize: 0.2,
                            max: 2,
                            min: 0,
                            fontSize: 14,
                            fontStyle: "bold",
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        gridLines: {
                            color: "transparent"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "지체시간(ms)",
                            fontSize: 14,
                            fontStyle: "bold",
                        },
                        ticks: {
                            // stepSize: 2,
                            // max:30,
                            min: 0,
                            fontSize: 14,
                            fontStyle: "bold",
                        }
                    },
                ]
            },
            maintainAspectRatio: false,
            title: {
                display: false,
                text: "평균 지체시간(delay)"
            },
            legend: {
                display: true,
            }
        };
    }, []);

    const errBarChartData = React.useMemo(() => {
        // console.log("groupData.avgErrFrequencyRatio",groupData.avgErrFrequencyRatio);
        // console.log("data.analysis.avgErrTime/0.5", (data.analysis.avgErrTime/0.5));
        return {
            labels: ['오류 횟수', '평균 오류 시간'],
            datasets: [
                {
                    type: 'bar',
                    label: "me",
                    data: [(data.analysis.avgErrFrequencyRatio * 100), (data.analysis.avgErrTime / 0.5 * 100)],
                    // backgroundColor: themeColors,
                    backgroundColor: "red",
                    barPercentage: 0.8,
                    categoryPercentage: 0.5,
                    borderColor: "transparent"
                },
                {
                    type: 'bar',
                    label: "group",
                    data: [targetGroupData.avg_avgErrFrequencyRatio * 100, (targetGroupData.avg_avgErrTime / 0.5 * 100)],
                    // backgroundColor: themeColors,
                    backgroundColor: "gray",
                    barPercentage: 0.8,
                    categoryPercentage: 0.5,
                    borderColor: "transparent"
                },

            ]
        };
    }, [targetGroupData, data]);

    const errBarChartOption = React.useMemo(() => {
        return {

            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        // const isgroup =value.dataIndex===0?false:true;

                        // console.log("value",value,ctx);
                        // if(isgroup){
                        //     return "groupAvgErr\n"+value.toFixed(2);
                        // }
                        // else{
                        //     return "myAvgErr\n"+value.toFixed(2);
                        // }
                        return value.toFixed(1) + '%';

                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#fff'
                },
            },
            tooltips: {
                // mode: 'label',
                callbacks: {
                    title: function () { },
                    label: function (tooltipItems, data) {
                        // console.log("tooltipItems", tooltipItems, data);
                        const label = data.datasets[tooltipItems.datasetIndex].label;

                        return (
                            label + "(평균) : " +
                            tooltipItems.yLabel.toFixed(4) + " (%)"
                        )


                    }
                },
                titleFontSize: 16,
                bodyFontSize: 16
            },
            elements: {
                rectangle: {
                    borderWidth: 1,
                    borderSkipped: "left",
                },
                line: {
                    fill: false
                }
            },
            responsive: true,
            responsiveAnimationDuration: 0,
            animation: {
                duration: 0

            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        gridLines: {
                            color: "transparent",
                            defaultFontStyle: "normal",
                        },
                        scaleLabel: {
                            defaultFontStyle: "normal",
                            display: false,
                            labelString: "???",
                            fontSize: 14,
                            fontStyle: "bold",
                        },
                        ticks: {
                            stepSize: 0.2,
                            max: 2,
                            min: 0,
                            fontSize: 14,
                            fontStyle: "bold",
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        gridLines: {
                            color: "transparent"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "percent(%)",
                            fontSize: 14,
                            fontStyle: "bold",
                        },
                        ticks: {
                            // stepSize: 2,
                            // max:30,
                            min: 0,
                            fontSize: 14,
                            fontStyle: "bold",
                        }
                    },
                ]
            },
            maintainAspectRatio: false,
            title: {
                display: false,
                text: "평균 오류비율(ratio)"
            },
            legend: {
                display: true,
            }
        };
    }, []);

    const taskArr = React.useMemo(() => {
        // console.log("antiSaccadeData",data);
        let ta = dataToTaskArr(data);
        // console.log("ta",ta);
        return ta;
    }, [data])






    const antiSaccadeLeftChartOption = React.useMemo(() => {
        let annotation = [];

        let leftTaskArr = taskArr.left;
        annotation = [{
            drawTime: "afterDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',
            borderColor: "rgba(255,0,0,0.7)",
            backgroundColor: "transparent",
            borderWidth: 1,
            xMin: leftTaskArr[0].latencyChart.s,
            xMax: leftTaskArr[0].latencyChart.s,
            yMin: -10,
            yMax: 10
        },
        {
            drawTime: "afterDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',
            borderColor: "rgba(0,0,255,0.7)",
            backgroundColor: "transparent",
            borderWidth: 1,
            xMin: leftTaskArr[1].latencyChart.s,
            xMax: leftTaskArr[1].latencyChart.s,
            yMin: -10,
            yMax: 10
        },
        {
            drawTime: "afterDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',
            borderColor: "orange",
            backgroundColor: "transparent",
            borderWidth: 1,
            xMin: leftTaskArr[2].latencyChart.s,
            xMax: leftTaskArr[2].latencyChart.s,
            yMin: -10,
            yMax: 10
        },
        {
            drawTime: "afterDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',
            borderColor: "pink",
            backgroundColor: "transparent",
            borderWidth: 1,
            xMin: leftTaskArr[3].latencyChart.s,
            xMax: leftTaskArr[3].latencyChart.s,
            yMin: -10,
            yMax: 10
        }]


        annotation.push({
            drawTime: "afterDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',
            borderColor: "gray",
            backgroundColor: "transparent",
            borderWidth: 3,
            xMin: (targetGroupData.avg_left_antisaccade_delay + 0.5) * 1000,
            xMax: (targetGroupData.avg_left_antisaccade_delay + 0.5) * 1000,
            yMin: -10,
            yMax: 10
        });

        //groupData

        // annotation.push({
        //     drawTime: "beforeDatasetsDraw", // (default)
        //     type: "box",
        //     mode: "horizontal",
        //     yScaleID: "degree",
        //     xScaleID: "timeid",
        //     // value: '7.5',


        //     // borderColor: 'rgba(0,0,0,0.2)',
        //     backgroundColor: "rgba(0,0,0,0.2)",
        //     borderWidth: 1,
        //     xMin: (0.5 + groupData.left_saccade_delay) * 1000,
        //     xMax: (0.5 + groupData.left_saccade_delay + 7.63 / groupData.left_saccade_speed) * 1000,
        //     yMin: -10,
        //     yMax: 10,
        // });

        return {
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        return null;
                        //return value !== 0 ? value.toLocaleString(/* ... */) : ''
                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#000000'
                },
            },
            annotation: {
                events: ["click"],
                annotations: annotation,
            },
            maintainAspectRatio: false,
            devicePixelRatio: window.devicePixelRatio * 3,
            animation: {
                duration: 0,
            },
            tooltips: {
                callbacks: {

                    title: function (tooltipItem, data) {
                        return '';
                    }
                }
            },
            scales: {
                xAxes: [
                    {
                        id: "timeid",
                        display: true,       // 실제시간 임시로 true//
                        type: 'time',
                        time: {

                            unit: 'mything',

                            displayFormats: {
                                mything: 'ss.SSS'
                            },

                            ///////여기서조정해야함
                            // min: 0 * 1000,
                            // max: 1.5 * 1000,
                        },
                        //x축 숨기려면 이렇게
                        // gridLines: {
                        //     color: "rgba(0, 0, 0, 0)",
                        // },
                        scaleLabel: { /////////////////x축아래 라벨
                            display: false,
                            labelString: 'Time(s)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            source: 'data', //auto,data,labels
                            // autoSkip: true,
                            // maxRotation: 0,
                            // major: {
                            //   enabled: true
                            // },
                            // stepSize: 10,
                            callback: customCallbackXtick,
                            min: 0,
                            max: 1.5 * 1000
                        }
                    }
                ],
                yAxes: [
                    {
                        id: "degree",
                        position: 'left',
                        scaleLabel: { /////////////////x축아래 라벨
                            display: true,
                            labelString: 'Position(d)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            max: 10,
                            min: -10,

                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    },
                    {
                        id: "ax_blink",
                        stepSize: 1,
                        position: 'left',
                        // 오른쪽의 Fixation 옆 Blink축
                        display: false,
                        ticks: {
                            max: 1,
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }]
            },

        };
    }, [taskArr, targetGroupData]);


    const antiSaccadeLeftData = React.useMemo(() => {
        return {
            datasets: [
                { //targety
                    data: taskArr.left[0].target_xdegreeChartArr,
                    steppedLine: "before",

                    label: "targetH",
                    borderColor: "rgba(0,255,0,0.8)",//"#0000ff",
                    backgroundColor: 'rgba(0,255,0,0.8)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기

                },
                { //eyex
                    data: taskArr.left[0].xdegreeChartArr,
                    steppedLine: false,
                    label: "gH1",
                    borderColor: "rgba(255,0,0,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(255,0,0,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.left[1].xdegreeChartArr,
                    steppedLine: false,
                    label: "gH2",
                    borderColor: "rgba(0,0,255,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(0,0,255,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.left[2].xdegreeChartArr,
                    steppedLine: false,
                    label: "gH3",
                    borderColor: "orange",//"#0000ff",
                    backgroundColor: 'orange',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.left[3].xdegreeChartArr,
                    steppedLine: false,
                    label: "gH4",
                    borderColor: "pink",//"#0000ff",
                    backgroundColor: 'pink',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                }
            ],
        }
    }, [taskArr]);

    const antiSaccadeRightChartOption = React.useMemo(() => {
        let annotation = [];

        let rightTaskArr = taskArr.right;
        annotation = [{
            drawTime: "afterDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',
            borderColor: "rgba(255,0,0,0.7)",
            backgroundColor: "transparent",
            borderWidth: 1,
            xMin: rightTaskArr[0].latencyChart.s,
            xMax: rightTaskArr[0].latencyChart.s,
            yMin: -10,
            yMax: 10
        },
        {
            drawTime: "afterDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',
            borderColor: "rgba(0,0,255,0.7)",
            backgroundColor: "transparent",
            borderWidth: 1,
            xMin: rightTaskArr[1].latencyChart.s,
            xMax: rightTaskArr[1].latencyChart.s,
            yMin: -10,
            yMax: 10
        },
        {
            drawTime: "afterDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',
            borderColor: "orange",
            backgroundColor: "transparent",
            borderWidth: 1,
            xMin: rightTaskArr[2].latencyChart.s,
            xMax: rightTaskArr[2].latencyChart.s,
            yMin: -10,
            yMax: 10
        },
        {
            drawTime: "afterDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',
            borderColor: "pink",
            backgroundColor: "transparent",
            borderWidth: 1,
            xMin: rightTaskArr[3].latencyChart.s,
            xMax: rightTaskArr[3].latencyChart.s,
            yMin: -10,
            yMax: 10
        }]


        // for (let i = 0; i < rightTaskArr.length; i++) {
        //     // console.log("bottomTaskArr",bottomTaskArr);
        //     annotation.push({
        //         drawTime: "afterDatasetsDraw", // (default)
        //         type: "box",
        //         mode: "horizontal",
        //         yScaleID: "degree",
        //         xScaleID: "timeid",
        //         // value: '7.5',
        //         borderColor: "rgba(255,0,0,0.7)",
        //         backgroundColor: "transparent",
        //         borderWidth: 1,
        //         xMin: rightTaskArr[i].latencyChart.s,
        //         xMax: rightTaskArr[i].latencyChart.s,
        //         yMin: -10,
        //         yMax: 10
        //     });

        // }

        annotation.push({
            drawTime: "afterDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',
            borderColor: "gray",
            backgroundColor: "transparent",
            borderWidth: 3,
            xMin: (targetGroupData.avg_right_antisaccade_delay + 0.5) * 1000,
            xMax: (targetGroupData.avg_right_antisaccade_delay + 0.5) * 1000,
            yMin: -10,
            yMax: 10
        });



        return {
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        return null;
                        //return value !== 0 ? value.toLocaleString(/* ... */) : ''
                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#000000'
                },
            },
            annotation: {
                events: ["click"],
                annotations: annotation,
            },
            maintainAspectRatio: false,
            devicePixelRatio: window.devicePixelRatio * 3,
            animation: {
                duration: 0,
            },
            tooltips: {
                callbacks: {

                    title: function (tooltipItem, data) {
                        return '';
                    }
                }
            },
            scales: {
                xAxes: [
                    {
                        id: "timeid",
                        display: true,       // 실제시간 임시로 true//
                        type: 'time',
                        time: {

                            unit: 'mything',

                            displayFormats: {
                                mything: 'ss.SSS'
                            },

                            ///////여기서조정해야함
                            // min: 0 * 1000,
                            // max: 1.5 * 1000,
                        },
                        //x축 숨기려면 이렇게
                        // gridLines: {
                        //     color: "rgba(0, 0, 0, 0)",
                        // },
                        scaleLabel: { /////////////////x축아래 라벨
                            display: false,
                            labelString: 'Time(s)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            source: 'data', //auto,data,labels
                            // autoSkip: true,
                            // maxRotation: 0,
                            // major: {
                            //   enabled: true
                            // },
                            // stepSize: 10,
                            callback: customCallbackXtick,
                            min: 0,
                            max: 1.5 * 1000
                        }
                    }
                ],
                yAxes: [
                    {
                        id: "degree",
                        position: 'left',
                        scaleLabel: { /////////////////x축아래 라벨
                            display: true,
                            labelString: 'Position(d)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            max: 10,
                            min: -10,

                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    },
                    {
                        id: "ax_blink",
                        stepSize: 1,
                        position: 'left',
                        // 오른쪽의 Fixation 옆 Blink축
                        display: false,
                        ticks: {
                            max: 1,
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }]
            },

        };
    }, [taskArr, targetGroupData]);


    const antiSaccadeRightData = React.useMemo(() => {
        return {
            datasets: [
                { //targety
                    data: taskArr.right[0].target_xdegreeChartArr,
                    steppedLine: "before",
                    label: "targetH",
                    borderColor: "rgba(0,255,0,0.8)",//"#0000ff",
                    backgroundColor: 'rgba(0,255,0,0.8)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.right[0].xdegreeChartArr,
                    steppedLine: false,
                    label: "gH1",
                    borderColor: "rgba(255,0,0,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(255,0,0,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.right[1].xdegreeChartArr,
                    steppedLine: false,
                    label: "gH2",
                    borderColor: "rgba(0,0,255,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(0,0,255,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.right[2].xdegreeChartArr,
                    steppedLine: false,
                    label: "gH3",
                    borderColor: "orange",//"#0000ff",
                    backgroundColor: 'orange',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: taskArr.right[3].xdegreeChartArr,
                    steppedLine: false,
                    label: "gH4",
                    borderColor: "pink",//"#0000ff",
                    backgroundColor: 'pink',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                }
            ],
        }
    }, [taskArr]);



    const saccadeTaskArr = React.useMemo(() => {
        let taskArr = dataToTaskArr(data.saccadeData);
        // console.log("taskArr",taskArr);
        return taskArr;
    }, [data]);



    const saccadeLeftChartOption = React.useMemo(() => {
        let annotation = [];

        let leftTaskArr = saccadeTaskArr.left;

        for (let i = 0; i < leftTaskArr.length; i++) {
            // console.log("bottomTaskArr",bottomTaskArr);
            annotation.push({
                drawTime: "afterDatasetsDraw", // (default)
                type: "box",
                mode: "horizontal",
                yScaleID: "degree",
                xScaleID: "timeid",
                // value: '7.5',
                borderColor: i === 0 ? "rgba(255,0,0,0.7)" : "rgba(0,0,255,0.7)",
                backgroundColor: "transparent",
                borderWidth: 1,
                xMin: leftTaskArr[i].latencyChart.s,
                xMax: leftTaskArr[i].latencyChart.s,
                yMin: -10,
                yMax: 10
            });
            // annotation.push({
            //     drawTime: "afterDatasetsDraw", // (default)
            //     type: "box",
            //     mode: "horizontal",
            //     yScaleID: "degree",
            //     xScaleID: "timeid",
            //     // value: '7.5',
            //     borderColor: i === 0 ? "rgba(255,0,0,0.7)" : "rgba(0,0,255,0.7)",
            //     backgroundColor: "transparent",
            //     borderWidth: 1,
            //     xMin: leftTaskArr[i].latencyChart.e,
            //     xMax: leftTaskArr[i].latencyChart.e,
            //     yMin: -10,
            //     yMax: 10
            // });

        }


        //groupData

        annotation.push({
            drawTime: "beforeDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',


            borderColor: 'gray',
            backgroundColor: "transparent",
            borderWidth: 3,
            xMin: (0.5 + targetGroupData.avg_left_saccade_delay) * 1000,
            xMax: (0.5 + targetGroupData.avg_left_saccade_delay) * 1000,
            // xMax: (0.5 + groupData.left_saccade_delay + 7.63 / groupData.left_saccade_speed) * 1000,
            yMin: -10,
            yMax: 10,
        });

        return {
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        return null;

                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#000000'
                },
            },
            annotation: {
                events: ["click"],
                annotations: annotation,
            },
            maintainAspectRatio: false,
            devicePixelRatio: window.devicePixelRatio * 3,
            animation: {
                duration: 0,
            },
            tooltips: {
                callbacks: {

                    title: function (tooltipItem, data) {
                        return '';
                    }
                }
            },
            scales: {
                xAxes: [
                    {
                        id: "timeid",
                        display: true,       // 실제시간 임시로 true//
                        type: 'time',
                        time: {

                            unit: 'mything',

                            displayFormats: {
                                mything: 'ss.SSS'
                            },

                            ///////여기서조정해야함
                            // min: 0 * 1000,
                            // max: 1.5 * 1000,
                        },
                        //x축 숨기려면 이렇게
                        // gridLines: {
                        //     color: "rgba(0, 0, 0, 0)",
                        // },
                        scaleLabel: { /////////////////x축아래 라벨
                            display: false,
                            labelString: 'Time(s)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            source: 'data', //auto,data,labels
                            // autoSkip: true,
                            // maxRotation: 0,
                            // major: {
                            //   enabled: true
                            // },
                            // stepSize: 10,
                            callback: customCallbackXtick,
                            min: 0,
                            max: 1.5 * 1000
                        }
                    }
                ],
                yAxes: [
                    {
                        id: "degree",
                        position: 'left',
                        scaleLabel: { /////////////////x축아래 라벨
                            display: true,
                            labelString: 'Position(d)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            max: 10,
                            min: -10,

                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    },
                    {
                        id: "ax_blink",
                        stepSize: 1,
                        position: 'left',
                        // 오른쪽의 Fixation 옆 Blink축
                        display: false,
                        ticks: {
                            max: 1,
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }]
            },

        };
    }, [saccadeTaskArr, targetGroupData]);

    const saccadeLeftData = React.useMemo(() => {
        return {
            datasets: [
                { //targety
                    data: saccadeTaskArr.left[0].target_xdegreeChartArr,
                    steppedLine: "before",
                    label: "targetH",
                    borderColor: "rgba(0,255,0,0.8)",//"#0000ff",
                    backgroundColor: 'rgba(0,255,0,0.8)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: saccadeTaskArr.left[0].xdegreeChartArr,
                    steppedLine: false,
                    label: "gazeH1",
                    borderColor: "rgba(255,0,0,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(255,0,0,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: saccadeTaskArr.left[1].xdegreeChartArr,
                    steppedLine: false,
                    label: "gazeH2",
                    borderColor: "rgba(0,0,255,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(0,0,255,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                }
            ],
        }
    }, [saccadeTaskArr]);

    const saccadeRightChartOption = React.useMemo(() => {
        let annotation = [];

        let rightTaskArr = saccadeTaskArr.right;

        for (let i = 0; i < rightTaskArr.length; i++) {
            // console.log("bottomTaskArr",bottomTaskArr);
            annotation.push({
                drawTime: "afterDatasetsDraw", // (default)
                type: "box",
                mode: "horizontal",
                yScaleID: "degree",
                xScaleID: "timeid",
                // value: '7.5',
                borderColor: i === 0 ? "rgba(255,0,0,0.7)" : "rgba(0,0,255,0.7)",
                backgroundColor: "transparent",
                borderWidth: 1,
                xMin: rightTaskArr[i].latencyChart.s,
                xMax: rightTaskArr[i].latencyChart.s,
                yMin: -10,
                yMax: 10
            });
            // annotation.push({
            //     drawTime: "afterDatasetsDraw", // (default)
            //     type: "box",
            //     mode: "horizontal",
            //     yScaleID: "degree",
            //     xScaleID: "timeid",
            //     // value: '7.5',
            //     borderColor: i === 0 ? "rgba(255,0,0,0.7)" : "rgba(0,0,255,0.7)",
            //     backgroundColor: "transparent",
            //     borderWidth: 1,
            //     xMin: leftTaskArr[i].latencyChart.e,
            //     xMax: leftTaskArr[i].latencyChart.e,
            //     yMin: -10,
            //     yMax: 10
            // });

        }


        //groupData

        annotation.push({
            drawTime: "beforeDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',


            borderColor: 'gray',
            backgroundColor: "transparent",
            borderWidth: 3,
            xMin: (0.5 + targetGroupData.avg_right_saccade_delay) * 1000,
            xMax: (0.5 + targetGroupData.avg_right_saccade_delay) * 1000,
            // xMax: (0.5 + groupData.left_saccade_delay + 7.63 / groupData.left_saccade_speed) * 1000,
            yMin: -10,
            yMax: 10,
        });

        return {
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        return null;

                    },
                    anchor: 'center',
                    align: 'center',
                    color: '#000000'
                },
            },
            annotation: {
                events: ["click"],
                annotations: annotation,
            },
            maintainAspectRatio: false,
            devicePixelRatio: window.devicePixelRatio * 3,
            animation: {
                duration: 0,
            },
            tooltips: {
                callbacks: {

                    title: function (tooltipItem, data) {
                        return '';
                    }
                }
            },
            scales: {
                xAxes: [
                    {
                        id: "timeid",
                        display: true,       // 실제시간 임시로 true//
                        type: 'time',
                        time: {

                            unit: 'mything',

                            displayFormats: {
                                mything: 'ss.SSS'
                            },

                            ///////여기서조정해야함
                            // min: 0 * 1000,
                            // max: 1.5 * 1000,
                        },
                        //x축 숨기려면 이렇게
                        // gridLines: {
                        //     color: "rgba(0, 0, 0, 0)",
                        // },
                        scaleLabel: { /////////////////x축아래 라벨
                            display: false,
                            labelString: 'Time(s)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            source: 'data', //auto,data,labels
                            // autoSkip: true,
                            // maxRotation: 0,
                            // major: {
                            //   enabled: true
                            // },
                            // stepSize: 10,
                            callback: customCallbackXtick,
                            min: 0,
                            max: 1.5 * 1000
                        }
                    }
                ],
                yAxes: [
                    {
                        id: "degree",
                        position: 'left',
                        scaleLabel: { /////////////////x축아래 라벨
                            display: true,
                            labelString: 'Position(d)',
                            fontStyle: 'bold',
                            fontColor: "black"
                        },
                        ticks: {
                            max: 10,
                            min: -10,

                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    },
                    {
                        id: "ax_blink",
                        stepSize: 1,
                        position: 'left',
                        // 오른쪽의 Fixation 옆 Blink축
                        display: false,
                        ticks: {
                            max: 1,
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }]
            },

        };
    }, [saccadeTaskArr, targetGroupData]);

    const saccadeRightData = React.useMemo(() => {
        return {
            datasets: [
                { //targety
                    data: saccadeTaskArr.right[0].target_xdegreeChartArr,
                    steppedLine: "before",
                    label: "targetH",
                    borderColor: "rgba(0,255,0,0.8)",//"#0000ff",
                    backgroundColor: 'rgba(0,255,0,0.8)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: saccadeTaskArr.right[0].xdegreeChartArr,
                    steppedLine: false,
                    label: "gazeH1",
                    borderColor: "rgba(255,0,0,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(255,0,0,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                },
                { //eyex
                    data: saccadeTaskArr.right[1].xdegreeChartArr,
                    steppedLine: false,
                    label: "gazeH2",
                    borderColor: "rgba(0,0,255,0.7)",//"#0000ff",
                    backgroundColor: 'rgba(0,0,255,0.7)',
                    fill: false,
                    yAxisID: "degree",
                    xAxisID: "timeid",
                    borderWidth: 1.5,
                    pointRadius: 0.3, //데이터 포인터크기
                    pointHoverRadius: 2, //hover 데이터포인터크기
                }
            ],
        }
    }, [saccadeTaskArr]);


    const [showLeftward, set_showLeftward] = React.useState(true);
    const [showRightward, set_showRightward] = React.useState(true);
    const drawTransparentCanvas = React.useCallback(() => {
        if (!data || !taskArr || !transparentCanvasRef) return;
        const canvas = transparentCanvasRef.current;
        const rctx = canvas.getContext('2d');

        const Wpx = 1020; //340 *2
        const Hpx = 1020;
        rctx.clearRect(0, 0, Wpx, Hpx);
        for (let key in taskArr) {
            for (let k = 0; k < taskArr[key].length; k++) {
                const task = taskArr[key][k];
                const startRelTime = task.startWaitTime - 0.5;
                const endRelTime = task.relativeEndTime - task.endWaitTime - 2;

                let gazeArr = task.gazeData;
                if (key === 'left') {
                    if (showLeftward === false) break;
                    rctx.strokeStyle = 'rgba(0,0,255,0.3)';
                    rctx.fillStyle = 'rgba(0,0,255,0.3)';
                } else if (key === 'right') {
                    if (showRightward === false) break;
                    rctx.strokeStyle = 'rgba(255,0,255,0.3)';
                    rctx.fillStyle = 'rgba(255,0,255,0.3)';
                }

                let beforeX = null, beforeY = null;
                for (let i = 0; i < gazeArr.length; i++) {
                    if (gazeArr[i].relTime >= startRelTime && gazeArr[i].relTime <= endRelTime) {
                        rctx.beginPath();
                        rctx.lineWidth = 9;

                        //340 : 20 =  x :gazeArr[i].xdegree+10
                        //340px : 20degree = xpx : 
                        // x = 340*(gazeArr[i].xdegree+10)/20 
                        let x = (gazeArr[i].xdegree + 10) * Wpx / 20;
                        let y = (gazeArr[i].ydegree + 10) * Hpx / 20;
                        rctx.arc(x,
                            y,
                            1, 0, Math.PI * 2);
                        rctx.fill();
                        rctx.stroke();

                        if (beforeX !== null && beforeY !== null) {
                            rctx.beginPath();
                            rctx.lineWidth = 9;
                            rctx.moveTo(beforeX, beforeY);
                            rctx.lineTo(x, y);
                            rctx.stroke();
                        }
                        beforeX = x;
                        beforeY = y;
                    }




                }

            }

        }
    }, [data, taskArr, showLeftward, showRightward]);


    React.useEffect(() => {
        if (taskArr) {
            drawTransparentCanvas();
        }
    }, [taskArr, drawTransparentCanvas])


    const myPercent = React.useMemo(() => {
        let x = data.analysis.antisaccade_score;
        let avg = targetGroupData.avg_antisaccade_score;
        let std = targetGroupData.std_antisaccade_score || 1;
        let p = getGaussianMyPercent(avg, std, x);
        // console.log("p",p);
        return p;
    }, [data, targetGroupData]);

    const myState = React.useMemo(() => {
        let mystate;
        if (myPercent <= 10) {
            mystate = '최우수'


        }
        else if (myPercent > 10 && myPercent <= 25) {
            mystate = '우수'


        }
        else if (myPercent > 25 && myPercent <= 75) {
            mystate = "양호"


        }
        else if (myPercent > 75 && myPercent <= 90) {
            mystate = "미흡"


        }
        else {
            mystate = "주의"


        }
        return mystate;
    }, [myPercent])

    return (<div className="AntiSaccadeView">
        <div className="row">
            <div className="titleBox">
                <div className="title">
                    반대로 보기 결과
                </div>
                <div className="cbox">
                    <div style={{ height: '60%', display: 'flex' }}>
                        <div style={{ width: '55%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <img src={imgbase64forPDF[myState]} alt="" style={{ height: '50%' }} />

                        </div>
                        <div style={{ width: '45%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontSize: '19px', fontWeight: '700', paddingLeft: '7px', paddingTop: '12px' }}>
                            {myState}
                        </div>
                    </div>
                    <div style={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '15px', borderTop: '1px solid #1A408E' }}>
                        <ul>
                            <li>내 평균: {data.analysis.antisaccade_score.toFixed(2)}점 (상위 {myPercent}%)</li>
                            <li>또래 평균 점수: {targetGroupData.avg_antisaccade_score.toFixed(2)}점</li>
                            <li>전체 평균 점수: {everyGroupData.avg_antisaccade_score.toFixed(2)}점</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="titleBox" style={{ width: '330px' }}>
                <div className="title">
                    반대로 보기 점수 분포
                </div>
                <div id="antisaccadeGradeChart" className="cbox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BarChartGrade
                        myScore={data.analysis.antisaccade_score}
                        avgGroupScore={targetGroupData.avg_antisaccade_score}
                        stdGroupScore={targetGroupData.std_antisaccade_score}
                    />
                </div>
            </div>
            <div className="titleBox" style={{ width: '420px' }}>
                <div className="title">
                    이동방향 오류(percent)
                </div>
                <div id="antisaccadeErrDirectionChart"className="cbox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ChartComponent
                        type="bar"
                        height={null}
                        width={null}
                        data={errBarChartData}
                        options={errBarChartOption}
                    />
                </div>
            </div>
            <div className="titleBox" style={{ width: '420px' }}>
                <div className="title">
                    평균 지체시간(latency)
                </div>
                <div id="antisaccadeLatencyChart"className="cbox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ChartComponent
                        type="bar"
                        height={null}
                        width={null}
                        data={delayBarChartData}
                        options={delayBarChartOption}
                    />
                </div>
            </div>
        </div>

        {/* 2째줄 */}
        <div className="row">
            <div className="titleBox" style={{ width: '450px', height: '450px' }}>
                <div className="title">
                    반대로 보기 시선궤적 <button className="viewerbtn" onClick={() => set_showGazeViewer(true)}>Viewer</button>
                </div>
                <div className="cbox" id="antisaccadeRealChart">
                    <div style={{ height: '30px', display: 'flex', justifyContent: 'center', paddingLeft: '10px', paddingTop: '3px', boxSizing: 'border-box' }}>
                        Radius : 7.63 Degree
                    </div>
                    <div style={{ height: 'calc(100% - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="_10degreeDiv" style={{ width: '340px', height: '340px' }}>
                            <div className="target center" />
                            <div className="target left" />
                            <div className="target right" />

                            <canvas className="transparentCanvas" ref={transparentCanvasRef} width={1020} height={1020} />
                        </div>
                    </div>
                    <div className="customLabel" style={{ height: '30px', display: 'flex' }}>

                        <div className="clickzone" style={{
                            textDecoration: showRightward === true ? "" : "line-through"
                        }} onClick={() => set_showRightward(!showRightward)}><div className="rightward" />Rightward(좌측으로)</div>&nbsp;&nbsp;
                        <div className="clickzone" style={{
                            textDecoration: showLeftward === true ? "" : "line-through"
                        }} onClick={() => set_showLeftward(!showLeftward)}><div className="leftward" />Leftward(우측으로)</div>&nbsp;&nbsp;

                    </div>
                </div>
            </div>
            <div className="titleBox" style={{ width: '1000px', height: '450px' }}>
                <div className="title">
                    시간에 따른 시선이동
                </div>
                <div id="antisaccadeDirectionChart" className="cbox">
                    <div className="cbox2r">
                        <div className="cbox2w">
                            <div className="c_label">
                                <strong>{"Pro-saccade, Leftward"}</strong>
                            </div>
                            <div className="c_chart">
                                <ChartComponent
                                    type="line"
                                    height={null}
                                    width={null}
                                    data={saccadeLeftData}
                                    options={saccadeLeftChartOption}
                                />
                            </div>
                            <div className="c_avg">
                    
                                myAvgLatency : <strong>{(data.analysis.left_saccade_delay * 1000).toFixed(0)} ms</strong>
                                {/* , myAvgSpeed : <strong>{data.analysis.left_saccade_speed.toFixed(1)} degree/s</strong> */}
                            </div>
                        </div>

                        <div className="cbox2w">
                            <div className="c_label">
                                <strong>{"Pro-saccade, Rightward"}</strong>
                            </div>
                            <div className="c_chart">
                                <ChartComponent
                                    type="line"
                                    height={null}
                                    width={null}
                                    data={saccadeRightData}
                                    options={saccadeRightChartOption}
                                />
                            </div>
                            <div className="c_avg">
                            myAvgLatency : <strong>{(data.analysis.right_saccade_delay * 1000).toFixed(0)} ms</strong>
                            {/* , myAvgSpeed : <strong>{data.analysis.right_saccade_speed.toFixed(1)} degree/s</strong> */}
                            </div>
                        </div>
                    </div>
                    <div className="cbox2r">
                        <div className="cbox2w">
                            <div className="c_label">
                                <strong>{"Anti-saccade, Leftward (오른쪽을 봐야함)"}</strong>
                            </div>
                            <div className="c_chart">
                                <ChartComponent
                                    type="line"
                                    height={null}
                                    width={null}
                                    data={antiSaccadeLeftData}
                                    options={antiSaccadeLeftChartOption}
                                />

                            </div>
                            <div className="c_avg">
                            myAvgLatency : <strong>{(data.analysis.left_antisaccade_delay * 1000).toFixed(0)} ms</strong>

                            </div>
                        </div>
                        <div className="cbox2w">
                            <div className="c_label">
                                <strong>{"Anti-saccade, Rightward (왼쪽을 봐야함)"}</strong>
                            </div>
                            <div className="c_chart">
                                <ChartComponent
                                    type="line"
                                    height={null}
                                    width={null}
                                    data={antiSaccadeRightData}
                                    options={antiSaccadeRightChartOption}
                                />
                            </div>
                            <div className="c_avg">
                            myAvgLatency : <strong>{(data.analysis.right_antisaccade_delay * 1000).toFixed(0)} ms</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 3째줄 */}
        <div className="row" style={{ display: 'block' }}>

            <div className="titleUnderline">
                <div className="title">
                    반대로 보기(anti saccade)는 무엇인가요?
                </div>
                <div className="explain">
                    <ul>
                        <li>
                            반대로 보기는 지각된 사물을 자동적으로 바라보는 것을 통제하는 능력을 측정합니다.
                        </li>
                        <li>
                            따라보기(pro saccade)과제는 지각된 대상을 바라보는 과제이고, 반대로 보기(anti saccade)과제는 지각된 대상을 보지 않고 반대로 시선을 이동하는 과제입니다. 무언가 보이면 반사적으로 시선이 가려는 경향이 있기 때문에, 지각에 대한 행동을 통제하는 능력이나 집중력이 낮으면 반대보기 과제를 하기 어렵습니다. 집중력 저하, 난독증, ADHD 등의 증상과 관련이 있는 경우가 있습니다.
                        </li>

                    </ul>

                </div>
            </div>
            <div className="titleUnderline">
                <div className="title">
                    반대로 보기 정확도는 무엇인가요?
                </div>
                <div className="explain">
                    <ul>
                        <li>
                            따라보기는 대상이 있는 쪽으로, 반대보기는 대상의 반대쪽으로 시선이 움직였는지를 측정한 비율입니다. 반대보기의 정확도가 높은 것이 바람직합니다.
                        </li>


                    </ul>

                </div>
            </div>
            <div className="titleUnderline">
                <div className="title">
                    반대로 보기 지체시간은 무엇인가요?
                </div>
                <div className="explain">
                    <ul>
                        <li>
                            대상을 보고 시선을 움직이기 전까지 소요되는 시간입니다. 반대보기할 때 지체시간이 짧은 것이 바람직합니다.
                        </li>


                    </ul>

                </div>
            </div>
        </div>
        {
            showGazeViewer &&
            <div className="GazeViewerWrap">
                <div className="modal">
                    <div className="title"> 실제 시선 측정데이터 <button onClick={() => set_showGazeViewer(false)}>닫기</button></div>
                    <div className="view">
                        <GazeViewer data={data} />
                    </div>
                </div>


            </div>
        }
    </div>)
}

const DownLoadPDF = ({ ...props }) => {
    const { 
        // dataArr, targetGroupData, everyGroupData,
         AgencyLogoBase64, handlePDFstart, iframesrc
    } = props;

    return (<div className="DownLoadPDF" style={{ display: 'flex' }}>
        <div style={{ width: '490px', marginRight: '10px' }}>
            <div style={{ marginTop: '10px', borderBottom: '1px solid #1a408e', padding: '10px' }}>
                <div>
                    PDF의 기관 로고 이미지
                </div>
                <div style={{ height: '200px', backgroundColor: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={(AgencyLogoBase64 ? AgencyLogoBase64 : imgbase64forPDF['기본로고'])}
                        alt="" style={{
                            maxWidth: '150px',
                            maxHeight: '150px', backgroundColor: 'white'
                        }}
                    />
                </div>
                <div style={{ cursor: 'default', marginTop: '10px' }}>
                    <ul>
                        <li>
                            로고 이미지를 등록 하시려면 <span className="mh" onClick={() => {
                                //   history.push('/setting/pay');
                            }}>계정설정</span>에서 이미지를 설정하십시오.
                        </li>
                        <li>
                            로고 이미지를 변경 하신뒤에 로그아웃 후 재 로그인 해 주세요.
                        </li>
                        <li>
                            가능한 가로 세로의 길이가 같은 이미지를 등록해 주세요.
                        </li>
                        <li>
                            gif파일은 PDF변환 기관로고 이미지로 동작하지 않습니다.
                        </li>
                    </ul>

                </div>
                <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button className="StartMakingPDF-btn" onClick={handlePDFstart}>보고서 다운받기 및 미리보기</button>
                </div>
            </div>
        </div>
        <div style={{ width: '900px', height: '750px', outline: '2px solid #1A408E' }}>
            {iframesrc ?
                <Iframe url={iframesrc}
                    frameBorder="0"
                    cellspacing="0"
                    //width="450px"
                    //height="450px"
                    id="pdfiframe"
                    className={iframesrc ? "pdfiframe visible" : "pdfiframe"}
                    display="block"
                />
                :
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', textAlign: 'center' }}>
                    보고서 미리보기탭<br />
                    미리보기 버튼을 누르시면 변환 후 여기에 표시 됩니다.
                </div>
            }
        </div>
    </div>)
}

export default ScreeningViewer;