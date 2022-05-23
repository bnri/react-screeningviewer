import React from "react";
import './ScreeningViewer.scss';
import { imgbase64forPDF } from './img/base64';

import ChartComponent from "react-chartjs-2"
import "chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js";
import "chartjs-plugin-datalabels";
import "chartjs-plugin-annotation";

import GazeViewer from "react-gazeviewer";


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

const ScreeningViewer = ({ ...props }) => {
    const { dataArr } = props;
    const { onClose } = props;

    const [selDataIndex, set_selDataIndex] = React.useState(2);

    const selScreeningType = React.useMemo(() => {
        if (dataArr && dataArr[selDataIndex]) {
            return dataArr[selDataIndex].screeningType;
        }
        else {
            return null;
        }
    }, [dataArr, selDataIndex])

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
                <div className="oneLeftBarList" style={{ marginTop: '5px' }} onClick={onClose} >
                    나가기
                </div>
            </div>
            <div className="rightContents">
                {selScreeningType === 'saccade' &&
                    <SaccadeView data={dataArr[selDataIndex]} />
                }
                {selScreeningType === 'pursuit' &&
                    <PursuitView data={dataArr[selDataIndex]} />
                }
                {selScreeningType === 'antisaccade' &&
                    <AntiSaccadeView data={dataArr[selDataIndex]} />
                }
            </div>
        </div>
    </div>)
}


