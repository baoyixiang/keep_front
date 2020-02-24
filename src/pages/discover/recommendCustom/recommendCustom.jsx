import Taro, { Component } from '@tarojs/taro'
import {Image, Text, View} from "@tarojs/components";
import React from "react";
import NavBar from "../../../common/navBar/navBar";
import BarTakeUp from "../../../common/barTakeUp/barTakeUp";
import photo from "../../../assets/images/mine/keep_statics.png";
import './recommendCustom.scss'
import {getRecommendCustomList} from "../../../api/apis";
import {AtButton} from "taro-ui";

export default class RecommendCustom extends Component{

  constructor(props) {
    super(props);
    this.state = {
      recommendCustomList: [],
    }
  }

  componentDidMount() {
    let {tags} = this.$router.params;

    let typeList = [tags];

    getRecommendCustomList(1,typeList).then((result)=>{
      this.setState({
        recommendCustomList: result.data[0]
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
          recommendCustomList.customList.length === 0 ?
            <Text>暂无习惯</Text> :
            <View>{this.renderHabits()}</View>
        }
      </View>
    );
  }

  renderHabits(){
    let image = "http://file01.16sucai.com/d/file/2013-11-11/13841505716891.jpg"
    const {recommendCustomList} = this.state;
    return recommendCustomList.customList.map(item =>
      <View className='recommend-custom-list_item'>
        <Image className='recommend-custom-list_item_icon' src={item.logo || image}/>
        <Text className='recommend-custom-list_item_title'>{item.title || "——"}</Text>
        <Text className='recommend-custom-list_item_days'>已有233位朋友在坚持</Text>
        <AtButton className='recommend-custom-list_item-button'>加入</AtButton>
      </View>
    )
  }
}
