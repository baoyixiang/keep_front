import Taro,{Component} from "@tarojs/taro";
import React from 'react';
import './habitSign.scss';
import {Image, Text, View} from "@tarojs/components";
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import {AtButton} from "taro-ui";

export default class HabitSign extends Component{
  constructor(props){
    super(props);
    this.state={
      habitDetail:{
        check:false
      }
    }
  }

  componentDidMount() {
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const params={
      userId:userInfoModel.id,
      customId:this.$router.params.id
    }
  }

  changeSignStatus(){
    const {check}=this.state.habitDetail;
    const habitDetail={check:!check};
    let that=this;
    if(check){
      Taro.showModal({
        title:"取消打卡",
        content:"取消打卡后，该习惯当天的记录会被情况，您确定删除？",
        confirmColor:'#DD2C4B',
        confirmText:"取消打卡",
        cancelText:"关闭",
        success(e){
          if(e.confirm){
            that.setState({
              habitDetail
            })
          }
        }
      })
    }else{
      this.setState({
        habitDetail
      })
    }
  }

  redirectToMood(){
    Taro.navigateTo({
      url:'../recordMood/recordMood',
    })
  }

  render() {
    const {check}=this.state.habitDetail;
    return(
      <View className="Sign">
        <NavBar title={"背单词"} back={true}/>
        <BarTakeUp/>
        <View className="Sign_check">
          <Text className="Sign_check_date">{new Date().getMonth()+1+"-"+new Date().getDate()}</Text>
          <View className="Sign_check_view" onClick={this.changeSignStatus.bind(this)}>
            <View className="view_back">{check ?
              <Image className="Sign_check_view_img" src={require('../../assets/images/habitSign/check_select.png')}/> :
              <Image className="Sign_check_view_img" src={require('../../assets/images/habitSign/check.png')}/>
            }</View></View>
          {check?<AtButton onClick={this.redirectToMood.bind(this)} className="Sign_check_btn">记录心情</AtButton>:null}
        </View>
      </View>
    )
  }
}
