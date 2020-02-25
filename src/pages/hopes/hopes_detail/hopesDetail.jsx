import Taro,{Component} from '@tarojs/taro';
import './hopesDetail.scss';
import React from "react";
import {Image, Text, View} from "@tarojs/components";
import NavBar from "../../../common/navBar/navBar";
import BarTakeUp from "../../../common/barTakeUp/barTakeUp";

export default class HopeDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      detail:{head:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',
        time:'2019-05-12',
        content:'这是第一段文字，这是第一段文字，这是第一段文字,这是第一段文字，这是第一段文字，这是第一段文字\',这是第一段文字，这是第一段文字，这是第一段文字\'',
        pic:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073982641,3389786265&fm=26&gp=0.jpg",
        id:1,
      },
    }
  }
  componentDidMount() {
    let {id}=this.$router.params;
    console.log(id)
  }
  render() {
    const {detail}=this.state;
    return (
      <View>
        <NavBar back={true} title="心愿详情"/>
        <BarTakeUp/>
        <View className='content'>
          <View className='content_top'>
            <Image className='head' src={detail.head}/>
            <Text className='time'>{detail.time}</Text>

          </View>
          <Text className='content_text'>{detail.content}</Text>
          <Image className='pic' src={detail.pic}/>
        </View>
      </View>
    )
  }
}
