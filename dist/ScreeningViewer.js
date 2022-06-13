"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./ScreeningViewer.scss");

var _base = require("./img/base64");

var _reactChartjs = _interopRequireWildcard(require("react-chartjs-2"));

require("chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js");

require("chartjs-plugin-datalabels");

require("chartjs-plugin-annotation");

var _html2canvas = _interopRequireDefault(require("html2canvas"));

var _reactGazeviewer = _interopRequireDefault(require("react-gazeviewer"));

var _reactIframe = _interopRequireDefault(require("react-iframe"));

var _pdfmake = _interopRequireDefault(require("pdfmake/build/pdfmake"));

var _vfs_fonts_jejumj_gd_cn = _interopRequireDefault(require("./vfs_fonts_jejumj_gd_cn.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var vfs = _vfs_fonts_jejumj_gd_cn.default.pdfMake.vfs; // console.log("vfs",vfs);

_pdfmake.default.vfs = vfs;
_pdfmake.default.fonts = {
  '제주명조': {
    normal: "jejumyungjo.ttf",
    bold: "jejugothic.ttf",
    italics: 'cjk.ttf'
  }
};
_pdfmake.default.tableLayouts = {
  showblackline: {
    hLineWidth: function hLineWidth(i, node) {
      if (i === 0 || i === node.table.body.length) {
        //맨앞 맨뒤 
        return 1;
      }

      return i === node.table.headerRows ? 1 : 1;
    },
    vLineWidth: function vLineWidth(i) {
      return 1;
    },
    hLineColor: function hLineColor(i) {
      var color = 'black'; // if(i===2) color='red';
      // else if(i===3) color='blue';
      // else if(i===4) color='green';

      return color;
    },
    vLineColor: function vLineColor(i) {
      var color = 'black'; // if(i===2) color='red';
      // else if(i===3) color='blue';
      // else if(i===4) color='green';

      return color;
    }
  },
  showline: {
    hLineWidth: function hLineWidth(i, node) {
      if (i === 0 || i === node.table.body.length) {
        //맨앞 맨뒤 
        return 1;
      }

      return i === node.table.headerRows ? 1 : 1;
    },
    vLineWidth: function vLineWidth(i) {
      return 1;
    },
    hLineColor: function hLineColor(i) {
      var color = '#1A408E'; // if(i===2) color='red';
      // else if(i===3) color='blue';
      // else if(i===4) color='green';

      return color;
    },
    vLineColor: function vLineColor(i) {
      var color = '#1A408E'; // if(i===2) color='red';
      // else if(i===3) color='blue';
      // else if(i===4) color='green';

      return color;
    }
  },
  hideline: {
    hLineWidth: function hLineWidth(i, node) {
      if (i === 0 || i === node.table.body.length) {
        //맨앞 맨뒤 
        return 0;
      }

      return i === node.table.headerRows ? 0 : 0;
    },
    vLineWidth: function vLineWidth(i) {
      return 0;
    },
    hLineColor: function hLineColor(i) {
      var color = '#1A408E'; // if(i===2) color='red';
      // else if(i===3) color='blue';
      // else if(i===4) color='green';

      return color;
    }
  },
  headerunderline: {
    hLineWidth: function hLineWidth(i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }

      return i === node.table.headerRows ? 2 : 0;
    },
    hLineHeight: function hLineHeight(i, node) {
      return 0;
    },
    vLineWidth: function vLineWidth(i) {
      return 0;
    },
    hLineColor: function hLineColor(i) {
      return '#1A408E'; //                  return i === 1 ? 'red' : '#aaa';
    }
  },
  titletable: {
    hLineWidth: function hLineWidth(i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }

      return i === node.table.headerRows ? 0 : 1;
    },
    vLineWidth: function vLineWidth(i) {
      return 0;
    },
    hLineColor: function hLineColor(i) {
      return '#1A408E'; // return '#7367f0';
      // return i === 1 ? 'black' : 'black';
    } //   paddingTop: function (i) {
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

var getGaussianMyPercent = function getGaussianMyPercent(mean, std, x) {
  // let variance = std*std;
  var erfc = function erfc(x) {
    var z = Math.abs(x);
    var t = 1 / (1 + z / 2);
    var r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
    return x >= 0 ? r : 2 - r;
  };

  var cdf = 0.5 * erfc(-(x - mean) / (std * Math.sqrt(2))); // return {
  //     cdf: cdf,
  //     myPercent: ((1- cdf) * 100).toFixed(2)*1
  // }

  return ((1 - cdf) * 100).toFixed(2) * 1;
};

function getGaussian(std, avg, xArr) {
  var a = 1 / (Math.sqrt(2 * Math.PI) * std);
  var b = Math.E;
  var yArr = [];

  for (var i = 0; i < xArr.length; i++) {
    var x = xArr[i];
    var c = -(Math.pow(x - avg, 2) / (2 * Math.pow(std, 2)));
    var y = a * Math.pow(b, c);
    yArr.push(y * 1000);
  }

  return yArr;
}

function get_blink_arr(obj) {
  var rawGaze = obj;
  var blk_arr = [];
  var BLKID = 0;
  var blink = {
    BLKID: null,
    BLKS: null,
    BLKD: null,
    GRB_start_index: null,
    GRB_end_index: null
  };
  var ingblink = false;

  for (var i = 0; i < rawGaze.length; i++) {
    if (rawGaze[i].BLKV) {
      if (BLKID !== rawGaze[i].BLKID) {
        //처음 눈을감음
        ingblink = true;
        BLKID = rawGaze[i].BLKID;
        blink.BLKID = BLKID;
        blink.BLKS = rawGaze[i].relTime;
        blink.GRB_start_index = i;
      }
    } else {
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
          GRB_end_index: null
        };
      }
    }
  } //console.log(blk_arr.length);


  return blk_arr;
}

function customCallbackXtick(val, index) {
  if (index % 120 === 0) {
    return ((((val * 1).toFixed(2) * 1).toFixed(2) - 0.5) * 1).toFixed(2) * 1;
  }
}

function dataToTaskArr(data) {
  // console.log("허허data",data);
  var MONITOR_PX_PER_CM = data.monitorInform.MONITOR_PX_PER_CM;
  var pixel_per_cm = data.monitorInform.MONITOR_PX_PER_CM; //1cm 당 pixel

  var degree_per_cm = Math.atan(1 / data.defaultZ) * 180 / Math.PI;
  var w = data.screenW;
  var h = data.screenH;
  var screeningObjectList = data.screeningObjectList;
  var taskArr = {
    left: [],
    right: [],
    bottom: [],
    top: []
  };

  for (var i = 0; i < screeningObjectList.length; i++) {
    // console.log("screeningObjectList[i].analysis.direction",screeningObjectList[i].analysis.direction);
    taskArr[screeningObjectList[i].analysis.direction].push(_objectSpread(_objectSpread({}, screeningObjectList[i]), {}, {
      gazeData: data.taskArr[i],
      analysis: data.analysisArr[i]
    }));
  }

  for (var key in taskArr) {
    for (var _i = 0; _i < taskArr[key].length; _i++) {
      var task = taskArr[key][_i];
      var type = task.type;
      var gazeArr = task.gazeData;
      var blink_arr = get_blink_arr(gazeArr);
      task.blinkArr = blink_arr; // % 로되어있는걸 degree 로 변환작업, 중점이 0,0 x,y degree

      for (var j = 0; j < gazeArr.length; j++) {
        var target_pixels = {
          x: null,
          y: null
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

          var target_xcm = target_pixels.x / pixel_per_cm;
          var target_ycm = target_pixels.y / pixel_per_cm;
          var target_xdegree = target_xcm * degree_per_cm;
          var target_ydegree = target_ycm * degree_per_cm;
          gazeArr[j].target_xdegree = target_xdegree;
          gazeArr[j].target_ydegree = target_ydegree;
        } else if (type === "circular") {
          var radian = Math.PI / 180;
          var radius = task.radius;

          if (gazeArr[j].relTime * 1 < task.startWaitTime) {
            var cosTheta = Math.cos(task.startDegree * radian);
            var sineTheta = Math.sin(task.startDegree * radian);
            target_pixels.x = task.centerCoord.x + radius * cosTheta * MONITOR_PX_PER_CM - w / 2;
            target_pixels.y = task.centerCoord.y - radius * sineTheta * MONITOR_PX_PER_CM - h / 2;
          } else if (gazeArr[j].relTime * 1 < task.duration * 1 + task.startWaitTime * 1) {
            var nowDegree = -((task.startDegree - task.endDegree) * (gazeArr[j].relTime - task.startWaitTime) / task.duration - task.startDegree);

            var _cosTheta = Math.cos(nowDegree * radian);

            var _sineTheta = Math.sin(nowDegree * radian);

            target_pixels.x = task.centerCoord.x + radius * _cosTheta * MONITOR_PX_PER_CM - w / 2;
            target_pixels.y = task.centerCoord.y - radius * _sineTheta * MONITOR_PX_PER_CM - h / 2;
          } else {
            var _cosTheta2 = Math.cos(task.endDegree * radian);

            var _sineTheta2 = Math.sin(task.endDegree * radian);

            target_pixels.x = task.centerCoord.x + radius * _cosTheta2 * MONITOR_PX_PER_CM - w / 2;
            target_pixels.y = task.centerCoord.y - radius * _sineTheta2 * MONITOR_PX_PER_CM - h / 2;
          }

          var _target_xcm = target_pixels.x / pixel_per_cm;

          var _target_ycm = target_pixels.y / pixel_per_cm;

          var _target_xdegree = _target_xcm * degree_per_cm;

          var _target_ydegree = _target_ycm * degree_per_cm;

          gazeArr[j].target_xdegree = _target_xdegree;
          gazeArr[j].target_ydegree = _target_ydegree;
        }

        if (gazeArr[j].RPOGV) {
          var xpixel = (gazeArr[j].RPOGX - 0.5) * w;
          var ypixel = (gazeArr[j].RPOGY - 0.5) * h;
          var xcm = xpixel / pixel_per_cm;
          var ycm = ypixel / pixel_per_cm;
          var xdegree = xcm * degree_per_cm;
          var ydegree = ycm * degree_per_cm;
          gazeArr[j].xdegree = xdegree;
          gazeArr[j].ydegree = ydegree;
        } else {
          gazeArr[j].xdegree = null;
          gazeArr[j].ydegree = null;
        }
      } // const startRelTime = task.startWaitTime - 1;
      // const endRelTime = task.relativeEndTime - task.endWaitTime-1.5;


      var startRelTime = task.startWaitTime - 0.5;
      var endRelTime = task.relativeEndTime - task.endWaitTime - 2;

      if (key === 'top' || key === 'bottom') {
        var target_ydegreeChartArr = [];
        var ydegreeChartArr = [];

        for (var _j = 0; _j < gazeArr.length; _j++) {
          if (gazeArr[_j].relTime >= startRelTime && gazeArr[_j].relTime <= endRelTime) {
            target_ydegreeChartArr.push({
              x: (gazeArr[_j].relTime - startRelTime) * 1000,
              y: gazeArr[_j].target_ydegree
            });
            ydegreeChartArr.push({
              x: (gazeArr[_j].relTime - startRelTime) * 1000,
              y: gazeArr[_j].ydegree
            });
          }
        }

        task.target_ydegreeChartArr = target_ydegreeChartArr;
        task.ydegreeChartArr = ydegreeChartArr;
      } else {
        //right || left
        var target_xdegreeChartArr = [];
        var xdegreeChartArr = [];

        for (var _j2 = 0; _j2 < gazeArr.length; _j2++) {
          if (gazeArr[_j2].relTime >= startRelTime && gazeArr[_j2].relTime <= endRelTime) {
            target_xdegreeChartArr.push({
              x: (gazeArr[_j2].relTime - startRelTime) * 1000,
              y: gazeArr[_j2].target_xdegree
            });
            xdegreeChartArr.push({
              x: (gazeArr[_j2].relTime - startRelTime) * 1000,
              y: gazeArr[_j2].xdegree
            });
          }
        }

        task.target_xdegreeChartArr = target_xdegreeChartArr;
        task.xdegreeChartArr = xdegreeChartArr;
      }

      var blkChartArr = [];

      for (var _j3 = 0; _j3 < task.blinkArr.length; _j3++) {
        if (task.blinkArr[_j3].BLKS >= endRelTime) {// console.log("찾음",task.blinkArr[j].BLKS)
        } else if (task.blinkArr[_j3].BLKS >= startRelTime && task.blinkArr[_j3].BLKS + task.blinkArr[_j3].BLKD >= endRelTime) {
          blkChartArr.push({
            x: (task.blinkArr[_j3].BLKS - startRelTime) * 1000,
            y: 0
          });
          blkChartArr.push({
            x: (task.blinkArr[_j3].BLKS - startRelTime) * 1000,
            y: 1
          });
          blkChartArr.push({
            x: endRelTime * 1000,
            y: 1
          });
          blkChartArr.push({
            x: endRelTime * 1000,
            y: 0
          });
        } else if (task.blinkArr[_j3].BLKS - startRelTime >= 0) {
          blkChartArr.push({
            x: (task.blinkArr[_j3].BLKS - startRelTime) * 1000,
            y: 0
          });
          blkChartArr.push({
            x: (task.blinkArr[_j3].BLKS - startRelTime) * 1000,
            y: 1
          });
          blkChartArr.push({
            x: (task.blinkArr[_j3].BLKS + task.blinkArr[_j3].BLKD - startRelTime) * 1000,
            y: 1
          });
          blkChartArr.push({
            x: (task.blinkArr[_j3].BLKS + task.blinkArr[_j3].BLKD - startRelTime) * 1000,
            y: 0
          });
        } else if (task.blinkArr[_j3].BLKS - startRelTime <= 0 && task.blinkArr[_j3].BLKS + task.blinkArr[_j3].BLKD - startRelTime >= 0) {
          blkChartArr.push({
            x: 0,
            y: 0
          });
          blkChartArr.push({
            x: 0,
            y: 1
          });
          blkChartArr.push({
            x: (task.blinkArr[_j3].BLKS + task.blinkArr[_j3].BLKD - startRelTime) * 1000,
            y: 1
          });
          blkChartArr.push({
            x: (task.blinkArr[_j3].BLKS + task.blinkArr[_j3].BLKD - startRelTime) * 1000,
            y: 0
          });
        }
      }

      task.blkChartArr = blkChartArr;
      var latencyChart = {
        s: (task.analysis.startTime - startRelTime) * 1000
      };
      task.latencyChart = latencyChart;
    }
  }

  return taskArr;
}

var BarChartGrade = function BarChartGrade(_ref) {
  var props = _extends({}, _ref);

  var myScore = props.myScore,
      avgGroupScore = props.avgGroupScore,
      stdGroupScore = props.stdGroupScore;

  var chartOption = _react.default.useMemo(function () {
    return {
      plugins: {
        datalabels: {
          formatter: function formatter(value, ctx) {
            return null; //return value !== 0 ? value.toLocaleString(/* ... */) : ''
          },
          anchor: 'center',
          align: 'center',
          color: '#000000'
        }
      },
      maintainAspectRatio: false,
      // devicePixelRatio: window.devicePixelRatio * 3,
      annotation: {
        annotations: [{
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
          }
        }, {
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
          }
        }, {
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
          }
        }, {
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
          }
        }]
      },
      animation: {
        duration: 0
      },
      tooltips: {
        callbacks: {
          title: function title(tooltipItem, data) {
            return '';
          }
        }
      },
      legend: {
        display: false,
        labels: {
          fontSize: 14
        }
      },
      scales: {
        xAxes: [{
          id: "x1",
          display: true,
          // 실제시간 임시로 true//
          type: 'linear',
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0)"
          },
          ticks: {
            source: 'data',
            //auto,data,labels
            suggestedMin: 0,
            suggestedMax: 100
          },
          scaleLabel: {
            display: true,
            labelString: '부족                                  우수',
            fontSize: 15
          }
        }],
        yAxes: [{
          id: "y1",
          position: 'left',
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0)"
          },
          scaleLabel: {
            /////////////////x축아래 라벨
            display: true,
            labelString: '비율 (%)',
            //fontStyle: 'bold',
            fontSize: 15
          }
        }]
      }
    };
  }, [myScore, avgGroupScore, stdGroupScore]);

  var chartData = _react.default.useMemo(function () {
    var groupavg = avgGroupScore;
    var groupstd = stdGroupScore ? stdGroupScore : 1; // console.log("groupstd",groupstd);

    var xarr = [];

    for (var i = 0; i <= 100; i++) {
      xarr.push(i);
    }

    var yarr = getGaussian(groupstd, groupavg, xarr); //    console.log(xarr);
    //    console.log(yarr);

    var newdata = [];

    for (var _i2 = 0; _i2 <= 100; _i2++) {
      newdata.push({
        x: xarr[_i2],
        y: yarr[_i2]
      });
    }

    ;
    var chartdata = {
      datasets: [{
        data: newdata,
        //steppedLine: "before",
        steppedLine: false,
        label: '',
        borderColor: "rgba(0,0,255,0.4)",
        //"#0000ff",
        backgroundColor: 'rgba(0,0,255,0.4)',
        fill: false,
        yAxisID: "y1",
        xAxisID: "x1",
        borderWidth: 1.5,
        pointRadius: 0,
        //데이터 포인터크기
        pointHoverRadius: 0 //hover 데이터포인터크기

      }]
    };
    return chartdata;
  }, [avgGroupScore, stdGroupScore]);

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactChartjs.Line, {
    data: chartData,
    options: chartOption,
    ref: function ref(reference) {//console.log("~~~~~~~~~~~~~");
      //       console.log(reference);
      //lineChart = reference;
    }
  }));
};

