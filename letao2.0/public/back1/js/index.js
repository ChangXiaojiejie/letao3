/**
 * 配置柱状图和饼形图
 * 
 * 
 */

$(function () {

  // 柱状图 echart_left
  // 基于准备好的dom，初始化echarts实例
  var myChart1 = echarts.init(document.querySelector('.echart_left'));

  // 指定图表的配置项和数据
  var option1 = {
    title: {
      text: '2018年11月27日访问量'
    },
    tooltip: {},
    legend: {
      data: ['女生','男生']
    },
    xAxis: {
      data: ["文化", "社交", "抖音", "电影", "购物", "微博"]
    },
    yAxis: {},
    series: [{
      name: '女生',
      type: 'bar',
      data: [5000, 20000, 36000, 10000, 10000, 20000]
    },{
      name: '男生',
      type: 'bar',
      data: [5000, 10000, 3600, 1000, 1000, 20000]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart1.setOption(option1);


  /****************** *饼形图 echart_right******/
  // 基于准备好的dom，初始化echarts实例
  var myChart2 = echarts.init(document.querySelector('.echart_right'));

  // 指定图表的配置项和数据
  var option2 = {
    title: {
      text: '弹弹堂',
      subtext: '11月28日',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['新手训练营', '人机对战', '钻石场对决', '高手场', '王者场']
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [{
          value: 335,
          name: '新手训练营'
        },
        {
          value: 310,
          name: '人机对战'
        },
        {
          value: 234,
          name: '钻石场对决'
        },
        {
          value: 135,
          name: '高手场'
        },
        {
          value: 1548,
          name: '王者场'
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
  myChart2.setOption(option2);


})