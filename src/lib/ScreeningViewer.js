import React from "react";
import './ScreeningViewer.scss';
import { imgbase64forPDF } from './img/base64';

import ChartComponent from "react-chartjs-2"
import "chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js";
import "chartjs-plugin-datalabels";
import "chartjs-plugin-annotation";
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
const ScreeningViewer = ({ ...props }) => {
    const { dataArr } = props;

    const [selDataIndex, set_selDataIndex] = React.useState(0);

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
            </div>
            <div className="rightContents">
                {selScreeningType === 'saccade' &&
                    <SaccadeView data={dataArr[selDataIndex]} />
                }
            </div>
        </div>
    </div>)
}
const SaccadeView = ({ ...props }) => {
    const { data } = props;


    const groupData = React.useMemo(()=>{
        return {
            down_fixation_stability: 0.05904507977451076,
            down_saccade_delay: 0.34178149999999996,
            down_saccade_speed: 251.22066192543087,
            left_fixation_stability: 0.05501736333714864,
            left_saccade_delay: 0.22730400000000017,
            left_saccade_speed: 385.917055501673,
            right_fixation_stability: 0.03455070458896356,
            right_saccade_delay: 0.3469095,
            right_saccade_speed: 241.7449265136197,
            up_fixation_stability: 0.03707128434877034,
            up_saccade_delay: 0.2595645000000004,
            up_saccade_speed: 46.871934245693936
        }
    },[]);

    const radarChartOption = React.useMemo(() => {
        return {
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
    },[]);



    const taskArr = React.useMemo(()=>{
        console.log(data);

        const MONITOR_PX_PER_CM = data.monitorInform.MONITOR_PX_PER_CM;
        const pixel_per_cm = data.monitorInform.MONITOR_PX_PER_CM; //1cm 당 pixel
        const degree_per_cm = Math.atan(1 / data.defaultZ) * 180 / Math.PI;
        const w = data.screenW;
        const h = data.screenH;

        const screeningObjectList = data.screeningObjectList;


        let topTaskArr=[];
        
        for(let i = 0 ; i <screeningObjectList.length ; i++){
            if(screeningObjectList[i].analysis.direction==='top'){
                topTaskArr.push({
                    ...screeningObjectList[i],
                    gazeData:data.taskArr[i],
                    analysis:data.analysisArr[i]                    
                });
            
            }
        }


        
        for (let i = 0; i < topTaskArr.length; i++) {
            const task = topTaskArr[i];
          
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
            const endRelTime = task.relativeEndTime - task.endWaitTime-2;
            let target_ydegreeChartArr=[];
            let ydegreeChartArr=[];

          

            for(let j = 0 ; j <gazeArr.length; j++){
                if(gazeArr[j].relTime>=startRelTime && gazeArr[j].relTime<=endRelTime ){
                    target_ydegreeChartArr.push({
                        x:(gazeArr[j].relTime-startRelTime)*1000,
                        y:gazeArr[j].target_ydegree,
                    })
                    ydegreeChartArr.push({
                        x:(gazeArr[j].relTime-startRelTime)*1000,
                        y:gazeArr[j].ydegree,
                    })

               

                }


              
            }
  
            task.target_ydegreeChartArr=target_ydegreeChartArr;
            task.ydegreeChartArr=ydegreeChartArr;

            let blkChartArr=[];
            for(let j = 0 ; j <task.blinkArr.length ; j++){
                if((task.blinkArr[j].BLKS-startRelTime)>=0){
               
                    blkChartArr.push({
                        x:(task.blinkArr[j].BLKS-startRelTime)*1000,
                        y:0
                    });
                    blkChartArr.push({
                        x:(task.blinkArr[j].BLKS-startRelTime)*1000,
                        y:1
                    })
                    blkChartArr.push({
                        x:(task.blinkArr[j].BLKS+task.blinkArr[j].BLKD-startRelTime)*1000,
                        y:1
                    })
                    blkChartArr.push({
                        x:(task.blinkArr[j].BLKS+task.blinkArr[j].BLKD-startRelTime)*1000,
                        y:0
                    })
                }
                else if((task.blinkArr[j].BLKS-startRelTime)<=0 && (task.blinkArr[j].BLKS+task.blinkArr[j].BLKD-startRelTime)>=0){
                    blkChartArr.push({
                        x:0,
                        y:0
                    });
                    blkChartArr.push({
                        x:0,
                        y:1
                    })
                    blkChartArr.push({
                        x:(task.blinkArr[j].BLKS+task.blinkArr[j].BLKD-startRelTime)*1000,
                        y:1
                    })
                    blkChartArr.push({
                        x:(task.blinkArr[j].BLKS+task.blinkArr[j].BLKD-startRelTime)*1000,
                        y:0
                    })
                }
            }
      
            task.blkChartArr=blkChartArr;

            let latencyChart={
                s:(task.analysis.startTime - startRelTime)*1000,
                e:(task.analysis.endTime - startRelTime)*1000,
            };
        
         
            task.latencyChart=latencyChart;
        }


        return {
            top:topTaskArr
        };
    },[data])


    const saccadeTopChartOption = React.useMemo(()=>{
        let annotation=[];

        let topTaskArr = taskArr.top;
        console.log(topTaskArr);
        for(let i = 0 ; i<topTaskArr.length; i++){
            
            annotation.push({
                drawTime: "afterDatasetsDraw", // (default)
                type: "box",
                mode: "horizontal",
                yScaleID: "degree",
                xScaleID: "timeid",
                // value: '7.5',
                borderColor: i===0?"rgba(255,0,0,0.7)":"rgba(0,0,255,0.7)",
                backgroundColor: "transparent",
                borderWidth: 1,
                xMin:topTaskArr[i].latencyChart.s,
                xMax:topTaskArr[i].latencyChart.s,
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
                borderColor: i===0?"rgba(255,0,0,0.7)":"rgba(0,0,255,0.7)",
                backgroundColor: "transparent",
                borderWidth: 1,
                xMin:topTaskArr[i].latencyChart.e,
                xMax:topTaskArr[i].latencyChart.e,
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
            xMin: (0.5+groupData.up_saccade_delay)*1000,
            xMax:800,
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

                                // console.log("asfasf",val,index);
                                if (index % 120 === 0) {
                                    return ((val * 1).toFixed(2)*1).toFixed(1)-0.5;
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

        };
    },[taskArr,groupData]);

    const saccadeTopData = React.useMemo(()=>{
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
                // { //BLINK
                //     data: taskArr.top[0].blkChartArr,
                //     steppedLine: "before",
                //     borderWidth: 0,
                //     label: "BlinkV1",
                //     borderColor: "rgba(255,0,0,0.4)",//"#0000ff",
                //     backgroundColor: 'rgba(255,0,0,0.4)',
                //     fill: true,
                //     xAxisID: "timeid",
                //     yAxisID: "ax_blink",
                //     pointRadius: 0, //데이터 포인터크기
                //     pointHoverRadius: 0, //hover 데이터포인터크기
                // },//BLINK
                // { //BLINK
                //     data: taskArr.top[1].blkChartArr,
                //     steppedLine: "before",
                //     borderWidth: 0,
                //     label: "BlinkV2",
                //     borderColor: "rgba(0,0,255,0.4)",//"#0000ff",
                //     backgroundColor: 'rgba(0,0,255,0.4)',
                //     fill: true,
                //     xAxisID: "timeid",
                //     yAxisID: "ax_blink",
                //     pointRadius: 0, //데이터 포인터크기
                //     pointHoverRadius: 0, //hover 데이터포인터크기
                // },//BLINK
               
            ],
        }
    },[taskArr]);



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
                                },{
                                    data: [data.analysis.up_saccade_delay * 1000+100,
                                    data.analysis.right_saccade_delay * 1000-100,
                                    data.analysis.down_saccade_delay * 1000+100,
                                    data.analysis.left_saccade_delay * 1000-100],
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
                                }]
                            }}
                            options={radarChartOption}
                        />
                    </div>
                    <div className="cbox3 fixationErrChartWrap">그래프 fixationerr?</div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="titleBox" style={{ width: '450px' ,height:'450px'}}>
                <div className="title">
                    도약 안구운동 시선
                </div>
                <div className="cbox">
                    재생가능 그래프?
                </div>
            </div>
            <div className="titleBox" style={{ width: '1000px',height:'450px' }}>
                <div className="title">
                    도약 안구운동 시선
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
                                myAvgLatency : <strong>{(data.analysis.up_saccade_delay*1000).toFixed(0)} ms</strong>, myAvgSpeed : <strong>{data.analysis.up_saccade_speed.toFixed(1)} degree/s</strong>
                            </div>
                        </div>
                        <div className="cbox2w">
                            2
                        </div>
                    </div>
                    <div className="cbox2r">
                        <div className="cbox2w">
                            1
                        </div>
                        <div className="cbox2w">
                            2
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

    </div>)
}

export default ScreeningViewer;