var ScreeningViewer = function ScreeningViewer(_ref2) {
  var props = _extends({}, _ref2);

  var dataArr = props.dataArr;
  var onClose = props.onClose;
  var groupData = props.groupData,
      userInform = props.userInform,
      AgencyLogoBase64 = props.AgencyLogoBase64,
      resultInform = props.resultInform;

  var _React$useState = _react.default.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      selDataIndex = _React$useState2[0],
      set_selDataIndex = _React$useState2[1];

  var selScreeningType = _react.default.useMemo(function () {
    if (selDataIndex === dataArr.length) {
      return "보고서 다운로드";
    } else if (dataArr && dataArr[selDataIndex]) {
      return dataArr[selDataIndex].screeningType;
    } else {
      return null;
    }
  }, [dataArr, selDataIndex]);

  var targetGroupData = _react.default.useMemo(function () {
    //groupData에서 알맞은 그룹을 찾아야함
    var testeeMomentAge = Math.floor(userInform.testeeMomentAge);
    var target = null;

    for (var i = 0; i < groupData.length; i++) {
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
        if (groupData[i].s_age === testeeMomentAge && groupData[i].e_age === testeeMomentAge + 1) {
          target = groupData[i];
          break;
        }
      }
    } // console.log("targetGroupData",target)


    return target;
  }, [userInform, groupData]);

  var everyGroupData = _react.default.useMemo(function () {
    return groupData[groupData.length - 1];
  }, [groupData]);

  var _React$useState3 = _react.default.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isPDFing = _React$useState4[0],
      set_isPDFing = _React$useState4[1];

  var _React$useState5 = _react.default.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      docDefinition = _React$useState6[0],
      set_docDefinition = _React$useState6[1];

  var _React$useState7 = _react.default.useState(null),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      progressNow = _React$useState8[0],
      set_progressNow = _React$useState8[1];

  var _React$useState9 = _react.default.useState(null),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      PDFURL = _React$useState10[0],
      set_PDFURL = _React$useState10[1];

  var progressMax = _react.default.useMemo(function () {
    if (!dataArr) return 0;
    return dataArr.length;
  }, [dataArr]);

  var myPercentArr = _react.default.useMemo(function () {
    var pArr = [];

    for (var i = 0; i < dataArr.length; i++) {
      var data = dataArr[i]; //

      var pageType = data.screeningType;
      var x = data.analysis["".concat(pageType, "_score")];
      var avg = targetGroupData["avg_".concat(pageType, "_score")];
      var std = targetGroupData["std_".concat(pageType, "_score")] || 1;
      var p = getGaussianMyPercent(avg, std, x);
      pArr.push(p);
    } // console.log("p",p);


    return pArr;
  }, [dataArr, targetGroupData]);

  var myStateArr = _react.default.useMemo(function () {
    // if(!myPercentArr) return null;
    var stateArr = [];

    for (var i = 0; i < myPercentArr.length; i++) {
      var myPercent = myPercentArr[i];
      var mystate = void 0;

      if (myPercent <= 10) {
        mystate = '최우수';
      } else if (myPercent > 10 && myPercent <= 25) {
        mystate = '우수';
      } else if (myPercent > 25 && myPercent <= 75) {
        mystate = "양호";
      } else if (myPercent > 75 && myPercent <= 90) {
        mystate = "미흡";
      } else {
        mystate = "주의";
      }

      stateArr.push(mystate);
    }

    return stateArr;
  }, [myPercentArr]);

  var handlePDFstart = function handlePDFstart() {
    set_progressNow(0);
    set_isPDFing(true);
    set_docDefinition({
      pageSize: 'A4',
      info: {
        title: '진단 요약 결과',
        author: 'bnri',
        subject: '진단 요약 결과',
        keywords: ''
      },
      background: function background(currentPage, pageCount) {
        if (currentPage * 1 === 1) {
          return [{
            margin: [20, 26],
            layout: 'headerunderline',
            // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*'],
              body: [[{
                text: '',
                margin: [0, 10, 0, 10],
                border: [false, false, false, false]
              }, {
                text: ' ',
                margin: [0, 10, 0, 10],
                border: [false, false, false, false]
              }], [{
                text: '',
                border: [false, false, false, false]
              }, {
                text: '',
                border: [false, false, false, false]
              }]]
            }
          }, {
            image: 'readerseyeLogo',
            //fit: [200, 200],
            fit: [100, 180],
            opacity: 1,
            //흐림 배경이미지.
            absolutePosition: {
              x: 470,
              y: 28
            } //absolutePosition: { x: 550, y: 800 },

          }, {
            text: userInform && userInform.testeeName ? "".concat(userInform.testeeName, " (").concat(userInform.testeeID, ") ").concat(userInform.testeeClass) : "testeeName (testeeID) testeeClass",
            bold: true,
            // color: '#7367f0',
            color: 'black',
            absolutePosition: {
              x: 46,
              y: 41
            }
          }, {
            text: resultInform && resultInform.savetime ? "".concat(resultInform.savetime) : "saveTime",
            bold: true,
            // color: '#7367f0',
            color: 'black',
            absolutePosition: {
              x: 46,
              y: 61
            }
          }];
        } else {
          return [{
            margin: [20, 26],
            layout: 'headerunderline',
            // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*'],
              body: [[{
                text: '',
                margin: [0, 10, 0, 10]
              }, {
                text: ' ',
                margin: [0, 10, 0, 10]
              }], ['', '']]
            }
          }, {
            image: '학원로고',
            // image: 'agencyLogo',
            //fit: [200, 200],
            fit: [20, 20],
            opacity: 1,
            //흐림 배경이미지.
            absolutePosition: {
              x: 21,
              y: 37
            } //absolutePosition: { x: 550, y: 800 },

          }, {
            text: userInform.agencyName ? userInform.agencyName : "agencyName",
            bold: true,
            // color: '#7367f0',
            color: 'black',
            absolutePosition: {
              x: 46,
              y: 41
            }
          }, {
            image: 'readerseyeLogo',
            //fit: [200, 200],
            fit: [100, 180],
            opacity: 1,
            //흐림 배경이미지.
            absolutePosition: {
              x: 470,
              y: 28
            } //absolutePosition: { x: 550, y: 800 },

          }];
        }
      },
      footer: function footer(currentPage, pageCount) {
        if (currentPage === 1) {
          return null;
        }

        return {
          table: {
            widths: [600, 100],
            body: [[{
              text: currentPage - 1 + ' / ' + (pageCount - 1),
              alignment: 'center',
              fontSize: 10
            }]]
          },
          layout: 'noBorders'
        };
      },
      compress: true,
      //압축 저용량
      content: [{
        name: 'mainpage',
        margin: [30, 30, 30, 30],
        table: {
          widths: ['*', '*'],
          headerRows: 1,
          body: [[{
            text: ' '
          }, {
            text: ' '
          }], [{
            margin: [10, 220, 10, 270],
            text: "스크리닝 검사 리포트",
            bold: true,
            fontSize: 26,
            alignment: 'center',
            colSpan: 2
          }], [{
            margin: [10, 10, 10, 20],
            text: moment().format('YYYY.MM.DD'),
            alignment: 'center',
            fontSize: 16,
            colSpan: 2
          }], [{
            margin: [10, 20, 10, 10],
            columns: [{
              width: '*',
              text: ''
            }, {
              width: 'auto',
              image: '학원로고',
              // image: 'agencyLogo',
              //fit: [200, 200],
              fit: [60, 60]
            }, {
              margin: [8, 20, 0, 0],
              width: 'auto',
              text: userInform.agencyName ? userInform.agencyName : "agencyName",
              fontSize: 20,
              bold: true
            }, {
              width: '*',
              text: ''
            }],
            colSpan: 2
          }]]
        },
        layout: {
          hLineWidth: function hLineWidth(i, node) {
            if (i === 0 || i === node.table.body.length) {
              return 0;
            }

            return i === node.table.headerRows ? 0 : 0;
          },
          hLineHeight: function hLineHeight(i, node) {
            return 2;
          },
          vLineWidth: function vLineWidth(i) {
            return 0;
          },
          hLineColor: function hLineColor(i) {
            return i === 1 ? 'black' : '#aaa';
          }
        },
        pageBreak: 'after'
      } //main page
      ],
      images: {
        'readerseyeLogo': _base.imgbase64forPDF['리더스아이로고가로'],
        '학원로고': AgencyLogoBase64 ? AgencyLogoBase64 : _base.imgbase64forPDF['기본로고'],
        // defaultAgencyLogo: defaultagencylogo,
        '최우수': _base.imgbase64forPDF['최우수'],
        '우수': _base.imgbase64forPDF['우수'],
        '양호': _base.imgbase64forPDF['양호'],
        '미흡': _base.imgbase64forPDF['미흡'],
        '주의': _base.imgbase64forPDF['주의'],
        '센텐스마스크': _base.imgbase64forPDF['센텐스마스크'],
        '지구력': _base.imgbase64forPDF['지구력'],
        '키워드파인딩': _base.imgbase64forPDF['키워드파인딩'],
        '많이읽기': _base.imgbase64forPDF['많이읽기'],
        '비주얼스팬': _base.imgbase64forPDF['비주얼스팬'],
        '어휘력': _base.imgbase64forPDF['어휘력'],
        '유창한': _base.imgbase64forPDF['유창한'],
        '어려운': _base.imgbase64forPDF['어려운'],
        '미숙한': _base.imgbase64forPDF['미숙한'],
        '읽기능력피라미드': _base.imgbase64forPDF['읽기능력피라미드']
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
      pageBreakBefore: function pageBreakBefore(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
        return currentNode.headlineLevel === 1;
      },
      //headlineLevel: 1,
      defaultStyle: {
        font: '제주명조'
      }
    });
  };

  var _React$useState11 = _react.default.useState(null),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      isfinishThisPage = _React$useState12[0],
      set_isfinishThisPage = _React$useState12[1];

  _react.default.useEffect(function () {
    if (isPDFing) {
      if (progressNow === progressMax) {
        //마지막 페이지 돌아오는경우임.. 
        set_isPDFing('exit');
      } else if (progressNow < progressMax) {
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

  _react.default.useEffect(function () {
    if (progressNow !== null) {
      set_selDataIndex(progressNow);
    }
  }, [progressNow]);

  _react.default.useEffect(function () {
    function doit() {
      return _doit.apply(this, arguments);
    }

    function _doit() {
      _doit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data, pageType, myState, myPercent, myScore, targetScore, pageTitle, p, canvsArr, saccadeGradeChart_base64, saccadeRadarChart_base64, saccadeDirectionChart_base64, saccadeRealChart_base64, _p, _canvsArr, pursuitGradeChart_base64, pursuitErrChart_base64, pursuitDirectionChart_base64, pursuitRealChart_base64, _p2, _canvsArr2, antisaccadeGradeChart_base64, antisaccadeErrDirectionChart_base64, antisaccadeLatencyChart_base64, antisaccadeDirectionChart_base64, antisaccadeRealChart_base64;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(isPDFing && progressMax !== selDataIndex)) {
                  _context.next = 82;
                  break;
                }

                if (!(isfinishThisPage === false)) {
                  _context.next = 82;
                  break;
                }

                data = dataArr[selDataIndex];
                pageType = data.screeningType;
                myState = myStateArr[selDataIndex];
                myPercent = myPercentArr[selDataIndex];
                myScore = data.analysis["".concat(pageType, "_score")].toFixed(2);
                targetScore = targetGroupData["avg_".concat(pageType, "_score")].toFixed(2);
                console.log("@작업을시작한 pageType : ", pageType);
                console.log("data", data);
                console.log("Inform", userInform, resultInform); // console.log("@selDataIndex",selDataIndex);

                if (pageType === 'saccade') {
                  pageTitle = "\uB3C4\uC57D\uC548\uAD6C\uC6B4\uB3D9 saccade \uBD84\uC11D";
                } else if (pageType === 'pursuit') {
                  pageTitle = "\uCD94\uC801\uC548\uAD6C\uC6B4\uB3D9 pursuit \uBD84\uC11D";
                } else if (pageType === 'antisaccade') {
                  pageTitle = "\uBC18\uB300\uB85C\uBCF4\uAE30 anti saccade \uBD84\uC11D";
                } //유저정보 삽입


                docDefinition.content.push({
                  // pageBreak: 'after',
                  name: '종합 요약',
                  margin: [5, 20, 0, 5],
                  columns: [{
                    width: '80%',
                    table: {
                      dontBreakRows: true,
                      widths: ['10%', '32%', '10%', '17%', '10%', '21%'],
                      margin: [0, 0, 0, 0],
                      headerRows: 0,
                      body: [[{
                        text: '',
                        border: [false, false, false, false]
                      }, {
                        text: '',
                        border: [false, false, false, false]
                      }, {
                        text: '',
                        border: [false, false, false, false]
                      }, {
                        text: '',
                        border: [false, false, false, false]
                      }, {
                        text: '',
                        border: [false, false, false, false]
                      }, {
                        text: '',
                        border: [false, false, false, false]
                      }], //빈것
                      [{
                        margin: [10, 10, 0, 10],
                        text: '\t\t\t\t\t\t' + pageTitle,
                        alignment: 'center',
                        bold: true,
                        colSpan: 6,
                        fontSize: 16,
                        border: [false, false, false, false]
                      }], //타이틀
                      [{
                        text: '소속',
                        colSpan: 1,
                        fontSize: 9,
                        alignment: 'right',
                        margin: [0, 5, 0, 5],
                        border: [false, true, false, false],
                        bold: true
                      }, {
                        text: "".concat(userInform.agencyName, "(").concat(userInform.agencyID, ")"),
                        colSpan: 1,
                        fontSize: 9,
                        margin: [0, 5, 0, 5],
                        border: [false, true, false, false]
                      }, //agencyName agencyID
                      {
                        text: '수행일',
                        colSpan: 1,
                        fontSize: 9,
                        alignment: 'right',
                        margin: [0, 5, 0, 5],
                        border: [false, true, false, false],
                        bold: true
                      }, {
                        text: "".concat(resultInform.savetime.split(' ')[0]),
                        colSpan: 1,
                        fontSize: 9,
                        margin: [0, 5, 0, 5],
                        border: [false, true, false, false]
                      }, //수행일
                      {
                        text: '종합결과',
                        colSpan: 1,
                        fontSize: 9,
                        alignment: 'right',
                        margin: [0, 5, 0, 5],
                        border: [false, true, false, false],
                        bold: true
                      }, {
                        text: "".concat(myState),
                        colSpan: 1,
                        fontSize: 9,
                        margin: [0, 5, 0, 5],
                        border: [false, true, false, false]
                      } //종합결과
                      ], //1줄
                      [{
                        text: '피험자',
                        colSpan: 1,
                        fontSize: 9,
                        alignment: 'right',
                        margin: [0, 5, 0, 5],
                        border: [false, false, false, false],
                        bold: true
                      }, {
                        text: "".concat(userInform.testeeName, "(").concat(userInform.testeeID, ")"),
                        colSpan: 1,
                        fontSize: 9,
                        margin: [0, 5, 0, 5],
                        border: [false, false, false, false]
                      }, {
                        text: '수행시각',
                        colSpan: 1,
                        fontSize: 9,
                        alignment: 'right',
                        margin: [0, 5, 0, 5],
                        border: [false, false, false, false],
                        bold: true
                      }, {
                        text: "".concat(resultInform.savetime.split(' ')[1]),
                        colSpan: 1,
                        fontSize: 9,
                        margin: [0, 5, 0, 5],
                        border: [false, false, false, false]
                      }, {
                        text: '내 점수',
                        colSpan: 1,
                        fontSize: 9,
                        alignment: 'right',
                        margin: [0, 5, 0, 5],
                        border: [false, false, false, false],
                        bold: true
                      }, {
                        text: "".concat(myScore, " \uC810(").concat(myPercent, "%)"),
                        colSpan: 1,
                        fontSize: 9,
                        margin: [0, 5, 0, 5],
                        border: [false, false, false, false]
                      } //내점수
                      ], //2줄
                      [{
                        text: '성별',
                        colSpan: 1,
                        fontSize: 9,
                        alignment: 'right',
                        margin: [0, 5, 0, 5],
                        border: [false, false, false, false],
                        bold: true
                      }, {
                        text: "".concat(userInform.testeeSex),
                        colSpan: 1,
                        fontSize: 9,
                        margin: [0, 5, 0, 5],
                        border: [false, false, false, false]
                      }, //성별
                      {
                        text: '당시연령',
                        colSpan: 1,
                        fontSize: 9,
                        alignment: 'right',
                        margin: [0, 5, 0, 5],
                        border: [false, false, false, false],
                        bold: true
                      }, {
                        text: "".concat(userInform.testeeMomentAge, " \uC138"),
                        colSpan: 1,
                        fontSize: 9,
                        margin: [0, 5, 0, 5],
                        border: [false, false, false, false]
                      }, {
                        text: '또래평균',
                        colSpan: 1,
                        fontSize: 9,
                        alignment: 'right',
                        margin: [0, 5, 0, 5],
                        border: [false, false, false, false],
                        bold: true
                      }, {
                        text: "".concat(targetScore, " \uC810"),
                        colSpan: 1,
                        fontSize: 9,
                        margin: [0, 5, 0, 5],
                        border: [false, false, false, false]
                      } //또래평균점수
                      ] //3줄             
                      ]
                    },
                    layout: 'showblackline'
                  }, {
                    width: '20%',
                    table: {
                      dontBreakRows: true,
                      widths: ['*', '*'],
                      margin: [0, 0, 50, 0],
                      headerRows: 0,
                      body: [[{
                        text: '',
                        border: [false, false, false, false],
                        colSpan: 2
                      }], [{
                        margin: [0, 10, 20, 10],
                        text: '\t',
                        alignment: 'center',
                        bold: true,
                        // colSpan: 6,
                        fontSize: 16,
                        border: [false, false, false, false],
                        colSpan: 2
                      }], [{
                        margin: [0, 0, 0, 0],
                        // width:60,
                        fit: [100, 70],
                        image: "".concat(myState),
                        alignment: 'center',
                        colSpan: 2 // colSpan:2

                      }]]
                    },
                    layout: {
                      hLineColor: function hLineColor(i, node) {
                        return i === 0 || i === node.table.body.length ? 'white' : 'white';
                      },
                      vLineColor: function vLineColor(i, node) {
                        return i === 0 || i === node.table.widths.length ? 'white' : 'white';
                      }
                    } // layout: 'showblackline',

                  }]
                }); //아래 종류에 따라 삽입이 달라야함

                if (!(pageType === 'saccade')) {
                  _context.next = 35;
                  break;
                }

                //html2canvas
                p = [];
                p.push((0, _html2canvas.default)(document.getElementById("saccadeGradeChart")));
                p.push((0, _html2canvas.default)(document.getElementById("saccadeRadarChart")));
                p.push((0, _html2canvas.default)(document.getElementById("saccadeDirectionChart")));
                p.push((0, _html2canvas.default)(document.getElementById("saccadeRealChart"))); // p.push(html2canvas(document.getElementById("saccadeLatencyChart")));
                // p.push(html2canvas(document.getElementById("saccadeSpeedChart")));
                // p.push(html2canvas(document.getElementById("saccadeFEChart")));

                _context.next = 21;
                return Promise.all(p);

              case 21:
                canvsArr = _context.sent;
                saccadeGradeChart_base64 = canvsArr[0].toDataURL();
                saccadeRadarChart_base64 = canvsArr[1].toDataURL();
                saccadeDirectionChart_base64 = canvsArr[2].toDataURL();
                saccadeRealChart_base64 = canvsArr[3].toDataURL(); // console.log("saccadeDirectionChart_base64",saccadeDirectionChart_base64);
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
                    body: [[{
                      margin: [0, 3, 0, 0],
                      text: '도약안구운동 점수 분포',
                      fontSize: 11,
                      bold: true,
                      border: [true, true, true, false],
                      alignment: 'center',
                      fillColor: '#1A408E',
                      color: 'white',
                      colSpan: 1
                    }, {
                      text: '',
                      colSpan: 1,
                      border: [false, false, false, false]
                    }, {
                      text: '',
                      colSpan: 1,
                      // rowSpan:2,
                      border: [false, false, false, true],
                      table: {
                        widths: ['*', '*'],
                        headerRows: 0,
                        body: [[{
                          margin: [3, 0, 3, 0],
                          fontSize: 11,
                          text: "도약안구운동 (saccade)은 무엇인가요?",
                          alignment: 'left',
                          colSpan: 2,
                          bold: true
                        }]]
                      },
                      layout: 'titletable'
                    }], [{
                      image: saccadeGradeChart_base64,
                      colSpan: 1,
                      alignment: 'center',
                      // text: '사진',
                      fit: [165, 140],
                      // width:'100%',
                      margin: [0, 4, 0, 0],
                      border: [true, false, true, true]
                    }, {
                      text: '',
                      border: [false, false, false, false],
                      colSpan: 1
                    }, {
                      fontSize: 10,
                      margin: [10, 10, 10, 10],
                      lineHeight: 1.6,
                      ul: ["글을 읽는 동안 시선은 끊임없이 빠르게 이동(saccade, 도약이동)하며 글자에 고정(fixation, 응시)하는 것을 반복합니다. 글을 유창하게 읽기 위해서는 정확한 위치에 눈을 빠르고 정확한 위치로 옮기고, 안정적으로 시선을 유지하는 운동제어 능력이 필요합니다. 시력 저하, 피로, 집중력 부족, 안구진탕증 및 각종 신경계 이상 등의 이유로 도약안구운동에 문제가 생길 수 있으며, 이 능력이 저하되면 글을 유창하게 읽는데 방해가 될 수 있습니다. " // { text: 'Item 4', bold: true },
                      ],
                      colSpan: 1,
                      border: [false, false, false, false]
                    }]]
                  },
                  layout: 'showline'
                }); //파랑테이블 radar 3개

                docDefinition.content.push({
                  name: '도약안구운동 1줄 파랑메뉴',
                  margin: [5, 5, 5, 5],
                  table: {
                    dontBreakRows: true,
                    widths: ['100%'],
                    headerRows: 0,
                    body: [[{
                      margin: [0, 3, 0, 0],
                      text: '도약안구운동 점수 분포',
                      fontSize: 11,
                      bold: true,
                      border: [true, true, true, false],
                      alignment: 'center',
                      fillColor: '#1A408E',
                      color: 'white',
                      colSpan: 1
                    }], [{
                      image: saccadeRadarChart_base64,
                      colSpan: 1,
                      alignment: 'center',
                      // text: '사진',
                      fit: [635, 152],
                      // width:'100%',
                      margin: [0, 0, 0, 0],
                      border: [true, false, true, true]
                    }]]
                  },
                  layout: 'showline'
                }); //타이틀테입믈2번

                docDefinition.content.push({
                  name: '두번째 타이틀테이블',
                  margin: [5, 10, 5, 0],
                  table: {
                    widths: ['*', '*'],
                    headerRows: 0,
                    body: [[{
                      margin: [3, 0, 3, 0],
                      fontSize: 11,
                      text: "어느정도가 적당한가요?",
                      alignment: 'left',
                      colSpan: 2,
                      bold: true
                    }], [{
                      fontSize: 10,
                      margin: [10, 10, 10, 10],
                      lineHeight: 1.6,
                      ul: ["지연시간 (latency time) : 시각 자극물을 발견한 뒤, 목표를 향해 시선이 출발할 때까지 걸리는 시간입니다. 반응처리 및 운동능력이 우수할수록 짧으며, 대체로 150ms ~ 250ms정도입니다.", "시선이동속도 (saccade speed) : 시선이 목표를 향해 이동할 때, 목표에 다다를 때까지의 속도입니다. 운동제어능력이 우수할수록 속도가 빠르며, 이동할 거리가 가까울수록 속도는 느려집니다. 대체로 50도/초~200도/초 정도입니다.", "응시안정성 (fixation stability) : 대상을 응시할 때, 시선이 얼마나 안정적으로 유지하는지를 측정한 척도입니다. 목표위치로부터의 2초간 시선위치 편차로 측정합니다. 집중력이 강하고 운동제어능력이 우수할수록 편차가 작으며, 대체로 0.5도 내외입니다."],
                      colSpan: 2
                    }]]
                  },
                  layout: 'titletable'
                }); //타이틀테입믈3번

                docDefinition.content.push({
                  name: '두번째 타이틀테이블',
                  margin: [5, 5, 5, 0],
                  pageBreak: 'after',
                  table: {
                    widths: ['*', '*'],
                    headerRows: 0,
                    body: [[{
                      margin: [3, 0, 3, 0],
                      fontSize: 11,
                      text: "어떻게 개선할 수 있나요?",
                      alignment: 'left',
                      colSpan: 2,
                      bold: true
                    }], [{
                      fontSize: 10,
                      margin: [10, 10, 10, 10],
                      lineHeight: 1.6,
                      ul: ["즉각적 피드백이 있는 추적안구운동 훈련을 합니다."],
                      colSpan: 2
                    }]]
                  },
                  layout: 'titletable'
                }); /////2번째 page
                ///////2번째ㅑ 테이블
                //스샷테이블 큰사진 + 옆에 추가할 설명

                docDefinition.content.push({
                  name: '도약안구운동 1줄 파랑메뉴',
                  margin: [5, 35, 5, 5],
                  table: {
                    dontBreakRows: true,
                    widths: ['60%', '1%', '39%'],
                    headerRows: 0,
                    body: [[{
                      text: '',
                      border: [false, false, false, false]
                    }, {
                      text: '',
                      border: [false, false, false, false]
                    }, {
                      text: '',
                      border: [false, false, false, false]
                    }], [{
                      text: '도약 안구운동 시선궤적',
                      fontSize: 11,
                      bold: true,
                      border: [true, true, true, false],
                      alignment: 'center',
                      fillColor: '#1A408E',
                      color: 'white',
                      colSpan: 1,
                      margin: [0, 3, 0, 0]
                    }, {
                      text: '',
                      colSpan: 1,
                      border: [false, false, false, false]
                    }, {
                      text: '',
                      colSpan: 1,
                      // rowSpan:2,
                      border: [false, false, false, true],
                      table: {
                        widths: ['*', '*'],
                        headerRows: 0,
                        body: [[{
                          margin: [3, 0, 3, 0],
                          fontSize: 11,
                          text: "어떤질문을 쓰고",
                          alignment: 'left',
                          colSpan: 2,
                          bold: true
                        }]]
                      },
                      layout: 'titletable'
                    }], [{
                      margin: [0, 0, 0, 0],
                      colSpan: 1,
                      alignment: 'center',
                      image: saccadeRealChart_base64,
                      fit: [300, 273],
                      border: [true, false, true, true]
                    }, {
                      text: '',
                      border: [false, false, false, false],
                      colSpan: 1
                    }, {
                      fontSize: 10,
                      margin: [10, 10, 10, 10],
                      lineHeight: 1.6,
                      ul: ["여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요. " // { text: 'Item 4', bold: true },
                      ],
                      colSpan: 1,
                      border: [false, false, false, false]
                    }]]
                  },
                  layout: 'showline'
                }); //4개짜리 방향별 분석

                docDefinition.content.push({
                  pageBreak: 'after',
                  name: '도약안구운동 1줄 파랑메뉴',
                  margin: [5, 20, 5, 5],
                  table: {
                    dontBreakRows: true,
                    widths: ['100%'],
                    headerRows: 0,
                    body: [[{
                      text: '',
                      border: [false, false, false, false]
                    }], [{
                      text: '도약 안구운동 시선',
                      fontSize: 11,
                      bold: true,
                      border: [true, true, true, false],
                      alignment: 'center',
                      fillColor: '#1A408E',
                      color: 'white',
                      colSpan: 1,
                      margin: [0, 3, 0, 0]
                    }], [{
                      margin: [0, 0, 0, 0],
                      colSpan: 1,
                      alignment: 'center',
                      image: saccadeDirectionChart_base64,
                      fit: [600, 205],
                      border: [true, false, true, true]
                    }]]
                  },
                  layout: 'showline'
                });
                set_isfinishThisPage(true);
                _context.next = 82;
                break;

              case 35:
                if (!(pageType === 'pursuit')) {
                  _context.next = 57;
                  break;
                }

                //pursuitGradeChart
                _p = [];

                _p.push((0, _html2canvas.default)(document.getElementById("pursuitGradeChart")));

                _p.push((0, _html2canvas.default)(document.getElementById("pursuitErrChart")));

                _p.push((0, _html2canvas.default)(document.getElementById("pursuitDirectionChart")));

                _p.push((0, _html2canvas.default)(document.getElementById("pursuitRealChart")));

                _context.next = 43;
                return Promise.all(_p);

              case 43:
                _canvsArr = _context.sent;
                pursuitGradeChart_base64 = _canvsArr[0].toDataURL();
                pursuitErrChart_base64 = _canvsArr[1].toDataURL();
                pursuitDirectionChart_base64 = _canvsArr[2].toDataURL();
                pursuitRealChart_base64 = _canvsArr[3].toDataURL(); //스샷2개

                docDefinition.content.push({
                  name: '추적안구운동점수와 설명',
                  margin: [5, 5, 5, 5],
                  table: {
                    dontBreakRows: true,
                    widths: ['40%', '1%', '59%'],
                    headerRows: 0,
                    body: [[{
                      margin: [0, 3, 0, 0],
                      text: '추적안구운동 점수 분포',
                      fontSize: 11,
                      bold: true,
                      border: [true, true, true, false],
                      alignment: 'center',
                      fillColor: '#1A408E',
                      color: 'white',
                      colSpan: 1
                    }, {
                      text: '',
                      colSpan: 1,
                      border: [false, false, false, false]
                    }, {
                      margin: [0, 3, 0, 0],
                      text: '추적안구운동 점수 분포',
                      fontSize: 11,
                      bold: true,
                      border: [true, true, true, false],
                      alignment: 'center',
                      fillColor: '#1A408E',
                      color: 'white',
                      colSpan: 1
                    }], [{
                      image: pursuitGradeChart_base64,
                      colSpan: 1,
                      alignment: 'center',
                      // text: '사진',
                      fit: [183, 157],
                      // width:'100%',
                      margin: [0, 20, 0, 0],
                      border: [true, false, true, true]
                    }, {
                      text: '',
                      border: [false, false, false, false],
                      colSpan: 1
                    }, {
                      image: pursuitErrChart_base64,
                      colSpan: 1,
                      alignment: 'center',
                      // text: '사진',
                      fit: [285, 260],
                      // width:'100%',
                      margin: [0, 0, 0, 0],
                      border: [true, false, true, true]
                    }]]
                  },
                  layout: 'showline'
                }); //설명1

                docDefinition.content.push({
                  name: '두번째 타이틀테이블',
                  margin: [5, 10, 5, 0],
                  table: {
                    widths: ['*', '*'],
                    headerRows: 0,
                    body: [[{
                      margin: [3, 0, 3, 0],
                      fontSize: 11,
                      text: "추적안구운동 (pursuit)은 무엇인가요?",
                      alignment: 'left',
                      colSpan: 2,
                      bold: true
                    }], [{
                      fontSize: 10,
                      margin: [10, 10, 10, 10],
                      lineHeight: 1.6,
                      ul: ["추적안구운동(pursuit)은 천천히 움직이는 대상을 따라 부드럽고 연속적으로 시선을 움직이는 것입니다. 일반적으로 시선은 빠르게 점프하며 움직이며, 부드럽게 추적하는 추적안구운동은 어려운 기술이기 때문에, 영장류나 고양이 정도의 고등동물에게서 나타나는 능력입니다. 추적안구운동은 보통 노화에 의해 저하되지만, 시력 저하나 안진(안구 진탕)  및 각종 신경계 이상으로 인해 나타나기도 합니다. ", "추적안구운동은 글을 읽을 때 직접적으로 사용되지는 않지만, 안구운동을 정교하게 통제할 수 있는 능력이기 때문에, 이 능력이 부족하면 전반적인 안구운동이 저하되었을 가능성이 있습니다. "],
                      colSpan: 2
                    }]]
                  },
                  layout: 'titletable'
                });
                docDefinition.content.push({
                  name: '설명2',
                  margin: [5, 10, 5, 0],
                  table: {
                    widths: ['*', '*'],
                    headerRows: 0,
                    body: [[{
                      margin: [3, 0, 3, 0],
                      fontSize: 11,
                      text: "어느 정도가 적당한가요?",
                      alignment: 'left',
                      colSpan: 2,
                      bold: true
                    }], [{
                      fontSize: 10,
                      margin: [10, 10, 10, 10],
                      lineHeight: 1.6,
                      ul: ["위치편차는 평균 **도, 도약안구운동 발생률은 5% 이하입니다. "],
                      colSpan: 2
                    }]]
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
                    body: [[{
                      margin: [3, 0, 3, 0],
                      fontSize: 11,
                      text: "어떻게 개선할 수 있나요?",
                      alignment: 'left',
                      colSpan: 2,
                      bold: true
                    }], [{
                      fontSize: 10,
                      margin: [10, 10, 10, 10],
                      lineHeight: 1.6,
                      ul: ["즉각적 피드백이 있는 추적안구운동 훈련을 합니다. ", "집중력을 기릅니다. "],
                      colSpan: 2
                    }]]
                  },
                  layout: 'titletable'
                }); //2페이지 시작

                docDefinition.content.push({
                  name: '도약안구운동 1줄 파랑메뉴',
                  margin: [5, 35, 5, 5],
                  table: {
                    dontBreakRows: true,
                    widths: ['60%', '1%', '39%'],
                    headerRows: 0,
                    body: [[{
                      text: '',
                      border: [false, false, false, false]
                    }, {
                      text: '',
                      border: [false, false, false, false]
                    }, {
                      text: '',
                      border: [false, false, false, false]
                    }], [{
                      text: '추적 안구운동 시선궤적',
                      fontSize: 11,
                      bold: true,
                      border: [true, true, true, false],
                      alignment: 'center',
                      fillColor: '#1A408E',
                      color: 'white',
                      colSpan: 1,
                      margin: [0, 3, 0, 0]
                    }, {
                      text: '',
                      colSpan: 1,
                      border: [false, false, false, false]
                    }, {
                      text: '',
                      colSpan: 1,
                      // rowSpan:2,
                      border: [false, false, false, true],
                      table: {
                        widths: ['*', '*'],
                        headerRows: 0,
                        body: [[{
                          margin: [3, 0, 3, 0],
                          fontSize: 11,
                          text: "어떤질문을 쓰고",
                          alignment: 'left',
                          colSpan: 2,
                          bold: true
                        }]]
                      },
                      layout: 'titletable'
                    }], [{
                      margin: [0, 0, 0, 0],
                      colSpan: 1,
                      alignment: 'center',
                      image: pursuitRealChart_base64,
                      fit: [300, 273],
                      border: [true, false, true, true]
                    }, {
                      text: '',
                      border: [false, false, false, false],
                      colSpan: 1
                    }, {
                      fontSize: 10,
                      margin: [10, 10, 10, 10],
                      lineHeight: 1.6,
                      ul: ["여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요. " // { text: 'Item 4', bold: true },
                      ],
                      colSpan: 1,
                      border: [false, false, false, false]
                    }]]
                  },
                  layout: 'showline'
                }); //4개짜리 방향별 분석

                docDefinition.content.push({
                  pageBreak: 'after',
                  name: '도약안구운동 1줄 파랑메뉴',
                  margin: [5, 20, 5, 5],
                  table: {
                    dontBreakRows: true,
                    widths: ['100%'],
                    headerRows: 0,
                    body: [[{
                      text: '',
                      border: [false, false, false, false]
                    }], [{
                      text: '추적 안구운동 수평수직 시선',
                      fontSize: 11,
                      bold: true,
                      border: [true, true, true, false],
                      alignment: 'center',
                      fillColor: '#1A408E',
                      color: 'white',
                      colSpan: 1,
                      margin: [0, 3, 0, 0]
                    }], [{
                      margin: [0, 0, 0, 0],
                      colSpan: 1,
                      alignment: 'center',
                      image: pursuitDirectionChart_base64,
                      fit: [600, 205],
                      border: [true, false, true, true]
                    }]]
                  },
                  layout: 'showline'
                });
                set_isfinishThisPage(true);
                _context.next = 82;
                break;

              case 57:
                if (!(pageType === "antisaccade")) {
                  _context.next = 81;
                  break;
                }

                //antisaccadeGradeChart
                //#@!
                _p2 = [];

                _p2.push((0, _html2canvas.default)(document.getElementById("antisaccadeGradeChart")));

                _p2.push((0, _html2canvas.default)(document.getElementById("antisaccadeErrDirectionChart")));

                _p2.push((0, _html2canvas.default)(document.getElementById("antisaccadeLatencyChart")));

                _p2.push((0, _html2canvas.default)(document.getElementById("antisaccadeDirectionChart")));

                _p2.push((0, _html2canvas.default)(document.getElementById("antisaccadeRealChart"))); //antisaccadeErrDirectionChart
                //antisaccadeLatencyChart


                _context.next = 66;
                return Promise.all(_p2);

              case 66:
                _canvsArr2 = _context.sent;
                antisaccadeGradeChart_base64 = _canvsArr2[0].toDataURL();
                antisaccadeErrDirectionChart_base64 = _canvsArr2[1].toDataURL();
                antisaccadeLatencyChart_base64 = _canvsArr2[2].toDataURL();
                antisaccadeDirectionChart_base64 = _canvsArr2[3].toDataURL();
                antisaccadeRealChart_base64 = _canvsArr2[4].toDataURL(); //스샷3개

                docDefinition.content.push({
                  name: '추적안구운동점수와 설명',
                  margin: [5, 5, 5, 5],
                  table: {
                    dontBreakRows: true,
                    widths: ['32%', '1%', '33%', '1%', '33%'],
                    headerRows: 0,
                    body: [[{
                      margin: [0, 3, 0, 0],
                      text: '반대로보기 점수 분포',
                      fontSize: 11,
                      bold: true,
                      border: [true, true, true, false],
                      alignment: 'center',
                      fillColor: '#1A408E',
                      color: 'white',
                      colSpan: 1
                    }, {
                      text: '',
                      colSpan: 1,
                      border: [false, false, false, false]
                    }, {
                      margin: [0, 3, 0, 0],
                      text: '이동방향 오류',
                      fontSize: 11,
                      bold: true,
                      border: [true, true, true, false],
                      alignment: 'center',
                      fillColor: '#1A408E',
                      color: 'white',
                      colSpan: 1
                    }, {
                      text: '',
                      colSpan: 1,
                      border: [false, false, false, false]
                    }, {
                      margin: [0, 3, 0, 0],
                      text: '평균 지체시간',
                      fontSize: 11,
                      bold: true,
                      border: [true, true, true, false],
                      alignment: 'center',
                      fillColor: '#1A408E',
                      color: 'white',
                      colSpan: 1
                    }], [{
                      image: antisaccadeGradeChart_base64,
                      colSpan: 1,
                      alignment: 'center',
                      // text: '사진',
                      fit: [183, 117],
                      // width:'100%',
                      margin: [0, 20, 0, 0],
                      border: [true, false, true, true]
                    }, {
                      text: '',
                      border: [false, false, false, false],
                      colSpan: 1
                    }, {
                      image: antisaccadeErrDirectionChart_base64,
                      colSpan: 1,
                      alignment: 'center',
                      // text: '사진',
                      fit: [285, 90],
                      // width:'100%',
                      margin: [0, 30, 0, 0],
                      border: [true, false, true, true]
                    }, {
                      text: '',
                      border: [false, false, false, false],
                      colSpan: 1
                    }, {
                      image: antisaccadeLatencyChart_base64,
                      colSpan: 1,
                      alignment: 'center',
                      // text: '사진',
                      fit: [285, 90],
                      // width:'100%',
                      margin: [0, 30, 0, 0],
                      border: [true, false, true, true]
                    }]]
                  },
                  layout: 'showline'
                }); //설명1,2,3

                docDefinition.content.push({
                  name: '두번째 타이틀테이블',
                  margin: [5, 10, 5, 0],
                  table: {
                    widths: ['*', '*'],
                    headerRows: 0,
                    body: [[{
                      margin: [3, 0, 3, 0],
                      fontSize: 11,
                      text: "반대로 보기 (anti - saccade)은 무엇인가요?",
                      alignment: 'left',
                      colSpan: 2,
                      bold: true
                    }], [{
                      fontSize: 10,
                      margin: [10, 10, 10, 10],
                      lineHeight: 1.6,
                      ul: ["반대로 보기는 지각된 사물을 자동적으로 바라보는 것을 통제하는 능력을 측정합니다. ", "따라보기(pro saccade)과제는 지각된 대상을 바라보는 과제이고, 반대로 보기(anti saccade)과제는 지각된 대상을 보지 않고 반대로 시선을 이동하는 과제입니다. 무언가 보이면 반사적으로 시선이 가려는 경향이 있기 때문에, 지각에 대한 행동을 통제하는 능력이나 집중력이 낮으면 반대보기 과제를 하기 어렵습니다. 집중력 저하, 난독증, ADHD 등의 증상과 관련이 있는 경우가 있습니다. "],
                      colSpan: 2
                    }]]
                  },
                  layout: 'titletable'
                });
                docDefinition.content.push({
                  name: '두번째 타이틀테이블',
                  margin: [5, 10, 5, 0],
                  table: {
                    widths: ['*', '*'],
                    headerRows: 0,
                    body: [[{
                      margin: [3, 0, 3, 0],
                      fontSize: 11,
                      text: "어느 정도가 적당한가요?",
                      alignment: 'left',
                      colSpan: 2,
                      bold: true
                    }], [{
                      fontSize: 10,
                      margin: [10, 10, 10, 10],
                      lineHeight: 1.6,
                      ul: ["방향 정확성 : 따라보기는 대상이 있는 쪽으로, 반대보기는 대상의 반대쪽으로 시선이 움직였는지를 측정한 비율입니다. 반대보기의 정확도가 높은 것이 바람직하며, 대체로 85% 이상입니다. ", "지체시간(latency) : 대상을 보고 시선을 움직이기 전까지 소요되는 시간입니다. 보통 반대로보기시 따라보기보다 더 오래 걸리며,  300ms 이하인 것이 좋습니다. "],
                      colSpan: 2
                    }]]
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
                    body: [[{
                      margin: [3, 0, 3, 0],
                      fontSize: 11,
                      text: "어떻게 개선할 수 있나요?",
                      alignment: 'left',
                      colSpan: 2,
                      bold: true
                    }], [{
                      fontSize: 10,
                      margin: [10, 10, 10, 10],
                      lineHeight: 1.6,
                      ul: ["즉각적 피드백이 있는 반대로 보기 훈련을 합니다. ", "집중력을 기릅니다. "],
                      colSpan: 2
                    }]]
                  },
                  layout: 'titletable'
                }); //2페이지

                docDefinition.content.push({
                  name: '도약안구운동 1줄 파랑메뉴',
                  margin: [5, 35, 5, 5],
                  table: {
                    dontBreakRows: true,
                    widths: ['60%', '1%', '39%'],
                    headerRows: 0,
                    body: [[{
                      text: '',
                      border: [false, false, false, false]
                    }, {
                      text: '',
                      border: [false, false, false, false]
                    }, {
                      text: '',
                      border: [false, false, false, false]
                    }], [{
                      text: '반대로 보기 시선궤적',
                      fontSize: 11,
                      bold: true,
                      border: [true, true, true, false],
                      alignment: 'center',
                      fillColor: '#1A408E',
                      color: 'white',
                      colSpan: 1,
                      margin: [0, 3, 0, 0]
                    }, {
                      text: '',
                      colSpan: 1,
                      border: [false, false, false, false]
                    }, {
                      text: '',
                      colSpan: 1,
                      // rowSpan:2,
                      border: [false, false, false, true],
                      table: {
                        widths: ['*', '*'],
                        headerRows: 0,
                        body: [[{
                          margin: [3, 0, 3, 0],
                          fontSize: 11,
                          text: "어떤질문을 쓰고",
                          alignment: 'left',
                          colSpan: 2,
                          bold: true
                        }]]
                      },
                      layout: 'titletable'
                    }], [{
                      margin: [0, 0, 0, 0],
                      colSpan: 1,
                      alignment: 'center',
                      image: antisaccadeRealChart_base64,
                      fit: [300, 273],
                      border: [true, false, true, true]
                    }, {
                      text: '',
                      border: [false, false, false, false],
                      colSpan: 1
                    }, {
                      fontSize: 10,
                      margin: [10, 10, 10, 10],
                      lineHeight: 1.6,
                      ul: ["여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요.여기에 엄청 설명이 많아요. " // { text: 'Item 4', bold: true },
                      ],
                      colSpan: 1,
                      border: [false, false, false, false]
                    }]]
                  },
                  layout: 'showline'
                }); //4개짜리 방향별 분석

                docDefinition.content.push({
                  // pageBreak: 'after',
                  name: '도약안구운동 1줄 파랑메뉴',
                  margin: [5, 20, 5, 5],
                  table: {
                    dontBreakRows: true,
                    widths: ['100%'],
                    headerRows: 0,
                    body: [[{
                      text: '',
                      border: [false, false, false, false]
                    }], [{
                      text: '도약 안구운동 시선',
                      fontSize: 11,
                      bold: true,
                      border: [true, true, true, false],
                      alignment: 'center',
                      fillColor: '#1A408E',
                      color: 'white',
                      colSpan: 1,
                      margin: [0, 3, 0, 0]
                    }], [{
                      margin: [0, 0, 0, 0],
                      colSpan: 1,
                      alignment: 'center',
                      image: antisaccadeDirectionChart_base64,
                      fit: [600, 205],
                      border: [true, false, true, true]
                    }]]
                  },
                  layout: 'showline'
                });
                set_isfinishThisPage(true);
                _context.next = 82;
                break;

              case 81:
                set_isfinishThisPage(true);

              case 82:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _doit.apply(this, arguments);
    }

    doit();
  }, [isPDFing, selDataIndex, progressMax, docDefinition, isfinishThisPage, dataArr, resultInform, userInform, myPercentArr, myStateArr, targetGroupData]);

  _react.default.useEffect(function () {
    if (isPDFing === 'exit') {
      var pdfDocGenerator = _pdfmake.default.createPdf(docDefinition);

      pdfDocGenerator.getBlob(function (blob) {
        // console.log(blob);
        set_isPDFing(null);
        set_progressNow(null);
        set_PDFURL(URL.createObjectURL(blob));
        console.log("보고서 변환종료!");
        set_docDefinition(null);
      }); // let downloadfilename ;
      // //Agency_클래스_사용자이름(아이디)_날짜시간.pdf
      // downloadfilename=`${userinform.agencyName}_${userinform.testeeClass?userinform.testeeClass:'클래스'}_[${userinform.testeeName}(${userinform.testeeID})]_${moment(textSetResultsData[0].savetime).format("YYYY년MM월DD일HH시mm분ss초")+'.pdf'}`;
      // pdfDocGenerator.download(downloadfilename);
    }
  }, [isPDFing, docDefinition]);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ScreeningViewer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "contents"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "leftbar no-drag"
  }, dataArr && dataArr.map(function (data, index) {
    // console.log(data);
    var cn = "oneLeftBarList"; // console.log("selDataIndex",selDataIndex,index);

    if (selDataIndex === index) {
      cn += " selected";
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: cn,
      key: "onLeftBar" + index,
      onClick: function onClick() {
        set_selDataIndex(index);
      }
    }, data.screeningType);
  }), dataArr && selDataIndex !== null && function () {
    var cn = "oneLeftBarList";

    if (selDataIndex === dataArr.length) {
      cn += " selected";
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: cn,
      style: {
        marginTop: '10px'
      },
      key: "oneLeftBar" + dataArr.length,
      onClick: function onClick() {
        set_selDataIndex(dataArr.length);
      }
    }, "\uBCF4\uACE0\uC11C \uB2E4\uC6B4\uB85C\uB4DC");
  }(), /*#__PURE__*/_react.default.createElement("div", {
    className: "oneLeftBarList",
    style: {
      marginTop: '5px'
    },
    onClick: onClose
  }, "\uB098\uAC00\uAE30")), /*#__PURE__*/_react.default.createElement("div", {
    className: "rightContents"
  }, selScreeningType === 'saccade' && targetGroupData && /*#__PURE__*/_react.default.createElement(SaccadeView, {
    data: dataArr[selDataIndex],
    targetGroupData: targetGroupData,
    everyGroupData: everyGroupData
  }), selScreeningType === 'pursuit' && /*#__PURE__*/_react.default.createElement(PursuitView, {
    data: dataArr[selDataIndex],
    targetGroupData: targetGroupData,
    everyGroupData: everyGroupData
  }), selScreeningType === 'antisaccade' && /*#__PURE__*/_react.default.createElement(AntiSaccadeView, {
    data: dataArr[selDataIndex],
    targetGroupData: targetGroupData,
    everyGroupData: everyGroupData
  }), selScreeningType === "보고서 다운로드" && /*#__PURE__*/_react.default.createElement(DownLoadPDF, {
    dataArr: dataArr,
    handlePDFstart: handlePDFstart,
    iframesrc: PDFURL,
    targetGroupData: targetGroupData,
    everyGroupData: everyGroupData
  }))));
};

