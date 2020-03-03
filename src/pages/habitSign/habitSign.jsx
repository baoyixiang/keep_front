import Taro,{Component} from "@tarojs/taro";
import React from 'react';
import './habitSign.scss';
import {Image, Text, View} from "@tarojs/components";
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import {AtButton, AtTabsPane} from "taro-ui";
import {cancelSign, customSign, getCustomRecord, likeRecord} from "../../api/apis";
import Record from "../../common/record/record";

export default class HabitSign extends Component{
  constructor(props){
    super(props);
    this.state={
      completed:undefined,
      title:undefined,
      customId:undefined,
      displayRecords:[]
    }
  }

  componentDidMount() {
    let data=this.$router.params;
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    this.setState({
      completed:data.completed==='true'?true:false,
      customId:Number(data.id),
      title:data.title
    })
    const param={
      customId:Number(data.id),
      pageNo: 0,
      pageSize: 100,
      myUserId:userInfoModel.id
    }
    getCustomRecord(param).then(res=>{
      this.setState({
        displayRecords:res.data.items,
      })
    })
  }
  refreshRecordList(){
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const param={
      customId:this.state.customId,
      pageNo: 0,
      pageSize: 100,
      myUserId:userInfoModel.id
    }
    getCustomRecord(param).then(res=>{
      this.setState({
        displayRecords:res.data.items,
      })
    })
  }

  changeLikeStatus(id){
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const params={
      checkInId:id,
      userId:userInfoModel.id
    }
    likeRecord(params).then(res=>{
      this.refreshRecordList()
    })

    let {displayRecords}=this.state;
    displayRecords.forEach(item=>{
      if(item.checkIn.id===id){
        item.isSelfLike=!item.isSelfLike;
      }
    })
    this.setState({
      displayRecords
    })
  }
  changeSignStatus(){
    let that=this;
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const params={
      userId:userInfoModel.id,
      customId:this.state.customId,
    }
    if(this.state.completed){
      Taro.showModal({
        title:"取消打卡",
        content:"取消打卡后，该习惯当天的记录会被情况，您确定删除？",
        confirmColor:'#DD2C4B',
        confirmText:"取消打卡",
        cancelText:"关闭",
        success(e){
          if(e.confirm){
            cancelSign(params).then(res=>{
              console.log(res)
              that.setState({
                completed:!res.data.optSuccess
              })
            })
          }
        }
      })
    }else{
      console.log(111)
      customSign(params).then(res=>{
        console.log(res)
        that.setState({
          completed:res.data.optSuccess
        })
      })
    }
  }

  redirectToMood(){
    Taro.navigateTo({
      url:'../recordMood/recordMood?customId='+this.state.customId,
    })
  }

  render() {
    const {displayRecords}=this.state;
    return(
      <View className="Sign">
        <NavBar title={this.state.title} back={true}/>
        <BarTakeUp/>
        <View className="Sign_check">
          <Text className="Sign_check_date">{new Date().getMonth()+1+"-"+new Date().getDate()}</Text>
          <View className="Sign_check_view" onClick={this.changeSignStatus.bind(this)}>
            <View className="view_back">{this.state.completed ?
              <Image className="Sign_check_view_img" src={require('../../assets/images/habitSign/check_select.png')}/> :
              <Image className="Sign_check_view_img" src={require('../../assets/images/habitSign/check.png')}/>
            }</View></View>
          {this.state.completed?<AtButton onClick={this.redirectToMood.bind(this)} className="Sign_check_btn">记录心情</AtButton>:null}
        </View>
        <View className={'divide'}>
          打卡心情记录
        </View>
        {displayRecords.length>0?<Record refresh={this.refreshRecordList.bind(this)} changeStatus={this.changeLikeStatus.bind(this)} data={displayRecords}/>:<View className={'customRecord'}>没有任何记录</View>}
      </View>
    )
  }
}
