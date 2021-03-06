import Taro,{Component} from "@tarojs/taro";
import React from 'react';
import {Image, Text, View} from "@tarojs/components";
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import { AtCalendar,AtProgress} from "taro-ui"
import './insistStatistics.scss'
import {getCustomRecordList, getUserCustomList} from "../../api/apis";
import all from '../../assets/images/all.png';
import err from '../../assets/images/image_404.png'
let count=0;
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
      marks:[],
    }
  }

  componentDidMount() {
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const params={
      pageNo:0,
      pageSize:100,
      userId:userInfoModel.id
    };
    let topList=[
      {icon:all,type:0},
    ];
    let that=this;
    let completed=0;
    getUserCustomList(params).then(res=>{
      let list=res.data.list;
      list.forEach((item,index)=>{
        if(item.isCheckInToday){
          completed++;
        }
        topList.push({
          icon:item.custom.logo,
          type:index+1
        })
      })
      const percentR=completed/list.length;
        setTimeout(()=>{
          let timer=setInterval(()=>{
            if(count-1>=-0.01){
              clearInterval(timer)
            }else
              count=count+0.05
            that.setState({
              percent:percentR*count*100
            })
            if(count-1>=-0.01){
              clearInterval(timer)
            }
          },18)
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
    let that=this;
    this.setState({type})
    if(type!==0){
      // {
      //   "customId": 0,
      //   "myUserId": 0,
      //   "pageNo": 0,
      //   "pageSize": 0,
      //   "userId": 0
      // }
      let userInfoModel = Taro.getStorageSync('userInfoModel');
      const params={
        customId:this.state.dataAll[type-1].custom.id,
        myUserId:userInfoModel.id,
        userId:userInfoModel.id,
        pageNo:0,
        pageSize:1000,
      }
      getCustomRecordList(params).then(res=>{

        const list=res.data.items;
        let marks=[];
        list.forEach(item=>{
          // { value: '2020/1/11' }
          marks.push({value:item.checkIn.checkInTime.substring(0,10).replace(/-/g,'/')})
        })
        this.setState({
          itemDetail:this.state.dataAll[type-1],
          marks
        })
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
              <AtCalendar onDayClick={()=>{}}  className="insist_content_others_calendar" marks={ this.state.marks } />
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