var SaccadeView = function SaccadeView(_ref3) {
  var props = _extends({}, _ref3);

  var data = props.data,
      targetGroupData = props.targetGroupData,
      everyGroupData = props.everyGroupData;

  var radarChartOption = _react.default.useMemo(function () {
    return {
      plugins: {
        datalabels: {
          formatter: function formatter(value, ctx) {
            return null; //return value !== 0 ? value.toLocaleString(/* ... */) : ''
          },
          anchor: 'center',
          align: 'center',
          color: '#000000'
        }
      },
      maintainAspectRatio: false,
      responsive: true,
      devicePixelRatio: window.devicePixelRatio * 3,
      animation: {
        duration: 0
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
          min: 0
        },
        pointLabels: {
          fontSize: 14,
          weight: '700'
        } //left,right,down,up

      },
      legend: {
        // display:false,
        position: 'top',
        labels: {
          boxWidth: 10,
          fontSize: 12,
          fontStyle: "bold"
        }
      }
    };
  }, []);

  var radarChartOption2 = _react.default.useMemo(function () {
    return {
      plugins: {
        datalabels: {
          formatter: function formatter(value, ctx) {
            return null; //return value !== 0 ? value.toLocaleString(/* ... */) : ''
          },
          anchor: 'center',
          align: 'center',
          color: '#000000'
        }
      },
      animation: {
        duration: 0
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
          min: 0
        },
        pointLabels: {
          fontSize: 14,
          weight: '700'
        } //left,right,down,up

      },
      legend: {
        // display:false,
        position: 'top',
        labels: {
          boxWidth: 10,
          fontSize: 12,
          fontStyle: "bold"
        }
      }
    };
  }, []);

  var taskArr = _react.default.useMemo(function () {
    var MONITOR_PX_PER_CM = data.monitorInform.MONITOR_PX_PER_CM;
    var pixel_per_cm = data.monitorInform.MONITOR_PX_PER_CM; //1cm 당 pixel

    var degree_per_cm = Math.atan(1 / data.defaultZ) * 180 / Math.PI;
    var w = data.screenW;
    var h = data.screenH;
    var screeningObjectList = data.screeningObjectList;
    var taskArr = {
      top: [],
      bottom: [],
      left: [],
      right: []
    };

    for (var i = 0; i < screeningObjectList.length; i++) {
      taskArr[screeningObjectList[i].analysis.direction].push(_objectSpread(_objectSpread({}, screeningObjectList[i]), {}, {
        gazeData: data.taskArr[i],
        analysis: data.analysisArr[i]
      }));
    }

    for (var key in taskArr) {
      for (var _i3 = 0; _i3 < taskArr[key].length; _i3++) {
        var task = taskArr[key][_i3];
        var type = task.type;
        var gazeArr = task.gazeData;
        var blink_arr = get_blink_arr(gazeArr);
        task.blinkArr = blink_arr; // % 로되어있는걸 degree 로 변환작업, 중점이 0,0 x,y degree

        for (var j = 0; j < gazeArr.length; j++) {
          var target_pixels = {
            x: null,
            y: null
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

            var target_xcm = target_pixels.x / pixel_per_cm;
            var target_ycm = target_pixels.y / pixel_per_cm;
            var target_xdegree = target_xcm * degree_per_cm;
            var target_ydegree = target_ycm * degree_per_cm;
            gazeArr[j].target_xdegree = target_xdegree;
            gazeArr[j].target_ydegree = target_ydegree;
          } else if (type === "circular") {
            var radian = Math.PI / 180;
            var radius = task.radius;

            if (gazeArr[j].relTime * 1 < task.startWaitTime) {
              var cosTheta = Math.cos(task.startDegree * radian);
              var sineTheta = Math.sin(task.startDegree * radian);
              target_pixels.x = task.centerCoord.x + radius * cosTheta * MONITOR_PX_PER_CM - w / 2;
              target_pixels.y = task.centerCoord.y - radius * sineTheta * MONITOR_PX_PER_CM - h / 2;
            } else if (gazeArr[j].relTime * 1 < task.duration * 1 + task.startWaitTime * 1) {
              var nowDegree = -((task.startDegree - task.endDegree) * (gazeArr[j].relTime - task.startWaitTime) / task.duration - task.startDegree);

              var _cosTheta3 = Math.cos(nowDegree * radian);

              var _sineTheta3 = Math.sin(nowDegree * radian);

              target_pixels.x = task.centerCoord.x + radius * _cosTheta3 * MONITOR_PX_PER_CM - w / 2;
              target_pixels.y = task.centerCoord.y - radius * _sineTheta3 * MONITOR_PX_PER_CM - h / 2;
            } else {
              var _cosTheta4 = Math.cos(task.endDegree * radian);

              var _sineTheta4 = Math.sin(task.endDegree * radian);

              target_pixels.x = task.centerCoord.x + radius * _cosTheta4 * MONITOR_PX_PER_CM - w / 2;
              target_pixels.y = task.centerCoord.y - radius * _sineTheta4 * MONITOR_PX_PER_CM - h / 2;
            }

            var _target_xcm2 = target_pixels.x / pixel_per_cm;

            var _target_ycm2 = target_pixels.y / pixel_per_cm;

            var _target_xdegree2 = _target_xcm2 * degree_per_cm;

            var _target_ydegree2 = _target_ycm2 * degree_per_cm;

            gazeArr[j].target_xdegree = _target_xdegree2;
            gazeArr[j].target_ydegree = _target_ydegree2;
          }

          if (gazeArr[j].RPOGV) {
            var xpixel = (gazeArr[j].RPOGX - 0.5) * w;
            var ypixel = (gazeArr[j].RPOGY - 0.5) * h;
            var xcm = xpixel / pixel_per_cm;
            var ycm = ypixel / pixel_per_cm;
            var xdegree = xcm * degree_per_cm;
            var ydegree = ycm * degree_per_cm;
            gazeArr[j].xdegree = xdegree;
            gazeArr[j].ydegree = ydegree;
          } else {
            gazeArr[j].xdegree = null;
            gazeArr[j].ydegree = null;
          }
        } // const startRelTime = task.startWaitTime - 1;
        // const endRelTime = task.relativeEndTime - task.endWaitTime-1.5;


        var startRelTime = task.startWaitTime - 0.5;
        var endRelTime = task.relativeEndTime - task.endWaitTime - 2;

        if (key === 'top' || key === 'bottom') {
          var target_ydegreeChartArr = [];
          var ydegreeChartArr = [];

          for (var _j4 = 0; _j4 < gazeArr.length; _j4++) {
            if (gazeArr[_j4].relTime >= startRelTime && gazeArr[_j4].relTime <= endRelTime) {
              target_ydegreeChartArr.push({
                x: (gazeArr[_j4].relTime - startRelTime) * 1000,
                y: gazeArr[_j4].target_ydegree
              });
              ydegreeChartArr.push({
                x: (gazeArr[_j4].relTime - startRelTime) * 1000,
                y: gazeArr[_j4].ydegree
              });
            }
          }

          task.target_ydegreeChartArr = target_ydegreeChartArr;
          task.ydegreeChartArr = ydegreeChartArr;
        } else {
          //right || left
          var target_xdegreeChartArr = [];
          var xdegreeChartArr = [];

          for (var _j5 = 0; _j5 < gazeArr.length; _j5++) {
            if (gazeArr[_j5].relTime >= startRelTime && gazeArr[_j5].relTime <= endRelTime) {
              target_xdegreeChartArr.push({
                x: (gazeArr[_j5].relTime - startRelTime) * 1000,
                y: gazeArr[_j5].target_xdegree
              });
              xdegreeChartArr.push({
                x: (gazeArr[_j5].relTime - startRelTime) * 1000,
                y: gazeArr[_j5].xdegree
              });
            }
          }

          task.target_xdegreeChartArr = target_xdegreeChartArr;
          task.xdegreeChartArr = xdegreeChartArr;
        }

        var blkChartArr = [];

        for (var _j6 = 0; _j6 < task.blinkArr.length; _j6++) {
          if (task.blinkArr[_j6].BLKS >= endRelTime) {// console.log("찾음",task.blinkArr[j].BLKS)
          } else if (task.blinkArr[_j6].BLKS >= startRelTime && task.blinkArr[_j6].BLKS + task.blinkArr[_j6].BLKD >= endRelTime) {
            blkChartArr.push({
              x: (task.blinkArr[_j6].BLKS - startRelTime) * 1000,
              y: 0
            });
            blkChartArr.push({
              x: (task.blinkArr[_j6].BLKS - startRelTime) * 1000,
              y: 1
            });
            blkChartArr.push({
              x: endRelTime * 1000,
              y: 1
            });
            blkChartArr.push({
              x: endRelTime * 1000,
              y: 0
            });
          } else if (task.blinkArr[_j6].BLKS - startRelTime >= 0) {
            blkChartArr.push({
              x: (task.blinkArr[_j6].BLKS - startRelTime) * 1000,
              y: 0
            });
            blkChartArr.push({
              x: (task.blinkArr[_j6].BLKS - startRelTime) * 1000,
              y: 1
            });
            blkChartArr.push({
              x: (task.blinkArr[_j6].BLKS + task.blinkArr[_j6].BLKD - startRelTime) * 1000,
              y: 1
            });
            blkChartArr.push({
              x: (task.blinkArr[_j6].BLKS + task.blinkArr[_j6].BLKD - startRelTime) * 1000,
              y: 0
            });
          } else if (task.blinkArr[_j6].BLKS - startRelTime <= 0 && task.blinkArr[_j6].BLKS + task.blinkArr[_j6].BLKD - startRelTime >= 0) {
            blkChartArr.push({
              x: 0,
              y: 0
            });
            blkChartArr.push({
              x: 0,
              y: 1
            });
            blkChartArr.push({
              x: (task.blinkArr[_j6].BLKS + task.blinkArr[_j6].BLKD - startRelTime) * 1000,
              y: 1
            });
            blkChartArr.push({
              x: (task.blinkArr[_j6].BLKS + task.blinkArr[_j6].BLKD - startRelTime) * 1000,
              y: 0
            });
          }
        }

        task.blkChartArr = blkChartArr;
        var latencyChart = {
          s: (task.analysis.startTime - startRelTime) * 1000,
          e: (task.analysis.endTime - startRelTime) * 1000
        };
        task.latencyChart = latencyChart;
      }
    } // console.log("taskArr",taskArr);


    return taskArr;
  }, [data]);

  var saccadeTopChartOption = _react.default.useMemo(function () {
    var annotation = [];
    var topTaskArr = taskArr.top;

    for (var i = 0; i < topTaskArr.length; i++) {
      // console.log("topTaskArr[i",topTaskArr[i]);
      annotation.push({
        drawTime: "afterDatasetsDraw",
        // (default)
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
        drawTime: "afterDatasetsDraw",
        // (default)
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
    } //groupData


    annotation.push({
      drawTime: "beforeDatasetsDraw",
      // (default)
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
      yMax: 10
    }); // annotation.push({
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
          formatter: function formatter(value, ctx) {
            return null; //return value !== 0 ? value.toLocaleString(/* ... */) : ''
          },
          anchor: 'center',
          align: 'center',
          color: '#000000'
        }
      },
      annotation: {
        events: ["click"],
        annotations: annotation
      },
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio * 3,
      animation: {
        duration: 0
      },
      tooltips: {
        callbacks: {
          title: function title(tooltipItem, data) {
            return '';
          }
        }
      },
      scales: {
        xAxes: [{
          id: "timeid",
          display: true,
          // 실제시간 임시로 true//
          type: 'time',
          time: {
            unit: 'mything',
            displayFormats: {
              mything: 'ss.SSS'
            } ///////여기서조정해야함
            // min: 0 * 1000,
            // max: 1.5 * 1000,

          },
          //x축 숨기려면 이렇게
          // gridLines: {
          //     color: "rgba(0, 0, 0, 0)",
          // },
          scaleLabel: {
            /////////////////x축아래 라벨
            display: false,
            labelString: 'Time(s)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            source: 'data',
            //auto,data,labels
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
        }],
        yAxes: [{
          id: "degree",
          position: 'left',
          scaleLabel: {
            /////////////////x축아래 라벨
            display: true,
            labelString: 'Position(d)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            max: 10,
            min: -10
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }, {
          id: "ax_blink",
          stepSize: 1,
          position: 'left',
          // 오른쪽의 Fixation 옆 Blink축
          display: false,
          ticks: {
            max: 1
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }]
      }
    };
  }, [taskArr, targetGroupData]);

  var saccadeTopData = _react.default.useMemo(function () {
    return {
      datasets: [{
        //targety
        data: taskArr.top[0].target_ydegreeChartArr,
        steppedLine: "before",
        label: "targetV",
        borderColor: "rgba(0,255,0,0.8)",
        //"#0000ff",
        backgroundColor: 'rgba(0,255,0,0.8)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.top[0].ydegreeChartArr,
        steppedLine: false,
        label: "gazeV1",
        borderColor: "rgba(255,0,0,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(255,0,0,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.top[1].ydegreeChartArr,
        steppedLine: false,
        label: "gazeV2",
        borderColor: "rgba(0,0,255,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(0,0,255,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }]
    };
  }, [taskArr]);

  var saccadeBottomChartOption = _react.default.useMemo(function () {
    var annotation = [];
    var bottomTaskArr = taskArr.bottom;

    for (var i = 0; i < bottomTaskArr.length; i++) {
      // console.log("bottomTaskArr",bottomTaskArr);
      annotation.push({
        drawTime: "afterDatasetsDraw",
        // (default)
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
        drawTime: "afterDatasetsDraw",
        // (default)
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
    } //groupData


    annotation.push({
      drawTime: "beforeDatasetsDraw",
      // (default)
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
      yMax: 10
    });
    return {
      plugins: {
        datalabels: {
          formatter: function formatter(value, ctx) {
            return null; //return value !== 0 ? value.toLocaleString(/* ... */) : ''
          },
          anchor: 'center',
          align: 'center',
          color: '#000000'
        }
      },
      annotation: {
        events: ["click"],
        annotations: annotation
      },
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio * 3,
      animation: {
        duration: 0
      },
      tooltips: {
        callbacks: {
          title: function title(tooltipItem, data) {
            return '';
          }
        }
      },
      scales: {
        xAxes: [{
          id: "timeid",
          display: true,
          // 실제시간 임시로 true//
          type: 'time',
          time: {
            unit: 'mything',
            displayFormats: {
              mything: 'ss.SSS'
            } ///////여기서조정해야함
            // min: 0 * 1000,
            // max: 1.5 * 1000,

          },
          //x축 숨기려면 이렇게
          // gridLines: {
          //     color: "rgba(0, 0, 0, 0)",
          // },
          scaleLabel: {
            /////////////////x축아래 라벨
            display: false,
            labelString: 'Time(s)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            source: 'data',
            //auto,data,labels
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
        }],
        yAxes: [{
          id: "degree",
          position: 'left',
          scaleLabel: {
            /////////////////x축아래 라벨
            display: true,
            labelString: 'Position(d)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            max: 10,
            min: -10
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }, {
          id: "ax_blink",
          stepSize: 1,
          position: 'left',
          // 오른쪽의 Fixation 옆 Blink축
          display: false,
          ticks: {
            max: 1
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }]
      }
    };
  }, [taskArr, targetGroupData]);

  var saccadeBottomData = _react.default.useMemo(function () {
    return {
      datasets: [{
        //targety
        data: taskArr.bottom[0].target_ydegreeChartArr,
        steppedLine: "before",
        label: "targetV",
        borderColor: "rgba(0,255,0,0.8)",
        //"#0000ff",
        backgroundColor: 'rgba(0,255,0,0.8)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.bottom[0].ydegreeChartArr,
        steppedLine: false,
        label: "gazeV1",
        borderColor: "rgba(255,0,0,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(255,0,0,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.bottom[1].ydegreeChartArr,
        steppedLine: false,
        label: "gazeV2",
        borderColor: "rgba(0,0,255,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(0,0,255,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }]
    };
  }, [taskArr]);

  var saccadeRightChartOption = _react.default.useMemo(function () {
    var annotation = [];
    var rightTaskArr = taskArr.right;

    for (var i = 0; i < rightTaskArr.length; i++) {
      // console.log("bottomTaskArr",bottomTaskArr);
      annotation.push({
        drawTime: "afterDatasetsDraw",
        // (default)
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
        drawTime: "afterDatasetsDraw",
        // (default)
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
    } //groupData


    annotation.push({
      drawTime: "beforeDatasetsDraw",
      // (default)
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
      yMax: 10
    });
    return {
      plugins: {
        datalabels: {
          formatter: function formatter(value, ctx) {
            return null; //return value !== 0 ? value.toLocaleString(/* ... */) : ''
          },
          anchor: 'center',
          align: 'center',
          color: '#000000'
        }
      },
      annotation: {
        events: ["click"],
        annotations: annotation
      },
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio * 3,
      animation: {
        duration: 0
      },
      tooltips: {
        callbacks: {
          title: function title(tooltipItem, data) {
            return '';
          }
        }
      },
      scales: {
        xAxes: [{
          id: "timeid",
          display: true,
          // 실제시간 임시로 true//
          type: 'time',
          time: {
            unit: 'mything',
            displayFormats: {
              mything: 'ss.SSS'
            } ///////여기서조정해야함

          },
          //x축 숨기려면 이렇게
          // gridLines: {
          //     color: "rgba(0, 0, 0, 0)",
          // },
          scaleLabel: {
            /////////////////x축아래 라벨
            display: false,
            labelString: 'Time(s)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            source: 'data',
            //auto,data,labels
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
        }],
        yAxes: [{
          id: "degree",
          position: 'left',
          scaleLabel: {
            /////////////////x축아래 라벨
            display: true,
            labelString: 'Position(d)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            max: 10,
            min: -10
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }, {
          id: "ax_blink",
          stepSize: 1,
          position: 'left',
          // 오른쪽의 Fixation 옆 Blink축
          display: false,
          ticks: {
            max: 1
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }]
      }
    };
  }, [taskArr, targetGroupData]);

  var saccadeRightData = _react.default.useMemo(function () {
    return {
      datasets: [{
        //targety
        data: taskArr.right[0].target_xdegreeChartArr,
        steppedLine: "before",
        label: "targetH",
        borderColor: "rgba(0,255,0,0.8)",
        //"#0000ff",
        backgroundColor: 'rgba(0,255,0,0.8)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.right[0].xdegreeChartArr,
        steppedLine: false,
        label: "gazeH1",
        borderColor: "rgba(255,0,0,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(255,0,0,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.right[1].xdegreeChartArr,
        steppedLine: false,
        label: "gazeH2",
        borderColor: "rgba(0,0,255,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(0,0,255,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }]
    };
  }, [taskArr]);

  var saccadeLeftChartOption = _react.default.useMemo(function () {
    var annotation = [];
    var leftTaskArr = taskArr.left;

    for (var i = 0; i < leftTaskArr.length; i++) {
      // console.log("bottomTaskArr",bottomTaskArr);
      annotation.push({
        drawTime: "afterDatasetsDraw",
        // (default)
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
        drawTime: "afterDatasetsDraw",
        // (default)
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
    } //groupData


    annotation.push({
      drawTime: "beforeDatasetsDraw",
      // (default)
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
      yMax: 10
    });
    return {
      plugins: {
        datalabels: {
          formatter: function formatter(value, ctx) {
            return null; //return value !== 0 ? value.toLocaleString(/* ... */) : ''
          },
          anchor: 'center',
          align: 'center',
          color: '#000000'
        }
      },
      annotation: {
        events: ["click"],
        annotations: annotation
      },
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio * 3,
      animation: {
        duration: 0
      },
      tooltips: {
        callbacks: {
          title: function title(tooltipItem, data) {
            return '';
          }
        }
      },
      scales: {
        xAxes: [{
          id: "timeid",
          display: true,
          // 실제시간 임시로 true//
          type: 'time',
          time: {
            unit: 'mything',
            displayFormats: {
              mything: 'ss.SSS'
            } ///////여기서조정해야함
            // min: 0 * 1000,
            // max: 1.5 * 1000,

          },
          //x축 숨기려면 이렇게
          // gridLines: {
          //     color: "rgba(0, 0, 0, 0)",
          // },
          scaleLabel: {
            /////////////////x축아래 라벨
            display: false,
            labelString: 'Time(s)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            source: 'data',
            //auto,data,labels
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
        }],
        yAxes: [{
          id: "degree",
          position: 'left',
          scaleLabel: {
            /////////////////x축아래 라벨
            display: true,
            labelString: 'Position(d)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            max: 10,
            min: -10
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }, {
          id: "ax_blink",
          stepSize: 1,
          position: 'left',
          // 오른쪽의 Fixation 옆 Blink축
          display: false,
          ticks: {
            max: 1
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }]
      }
    };
  }, [taskArr, targetGroupData]);

  var saccadeLeftData = _react.default.useMemo(function () {
    return {
      datasets: [{
        //targety
        data: taskArr.left[0].target_xdegreeChartArr,
        steppedLine: "before",
        label: "targetH",
        borderColor: "rgba(0,255,0,0.8)",
        //"#0000ff",
        backgroundColor: 'rgba(0,255,0,0.8)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.left[0].xdegreeChartArr,
        steppedLine: false,
        label: "gazeH1",
        borderColor: "rgba(255,0,0,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(255,0,0,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.left[1].xdegreeChartArr,
        steppedLine: false,
        label: "gazeH2",
        borderColor: "rgba(0,0,255,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(0,0,255,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }]
    };
  }, [taskArr]);

  var transparentCanvasRef = _react.default.useRef();

  var _React$useState13 = _react.default.useState(true),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      showUpward = _React$useState14[0],
      set_showUpward = _React$useState14[1];

  var _React$useState15 = _react.default.useState(true),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      showDownward = _React$useState16[0],
      set_showDownward = _React$useState16[1];

  var _React$useState17 = _react.default.useState(true),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      showLeftward = _React$useState18[0],
      set_showLeftward = _React$useState18[1];

  var _React$useState19 = _react.default.useState(true),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      showRightward = _React$useState20[0],
      set_showRightward = _React$useState20[1];

  var drawTransparentCanvas = _react.default.useCallback(function () {
    if (!data || !taskArr || !transparentCanvasRef) return;
    var canvas = transparentCanvasRef.current;
    var rctx = canvas.getContext('2d');
    var Wpx = 1020; //340 *2

    var Hpx = 1020;
    rctx.clearRect(0, 0, Wpx, Hpx);

    for (var key in taskArr) {
      for (var k = 0; k < taskArr[key].length; k++) {
        var task = taskArr[key][k];
        var startRelTime = task.startWaitTime - 0.5;
        var endRelTime = task.relativeEndTime - task.endWaitTime - 2;
        var gazeArr = task.gazeData;

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

        var beforeX = null,
            beforeY = null;

        for (var i = 0; i < gazeArr.length; i++) {
          if (gazeArr[i].relTime >= startRelTime && gazeArr[i].relTime <= endRelTime) {
            rctx.beginPath();
            rctx.lineWidth = 9; //340 : 20 =  x :gazeArr[i].xdegree+10
            //340px : 20degree = xpx : 
            // x = 340*(gazeArr[i].xdegree+10)/20 

            var x = (gazeArr[i].xdegree + 10) * Wpx / 20;
            var y = (gazeArr[i].ydegree + 10) * Hpx / 20;
            rctx.arc(x, y, 1, 0, Math.PI * 2);
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

  _react.default.useEffect(function () {
    if (taskArr) {
      drawTransparentCanvas();
    }
  }, [taskArr, drawTransparentCanvas]);

  var _React$useState21 = _react.default.useState(false),
      _React$useState22 = _slicedToArray(_React$useState21, 2),
      showGazeViewer = _React$useState22[0],
      set_showGazeViewer = _React$useState22[1];

  var myPercent = _react.default.useMemo(function () {
    var x = data.analysis.saccade_score;
    var avg = targetGroupData.avg_saccade_score;
    var std = targetGroupData.std_saccade_score || 1;
    var p = getGaussianMyPercent(avg, std, x); // console.log("p",p);

    return p;
  }, [data, targetGroupData]);

  var myState = _react.default.useMemo(function () {
    var mystate;

    if (myPercent <= 10) {
      mystate = '최우수';
    } else if (myPercent > 10 && myPercent <= 25) {
      mystate = '우수';
    } else if (myPercent > 25 && myPercent <= 75) {
      mystate = "양호";
    } else if (myPercent > 75 && myPercent <= 90) {
      mystate = "미흡";
    } else {
      mystate = "주의";
    }

    return mystate;
  }, [myPercent]);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "SaccadeView"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uB3C4\uC57D\uC548\uAD6C\uC6B4\uB3D9 \uACB0\uACFC"), /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '60%',
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '55%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _base.imgbase64forPDF[myState],
    alt: "",
    style: {
      height: '50%'
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '45%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontSize: '19px',
      fontWeight: '700',
      paddingLeft: '7px',
      paddingTop: '12px'
    }
  }, myState)), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '40%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingLeft: '15px',
      borderTop: '1px solid #1A408E'
    }
  }, /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "\uB0B4 \uC810\uC218: ", data.analysis.saccade_score.toFixed(2), "\uC810 (\uC0C1\uC704 ", myPercent, "%)"), /*#__PURE__*/_react.default.createElement("li", null, "\uB610\uB798 \uD3C9\uADE0 \uC810\uC218: ", targetGroupData.avg_saccade_score.toFixed(2), "\uC810"), /*#__PURE__*/_react.default.createElement("li", null, "\uC804\uCCB4 \uD3C9\uADE0 \uC810\uC218: ", everyGroupData.avg_saccade_score.toFixed(2), "\uC810"))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox",
    style: {
      width: '330px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uB3C4\uC57D\uC548\uAD6C\uC6B4\uB3D9 \uC810\uC218 \uBD84\uD3EC"), /*#__PURE__*/_react.default.createElement("div", {
    id: "saccadeGradeChart",
    className: "cbox",
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(BarChartGrade, {
    myScore: data.analysis.saccade_score,
    avgGroupScore: targetGroupData.avg_saccade_score,
    stdGroupScore: targetGroupData.std_saccade_score
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox",
    style: {
      width: '850px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uB3C4\uC57D\uC548\uAD6C\uC6B4\uB3D9 \uC810\uC218 \uBD84\uD3EC"), /*#__PURE__*/_react.default.createElement("div", {
    id: "saccadeRadarChart",
    className: "cbox",
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "saccadeLatencyChart",
    className: "cbox3 latencyChartWrap"
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "radar",
    height: null,
    width: null,
    data: {
      labels: ['Up', 'Right', 'Down', 'Left'],
      datasets: [{
        data: [data.analysis.up_saccade_delay * 1000, data.analysis.right_saccade_delay * 1000, data.analysis.down_saccade_delay * 1000, data.analysis.left_saccade_delay * 1000],
        label: 'my Avg Latency time (ms)',
        // backgroundColor:'red',
        borderColor: "rgba(255,0,0,0.6)",
        fill: false
      }, {
        data: [targetGroupData.avg_up_saccade_delay * 1000, targetGroupData.avg_right_saccade_delay * 1000, targetGroupData.avg_down_saccade_delay * 1000, targetGroupData.avg_left_saccade_delay * 1000],
        label: 'group Avg Latency time (ms)',
        // backgroundColor:'red',
        borderColor: "rgba(0,0,0,0.2)",
        fill: false
      }]
    },
    options: radarChartOption
  })), /*#__PURE__*/_react.default.createElement("div", {
    id: "saccadeSpeedChart",
    className: "cbox3 speedChartWrap"
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "radar",
    height: null,
    width: null,
    data: {
      labels: ['Up', 'Right', 'Down', 'Left'],
      datasets: [{
        data: [data.analysis.up_saccade_speed, data.analysis.right_saccade_speed, data.analysis.down_saccade_speed, data.analysis.left_saccade_speed],
        label: 'my Avg Speed (degree/s)',
        // backgroundColor:'red',
        borderColor: "rgba(255,0,0,0.6)",
        fill: false
      }, {
        data: [targetGroupData.avg_up_saccade_speed, targetGroupData.avg_right_saccade_speed, targetGroupData.avg_down_saccade_speed, targetGroupData.avg_left_saccade_speed],
        label: 'group Avg Speed (degree/s)',
        // backgroundColor:'red',
        borderColor: "rgba(0,0,0,0.2)",
        fill: false
      }]
    },
    options: radarChartOption
  })), /*#__PURE__*/_react.default.createElement("div", {
    id: "saccadeFEChart",
    className: "cbox3 fixationErrChartWrap"
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "radar",
    height: null,
    width: null,
    data: {
      labels: ['Up', 'Right', 'Down', 'Left'],
      datasets: [{
        data: [data.analysis.up_fixation_stability, data.analysis.right_fixation_stability, data.analysis.down_fixation_stability, data.analysis.left_fixation_stability],
        label: 'my Avg fixation_err(degree)',
        // backgroundColor:'red',
        borderColor: "rgba(255,0,0,0.6)",
        fill: false
      }, {
        data: [targetGroupData.avg_up_fixation_stability, targetGroupData.avg_right_fixation_stability, targetGroupData.avg_down_fixation_stability, targetGroupData.avg_left_fixation_stability],
        label: 'group Avg fixation_err(degree)',
        // backgroundColor:'red',
        borderColor: "rgba(0,0,0,0.2)",
        fill: false
      }]
    },
    options: radarChartOption2
  }))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox",
    style: {
      width: '450px',
      height: '450px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uB3C4\uC57D \uC548\uAD6C\uC6B4\uB3D9 \uC2DC\uC120 ", /*#__PURE__*/_react.default.createElement("button", {
    className: "viewerbtn",
    onClick: function onClick() {
      return set_showGazeViewer(true);
    }
  }, "Viewer")), /*#__PURE__*/_react.default.createElement("div", {
    id: "saccadeRealChart",
    className: "cbox"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '30px',
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: '10px',
      paddingTop: '3px',
      boxSizing: 'border-box'
    }
  }, "Amplitude : 7.63 Degree"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: 'calc(100% - 60px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "_10degreeDiv",
    style: {
      width: '340px',
      height: '340px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "target center"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "target left"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "target right"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "target top"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "target bottom"
  }), /*#__PURE__*/_react.default.createElement("canvas", {
    className: "transparentCanvas",
    ref: transparentCanvasRef,
    width: 1020,
    height: 1020
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "customLabel",
    style: {
      height: '30px',
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "clickzone",
    style: {
      textDecoration: showUpward === true ? "" : "line-through"
    },
    onClick: function onClick() {
      return set_showUpward(!showUpward);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "upward"
  }), "Upward"), "\xA0\xA0", /*#__PURE__*/_react.default.createElement("div", {
    className: "clickzone",
    style: {
      textDecoration: showRightward === true ? "" : "line-through"
    },
    onClick: function onClick() {
      return set_showRightward(!showRightward);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "rightward"
  }), "Rightward"), "\xA0\xA0", /*#__PURE__*/_react.default.createElement("div", {
    className: "clickzone",
    style: {
      textDecoration: showDownward === true ? "" : "line-through"
    },
    onClick: function onClick() {
      return set_showDownward(!showDownward);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "downward"
  }), "Downward"), "\xA0\xA0", /*#__PURE__*/_react.default.createElement("div", {
    className: "clickzone",
    style: {
      textDecoration: showLeftward === true ? "" : "line-through"
    },
    onClick: function onClick() {
      return set_showLeftward(!showLeftward);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "leftward"
  }), "Leftward"), "\xA0\xA0"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox",
    style: {
      width: '1000px',
      height: '450px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uC2DC\uAC04\uC5D0 \uB530\uB978 \uB3C4\uC57D\uC548\uAD6C\uC6B4\uB3D9"), /*#__PURE__*/_react.default.createElement("div", {
    id: "saccadeDirectionChart",
    className: "cbox"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2r"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2w"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "c_label"
  }, /*#__PURE__*/_react.default.createElement("strong", null, "Upward 7.63 Degree")), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_chart"
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "line",
    height: null,
    width: null,
    data: saccadeTopData,
    options: saccadeTopChartOption
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_avg"
  }, "myAvgLatency : ", /*#__PURE__*/_react.default.createElement("strong", null, (data.analysis.up_saccade_delay * 1000).toFixed(0), " ms"), ", myAvgSpeed : ", /*#__PURE__*/_react.default.createElement("strong", null, data.analysis.up_saccade_speed.toFixed(1), " degree/s"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2w"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "c_label"
  }, /*#__PURE__*/_react.default.createElement("strong", null, "Rightward 7.63 Degree")), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_chart"
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "line",
    height: null,
    width: null,
    data: saccadeRightData,
    options: saccadeRightChartOption
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_avg"
  }, "myAvgLatency : ", /*#__PURE__*/_react.default.createElement("strong", null, (data.analysis.right_saccade_delay * 1000).toFixed(0), " ms"), ", myAvgSpeed : ", /*#__PURE__*/_react.default.createElement("strong", null, data.analysis.right_saccade_speed.toFixed(1), " degree/s")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2r"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2w"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "c_label"
  }, /*#__PURE__*/_react.default.createElement("strong", null, "Downward 7.63 Degree")), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_chart"
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "line",
    height: null,
    width: null,
    data: saccadeBottomData,
    options: saccadeBottomChartOption
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_avg"
  }, "myAvgLatency : ", /*#__PURE__*/_react.default.createElement("strong", null, (data.analysis.down_saccade_delay * 1000).toFixed(0), " ms"), ", myAvgSpeed : ", /*#__PURE__*/_react.default.createElement("strong", null, data.analysis.down_saccade_speed.toFixed(1), " degree/s"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2w"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "c_label"
  }, /*#__PURE__*/_react.default.createElement("strong", null, "Leftward 7.63 Degree")), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_chart"
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "line",
    height: null,
    width: null,
    data: saccadeLeftData,
    options: saccadeLeftChartOption
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_avg"
  }, "myAvgLatency : ", /*#__PURE__*/_react.default.createElement("strong", null, (data.analysis.left_saccade_delay * 1000).toFixed(0), " ms"), ", myAvgSpeed : ", /*#__PURE__*/_react.default.createElement("strong", null, data.analysis.left_saccade_speed.toFixed(1), " degree/s"))))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "titleUnderline"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uB3C4\uC57D\uC548\uAD6C\uC6B4\uB3D9 \uCE21\uC815\uC740 \uBB34\uC5C7\uC778\uAC00\uC694?"), /*#__PURE__*/_react.default.createElement("div", {
    className: "explain"
  }, /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "\uAE00\uC744 \uC77D\uB294 \uB3D9\uC548 \uC2DC\uC120\uC740 \uB04A\uC784\uC5C6\uC774 \uBE60\uB974\uAC8C \uC774\uB3D9(saccade, \uB3C4\uC57D\uC774\uB3D9)\uD558\uBA70 \uAE00\uC790\uC5D0 \uACE0\uC815(fixation, \uC751\uC2DC)\uD558\uB294 \uAC83\uC744 \uBC18\uBCF5\uD569\uB2C8\uB2E4. \uAE00\uC744 \uC720\uCC3D\uD558\uAC8C \uC77D\uAE30 \uC704\uD574\uC11C\uB294 \uC815\uD655\uD55C \uC704\uCE58\uC5D0 \uB208\uC744 \uBE60\uB974\uACE0 \uC815\uD655\uD55C \uC704\uCE58\uB85C \uC62E\uAE30\uACE0, \uC548\uC815\uC801\uC73C\uB85C \uC2DC\uC120\uC744 \uC720\uC9C0\uD558\uB294 \uC6B4\uB3D9\uC81C\uC5B4 \uB2A5\uB825\uC774 \uD544\uC694\uD569\uB2C8\uB2E4. \uC2DC\uB825 \uC800\uD558, \uD53C\uB85C, \uC9D1\uC911\uB825 \uBD80\uC871, \uC548\uAD6C\uC9C4\uD0D5\uC99D \uBC0F \uAC01\uC885 \uC2E0\uACBD\uACC4 \uC774\uC0C1 \uB4F1\uC758 \uC774\uC720\uB85C \uB3C4\uC57D\uC548\uAD6C\uC6B4\uB3D9\uC5D0 \uBB38\uC81C\uAC00 \uC0DD\uAE38 \uC218 \uC788\uC73C\uBA70, \uC774 \uB2A5\uB825\uC774 \uC800\uD558\uB418\uBA74 \uAE00\uC744 \uC720\uCC3D\uD558\uAC8C \uC77D\uB294\uB370 \uBC29\uD574\uAC00 \uB420 \uC218 \uC788\uC2B5\uB2C8\uB2E4."), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("strong", null, "\uC9C0\uC5F0\uC2DC\uAC04 (latency time)"), " : \uC2DC\uAC01 \uC790\uADF9\uBB3C\uC744 \uBC1C\uACAC\uD55C \uB4A4, \uBAA9\uD45C\uB97C \uD5A5\uD574 \uC2DC\uC120\uC774 \uCD9C\uBC1C\uD560 \uB54C\uAE4C\uC9C0 \uAC78\uB9AC\uB294 \uC2DC\uAC04\uC785\uB2C8\uB2E4. \uBC18\uC751\uCC98\uB9AC \uBC0F \uC6B4\uB3D9\uB2A5\uB825\uC774 \uC6B0\uC218\uD560\uC218\uB85D \uC9E7\uC73C\uBA70, \uB300\uCCB4\uB85C 150ms ~ 250ms\uC815\uB3C4\uC785\uB2C8\uB2E4."), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("strong", null, "\uC2DC\uC120\uC774\uB3D9\uC18D\uB3C4 (saccade speed)"), " : \uC2DC\uC120\uC774 \uBAA9\uD45C\uB97C \uD5A5\uD574 \uC774\uB3D9\uD560 \uB54C, \uBAA9\uD45C\uC5D0 \uB2E4\uB2E4\uB97C \uB54C\uAE4C\uC9C0\uC758 \uC18D\uB3C4\uC785\uB2C8\uB2E4. \uC6B4\uB3D9\uC81C\uC5B4\uB2A5\uB825\uC774 \uC6B0\uC218\uD560\uC218\uB85D \uC18D\uB3C4\uAC00 \uBE60\uB974\uBA70, \uC774\uB3D9\uD560 \uAC70\uB9AC\uAC00 \uAC00\uAE4C\uC6B8\uC218\uB85D \uC18D\uB3C4\uB294 \uB290\uB824\uC9D1\uB2C8\uB2E4. \uB300\uCCB4\uB85C 50\uB3C4/\uCD08~200\uB3C4/\uCD08 \uC815\uB3C4\uC785\uB2C8\uB2E4."), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("strong", null, "\uC751\uC2DC\uC548\uC815\uC131 (fixation stability)"), " : \uB300\uC0C1\uC744 \uC751\uC2DC\uD560 \uB54C, \uC2DC\uC120\uC774 \uC5BC\uB9C8\uB098 \uC548\uC815\uC801\uC73C\uB85C \uC720\uC9C0\uD558\uB294\uC9C0\uB97C \uCE21\uC815\uD55C \uCC99\uB3C4\uC785\uB2C8\uB2E4. \uBAA9\uD45C\uC704\uCE58\uB85C\uBD80\uD130\uC758 2\uCD08\uAC04 \uC2DC\uC120\uC704\uCE58 \uD3B8\uCC28\uB85C \uCE21\uC815\uD569\uB2C8\uB2E4. \uC9D1\uC911\uB825\uC774 \uAC15\uD558\uACE0 \uC6B4\uB3D9\uC81C\uC5B4\uB2A5\uB825\uC774 \uC6B0\uC218\uD560\uC218\uB85D \uD3B8\uCC28\uAC00 \uC791\uC73C\uBA70, \uB300\uCCB4\uB85C 0.5\uB3C4 \uB0B4\uC678\uC785\uB2C8\uB2E4."))))), showGazeViewer && /*#__PURE__*/_react.default.createElement("div", {
    className: "GazeViewerWrap"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, " \uC2E4\uC81C \uC2DC\uC120 \uCE21\uC815\uB370\uC774\uD130 ", /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      return set_showGazeViewer(false);
    }
  }, "\uB2EB\uAE30")), /*#__PURE__*/_react.default.createElement("div", {
    className: "view"
  }, /*#__PURE__*/_react.default.createElement(_reactGazeviewer.default, {
    data: data
  })))));
};

