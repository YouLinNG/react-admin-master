import React from 'react'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import TypingCard from '../../../components/TypingCard'
import { Card, Row, Col,BackTop } from 'antd'
import { Chart, Axis, Geom, Tooltip, Coord, Label, Legend, G2 } from 'bizcharts'
import { View } from '@antv/data-set'

const data = [
    {week: '周一', value: 30, type:"护照"},
    {week: '周二', value: 40, type:"护照"},
    {week: '周三', value: 50, type:"护照"},
    {week: '周四', value: 50, type:"护照"},
    {week: '周五', value: 90, type:"护照"},
    {week: '周六', value: 60, type:"护照"},
    {week: '周日', value: 70, type:"护照"},

    {week: '周一', value: 60, type:"申请表"},
    {week: '周二', value: 50, type:"申请表"},
    {week: '周三', value: 70, type:"申请表"},
    {week: '周四', value: 80, type:"申请表"},
    {week: '周五', value: 90, type:"申请表"},
    {week: '周六', value: 40, type:"申请表"},
    {week: '周日', value: 80, type:"申请表"},
]
const cols = {
    'value': {min: 0},
}

const data2 = [
    {week: '周一', sales: 3},
    {week: '周二', sales: 5},
    {week: '周三', sales: 6},
    {week: '周四', sales: 4},
    {week: '周五', sales: 4},
    {week: '周六', sales: 3},
    {week: '周日', sales: 3},
]
const cols2 = {
    'sales': {tickInterval: 1},
}

const data3 = [
    {item: '1950前', count: 6},
    {item: '1960-1969', count: 18},
    {item: '1970-1979', count: 12},
    {item: '1980-1989', count: 27},
    {item: '1990-1999', count: 33},
    {item: '2000后', count: 4}
]
const dv3 = new View()


const data5 = [
    {item: '护照重叠', count: 2},
    {item: '申请表重叠', count: 18},
    {item: '护照倾斜', count: 24},
    {item: '申请表倾斜', count: 36},
    {item: '曝光过度', count: 20},
]
const dv5 = new View()
dv5.source(data5).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
})

const cols3 = {
    percent: {
        formatter: val => {
            val = (val * 100) + '%'
            return val
        }
    }
}

const colorMap = {
    'Asia': G2.Global.colors[0],
    'Americas': G2.Global.colors[1],
    'Europe': G2.Global.colors[2],
    'Oceania': G2.Global.colors[3]
}

class ChartDemo extends React.Component {
    state = {
        data9:[],
        data10:[],
        data11:[]
    }
    componentDidMount() {
        fetch('http://localhost:8080/Analysis/Year', {
            method:'post',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({data10: data});
            })

        fetch('http://localhost:8080/Analysis/MonthPhoto', {
            method:'post',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({data11: data});
            })

        dv3.source(this.state.data9).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        })
    }
    render () {
        const cardContent = `此页面用到的图表插件是<a href="https://github.com/alibaba/BizCharts">bizcharts@^3.1.10</a>`
        return (
            <div>
              <CustomBreadcrumb arr={['其它', '图表']}/>
                  <Card title='系统上传护照' bordered={false} className='card-item'>
                    <Chart height={400} data={this.state.data11} scale={cols} forceFit>
                        <Legend />
                        <Axis name="month"/>
                      <Axis name="num"/>
                      <Tooltip crosshairs={{type: 'y'}}/>
                      <Geom type="line" position="month*num" size={2} color={"type"}/>
                    
                    </Chart>
                  </Card>
                  <Card title='年龄分布数' bordered={false} className='card-item'>
                    <Chart height={400} data={this.state.data10} scale={cols2} forceFit>
                      <Axis name="item"/>
                      <Axis name="count"/>
                      <Tooltip crosshairs={{type: 'y'}}/>
                      <Geom type="interval" position="item*count"/>
                    </Chart>
                  </Card>
                  {/*<Card title='年龄分布比例' bordered={false} className='card-item'>*/}
                  {/*  <Chart height={400} data={dv3} scale={cols3} padding={[80, 100, 80, 80]} forceFit>*/}
                  {/*    <Coord type='theta' radius={0.75}/>*/}
                  {/*    <Axis name="percent"/>*/}
                  {/*      /!*<Legend position='right' offsetY={-80} offsetX={-100}/>*!/*/}
                  {/*    <Legend position='right' offsetY={-80}/>*/}
                  {/*    <Tooltip*/}
                  {/*        showTitle={false}*/}
                  {/*        itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'*/}
                  {/*    />*/}
                  {/*    <Geom*/}
                  {/*        type="intervalStack"*/}
                  {/*        position="percent"*/}
                  {/*        color='item'*/}
                  {/*        tooltip={['item*percent', (item, percent) => {*/}
                  {/*            percent = percent * 100 + '%'*/}
                  {/*            return {*/}
                  {/*                name: item,*/}
                  {/*                value: percent*/}
                  {/*            }*/}
                  {/*        }]}*/}
                  {/*        style={{lineWidth: 1, stroke: '#fff'}}*/}
                  {/*    >*/}
                  {/*      <Label content='percent' formatter={(val, item) => {*/}
                  {/*          return item.point.item + ': ' + val*/}
                  {/*      }}/>*/}
                  {/*    </Geom>*/}
                  {/*  </Chart>*/}
                  {/*</Card>*/}
                  {/*  <Card title='护照与申请表问题比例' bordered={false} className='card-item'>*/}
                  {/*      <Chart height={400} data={dv5} scale={cols3} padding={[80, 100, 80, 80]} forceFit>*/}
                  {/*          <Coord type='theta' radius={0.75}/>*/}
                  {/*          <Axis name="percent"/>*/}
                  {/*          /!*<Legend position='right' offsetY={-80} offsetX={-100}/>*!/*/}
                  {/*          <Legend position='right' offsetY={-80}/>*/}
                  {/*          <Tooltip*/}
                  {/*              showTitle={false}*/}
                  {/*              itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'*/}
                  {/*          />*/}
                  {/*          <Geom*/}
                  {/*              type="intervalStack"*/}
                  {/*              position="percent"*/}
                  {/*              color='item'*/}
                  {/*              tooltip={['item*percent', (item, percent) => {*/}
                  {/*                  percent = percent * 100 + '%'*/}
                  {/*                  return {*/}
                  {/*                      name: item,*/}
                  {/*                      value: percent*/}
                  {/*                  }*/}
                  {/*              }]}*/}
                  {/*              style={{lineWidth: 1, stroke: '#fff'}}*/}
                  {/*          >*/}
                  {/*              <Label content='percent' formatter={(val, item) => {*/}
                  {/*                  return item.point.item + ': ' + val*/}
                  {/*              }}/>*/}
                  {/*          </Geom>*/}
                  {/*      </Chart>*/}
                  {/*  </Card>*/}
              <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

export default ChartDemo