const SaccadeView = ({ ...props }) => {
    const { data } = props;


    const groupData = React.useMemo(() => {
        return {
            down_fixation_stability: 0.04904507977451076,
            down_saccade_delay: 0.37178149999999996,
            down_saccade_speed: 271.22066192543087,
            left_fixation_stability: 0.04501736333714864,
            left_saccade_delay: 0.36730400000000017,
            left_saccade_speed: 285.917055501673,
            right_fixation_stability: 0.04455070458896356,
            right_saccade_delay: 0.3669095,
            right_saccade_speed: 271.7449265136197,
            up_fixation_stability: 0.04707128434877034,
            up_saccade_delay: 0.3695645000000004,
            up_saccade_speed: 246.871934245693936


        }
    }, []);



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
            xMin: (0.5 + groupData.up_saccade_delay) * 1000,
            xMax: (0.5 + groupData.up_saccade_delay + 7.63 / groupData.up_saccade_speed) * 1000,
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
                            min:0,
                            max:1.5*1000
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
    }, [taskArr, groupData]);

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
                    steppedLine: "before",
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
                    steppedLine: "before",
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
            xMin: (0.5 + groupData.down_saccade_delay) * 1000,
            xMax: (0.5 + groupData.down_saccade_delay + 7.63 / groupData.down_saccade_speed) * 1000,
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
                            min:0,
                            max:1.5*1000
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
    }, [taskArr, groupData]);

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
                    steppedLine: "before",
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
                    steppedLine: "before",
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
            xMin: (0.5 + groupData.right_saccade_delay) * 1000,
            xMax: (0.5 + groupData.right_saccade_delay + 7.63 / groupData.right_saccade_speed) * 1000,
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
                            min:0,
                            max:1.5*1000
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
    }, [taskArr, groupData]);

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
                    steppedLine: "before",
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
                    steppedLine: "before",
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
            xMin: (0.5 + groupData.left_saccade_delay) * 1000,
            xMax: (0.5 + groupData.left_saccade_delay + 7.63 / groupData.left_saccade_speed) * 1000,
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
                            min:0,
                            max:1.5*1000
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
    }, [taskArr, groupData]);

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
                    steppedLine: "before",
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
                    steppedLine: "before",
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

    return (<div className="SaccadeView">
        <div className="row">
            <div className="titleBox">
                <div className="title">
                    도약안구운동 결과
                </div>
                <div className="cbox">
                    <div style={{ height: '60%', display: 'flex' }}>
                        <div style={{ width: '55%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <img src={imgbase64forPDF["최우수"]} alt="" style={{ height: '50%' }} />

                        </div>
                        <div style={{ width: '45%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontSize: '19px', fontWeight: '700', paddingLeft: '7px', paddingTop: '12px' }}>
                            최우수
                        </div>
                    </div>
                    <div style={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '15px', borderTop: '1px solid #1A408E' }}>
                        <ul>
                            <li>내 평균: x% (상위 x%)</li>
                            <li>또래 평균 점수: x점</li>
                            <li>전체 평균 점수: x점</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="titleBox" style={{ width: '330px' }}>
                <div className="title">
                    도약안구운동 점수 분포
                </div>
                <div className="cbox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    내점수도없고, 그룹점수도없다
                </div>
            </div>
            <div className="titleBox" style={{ width: '850px' }}>
                <div className="title">
                    도약안구운동 점수 분포
                </div>
                <div className="cbox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="cbox3 latencyChartWrap">
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
                                    data: [groupData.up_saccade_delay * 1000,
                                    groupData.right_saccade_delay * 1000,
                                    groupData.down_saccade_delay * 1000,
                                    groupData.left_saccade_delay * 1000],
                                    label: 'group Avg Latency time (ms)',
                                    // backgroundColor:'red',
                                    borderColor: "rgba(0,0,0,0.2)",
                                    fill: false,
                                }]
                            }}
                            options={radarChartOption}
                        />

                    </div>
                    <div className="cbox3 speedChartWrap">
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
                                    data: [groupData.up_saccade_speed,
                                    groupData.right_saccade_speed,
                                    groupData.down_saccade_speed,
                                    groupData.left_saccade_speed],
                                    label: 'group Avg Speed (degree/s)',
                                    // backgroundColor:'red',
                                    borderColor: "rgba(0,0,0,0.2)",
                                    fill: false,
                                }]
                            }}
                            options={radarChartOption}
                        />
                    </div>
                    <div className="cbox3 fixationErrChartWrap">
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
                                    data: [groupData.up_fixation_stability,
                                    groupData.right_fixation_stability,
                                    groupData.down_fixation_stability,
                                    groupData.left_fixation_stability],
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
                <div className="cbox">
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
                <div className="cbox">
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
    const { data } = props;
    const [showGazeViewer, set_showGazeViewer] = React.useState(false);



    const groupData = React.useMemo(() => {
        return {
            anticlockwise_err: 1.1755913592135074,
            clockwise_err: 1.1537194245685808
        }
    }, []);

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
                    data: [groupData.clockwise_err, groupData.anticlockwise_err],
                    // backgroundColor: themeColors,
                    backgroundColor: "gray",
                    barPercentage: 0.8,
                    categoryPercentage: 0.5,
                    borderColor: "transparent"
                }
            ]
        };
    }, [groupData, data]);

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
    return (<div className="PursuitView">
        <div className="row">
            <div className="titleBox">
                <div className="title">
                    추적안구운동 결과
                </div>
                <div className="cbox">
                    <div style={{ height: '60%', display: 'flex' }}>
                        <div style={{ width: '55%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <img src={imgbase64forPDF["최우수"]} alt="" style={{ height: '50%' }} />

                        </div>
                        <div style={{ width: '45%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontSize: '19px', fontWeight: '700', paddingLeft: '7px', paddingTop: '12px' }}>
                            최우수
                        </div>
                    </div>
                    <div style={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '15px', borderTop: '1px solid #1A408E' }}>
                        <ul>
                            <li>내 평균: x% (상위 x%)</li>
                            <li>또래 평균 점수: x점</li>
                            <li>전체 평균 점수: x점</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="titleBox" style={{ width: '330px' }}>
                <div className="title">
                    추적안구운동 점수 분포
                </div>
                <div className="cbox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    내점수도없고, 그룹점수도없다
                </div>
            </div>
            <div className="titleBox" style={{ width: '850px' }}>
                <div className="title">
                    추적안구운동 점수 분포
                </div>
                <div className="cbox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="cbox2">
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
                <div className="cbox">
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
                <div className="cbox">
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
    const { data } = props;

    const [showGazeViewer, set_showGazeViewer] = React.useState(false);
    const transparentCanvasRef = React.useRef();
    const groupData = React.useMemo(() => {
        return {
            down_fixation_stability: 0.04904507977451076,
            down_saccade_delay: 0.37178149999999996,
            down_saccade_speed: 271.22066192543087,
            left_fixation_stability: 0.04501736333714864,
            left_saccade_delay: 0.36730400000000017,
            left_saccade_speed: 285.917055501673,
            right_fixation_stability: 0.04455070458896356,
            right_saccade_delay: 0.3669095,
            right_saccade_speed: 271.7449265136197,
            up_fixation_stability: 0.04707128434877034,
            up_saccade_delay: 0.3695645000000004,
            up_saccade_speed: 246.871934245693936,
            left_antisaccade_delay: 0.42823249999999987,
            right_antisaccade_delay: 0.4170207500000001
        }
    }, []);

    const barChartData = React.useMemo(() => {
        return {
            labels: ['따라보기', '반대보기'],
            datasets: [
                {
                    type: 'bar',
                    label: "my avg delay",
                    data: [(data.analysis.left_saccade_delay+data.analysis.right_saccade_delay) * 500, (data.analysis.left_antisaccade_delay+data.analysis.right_antisaccade_delay) * 500],
                    // backgroundColor: themeColors,
                    backgroundColor: "red",
                    barPercentage: 0.8,
                    categoryPercentage: 0.5,
                    borderColor: "transparent"
                },
                {
                    type: 'bar',
                    label: "group avg delay",
                    data: [(groupData.left_saccade_delay+groupData.right_saccade_delay) * 500, (groupData.left_antisaccade_delay+groupData.right_antisaccade_delay) * 500],
                    // backgroundColor: themeColors,
                    backgroundColor: "gray",
                    barPercentage: 0.8,
                    categoryPercentage: 0.5,
                    borderColor: "transparent"
                },
             
            ]
        };
    }, [groupData, data]);

    const barChartOption = React.useMemo(() => {
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
                        console.log("tooltipItems", tooltipItems, data);
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
                display: true,
                text: "평균 지체시간(delay)"
            },
            legend: {
                display: true,
            }
        };
    }, []);


    const taskArr = React.useMemo(() => {

        const MONITOR_PX_PER_CM = data.monitorInform.MONITOR_PX_PER_CM;
        const pixel_per_cm = data.monitorInform.MONITOR_PX_PER_CM; //1cm 당 pixel
        const degree_per_cm = Math.atan(1 / data.defaultZ) * 180 / Math.PI;
        const w = data.screenW;
        const h = data.screenH;

        const screeningObjectList = data.screeningObjectList;


        let taskArr = {
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

                };


                task.latencyChart = latencyChart;
            }

        }

        // console.log("taskArr",taskArr);
        return taskArr;
    }, [data])

    const antiSaccadeLeftChartOption = React.useMemo(() => {
        let annotation = [];

        let leftTaskArr = taskArr.left;
        let sum = 0;
        for (let i = 0; i < leftTaskArr.length; i++) {
            // console.log("bottomTaskArr",bottomTaskArr);
            annotation.push({
                drawTime: "afterDatasetsDraw", // (default)
                type: "box",
                mode: "horizontal",
                yScaleID: "degree",
                xScaleID: "timeid",
                // value: '7.5',
                borderColor: "rgba(255,0,0,0.7)",
                backgroundColor: "transparent",
                borderWidth: 1,
                xMin: leftTaskArr[i].latencyChart.s,
                xMax: leftTaskArr[i].latencyChart.s,
                yMin: -10,
                yMax: 10
            });
            sum += leftTaskArr[i].latencyChart.s;
        }
        let avg = sum / leftTaskArr.length;

        annotation.push({
            drawTime: "afterDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',
            borderColor: "rgba(0,0,255,0.7)",
            backgroundColor: "transparent",
            borderWidth: 3,
            xMin: avg,
            xMax: avg,
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
            borderColor: "black",
            backgroundColor: "transparent",
            borderWidth: 3,
            xMin: (groupData.left_antisaccade_delay + 0.5) * 1000,
            xMax: (groupData.left_antisaccade_delay + 0.5) * 1000,
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
                            min:0,
                            max:1.5*1000
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
    }, [taskArr, groupData]);


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
                    steppedLine: "before",
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
                    steppedLine: "before",
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
                    steppedLine: "before",
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
                    steppedLine: "before",
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
        let sum = 0;
        for (let i = 0; i < rightTaskArr.length; i++) {
            // console.log("bottomTaskArr",bottomTaskArr);
            annotation.push({
                drawTime: "afterDatasetsDraw", // (default)
                type: "box",
                mode: "horizontal",
                yScaleID: "degree",
                xScaleID: "timeid",
                // value: '7.5',
                borderColor: "rgba(255,0,0,0.7)",
                backgroundColor: "transparent",
                borderWidth: 1,
                xMin: rightTaskArr[i].latencyChart.s,
                xMax: rightTaskArr[i].latencyChart.s,
                yMin: -10,
                yMax: 10
            });
            sum += rightTaskArr[i].latencyChart.s;
        }
        let avg = sum / rightTaskArr.length;

        annotation.push({
            drawTime: "afterDatasetsDraw", // (default)
            type: "box",
            mode: "horizontal",
            yScaleID: "degree",
            xScaleID: "timeid",
            // value: '7.5',
            borderColor: "rgba(0,0,255,0.7)",
            backgroundColor: "transparent",
            borderWidth: 3,
            xMin: avg,
            xMax: avg,
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
            borderColor: "black",
            backgroundColor: "transparent",
            borderWidth: 3,
            xMin: (groupData.right_antisaccade_delay + 0.5) * 1000,
            xMax: (groupData.right_antisaccade_delay + 0.5) * 1000,
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
                            min:0,
                            max:1.5*1000
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
    }, [taskArr, groupData]);


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
                    steppedLine: "before",
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
                    steppedLine: "before",
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
                    steppedLine: "before",
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
                    steppedLine: "before",
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



    return (<div className="AntiSaccadeView">
        <div className="row">
            <div className="titleBox">
                <div className="title">
                    반대로 보기 결과
                </div>
                <div className="cbox">
                    <div style={{ height: '60%', display: 'flex' }}>
                        <div style={{ width: '55%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <img src={imgbase64forPDF["최우수"]} alt="" style={{ height: '50%' }} />

                        </div>
                        <div style={{ width: '45%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontSize: '19px', fontWeight: '700', paddingLeft: '7px', paddingTop: '12px' }}>
                            최우수
                        </div>
                    </div>
                    <div style={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '15px', borderTop: '1px solid #1A408E' }}>
                        <ul>
                            <li>내 평균: x% (상위 x%)</li>
                            <li>또래 평균 점수: x점</li>
                            <li>전체 평균 점수: x점</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="titleBox" style={{ width: '330px' }}>
                <div className="title">
                    반대로 보기 점수 분포
                </div>
                <div className="cbox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    내점수도없고, 그룹점수도없다
                </div>
            </div>
            <div className="titleBox" style={{ width: '420px' }}>
                <div className="title">
                    방향 정확성
                </div>
                <div className="cbox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    방향정확성갑싱 없음 그래프 표현불가
                </div>
            </div>
            <div className="titleBox" style={{ width: '420px' }}>
                <div className="title">
                    지체시간(delay)
                </div>
                <div className="cbox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ChartComponent
                        type="bar"
                        height={null}
                        width={null}
                        data={barChartData}
                        options={barChartOption}
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
                <div className="cbox">
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
                <div className="cbox">
                    <div className="cbox2r">
                        <div className="cbox2w">
                            <div className="c_label">
                                <strong>{"Pro-saccade, Leftward"}</strong>
                            </div>
                            <div className="c_chart">
                                11111
                            </div>
                            <div className="c_avg">
                                설명1
                            </div>
                        </div>

                        <div className="cbox2w">
                            <div className="c_label">
                                <strong>{"Pro-saccade, Rightward"}</strong>
                            </div>
                            <div className="c_chart">
                                2222
                            </div>
                            <div className="c_avg">
                                설명2
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
                                설명3
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
                                설명4
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


export default ScreeningViewer;