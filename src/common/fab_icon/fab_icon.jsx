import Taro, {Component} from "@tarojs/taro";

import {Image, View} from "@tarojs/components";
import React from "react";
import {AtFab} from "taro-ui";
// import logo from "../assets/img/logo.png";
// import homeW from "../assets/img/homeW.png";
// import homeB from "../assets/img/homeB.png";
// import mineW from "../assets/img/mineW.png";
// import mineB from "../assets/img/mineB.png";
import './fab_icon.scss';

export default class FabIcon extends Component{

  constructor(props){
    super(props);
    this.state={
      status:1,
      changeTag:0,
    }
  }

  handleClick = () => {
    this.setState({
      changeTag:0,
    });
    if(this.props.type===0){
      let userInfo = Taro.getStorageSync('userInfo');
      Taro.navigateBack({ delta: 1 }).then();
      // if(userInfo.channelId){
      //   Taro.redirectTo({url: '/pages/homePage/community/community_home_page'}).then()
      // }else {
      //   Taro.redirectTo({url: `/pages/homePage/home_page_new`}).then()
      // }
    }else {
      this.setState({
        status: 1
      });
      Taro.navigateTo({url:'/pages/personalPage/newPersonalPage'}).then()
    }
  };

  handleSwitch(){
    this.setState({
      changeTag:1,
      status:Number(!this.state.status)
    })
  }

  render() {
    let {changeTag}=this.state;
    return(

      <View className='fab'>
        {this.state.status === 1 ? <View className='fab-content' onClick={this.handleSwitch.bind(this)}>
            <View className={["fab-content-box",changeTag?"fab-content-ani":""]}>
              <Image className='fab-icon' src={logo} mode='aspectFill'/>
              {/*<View className='fab-text'>{this.props.type===0?"主页":"我的"}</View>*/}
            </View>
          </View>
          :
          <View>{this.props.type !== 0 ? <View className="view-content view-content-rubber">
            <View className='view-content-box' onClick={this.handleClick}>
              <Image className='view-icon' src={mineB} mode='aspectFill'/>
              <View className='view-text'>我的</View>
            </View>
            <View onClick={this.handleSwitch.bind(this)} className='view-content-box view-content-box-right'>
              <Image className='view-icon' src={homeW} mode='aspectFill'/>
              <View className='view-text'  style={{color:"white"}}>主页</View>
            </View>
          </View> : <View className='view-content view-content-rubber'>
            <View className='view-content-box' onClick={this.handleClick}>
              <Image className='view-icon' src={homeB} mode='aspectFill'/>
              <View className='view-text'>主页</View>
            </View>
            <View onClick={this.handleSwitch.bind(this)} className='view-content-box view-content-box-right'>
              <Image className='view-icon' src={mineW} mode='aspectFill'/>
              <View className='view-text'  style={{color:"white"}}>我的</View>
            </View>
          </View>
          }</View>
        }
      </View>
    )
  }
}
