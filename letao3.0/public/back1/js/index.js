$(function () {

  // 基于准备好的dom，初始化echarts实例
  var myChart1 = echarts.init(document.querySelector('.echars_left'));

  // 指定图表的配置项和数据
  var option1 = {
    title: {
      text: '阿尔法杰杰',
      subtext: '2018年12月',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['火星情报局', '月球特工队', '银河警卫队', '太阳总部', '地球分部']
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [{
          value: 335,
          name: '火星情报局'
        },
        {
          value: 310,
          name: '月球特工队'
        },
        {
          value: 234,
          name: '银河警卫队'
        },
        {
          value: 135,
          name: '太阳总部'
        },
        {
          value: 1548,
          name: '地球分部'
        }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };



  // 使用刚指定的配置项和数据显示图表。
  myChart1.setOption(option1);




  // 基于准备好的dom，初始化echarts实例
  var myChart2 = echarts.init(document.querySelector('.echars_right'));


  var data = [];

  for (var i = 0; i <= 360; i++) {
    var t = i / 180 * Math.PI;
    var r = Math.sin(2 * t) * Math.cos(2 * t);
    data.push([r, i]);
  }

  var option2 = {
    title: {
      text: '阿尔法杰杰函数'
    },
    legend: {
      data: ['line']
    },
    polar: {
      center: ['50%', '54%']
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    angleAxis: {
      type: 'value',
      startAngle: 0
    },
    radiusAxis: {
      min: 0
    },
    series: [{
      coordinateSystem: 'polar',
      name: 'line',
      type: 'line',
      showSymbol: false,
      data: data
    }],
    animationDuration: 2000
  };


  // 使用刚指定的配置项和数据显示图表。
  myChart2.setOption(option2);



});