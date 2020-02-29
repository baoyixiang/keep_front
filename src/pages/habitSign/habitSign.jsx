import Taro,{Component} from "@tarojs/taro";
import React from 'react';
import './habitSign.scss';
import {Image, Text, View} from "@tarojs/components";
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import {AtButton} from "taro-ui";
import {customSign} from "../../api/apis";

export default class HabitSign extends Component{
  constructor(props){
    super(props);
    this.state={
      completed:undefined,
      title:undefined,
      customId:undefined
    }
  }

  componentDidMount() {

    console.log(this.$router.params);
    let data=this.$router.params;
    this.setState({
      completed:data.completed==='true'?true:false,
      customId:Number(data.id),
      title:data.title
    })
  }

  changeSignStatus(){
    let that=this;
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const params={
      userId:userInfoModel.id,
      customId:this.state.customId,
    }
    // if(this.state.completed){
    //   Taro.showModal({
    //     title:"取消打卡",
    //     content:"取消打卡后，该习惯当天的记录会被情况，您确定删除？",
    //     confirmColor:'#DD2C4B',
    //     confirmText:"取消打卡",
    //     cancelText:"关闭",
    //     success(e){
    //       if(e.confirm){
    //         customSign(params).then(res=>{
    //           console.log(res)
    //           that.setState({
    //             completed:res.data.optSuccess
    //           })
    //         })
    //       }
    //     }
    //   })
    // }else{
      console.log(111)
      customSign(params).then(res=>{
        console.log(res)
        that.setState({
          completed:res.data.optSuccess
        })
      })
    // }
  }

  redirectToMood(){
    Taro.navigateTo({
      url:'../recordMood/recordMood',
    })
  }

  render() {
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
      </View>
    )
  }
}
