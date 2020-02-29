import Taro,{Component} from "@tarojs/taro";
import React from 'react';
import {Image, Text, View} from "@tarojs/components";
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import { AtCalendar,AtProgress} from "taro-ui"
import './insistStatistics.scss'
import {getUserCustomList} from "../../api/apis";
import all from '../../assets/images/all.png';
import err from '../../assets/images/image_404.png'
export default class InsistStatistics extends Component{
  constructor(props){
    super(props);
    this.state={
      topNav:[],
      type:0,
      itemDetail:{},
      percent:0,
      total:undefined,
      completed:0,
      dataAll:[],
    }
  }

  componentDidMount() {
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const params={
      pageNo:0,
      pageSize:10,
      userId:userInfoModel.id
    };
    let topList=[
      {icon:all,type:0},
    ];
    let completed=0;
    getUserCustomList(params).then(res=>{
      let list=res.data.list;
      console.log(list);
      list.forEach((item,index)=>{
        if(item.joinCustom.completed){
          completed++;
        }
        topList.push({
          icon:item.custom.logo,
          type:index+1
        })
      })
      const percentR=completed/list.length;
      let count=0;
      setTimeout(()=>{
        let timer=setInterval(()=>{
          count=count+0.05
          this.setState({
            percent:percentR*count
          })
          if(Math.abs(count-1)<0.01){
            clearInterval(timer)
          }
        },16)
      },350)

      this.setState({
        completed,
        topList,
        total:list.length,
        dataAll:list,
      })
    })


  }

  switchNavItem(type){
    this.setState({type})
    console.log(this.state.dataAll[type-1])
    if(type!==0){
      this.setState({
        itemDetail:this.state.dataAll[type-1]
      })
    }
  }

  render() {
    const {topList,type,itemDetail,percent}=this.state;
    let DEG=-45;
    if(percent>50){
      DEG=(percent-50)/100*360-45
    }else{
      DEG=-(50-percent)/100*360-45
    }
    return (
      <View>
        <NavBar back={true} title={"坚持统计"}/>
        <BarTakeUp height={50}/>
        <View className="topNav">{
          topList?topList.map((item,index)=>{
            return <View style={{backgroundColor:type===index?"#CCCCCC":""}} onClick={this.switchNavItem.bind(this,item.type)} className="topNav_item">
              <Image className="topNav_item_icon" src={item.icon}/>
            </View>
          }):null
        }</View>
        <View className="insist_content">
          {
            type===0?<View className="insist_content_first">
              <Text className="insist_content_first_title">全部习惯今天统计</Text>
              {/*<AtProgress className="insist_content_first_progress" strokeWidth={12} percent={percent} status={percent===100?'success':''} />*/}
              <View className="insist_content_first_progress2">
                <View className='right_circle'/>
                <View className="left_circle"/>
                <View className="mask" style={{
                  borderLeftColor:(percent<=50?"#F1F3F7":"transparent"),
                  borderTopColor:(percent<=50?"#F1F3F7":"transparent"),
                  borderBottomColor:(percent>50?"#25A2F9":"transparent"),
                  borderRightColor:(percent>50?"#25A2F9":"transparent"),
                  transform:'rotate('+DEG+'deg)'
                }}/>
                <Text className='percent_number'>{Math.floor(percent)} <Text className='percentage'> %</Text></Text>
                <Text className='finishedText'>完成率</Text>
              </View>
              <View className="insist_content_first_content">
                <View className="insist_content_first_content_item">
                  <Text className="insist_content_first_content_item_finishedNum">{this.state.completed}</Text>
                  <Text className="insist_content_first_content_item_text">已完成</Text>
                </View>
                <View className="insist_content_first_content_item">
                  <Text className="insist_content_first_content_item_notFinishedNum">{this.state.total-this.state.completed}</Text>
                  <Text className="insist_content_first_content_item_text">未完成</Text>
                </View>
                <View className="insist_content_first_content_item">
                  <Text className="insist_content_first_content_item_insistingNum">{this.state.total}</Text>
                  <Text className="insist_content_first_content_item_text">坚持中</Text>
                </View>
              </View>
            </View>:<View className="insist_content_others">
              <Text className="insist_content_others_title">{itemDetail.custom.title}</Text>
              <AtCalendar onDayClick={()=>{}}  className="insist_content_others_calendar" marks={ [ { value: '2020/1/11' },{ value: '2020/1/12' },{ value: '2020/1/14' },{ value: '2020/1/26' } ] } />
              <View className="insist_content_others_statistics">
                <View className="insist_content_others_statistics_title">数据统计</View>
                <View className="insist_content_others_statistics_item">
                  <View className="insist_content_others_statistics_item_dot"></View>
                  <View className="insist_content_others_statistics_item_text">开始坚持时间</View>
                  <View className="insist_content_others_statistics_item_day">
                    <Text className="insist_content_others_statistics_item_day_num">{itemDetail.joinCustom?itemDetail.joinCustom.joinTime.substring(0,10):0} </Text>
                    <Text className="insist_content_others_statistics_item_day_text"> 天</Text>
                  </View>
                </View>
                <View className="insist_content_others_statistics_item">
                  <View className="insist_content_others_statistics_item_dot" style={{backgroundColor:"#25A2F9"}}></View>
                  <View className="insist_content_others_statistics_item_text">总坚持天数</View>
                  <View className="insist_content_others_statistics_item_day">
                    <Text className="insist_content_others_statistics_item_day_num" style={{color:"#25A2F9"}}>{itemDetail.joinCustom.checkDaysCount} </Text>
                    <Text className="insist_content_others_statistics_item_day_text"> 天</Text>
                  </View>
                </View>
                <View className="insist_content_others_statistics_item">
                  <View className="insist_content_others_statistics_item_dot" style={{backgroundColor:"orange"}}></View>
                  <View className="insist_content_others_statistics_item_text">目标天数</View>
                  <View className="insist_content_others_statistics_item_day">
                    <Text className="insist_content_others_statistics_item_day_num" style={{color:"orange"}}>{itemDetail.joinCustom.targetDays} </Text>
                    <Text className="insist_content_others_statistics_item_day_text"> 天</Text>
                  </View>
                </View>
              </View>
            </View>
          }
        </View>
      </View>
    )
  }
}