var PursuitView = function PursuitView(_ref4) {
  var props = _extends({}, _ref4);

  var data = props.data,
      targetGroupData = props.targetGroupData,
      everyGroupData = props.everyGroupData;

  var _React$useState23 = _react.default.useState(false),
      _React$useState24 = _slicedToArray(_React$useState23, 2),
      showGazeViewer = _React$useState24[0],
      set_showGazeViewer = _React$useState24[1];

  var taskArr = _react.default.useMemo(function () {
    // console.log(data);
    var MONITOR_PX_PER_CM = data.monitorInform.MONITOR_PX_PER_CM;
    var pixel_per_cm = data.monitorInform.MONITOR_PX_PER_CM; //1cm 당 pixel

    var degree_per_cm = Math.atan(1 / data.defaultZ) * 180 / Math.PI;
    var w = data.screenW;
    var h = data.screenH;
    var screeningObjectList = data.screeningObjectList;
    var taskArr = {
      clockwise: [],
      anticlockwise: []
    };

    for (var i = 0; i < screeningObjectList.length; i++) {
      taskArr[screeningObjectList[i].analysis.direction].push(_objectSpread(_objectSpread({}, screeningObjectList[i]), {}, {
        gazeData: data.taskArr[i],
        analysis: data.analysisArr[i]
      }));
    }

    for (var key in taskArr) {
      for (var _i4 = 0; _i4 < taskArr[key].length; _i4++) {
        var task = taskArr[key][_i4];
        var type = task.type;
        var gazeArr = task.gazeData;
        var blink_arr = get_blink_arr(gazeArr);
        task.blinkArr = blink_arr; // % 로되어있는걸 degree 로 변환작업, 중점이 0,0 x,y degree

        for (var j = 0; j < gazeArr.length; j++) {
          var target_pixels = {
            x: null,
            y: null
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

            var target_xcm = target_pixels.x / pixel_per_cm;
            var target_ycm = target_pixels.y / pixel_per_cm;
            var target_xdegree = target_xcm * degree_per_cm;
            var target_ydegree = target_ycm * degree_per_cm;
            gazeArr[j].target_xdegree = target_xdegree;
            gazeArr[j].target_ydegree = target_ydegree;
          } else if (type === "circular") {
            var radian = Math.PI / 180;
            var radius = task.radius;

            if (gazeArr[j].relTime * 1 < task.startWaitTime) {
              var cosTheta = Math.cos(task.startDegree * radian);
              var sineTheta = Math.sin(task.startDegree * radian);
              target_pixels.x = task.centerCoord.x + radius * cosTheta * MONITOR_PX_PER_CM - w / 2;
              target_pixels.y = task.centerCoord.y - radius * sineTheta * MONITOR_PX_PER_CM - h / 2;
            } else if (gazeArr[j].relTime * 1 < task.duration * 1 + task.startWaitTime * 1) {
              var nowDegree = -((task.startDegree - task.endDegree) * (gazeArr[j].relTime - task.startWaitTime) / task.duration - task.startDegree);

              var _cosTheta5 = Math.cos(nowDegree * radian);

              var _sineTheta5 = Math.sin(nowDegree * radian);

              target_pixels.x = task.centerCoord.x + radius * _cosTheta5 * MONITOR_PX_PER_CM - w / 2;
              target_pixels.y = task.centerCoord.y - radius * _sineTheta5 * MONITOR_PX_PER_CM - h / 2;
            } else {
              var _cosTheta6 = Math.cos(task.endDegree * radian);

              var _sineTheta6 = Math.sin(task.endDegree * radian);

              target_pixels.x = task.centerCoord.x + radius * _cosTheta6 * MONITOR_PX_PER_CM - w / 2;
              target_pixels.y = task.centerCoord.y - radius * _sineTheta6 * MONITOR_PX_PER_CM - h / 2;
            }

            var _target_xcm3 = target_pixels.x / pixel_per_cm;

            var _target_ycm3 = target_pixels.y / pixel_per_cm;

            var _target_xdegree3 = _target_xcm3 * degree_per_cm;

            var _target_ydegree3 = _target_ycm3 * degree_per_cm;

            gazeArr[j].target_xdegree = _target_xdegree3;
            gazeArr[j].target_ydegree = _target_ydegree3;
          }

          if (gazeArr[j].RPOGV) {
            var xpixel = (gazeArr[j].RPOGX - 0.5) * w;
            var ypixel = (gazeArr[j].RPOGY - 0.5) * h;
            var xcm = xpixel / pixel_per_cm;
            var ycm = ypixel / pixel_per_cm;
            var xdegree = xcm * degree_per_cm;
            var ydegree = ycm * degree_per_cm;
            gazeArr[j].xdegree = xdegree;
            gazeArr[j].ydegree = ydegree;
          } else {
            gazeArr[j].xdegree = null;
            gazeArr[j].ydegree = null;
          }
        }

        var startRelTime = task.startWaitTime - 0.5;
        var endRelTime = task.relativeEndTime - task.endWaitTime + 0.5; //이거도 해줘야할듯
        // console.log("endRelTime",endRelTime);

        var blkChartArr = [];

        for (var _j7 = 0; _j7 < task.blinkArr.length; _j7++) {
          if (task.blinkArr[_j7].BLKS >= endRelTime) {// console.log("찾음",task.blinkArr[j].BLKS)
          } else if (task.blinkArr[_j7].BLKS >= startRelTime && task.blinkArr[_j7].BLKS + task.blinkArr[_j7].BLKD >= endRelTime) {
            blkChartArr.push({
              x: (task.blinkArr[_j7].BLKS - startRelTime) * 1000,
              y: 0
            });
            blkChartArr.push({
              x: (task.blinkArr[_j7].BLKS - startRelTime) * 1000,
              y: 1
            });
            blkChartArr.push({
              x: endRelTime * 1000,
              y: 1
            });
            blkChartArr.push({
              x: endRelTime * 1000,
              y: 0
            });
          } else if (task.blinkArr[_j7].BLKS - startRelTime >= 0) {
            blkChartArr.push({
              x: (task.blinkArr[_j7].BLKS - startRelTime) * 1000,
              y: 0
            });
            blkChartArr.push({
              x: (task.blinkArr[_j7].BLKS - startRelTime) * 1000,
              y: 1
            });
            blkChartArr.push({
              x: (task.blinkArr[_j7].BLKS + task.blinkArr[_j7].BLKD - startRelTime) * 1000,
              y: 1
            });
            blkChartArr.push({
              x: (task.blinkArr[_j7].BLKS + task.blinkArr[_j7].BLKD - startRelTime) * 1000,
              y: 0
            });
          } else if (task.blinkArr[_j7].BLKS - startRelTime <= 0 && task.blinkArr[_j7].BLKS + task.blinkArr[_j7].BLKD - startRelTime >= 0) {
            blkChartArr.push({
              x: 0,
              y: 0
            });
            blkChartArr.push({
              x: 0,
              y: 1
            });
            blkChartArr.push({
              x: (task.blinkArr[_j7].BLKS + task.blinkArr[_j7].BLKD - startRelTime) * 1000,
              y: 1
            });
            blkChartArr.push({
              x: (task.blinkArr[_j7].BLKS + task.blinkArr[_j7].BLKD - startRelTime) * 1000,
              y: 0
            });
          }
        }

        task.blkChartArr = blkChartArr;
      }
    } // console.log("taskArr",taskArr);


    return taskArr;
  }, [data]);

  var transparentCanvasRef = _react.default.useRef();

  var _React$useState25 = _react.default.useState(true),
      _React$useState26 = _slicedToArray(_React$useState25, 2),
      showClockwise = _React$useState26[0],
      set_showClockwise = _React$useState26[1];

  var _React$useState27 = _react.default.useState(true),
      _React$useState28 = _slicedToArray(_React$useState27, 2),
      showAntiClockwise = _React$useState28[0],
      set_showAntiClockwise = _React$useState28[1];

  var drawTransparentCanvas = _react.default.useCallback(function () {
    if (!data || !taskArr || !transparentCanvasRef) return;
    var canvas = transparentCanvasRef.current;
    var rctx = canvas.getContext('2d');
    var Wpx = 1020; //340 *2

    var Hpx = 1020;
    rctx.clearRect(0, 0, Wpx, Hpx);

    for (var key in taskArr) {
      for (var k = 0; k < taskArr[key].length; k++) {
        var task = taskArr[key][k];
        var startRelTime = task.startWaitTime - 0.5;
        var endRelTime = task.relativeEndTime - task.endWaitTime + 0.5;
        var gazeArr = task.gazeData;

        if (key === 'clockwise') {
          if (showClockwise === false) break;
          rctx.strokeStyle = 'rgba(255,0,0,0.3)';
          rctx.fillStyle = 'rgba(255,0,0,0.3)';
        } else if (key === 'anticlockwise') {
          if (showAntiClockwise === false) break;
          rctx.strokeStyle = 'rgba(0,255,0,0.3)';
          rctx.fillStyle = 'rgba(0,255,0,0.3)';
        } // let beforeX = null, beforeY = null;


        for (var i = 0; i < gazeArr.length; i++) {
          if (gazeArr[i].relTime >= startRelTime && gazeArr[i].relTime <= endRelTime) {
            rctx.beginPath();
            rctx.lineWidth = 9; //340 : 20 =  x :gazeArr[i].xdegree+10
            //340px : 20degree = xpx : 
            // x = 340*(gazeArr[i].xdegree+10)/20 

            var x = (gazeArr[i].xdegree + 10) * Wpx / 20;
            var y = (gazeArr[i].ydegree + 10) * Hpx / 20;
            rctx.arc(x, y, 1, 0, Math.PI * 2);
            rctx.fill();
            rctx.stroke(); // if (beforeX !== null && beforeY !== null) {
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

  _react.default.useEffect(function () {
    if (taskArr) {
      drawTransparentCanvas();
    }
  }, [taskArr, drawTransparentCanvas]);

  var pursuitChartOption = _react.default.useMemo(function () {
    var annotationArr = [{
      drawTime: "afterDatasetsDraw",
      // (default)
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
    }, {
      drawTime: "afterDatasetsDraw",
      // (default)
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
          formatter: function formatter(value, ctx) {
            return null; //return value !== 0 ? value.toLocaleString(/* ... */) : ''
          },
          anchor: 'center',
          align: 'center',
          color: '#000000'
        }
      },
      annotation: {
        events: ["click"],
        annotations: annotationArr
      },
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio * 3,
      animation: {
        duration: 0
      },
      tooltips: {
        callbacks: {
          title: function title(tooltipItem, data) {
            return '';
          }
        }
      },
      scales: {
        xAxes: [{
          id: "timeid",
          display: true,
          // 실제시간 임시로 true//
          type: 'time',
          time: {
            unit: 'mything',
            displayFormats: {
              mything: 'ss.SSS'
            } ///////여기서조정해야함
            // min: 0,
            // max: 10,

          },
          //x축 숨기려면 이렇게
          // gridLines: {
          //     color: "rgba(0, 0, 0, 0)",
          // },
          scaleLabel: {
            /////////////////x축아래 라벨
            display: false,
            labelString: 'Time(s)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            source: 'data',
            //auto,data,labels
            // autoSkip: true,
            // maxRotation: 0,
            // major: {
            //   enabled: true
            // },
            // stepSize: 10,
            callback: function callback(val, index) {
              if (index % 60 === 0) {
                return ((val * 1).toFixed(1) - 0.5).toFixed(1);
              }
            }
          }
        }],
        yAxes: [{
          id: "degree",
          position: 'left',
          scaleLabel: {
            /////////////////x축아래 라벨
            display: true,
            labelString: 'Position(d)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            max: 10,
            min: -10
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }, {
          id: "ax_blink",
          stepSize: 1,
          position: 'left',
          // 오른쪽의 Fixation 옆 Blink축
          display: false,
          ticks: {
            max: 1
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }]
      }
    };
  }, []);

  var clockWiseData = _react.default.useMemo(function () {
    var task = taskArr['clockwise'][0];
    var startRelTime = task.startWaitTime - 0.5;
    var endRelTime = task.relativeEndTime - task.endWaitTime + 0.5;
    var gazeArr = task.gazeData;
    var targetV_arr = [];
    var targetH_arr = [];
    var gazeV_arr = [];
    var gazeH_arr = [];

    for (var i = 0; i < gazeArr.length; i++) {
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
        });
        gazeH_arr.push({
          x: (gazeArr[i].relTime - startRelTime) * 1000,
          y: gazeArr[i].xdegree
        });
      }
    }

    return {
      datasets: [{
        //eyex
        data: gazeH_arr,
        steppedLine: "before",
        label: "gazeH",
        borderColor: "rgba(255,0,0,0.3)",
        //"#0000ff",
        backgroundColor: 'rgba(255,0,0,0.3)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //targety
        data: gazeV_arr,
        steppedLine: "before",
        label: "gazeV",
        borderColor: "rgba(0,0,255,0.3)",
        //"#0000ff",
        backgroundColor: 'rgba(0,0,255,0.3)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //targety
        data: targetV_arr,
        steppedLine: "before",
        label: "targetV",
        borderColor: "cyan",
        //"#0000ff",
        backgroundColor: "cyan",
        //"#0000ff",
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: targetH_arr,
        steppedLine: "before",
        label: "targetH",
        borderColor: "pink",
        //"#0000ff",
        backgroundColor: "pink",
        //"#0000ff",
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //BLINK
        data: task.blkChartArr,
        steppedLine: "before",
        borderWidth: 0,
        label: "Blink",
        borderColor: "rgba(0,255,0,0.2)",
        //""#ff0000",
        backgroundColor: 'rgba(0,255,0,0.2)',
        fill: true,
        xAxisID: "timeid",
        yAxisID: "ax_blink",
        pointRadius: 0,
        //데이터 포인터크기
        pointHoverRadius: 0 //hover 데이터포인터크기

      } //BLINK
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
      ]
    };
  }, [taskArr]);

  var antiClockWiseData = _react.default.useMemo(function () {
    var task = taskArr['anticlockwise'][0];
    var startRelTime = task.startWaitTime - 0.5;
    var endRelTime = task.relativeEndTime - task.endWaitTime + 0.5;
    var gazeArr = task.gazeData;
    var targetV_arr = [];
    var targetH_arr = [];
    var gazeV_arr = [];
    var gazeH_arr = [];

    for (var i = 0; i < gazeArr.length; i++) {
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
        });
        gazeH_arr.push({
          x: (gazeArr[i].relTime - startRelTime) * 1000,
          y: gazeArr[i].xdegree
        });
      }
    }

    return {
      datasets: [{
        //eyex
        data: gazeH_arr,
        steppedLine: "before",
        label: "gazeH",
        borderColor: "rgba(255,0,0,0.3)",
        //"#0000ff",
        backgroundColor: 'rgba(255,0,0,0.3)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //targety
        data: gazeV_arr,
        steppedLine: "before",
        label: "gazeV",
        borderColor: "rgba(0,0,255,0.3)",
        //"#0000ff",
        backgroundColor: 'rgba(0,0,255,0.3)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //targety
        data: targetV_arr,
        steppedLine: "before",
        label: "targetV",
        borderColor: "cyan",
        //"#0000ff",
        backgroundColor: "cyan",
        //"#0000ff",
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: targetH_arr,
        steppedLine: "before",
        label: "targetH",
        borderColor: "pink",
        //"#0000ff",
        backgroundColor: "pink",
        //"#0000ff",
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //BLINK
        data: task.blkChartArr,
        steppedLine: "before",
        borderWidth: 0,
        label: "Blink",
        borderColor: "rgba(0,255,0,0.2)",
        //""#ff0000",
        backgroundColor: 'rgba(0,255,0,0.2)',
        fill: true,
        xAxisID: "timeid",
        yAxisID: "ax_blink",
        pointRadius: 0,
        //데이터 포인터크기
        pointHoverRadius: 0 //hover 데이터포인터크기

      } //BLINK
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
      ]
    };
  }, [taskArr]);

  var barChartData = _react.default.useMemo(function () {
    return {
      labels: ['clockWise', 'AntiClockWise'],
      datasets: [{
        type: 'bar',
        label: "my err",
        data: [data.analysis.clockwise_err, data.analysis.anticlockwise_err],
        // backgroundColor: themeColors,
        backgroundColor: "#2763DB",
        barPercentage: 0.8,
        categoryPercentage: 0.5,
        borderColor: "transparent"
      }, {
        type: 'bar',
        label: "group err",
        data: [targetGroupData.avg_clockwise_err, targetGroupData.avg_anticlockwise_err],
        // backgroundColor: themeColors,
        backgroundColor: "gray",
        barPercentage: 0.8,
        categoryPercentage: 0.5,
        borderColor: "transparent"
      }]
    };
  }, [targetGroupData, data]);

  var barChartOption = _react.default.useMemo(function () {
    return {
      plugins: {
        datalabels: {
          formatter: function formatter(value, ctx) {
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
        }
      },
      tooltips: {
        // mode: 'label',
        callbacks: {
          title: function title() {},
          label: function label(tooltipItems, data) {
            // console.log("tooltipItems",tooltipItems,data);
            var isgroup = tooltipItems.datasetIndex === 0 ? false : true;

            if (isgroup) {
              return "그룹의 " + tooltipItems.xLabel + "_avg_err : " + tooltipItems.yLabel.toFixed(4) + " (degree)";
            } else {
              return "나의 " + tooltipItems.xLabel + "_avg_err : " + tooltipItems.yLabel.toFixed(4) + " (degree)";
            }
          }
        },
        titleFontSize: 16,
        bodyFontSize: 16
      },
      elements: {
        rectangle: {
          borderWidth: 1,
          borderSkipped: "left"
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
        xAxes: [{
          display: true,
          gridLines: {
            color: "transparent",
            defaultFontStyle: "normal"
          },
          scaleLabel: {
            defaultFontStyle: "normal",
            display: false,
            labelString: "degree",
            fontSize: 14,
            fontStyle: "bold"
          },
          ticks: {
            stepSize: 0.2,
            max: 2,
            min: 0,
            fontSize: 14,
            fontStyle: "bold"
          }
        }],
        yAxes: [{
          display: true,
          gridLines: {
            color: "transparent"
          },
          scaleLabel: {
            display: true,
            labelString: "degree",
            fontSize: 14,
            fontStyle: "bold"
          },
          ticks: {
            // stepSize: 2,
            // max:30,
            min: 0,
            fontSize: 14,
            fontStyle: "bold"
          }
        }]
      },
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "추적안구운동 평균 err"
      },
      legend: {
        display: true
      }
    };
  }, []);

  var myPercent = _react.default.useMemo(function () {
    var x = data.analysis.pursuit_score;
    var avg = targetGroupData.avg_pursuit_score;
    var std = targetGroupData.std_pursuit_score || 1;
    var p = getGaussianMyPercent(avg, std, x); // console.log("p",p);

    return p;
  }, [data, targetGroupData]);

  var myState = _react.default.useMemo(function () {
    var mystate;

    if (myPercent <= 10) {
      mystate = '최우수';
    } else if (myPercent > 10 && myPercent <= 25) {
      mystate = '우수';
    } else if (myPercent > 25 && myPercent <= 75) {
      mystate = "양호";
    } else if (myPercent > 75 && myPercent <= 90) {
      mystate = "미흡";
    } else {
      mystate = "주의";
    }

    return mystate;
  }, [myPercent]);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "PursuitView"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uCD94\uC801\uC548\uAD6C\uC6B4\uB3D9 \uACB0\uACFC"), /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '60%',
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '55%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _base.imgbase64forPDF[myState],
    alt: "",
    style: {
      height: '50%'
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '45%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontSize: '19px',
      fontWeight: '700',
      paddingLeft: '7px',
      paddingTop: '12px'
    }
  }, myState)), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '40%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingLeft: '15px',
      borderTop: '1px solid #1A408E'
    }
  }, /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "\uB0B4 \uD3C9\uADE0: ", data.analysis.pursuit_score.toFixed(2), "\uC810 (\uC0C1\uC704 ", myPercent, "%)"), /*#__PURE__*/_react.default.createElement("li", null, "\uB610\uB798 \uD3C9\uADE0 \uC810\uC218: ", targetGroupData.avg_pursuit_score.toFixed(2), "\uC810"), /*#__PURE__*/_react.default.createElement("li", null, "\uC804\uCCB4 \uD3C9\uADE0 \uC810\uC218: ", everyGroupData.avg_pursuit_score.toFixed(2), "\uC810"))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox",
    style: {
      width: '330px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uCD94\uC801\uC548\uAD6C\uC6B4\uB3D9 \uC810\uC218 \uBD84\uD3EC"), /*#__PURE__*/_react.default.createElement("div", {
    id: "pursuitGradeChart",
    className: "cbox",
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(BarChartGrade, {
    myScore: data.analysis.pursuit_score,
    avgGroupScore: targetGroupData.avg_pursuit_score,
    stdGroupScore: targetGroupData.std_pursuit_score
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox",
    style: {
      width: '850px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uCD94\uC801\uC548\uAD6C\uC6B4\uB3D9 \uC810\uC218 \uBD84\uD3EC"), /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox",
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "pursuitErrChart",
    className: "cbox2"
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "bar",
    height: null,
    width: null,
    data: barChartData,
    options: barChartOption
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2"
  }, "\uC5B4\uB5A4\uCEE8\uD150\uCE20\uAC00 \uB4E4\uC5B4\uAC08\uC608\uC815")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox",
    style: {
      width: '450px',
      height: '450px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uCD94\uC801 \uC548\uAD6C\uC6B4\uB3D9 \uC2DC\uC120\uADA4\uC801 ", /*#__PURE__*/_react.default.createElement("button", {
    className: "viewerbtn",
    onClick: function onClick() {
      return set_showGazeViewer(true);
    }
  }, "Viewer")), /*#__PURE__*/_react.default.createElement("div", {
    id: "pursuitRealChart",
    className: "cbox"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '30px',
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: '10px',
      paddingTop: '3px',
      boxSizing: 'border-box'
    }
  }, "Radius : 7.63 Degree  \xA0\xA0 Speed : 72 Degree/s"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: 'calc(100% - 60px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "_10degreeDiv",
    style: {
      width: '340px',
      height: '340px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "target circle"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "target centerx"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '50%',
      width: '100%',
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "lt"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "rt"
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '50%',
      width: '100%',
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "lb"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "rb"
  }))), /*#__PURE__*/_react.default.createElement("canvas", {
    className: "transparentCanvas",
    ref: transparentCanvasRef,
    width: 1020,
    height: 1020
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "customLabel",
    style: {
      height: '30px',
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "clickzone",
    style: {
      textDecoration: showClockwise === true ? "" : "line-through"
    },
    onClick: function onClick() {
      return set_showClockwise(!showClockwise);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "upward"
  }), "Clockwise"), "\xA0\xA0", /*#__PURE__*/_react.default.createElement("div", {
    className: "clickzone",
    style: {
      textDecoration: showAntiClockwise === true ? "" : "line-through"
    },
    onClick: function onClick() {
      return set_showAntiClockwise(!showAntiClockwise);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "downward"
  }), "AntiClockwise"), "\xA0\xA0"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox",
    style: {
      width: '1000px',
      height: '450px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uC2DC\uAC04\uC5D0 \uB530\uB978 \uCD94\uC801\uC548\uAD6C\uC6B4\uB3D9"), /*#__PURE__*/_react.default.createElement("div", {
    id: "pursuitDirectionChart",
    className: "cbox"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2r"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 'calc(100% - 8px)',
      height: '100%',
      marginLeft: '1px',
      border: '1px solid black',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "c_label"
  }, /*#__PURE__*/_react.default.createElement("strong", null, "Clockwise")), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_chart"
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "line",
    height: null,
    width: null,
    data: clockWiseData,
    options: pursuitChartOption
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2r"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 'calc(100% - 8px)',
      height: '100%',
      marginLeft: '1px',
      border: '1px solid black',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "c_label"
  }, /*#__PURE__*/_react.default.createElement("strong", null, "AntiClockwise")), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_chart"
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "line",
    height: null,
    width: null,
    data: antiClockWiseData,
    options: pursuitChartOption
  }))))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "titleUnderline"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uCD94\uC801\uC548\uAD6C\uC6B4\uB3D9 (pursuit)\uC740 \uBB34\uC5C7\uC778\uAC00\uC694?"), /*#__PURE__*/_react.default.createElement("div", {
    className: "explain"
  }, /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "\uCD94\uC801\uC548\uAD6C\uC6B4\uB3D9(pursuit)\uC740 \uCC9C\uCC9C\uD788 \uC6C0\uC9C1\uC774\uB294 \uB300\uC0C1\uC744 \uB530\uB77C \uBD80\uB4DC\uB7FD\uACE0 \uC5F0\uC18D\uC801\uC73C\uB85C \uC2DC\uC120\uC744 \uC6C0\uC9C1\uC774\uB294 \uAC83\uC785\uB2C8\uB2E4. \uC77C\uBC18\uC801\uC73C\uB85C \uC2DC\uC120\uC740 \uBE60\uB974\uAC8C \uB3C4\uC57D\uD558\uACE0 \uACE0\uC815\uD558\uB294 \uAC83\uC744 \uBC18\uBCF5\uD560 \uBFD0\uC774\uBA70,  \uBD80\uB4DC\uB7FD\uACE0 \uC5F0\uC18D\uC801\uC73C\uB85C \uC774\uB3D9\uD558\uB294 \uAC83\uC740 \uACE0\uB3C4\uC758 \uC548\uAD6C\uC6B4\uB3D9 \uD1B5\uC81C\uB2A5\uB825\uC774 \uD544\uC694\uD558\uAE30 \uB54C\uBB38\uC5D0, \uC601\uC7A5\uB958\uB098 \uACE0\uC591\uC774 \uC815\uB3C4\uC758 \uACE0\uB4F1\uB3D9\uBB3C\uC5D0\uAC8C\uC11C \uB098\uD0C0\uB098\uB294 \uB2A5\uB825\uC785\uB2C8\uB2E4."), /*#__PURE__*/_react.default.createElement("li", null, "\uCD94\uC801\uC548\uAD6C\uC6B4\uB3D9\uC740 \uC9D1\uC911\uB825\uC774 \uB0AE\uC544\uC9C0\uAC70\uB098 \uB178\uD654\uC5D0 \uC758\uD574 \uC800\uD558\uB418\uC9C0\uB9CC, \uC2DC\uB825 \uC800\uD558\uB098 \uC548\uC9C4(\uC548\uAD6C \uC9C4\uD0D5)  \uBC0F \uAC01\uC885 \uC2E0\uACBD\uACC4 \uC774\uC0C1\uC73C\uB85C \uC778\uD574 \uB098\uD0C0\uB098\uAE30\uB3C4 \uD569\uB2C8\uB2E4."), /*#__PURE__*/_react.default.createElement("li", null, "\uC704\uCE58\uD3B8\uCC28 (position error)"), /*#__PURE__*/_react.default.createElement("li", null, "\uC5F0\uC18D\uC131??"))))), showGazeViewer && /*#__PURE__*/_react.default.createElement("div", {
    className: "GazeViewerWrap"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, " \uC2E4\uC81C \uC2DC\uC120 \uCE21\uC815\uB370\uC774\uD130 ", /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      return set_showGazeViewer(false);
    }
  }, "\uB2EB\uAE30")), /*#__PURE__*/_react.default.createElement("div", {
    className: "view"
  }, /*#__PURE__*/_react.default.createElement(_reactGazeviewer.default, {
    data: data
  })))));
};

