
//配置柱状图
$(function () {
  
   // 基于准备好的dom，初始化echarts实例
   var myChart1 = echarts.init(document.querySelector('.echarts_left'));

   // 指定图表的配置项和数据
   var option1 = {
       title: {
           text: '2018年注册人数'
       },
       tooltip: {},
       legend: {
           data:['人数']
       },
       xAxis: {
           data: ["1月","2月","3月","4月","5月","6月"]
       },
       yAxis: {},
       series: [{
           name: '人数',
           type: 'bar',
           data: [100, 250, 113, 94, 57, 360]
       }]
   };

   // 使用刚指定的配置项和数据显示图表。
   myChart1.setOption(option1);





   // 基于准备好的dom，初始化echarts实例
   var myChart2 = echarts.init(document.querySelector('.echarts_right'));

   // 指定图表的配置项和数据
   var option2 = {
    title : {
        text: '叶子树博客访问信息来源',
        subtext: '2018年11月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['谷歌浏览器','UC浏览器','QQ浏览器','苹果浏览器','360浏览器']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'谷歌浏览器'},
                {value:310, name:'UC浏览器'},
                {value:234, name:'QQ浏览器'},
                {value:135, name:'苹果浏览器'},
                {value:1548, name:'360浏览器'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

   // 使用刚指定的配置项和数据显示图表。
   myChart2.setOption(option2);
  
});

