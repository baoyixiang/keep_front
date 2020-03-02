import Taro, { Component } from '@tarojs/taro'
import {Image, Text, View} from "@tarojs/components";
import React from "react";
import NavBar from "../../../common/navBar/navBar";
import BarTakeUp from "../../../common/barTakeUp/barTakeUp";
import photo from "../../../assets/images/mine/keep_statics.png";
import './recommendCustom.scss'
import {getRecommendCustomList} from "../../../api/apis";
import {AtButton} from "taro-ui";
import {joinCustom} from "../../../common/joinCustom/joinCustom";

export default class RecommendCustom extends Component{

  constructor(props) {
    super(props);
    this.state = {
      recommendCustomList: [],
    }
  }

  componentDidMount() {
    let {tags} = this.$router.params;

    let userInfo = Taro.getStorageSync('userInfoModel');

    getRecommendCustomList(userInfo.id,tags).then((result)=>{
      this.setState({
        recommendCustomList: result.data
      })
    })
  }

  render() {
    let {tags} = this.$router.params;
    const {recommendCustomList} = this.state;
    return(
      <View>
        <NavBar back={true} title={tags}/>
        <BarTakeUp/>
        {
          recommendCustomList.length === 0 ?
            <View className='recommend-custom-no-item'>
              <Text>暂无推荐习惯</Text>
            </View> :
            <View>{this.renderHabits()}</View>
        }
      </View>
    );
  }

  joinCustomAndDelete(customList,customItem,customId) {
    joinCustom(customId);
    for (let i = 0; i < customList.length; i++) {
      if(customList[i] == customItem) {
        customList.splice(i,i+1);
      }
    }
    this.setState({
      recommendCustomList: customList,
    });
  }

  renderHabits(){
    let image = "http://file01.16sucai.com/d/file/2013-11-11/13841505716891.jpg"
    const {recommendCustomList} = this.state;
    return recommendCustomList.map(item =>
      <View className='recommend-custom-list_item'>
        <Image className='recommend-custom-list_item_icon' src={item.logo || image}/>
        <Text className='recommend-custom-list_item_title'>{item.title || "——"}</Text>
        <Text className='recommend-custom-list_item_days'>已有{item.joinCount}位朋友在坚持</Text>
        <AtButton className='recommend-custom-list_item-button' onClick={this.joinCustomAndDelete.bind(this,recommendCustomList,item,item.id)}>加入</AtButton>
      </View>
    )
  }
}