var AntiSaccadeView = function AntiSaccadeView(_ref5) {
  var props = _extends({}, _ref5);

  var data = props.data,
      targetGroupData = props.targetGroupData,
      everyGroupData = props.everyGroupData;

  var _React$useState29 = _react.default.useState(false),
      _React$useState30 = _slicedToArray(_React$useState29, 2),
      showGazeViewer = _React$useState30[0],
      set_showGazeViewer = _React$useState30[1];

  var transparentCanvasRef = _react.default.useRef();

  var delayBarChartData = _react.default.useMemo(function () {
    return {
      labels: ['따라보기', '반대보기'],
      datasets: [{
        type: 'bar',
        label: "me",
        data: [(data.analysis.left_saccade_delay + data.analysis.right_saccade_delay) * 500, (data.analysis.left_antisaccade_delay + data.analysis.right_antisaccade_delay) * 500],
        // backgroundColor: themeColors,
        backgroundColor: "red",
        barPercentage: 0.8,
        categoryPercentage: 0.5,
        borderColor: "transparent"
      }, {
        type: 'bar',
        label: "group",
        data: [(targetGroupData.avg_left_saccade_delay + targetGroupData.avg_right_saccade_delay) * 500, (targetGroupData.avg_left_antisaccade_delay + targetGroupData.avg_right_antisaccade_delay) * 500],
        // backgroundColor: themeColors,
        backgroundColor: "gray",
        barPercentage: 0.8,
        categoryPercentage: 0.5,
        borderColor: "transparent"
      }]
    };
  }, [targetGroupData, data]);

  var delayBarChartOption = _react.default.useMemo(function () {
    return {
      plugins: {
        datalabels: {
          formatter: function formatter(value, ctx) {
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
        }
      },
      tooltips: {
        // mode: 'label',
        callbacks: {
          title: function title() {},
          label: function label(tooltipItems, data) {
            // console.log("tooltipItems", tooltipItems, data);
            var label = data.datasets[tooltipItems.datasetIndex].label;
            return label + "(평균) : " + tooltipItems.yLabel.toFixed(4) + " (ms)";
          }
        },
        titleFontSize: 16,
        bodyFontSize: 16
      },
      elements: {
        rectangle: {
          borderWidth: 1,
          borderSkipped: "left"
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
        xAxes: [{
          display: true,
          gridLines: {
            color: "transparent",
            defaultFontStyle: "normal"
          },
          scaleLabel: {
            defaultFontStyle: "normal",
            display: false,
            labelString: "???",
            fontSize: 14,
            fontStyle: "bold"
          },
          ticks: {
            stepSize: 0.2,
            max: 2,
            min: 0,
            fontSize: 14,
            fontStyle: "bold"
          }
        }],
        yAxes: [{
          display: true,
          gridLines: {
            color: "transparent"
          },
          scaleLabel: {
            display: true,
            labelString: "지체시간(ms)",
            fontSize: 14,
            fontStyle: "bold"
          },
          ticks: {
            // stepSize: 2,
            // max:30,
            min: 0,
            fontSize: 14,
            fontStyle: "bold"
          }
        }]
      },
      maintainAspectRatio: false,
      title: {
        display: false,
        text: "평균 지체시간(delay)"
      },
      legend: {
        display: true
      }
    };
  }, []);

  var errBarChartData = _react.default.useMemo(function () {
    // console.log("groupData.avgErrFrequencyRatio",groupData.avgErrFrequencyRatio);
    // console.log("data.analysis.avgErrTime/0.5", (data.analysis.avgErrTime/0.5));
    return {
      labels: ['오류 횟수', '평균 오류 시간'],
      datasets: [{
        type: 'bar',
        label: "me",
        data: [data.analysis.avgErrFrequencyRatio * 100, data.analysis.avgErrTime / 0.5 * 100],
        // backgroundColor: themeColors,
        backgroundColor: "red",
        barPercentage: 0.8,
        categoryPercentage: 0.5,
        borderColor: "transparent"
      }, {
        type: 'bar',
        label: "group",
        data: [targetGroupData.avg_avgErrFrequencyRatio * 100, targetGroupData.avg_avgErrTime / 0.5 * 100],
        // backgroundColor: themeColors,
        backgroundColor: "gray",
        barPercentage: 0.8,
        categoryPercentage: 0.5,
        borderColor: "transparent"
      }]
    };
  }, [targetGroupData, data]);

  var errBarChartOption = _react.default.useMemo(function () {
    return {
      plugins: {
        datalabels: {
          formatter: function formatter(value, ctx) {
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
        }
      },
      tooltips: {
        // mode: 'label',
        callbacks: {
          title: function title() {},
          label: function label(tooltipItems, data) {
            // console.log("tooltipItems", tooltipItems, data);
            var label = data.datasets[tooltipItems.datasetIndex].label;
            return label + "(평균) : " + tooltipItems.yLabel.toFixed(4) + " (%)";
          }
        },
        titleFontSize: 16,
        bodyFontSize: 16
      },
      elements: {
        rectangle: {
          borderWidth: 1,
          borderSkipped: "left"
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
        xAxes: [{
          display: true,
          gridLines: {
            color: "transparent",
            defaultFontStyle: "normal"
          },
          scaleLabel: {
            defaultFontStyle: "normal",
            display: false,
            labelString: "???",
            fontSize: 14,
            fontStyle: "bold"
          },
          ticks: {
            stepSize: 0.2,
            max: 2,
            min: 0,
            fontSize: 14,
            fontStyle: "bold"
          }
        }],
        yAxes: [{
          display: true,
          gridLines: {
            color: "transparent"
          },
          scaleLabel: {
            display: true,
            labelString: "percent(%)",
            fontSize: 14,
            fontStyle: "bold"
          },
          ticks: {
            // stepSize: 2,
            // max:30,
            min: 0,
            fontSize: 14,
            fontStyle: "bold"
          }
        }]
      },
      maintainAspectRatio: false,
      title: {
        display: false,
        text: "평균 오류비율(ratio)"
      },
      legend: {
        display: true
      }
    };
  }, []);

  var taskArr = _react.default.useMemo(function () {
    // console.log("antiSaccadeData",data);
    var ta = dataToTaskArr(data); // console.log("ta",ta);

    return ta;
  }, [data]);

  var antiSaccadeLeftChartOption = _react.default.useMemo(function () {
    var annotation = [];
    var leftTaskArr = taskArr.left;
    annotation = [{
      drawTime: "afterDatasetsDraw",
      // (default)
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
    }, {
      drawTime: "afterDatasetsDraw",
      // (default)
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
    }, {
      drawTime: "afterDatasetsDraw",
      // (default)
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
    }, {
      drawTime: "afterDatasetsDraw",
      // (default)
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
    }];
    annotation.push({
      drawTime: "afterDatasetsDraw",
      // (default)
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
    }); //groupData
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
          formatter: function formatter(value, ctx) {
            return null; //return value !== 0 ? value.toLocaleString(/* ... */) : ''
          },
          anchor: 'center',
          align: 'center',
          color: '#000000'
        }
      },
      annotation: {
        events: ["click"],
        annotations: annotation
      },
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio * 3,
      animation: {
        duration: 0
      },
      tooltips: {
        callbacks: {
          title: function title(tooltipItem, data) {
            return '';
          }
        }
      },
      scales: {
        xAxes: [{
          id: "timeid",
          display: true,
          // 실제시간 임시로 true//
          type: 'time',
          time: {
            unit: 'mything',
            displayFormats: {
              mything: 'ss.SSS'
            } ///////여기서조정해야함
            // min: 0 * 1000,
            // max: 1.5 * 1000,

          },
          //x축 숨기려면 이렇게
          // gridLines: {
          //     color: "rgba(0, 0, 0, 0)",
          // },
          scaleLabel: {
            /////////////////x축아래 라벨
            display: false,
            labelString: 'Time(s)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            source: 'data',
            //auto,data,labels
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
        }],
        yAxes: [{
          id: "degree",
          position: 'left',
          scaleLabel: {
            /////////////////x축아래 라벨
            display: true,
            labelString: 'Position(d)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            max: 10,
            min: -10
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }, {
          id: "ax_blink",
          stepSize: 1,
          position: 'left',
          // 오른쪽의 Fixation 옆 Blink축
          display: false,
          ticks: {
            max: 1
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }]
      }
    };
  }, [taskArr, targetGroupData]);

  var antiSaccadeLeftData = _react.default.useMemo(function () {
    return {
      datasets: [{
        //targety
        data: taskArr.left[0].target_xdegreeChartArr,
        steppedLine: "before",
        label: "targetH",
        borderColor: "rgba(0,255,0,0.8)",
        //"#0000ff",
        backgroundColor: 'rgba(0,255,0,0.8)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.left[0].xdegreeChartArr,
        steppedLine: false,
        label: "gH1",
        borderColor: "rgba(255,0,0,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(255,0,0,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.left[1].xdegreeChartArr,
        steppedLine: false,
        label: "gH2",
        borderColor: "rgba(0,0,255,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(0,0,255,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.left[2].xdegreeChartArr,
        steppedLine: false,
        label: "gH3",
        borderColor: "orange",
        //"#0000ff",
        backgroundColor: 'orange',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.left[3].xdegreeChartArr,
        steppedLine: false,
        label: "gH4",
        borderColor: "pink",
        //"#0000ff",
        backgroundColor: 'pink',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }]
    };
  }, [taskArr]);

  var antiSaccadeRightChartOption = _react.default.useMemo(function () {
    var annotation = [];
    var rightTaskArr = taskArr.right;
    annotation = [{
      drawTime: "afterDatasetsDraw",
      // (default)
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
    }, {
      drawTime: "afterDatasetsDraw",
      // (default)
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
    }, {
      drawTime: "afterDatasetsDraw",
      // (default)
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
    }, {
      drawTime: "afterDatasetsDraw",
      // (default)
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
    }]; // for (let i = 0; i < rightTaskArr.length; i++) {
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
      drawTime: "afterDatasetsDraw",
      // (default)
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
          formatter: function formatter(value, ctx) {
            return null; //return value !== 0 ? value.toLocaleString(/* ... */) : ''
          },
          anchor: 'center',
          align: 'center',
          color: '#000000'
        }
      },
      annotation: {
        events: ["click"],
        annotations: annotation
      },
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio * 3,
      animation: {
        duration: 0
      },
      tooltips: {
        callbacks: {
          title: function title(tooltipItem, data) {
            return '';
          }
        }
      },
      scales: {
        xAxes: [{
          id: "timeid",
          display: true,
          // 실제시간 임시로 true//
          type: 'time',
          time: {
            unit: 'mything',
            displayFormats: {
              mything: 'ss.SSS'
            } ///////여기서조정해야함
            // min: 0 * 1000,
            // max: 1.5 * 1000,

          },
          //x축 숨기려면 이렇게
          // gridLines: {
          //     color: "rgba(0, 0, 0, 0)",
          // },
          scaleLabel: {
            /////////////////x축아래 라벨
            display: false,
            labelString: 'Time(s)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            source: 'data',
            //auto,data,labels
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
        }],
        yAxes: [{
          id: "degree",
          position: 'left',
          scaleLabel: {
            /////////////////x축아래 라벨
            display: true,
            labelString: 'Position(d)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            max: 10,
            min: -10
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }, {
          id: "ax_blink",
          stepSize: 1,
          position: 'left',
          // 오른쪽의 Fixation 옆 Blink축
          display: false,
          ticks: {
            max: 1
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }]
      }
    };
  }, [taskArr, targetGroupData]);

  var antiSaccadeRightData = _react.default.useMemo(function () {
    return {
      datasets: [{
        //targety
        data: taskArr.right[0].target_xdegreeChartArr,
        steppedLine: "before",
        label: "targetH",
        borderColor: "rgba(0,255,0,0.8)",
        //"#0000ff",
        backgroundColor: 'rgba(0,255,0,0.8)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.right[0].xdegreeChartArr,
        steppedLine: false,
        label: "gH1",
        borderColor: "rgba(255,0,0,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(255,0,0,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.right[1].xdegreeChartArr,
        steppedLine: false,
        label: "gH2",
        borderColor: "rgba(0,0,255,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(0,0,255,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.right[2].xdegreeChartArr,
        steppedLine: false,
        label: "gH3",
        borderColor: "orange",
        //"#0000ff",
        backgroundColor: 'orange',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: taskArr.right[3].xdegreeChartArr,
        steppedLine: false,
        label: "gH4",
        borderColor: "pink",
        //"#0000ff",
        backgroundColor: 'pink',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }]
    };
  }, [taskArr]);

  var saccadeTaskArr = _react.default.useMemo(function () {
    var taskArr = dataToTaskArr(data.saccadeData); // console.log("taskArr",taskArr);

    return taskArr;
  }, [data]);

  var saccadeLeftChartOption = _react.default.useMemo(function () {
    var annotation = [];
    var leftTaskArr = saccadeTaskArr.left;

    for (var i = 0; i < leftTaskArr.length; i++) {
      // console.log("bottomTaskArr",bottomTaskArr);
      annotation.push({
        drawTime: "afterDatasetsDraw",
        // (default)
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
      }); // annotation.push({
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
    } //groupData


    annotation.push({
      drawTime: "beforeDatasetsDraw",
      // (default)
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
      yMax: 10
    });
    return {
      plugins: {
        datalabels: {
          formatter: function formatter(value, ctx) {
            return null;
          },
          anchor: 'center',
          align: 'center',
          color: '#000000'
        }
      },
      annotation: {
        events: ["click"],
        annotations: annotation
      },
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio * 3,
      animation: {
        duration: 0
      },
      tooltips: {
        callbacks: {
          title: function title(tooltipItem, data) {
            return '';
          }
        }
      },
      scales: {
        xAxes: [{
          id: "timeid",
          display: true,
          // 실제시간 임시로 true//
          type: 'time',
          time: {
            unit: 'mything',
            displayFormats: {
              mything: 'ss.SSS'
            } ///////여기서조정해야함
            // min: 0 * 1000,
            // max: 1.5 * 1000,

          },
          //x축 숨기려면 이렇게
          // gridLines: {
          //     color: "rgba(0, 0, 0, 0)",
          // },
          scaleLabel: {
            /////////////////x축아래 라벨
            display: false,
            labelString: 'Time(s)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            source: 'data',
            //auto,data,labels
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
        }],
        yAxes: [{
          id: "degree",
          position: 'left',
          scaleLabel: {
            /////////////////x축아래 라벨
            display: true,
            labelString: 'Position(d)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            max: 10,
            min: -10
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }, {
          id: "ax_blink",
          stepSize: 1,
          position: 'left',
          // 오른쪽의 Fixation 옆 Blink축
          display: false,
          ticks: {
            max: 1
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }]
      }
    };
  }, [saccadeTaskArr, targetGroupData]);

  var saccadeLeftData = _react.default.useMemo(function () {
    return {
      datasets: [{
        //targety
        data: saccadeTaskArr.left[0].target_xdegreeChartArr,
        steppedLine: "before",
        label: "targetH",
        borderColor: "rgba(0,255,0,0.8)",
        //"#0000ff",
        backgroundColor: 'rgba(0,255,0,0.8)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: saccadeTaskArr.left[0].xdegreeChartArr,
        steppedLine: false,
        label: "gazeH1",
        borderColor: "rgba(255,0,0,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(255,0,0,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: saccadeTaskArr.left[1].xdegreeChartArr,
        steppedLine: false,
        label: "gazeH2",
        borderColor: "rgba(0,0,255,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(0,0,255,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }]
    };
  }, [saccadeTaskArr]);

  var saccadeRightChartOption = _react.default.useMemo(function () {
    var annotation = [];
    var rightTaskArr = saccadeTaskArr.right;

    for (var i = 0; i < rightTaskArr.length; i++) {
      // console.log("bottomTaskArr",bottomTaskArr);
      annotation.push({
        drawTime: "afterDatasetsDraw",
        // (default)
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
      }); // annotation.push({
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
    } //groupData


    annotation.push({
      drawTime: "beforeDatasetsDraw",
      // (default)
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
      yMax: 10
    });
    return {
      plugins: {
        datalabels: {
          formatter: function formatter(value, ctx) {
            return null;
          },
          anchor: 'center',
          align: 'center',
          color: '#000000'
        }
      },
      annotation: {
        events: ["click"],
        annotations: annotation
      },
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio * 3,
      animation: {
        duration: 0
      },
      tooltips: {
        callbacks: {
          title: function title(tooltipItem, data) {
            return '';
          }
        }
      },
      scales: {
        xAxes: [{
          id: "timeid",
          display: true,
          // 실제시간 임시로 true//
          type: 'time',
          time: {
            unit: 'mything',
            displayFormats: {
              mything: 'ss.SSS'
            } ///////여기서조정해야함
            // min: 0 * 1000,
            // max: 1.5 * 1000,

          },
          //x축 숨기려면 이렇게
          // gridLines: {
          //     color: "rgba(0, 0, 0, 0)",
          // },
          scaleLabel: {
            /////////////////x축아래 라벨
            display: false,
            labelString: 'Time(s)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            source: 'data',
            //auto,data,labels
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
        }],
        yAxes: [{
          id: "degree",
          position: 'left',
          scaleLabel: {
            /////////////////x축아래 라벨
            display: true,
            labelString: 'Position(d)',
            fontStyle: 'bold',
            fontColor: "black"
          },
          ticks: {
            max: 10,
            min: -10
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }, {
          id: "ax_blink",
          stepSize: 1,
          position: 'left',
          // 오른쪽의 Fixation 옆 Blink축
          display: false,
          ticks: {
            max: 1
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }]
      }
    };
  }, [saccadeTaskArr, targetGroupData]);

  var saccadeRightData = _react.default.useMemo(function () {
    return {
      datasets: [{
        //targety
        data: saccadeTaskArr.right[0].target_xdegreeChartArr,
        steppedLine: "before",
        label: "targetH",
        borderColor: "rgba(0,255,0,0.8)",
        //"#0000ff",
        backgroundColor: 'rgba(0,255,0,0.8)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: saccadeTaskArr.right[0].xdegreeChartArr,
        steppedLine: false,
        label: "gazeH1",
        borderColor: "rgba(255,0,0,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(255,0,0,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }, {
        //eyex
        data: saccadeTaskArr.right[1].xdegreeChartArr,
        steppedLine: false,
        label: "gazeH2",
        borderColor: "rgba(0,0,255,0.7)",
        //"#0000ff",
        backgroundColor: 'rgba(0,0,255,0.7)',
        fill: false,
        yAxisID: "degree",
        xAxisID: "timeid",
        borderWidth: 1.5,
        pointRadius: 0.3,
        //데이터 포인터크기
        pointHoverRadius: 2 //hover 데이터포인터크기

      }]
    };
  }, [saccadeTaskArr]);

  var _React$useState31 = _react.default.useState(true),
      _React$useState32 = _slicedToArray(_React$useState31, 2),
      showLeftward = _React$useState32[0],
      set_showLeftward = _React$useState32[1];

  var _React$useState33 = _react.default.useState(true),
      _React$useState34 = _slicedToArray(_React$useState33, 2),
      showRightward = _React$useState34[0],
      set_showRightward = _React$useState34[1];

  var drawTransparentCanvas = _react.default.useCallback(function () {
    if (!data || !taskArr || !transparentCanvasRef) return;
    var canvas = transparentCanvasRef.current;
    var rctx = canvas.getContext('2d');
    var Wpx = 1020; //340 *2

    var Hpx = 1020;
    rctx.clearRect(0, 0, Wpx, Hpx);

    for (var key in taskArr) {
      for (var k = 0; k < taskArr[key].length; k++) {
        var task = taskArr[key][k];
        var startRelTime = task.startWaitTime - 0.5;
        var endRelTime = task.relativeEndTime - task.endWaitTime - 2;
        var gazeArr = task.gazeData;

        if (key === 'left') {
          if (showLeftward === false) break;
          rctx.strokeStyle = 'rgba(0,0,255,0.3)';
          rctx.fillStyle = 'rgba(0,0,255,0.3)';
        } else if (key === 'right') {
          if (showRightward === false) break;
          rctx.strokeStyle = 'rgba(255,0,255,0.3)';
          rctx.fillStyle = 'rgba(255,0,255,0.3)';
        }

        var beforeX = null,
            beforeY = null;

        for (var i = 0; i < gazeArr.length; i++) {
          if (gazeArr[i].relTime >= startRelTime && gazeArr[i].relTime <= endRelTime) {
            rctx.beginPath();
            rctx.lineWidth = 9; //340 : 20 =  x :gazeArr[i].xdegree+10
            //340px : 20degree = xpx : 
            // x = 340*(gazeArr[i].xdegree+10)/20 

            var x = (gazeArr[i].xdegree + 10) * Wpx / 20;
            var y = (gazeArr[i].ydegree + 10) * Hpx / 20;
            rctx.arc(x, y, 1, 0, Math.PI * 2);
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

  _react.default.useEffect(function () {
    if (taskArr) {
      drawTransparentCanvas();
    }
  }, [taskArr, drawTransparentCanvas]);

  var myPercent = _react.default.useMemo(function () {
    var x = data.analysis.antisaccade_score;
    var avg = targetGroupData.avg_antisaccade_score;
    var std = targetGroupData.std_antisaccade_score || 1;
    var p = getGaussianMyPercent(avg, std, x); // console.log("p",p);

    return p;
  }, [data, targetGroupData]);

  var myState = _react.default.useMemo(function () {
    var mystate;

    if (myPercent <= 10) {
      mystate = '최우수';
    } else if (myPercent > 10 && myPercent <= 25) {
      mystate = '우수';
    } else if (myPercent > 25 && myPercent <= 75) {
      mystate = "양호";
    } else if (myPercent > 75 && myPercent <= 90) {
      mystate = "미흡";
    } else {
      mystate = "주의";
    }

    return mystate;
  }, [myPercent]);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "AntiSaccadeView"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uBC18\uB300\uB85C \uBCF4\uAE30 \uACB0\uACFC"), /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '60%',
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '55%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _base.imgbase64forPDF[myState],
    alt: "",
    style: {
      height: '50%'
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '45%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontSize: '19px',
      fontWeight: '700',
      paddingLeft: '7px',
      paddingTop: '12px'
    }
  }, myState)), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '40%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingLeft: '15px',
      borderTop: '1px solid #1A408E'
    }
  }, /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "\uB0B4 \uD3C9\uADE0: ", data.analysis.antisaccade_score.toFixed(2), "\uC810 (\uC0C1\uC704 ", myPercent, "%)"), /*#__PURE__*/_react.default.createElement("li", null, "\uB610\uB798 \uD3C9\uADE0 \uC810\uC218: ", targetGroupData.avg_antisaccade_score.toFixed(2), "\uC810"), /*#__PURE__*/_react.default.createElement("li", null, "\uC804\uCCB4 \uD3C9\uADE0 \uC810\uC218: ", everyGroupData.avg_antisaccade_score.toFixed(2), "\uC810"))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox",
    style: {
      width: '330px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uBC18\uB300\uB85C \uBCF4\uAE30 \uC810\uC218 \uBD84\uD3EC"), /*#__PURE__*/_react.default.createElement("div", {
    id: "antisaccadeGradeChart",
    className: "cbox",
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(BarChartGrade, {
    myScore: data.analysis.antisaccade_score,
    avgGroupScore: targetGroupData.avg_antisaccade_score,
    stdGroupScore: targetGroupData.std_antisaccade_score
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox",
    style: {
      width: '420px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uC774\uB3D9\uBC29\uD5A5 \uC624\uB958(percent)"), /*#__PURE__*/_react.default.createElement("div", {
    id: "antisaccadeErrDirectionChart",
    className: "cbox",
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "bar",
    height: null,
    width: null,
    data: errBarChartData,
    options: errBarChartOption
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox",
    style: {
      width: '420px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uD3C9\uADE0 \uC9C0\uCCB4\uC2DC\uAC04(latency)"), /*#__PURE__*/_react.default.createElement("div", {
    id: "antisaccadeLatencyChart",
    className: "cbox",
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "bar",
    height: null,
    width: null,
    data: delayBarChartData,
    options: delayBarChartOption
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox",
    style: {
      width: '450px',
      height: '450px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uBC18\uB300\uB85C \uBCF4\uAE30 \uC2DC\uC120\uADA4\uC801 ", /*#__PURE__*/_react.default.createElement("button", {
    className: "viewerbtn",
    onClick: function onClick() {
      return set_showGazeViewer(true);
    }
  }, "Viewer")), /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox",
    id: "antisaccadeRealChart"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '30px',
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: '10px',
      paddingTop: '3px',
      boxSizing: 'border-box'
    }
  }, "Radius : 7.63 Degree"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: 'calc(100% - 60px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "_10degreeDiv",
    style: {
      width: '340px',
      height: '340px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "target center"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "target left"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "target right"
  }), /*#__PURE__*/_react.default.createElement("canvas", {
    className: "transparentCanvas",
    ref: transparentCanvasRef,
    width: 1020,
    height: 1020
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "customLabel",
    style: {
      height: '30px',
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "clickzone",
    style: {
      textDecoration: showRightward === true ? "" : "line-through"
    },
    onClick: function onClick() {
      return set_showRightward(!showRightward);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "rightward"
  }), "Rightward(\uC88C\uCE21\uC73C\uB85C)"), "\xA0\xA0", /*#__PURE__*/_react.default.createElement("div", {
    className: "clickzone",
    style: {
      textDecoration: showLeftward === true ? "" : "line-through"
    },
    onClick: function onClick() {
      return set_showLeftward(!showLeftward);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "leftward"
  }), "Leftward(\uC6B0\uCE21\uC73C\uB85C)"), "\xA0\xA0"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "titleBox",
    style: {
      width: '1000px',
      height: '450px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uC2DC\uAC04\uC5D0 \uB530\uB978 \uC2DC\uC120\uC774\uB3D9"), /*#__PURE__*/_react.default.createElement("div", {
    id: "antisaccadeDirectionChart",
    className: "cbox"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2r"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2w"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "c_label"
  }, /*#__PURE__*/_react.default.createElement("strong", null, "Pro-saccade, Leftward")), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_chart"
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "line",
    height: null,
    width: null,
    data: saccadeLeftData,
    options: saccadeLeftChartOption
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_avg"
  }, "myAvgLatency : ", /*#__PURE__*/_react.default.createElement("strong", null, (data.analysis.left_saccade_delay * 1000).toFixed(0), " ms"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2w"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "c_label"
  }, /*#__PURE__*/_react.default.createElement("strong", null, "Pro-saccade, Rightward")), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_chart"
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "line",
    height: null,
    width: null,
    data: saccadeRightData,
    options: saccadeRightChartOption
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_avg"
  }, "myAvgLatency : ", /*#__PURE__*/_react.default.createElement("strong", null, (data.analysis.right_saccade_delay * 1000).toFixed(0), " ms")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2r"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2w"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "c_label"
  }, /*#__PURE__*/_react.default.createElement("strong", null, "Anti-saccade, Leftward (오른쪽을 봐야함)")), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_chart"
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "line",
    height: null,
    width: null,
    data: antiSaccadeLeftData,
    options: antiSaccadeLeftChartOption
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_avg"
  }, "myAvgLatency : ", /*#__PURE__*/_react.default.createElement("strong", null, (data.analysis.left_antisaccade_delay * 1000).toFixed(0), " ms"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "cbox2w"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "c_label"
  }, /*#__PURE__*/_react.default.createElement("strong", null, "Anti-saccade, Rightward (왼쪽을 봐야함)")), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_chart"
  }, /*#__PURE__*/_react.default.createElement(_reactChartjs.default, {
    type: "line",
    height: null,
    width: null,
    data: antiSaccadeRightData,
    options: antiSaccadeRightChartOption
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "c_avg"
  }, "myAvgLatency : ", /*#__PURE__*/_react.default.createElement("strong", null, (data.analysis.right_antisaccade_delay * 1000).toFixed(0), " ms"))))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "titleUnderline"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uBC18\uB300\uB85C \uBCF4\uAE30(anti saccade)\uB294 \uBB34\uC5C7\uC778\uAC00\uC694?"), /*#__PURE__*/_react.default.createElement("div", {
    className: "explain"
  }, /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "\uBC18\uB300\uB85C \uBCF4\uAE30\uB294 \uC9C0\uAC01\uB41C \uC0AC\uBB3C\uC744 \uC790\uB3D9\uC801\uC73C\uB85C \uBC14\uB77C\uBCF4\uB294 \uAC83\uC744 \uD1B5\uC81C\uD558\uB294 \uB2A5\uB825\uC744 \uCE21\uC815\uD569\uB2C8\uB2E4."), /*#__PURE__*/_react.default.createElement("li", null, "\uB530\uB77C\uBCF4\uAE30(pro saccade)\uACFC\uC81C\uB294 \uC9C0\uAC01\uB41C \uB300\uC0C1\uC744 \uBC14\uB77C\uBCF4\uB294 \uACFC\uC81C\uC774\uACE0, \uBC18\uB300\uB85C \uBCF4\uAE30(anti saccade)\uACFC\uC81C\uB294 \uC9C0\uAC01\uB41C \uB300\uC0C1\uC744 \uBCF4\uC9C0 \uC54A\uACE0 \uBC18\uB300\uB85C \uC2DC\uC120\uC744 \uC774\uB3D9\uD558\uB294 \uACFC\uC81C\uC785\uB2C8\uB2E4. \uBB34\uC5B8\uAC00 \uBCF4\uC774\uBA74 \uBC18\uC0AC\uC801\uC73C\uB85C \uC2DC\uC120\uC774 \uAC00\uB824\uB294 \uACBD\uD5A5\uC774 \uC788\uAE30 \uB54C\uBB38\uC5D0, \uC9C0\uAC01\uC5D0 \uB300\uD55C \uD589\uB3D9\uC744 \uD1B5\uC81C\uD558\uB294 \uB2A5\uB825\uC774\uB098 \uC9D1\uC911\uB825\uC774 \uB0AE\uC73C\uBA74 \uBC18\uB300\uBCF4\uAE30 \uACFC\uC81C\uB97C \uD558\uAE30 \uC5B4\uB835\uC2B5\uB2C8\uB2E4. \uC9D1\uC911\uB825 \uC800\uD558, \uB09C\uB3C5\uC99D, ADHD \uB4F1\uC758 \uC99D\uC0C1\uACFC \uAD00\uB828\uC774 \uC788\uB294 \uACBD\uC6B0\uAC00 \uC788\uC2B5\uB2C8\uB2E4.")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "titleUnderline"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uBC18\uB300\uB85C \uBCF4\uAE30 \uC815\uD655\uB3C4\uB294 \uBB34\uC5C7\uC778\uAC00\uC694?"), /*#__PURE__*/_react.default.createElement("div", {
    className: "explain"
  }, /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "\uB530\uB77C\uBCF4\uAE30\uB294 \uB300\uC0C1\uC774 \uC788\uB294 \uCABD\uC73C\uB85C, \uBC18\uB300\uBCF4\uAE30\uB294 \uB300\uC0C1\uC758 \uBC18\uB300\uCABD\uC73C\uB85C \uC2DC\uC120\uC774 \uC6C0\uC9C1\uC600\uB294\uC9C0\uB97C \uCE21\uC815\uD55C \uBE44\uC728\uC785\uB2C8\uB2E4. \uBC18\uB300\uBCF4\uAE30\uC758 \uC815\uD655\uB3C4\uAC00 \uB192\uC740 \uAC83\uC774 \uBC14\uB78C\uC9C1\uD569\uB2C8\uB2E4.")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "titleUnderline"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, "\uBC18\uB300\uB85C \uBCF4\uAE30 \uC9C0\uCCB4\uC2DC\uAC04\uC740 \uBB34\uC5C7\uC778\uAC00\uC694?"), /*#__PURE__*/_react.default.createElement("div", {
    className: "explain"
  }, /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "\uB300\uC0C1\uC744 \uBCF4\uACE0 \uC2DC\uC120\uC744 \uC6C0\uC9C1\uC774\uAE30 \uC804\uAE4C\uC9C0 \uC18C\uC694\uB418\uB294 \uC2DC\uAC04\uC785\uB2C8\uB2E4. \uBC18\uB300\uBCF4\uAE30\uD560 \uB54C \uC9C0\uCCB4\uC2DC\uAC04\uC774 \uC9E7\uC740 \uAC83\uC774 \uBC14\uB78C\uC9C1\uD569\uB2C8\uB2E4."))))), showGazeViewer && /*#__PURE__*/_react.default.createElement("div", {
    className: "GazeViewerWrap"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, " \uC2E4\uC81C \uC2DC\uC120 \uCE21\uC815\uB370\uC774\uD130 ", /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      return set_showGazeViewer(false);
    }
  }, "\uB2EB\uAE30")), /*#__PURE__*/_react.default.createElement("div", {
    className: "view"
  }, /*#__PURE__*/_react.default.createElement(_reactGazeviewer.default, {
    data: data
  })))));
};

var DownLoadPDF = function DownLoadPDF(_ref6) {
  var props = _extends({}, _ref6);

  var AgencyLogoBase64 = props.AgencyLogoBase64,
      handlePDFstart = props.handlePDFstart,
      iframesrc = props.iframesrc;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "DownLoadPDF",
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '490px',
      marginRight: '10px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: '10px',
      borderBottom: '1px solid #1a408e',
      padding: '10px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, "PDF\uC758 \uAE30\uAD00 \uB85C\uACE0 \uC774\uBBF8\uC9C0"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '200px',
      backgroundColor: 'gray',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: AgencyLogoBase64 ? AgencyLogoBase64 : _base.imgbase64forPDF['기본로고'],
    alt: "",
    style: {
      maxWidth: '150px',
      maxHeight: '150px',
      backgroundColor: 'white'
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      cursor: 'default',
      marginTop: '10px'
    }
  }, /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "\uB85C\uACE0 \uC774\uBBF8\uC9C0\uB97C \uB4F1\uB85D \uD558\uC2DC\uB824\uBA74 ", /*#__PURE__*/_react.default.createElement("span", {
    className: "mh",
    onClick: function onClick() {//   history.push('/setting/pay');
    }
  }, "\uACC4\uC815\uC124\uC815"), "\uC5D0\uC11C \uC774\uBBF8\uC9C0\uB97C \uC124\uC815\uD558\uC2ED\uC2DC\uC624."), /*#__PURE__*/_react.default.createElement("li", null, "\uB85C\uACE0 \uC774\uBBF8\uC9C0\uB97C \uBCC0\uACBD \uD558\uC2E0\uB4A4\uC5D0 \uB85C\uADF8\uC544\uC6C3 \uD6C4 \uC7AC \uB85C\uADF8\uC778 \uD574 \uC8FC\uC138\uC694."), /*#__PURE__*/_react.default.createElement("li", null, "\uAC00\uB2A5\uD55C \uAC00\uB85C \uC138\uB85C\uC758 \uAE38\uC774\uAC00 \uAC19\uC740 \uC774\uBBF8\uC9C0\uB97C \uB4F1\uB85D\uD574 \uC8FC\uC138\uC694."), /*#__PURE__*/_react.default.createElement("li", null, "gif\uD30C\uC77C\uC740 PDF\uBCC0\uD658 \uAE30\uAD00\uB85C\uACE0 \uC774\uBBF8\uC9C0\uB85C \uB3D9\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "StartMakingPDF-btn",
    onClick: handlePDFstart
  }, "\uBCF4\uACE0\uC11C \uB2E4\uC6B4\uBC1B\uAE30 \uBC0F \uBBF8\uB9AC\uBCF4\uAE30")))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '900px',
      height: '750px',
      outline: '2px solid #1A408E'
    }
  }, iframesrc ? /*#__PURE__*/_react.default.createElement(_reactIframe.default, {
    url: iframesrc,
    frameBorder: "0",
    cellspacing: "0" //width="450px"
    //height="450px"
    ,
    id: "pdfiframe",
    className: iframesrc ? "pdfiframe visible" : "pdfiframe",
    display: "block"
  }) : /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ddd',
      textAlign: 'center'
    }
  }, "\uBCF4\uACE0\uC11C \uBBF8\uB9AC\uBCF4\uAE30\uD0ED", /*#__PURE__*/_react.default.createElement("br", null), "\uBBF8\uB9AC\uBCF4\uAE30 \uBC84\uD2BC\uC744 \uB204\uB974\uC2DC\uBA74 \uBCC0\uD658 \uD6C4 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC \uB429\uB2C8\uB2E4.")));
};

var _default = ScreeningViewer;
exports.default = _default;