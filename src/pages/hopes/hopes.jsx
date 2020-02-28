import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import './hopes.scss'
import React from "react";
import NavBar from "../../common/navBar/navBar";
import {AtButton, AtTabs, AtTabsPane} from 'taro-ui'
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import {getAllHopes} from "../../api/apis";
import Loading from "../../common/loading/loading";
export default class Hopes extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      loading:false,
      left:[],
      right:{}
    }
  }
  componentWillMount () { }


  componentDidMount () {

    this.setState({
      loading:true
    });
  }

  componentWillUnmount () {

  }

  componentDidShow () {
    let that=this;
    getAllHopes({
      pageNo:0,
      pageSize:10,
    }).then(res=>{
      let left=[];
      let right=[];
      console.log(res)
      res.data.forEach((item,index)=>{
        if(index%2===0){
          left.push(item)
        }else{
          right.push(item)
        }
      })
      that.setState({
        left,right,
        loading:false
      })
    })
  }

  componentDidHide () { }

  redirectToHopeDetail(id){
    console.log(id)
    Taro.navigateTo({
      url:`./hopes_detail/hopesDetail?id=${id}`
    })
  }

  redirectToCreateHope(){
    Taro.navigateTo({
      url:'./createHope/createHope'
    })
  }

  renderLeft(list){
    return <View className='left'>
      {
        list.map(item=>{
          return <View onClick={this.redirectToHopeDetail.bind(this,item.id)} className='list_item'>
            <View className='list_item_top'>
              <Image className='list_item_photo' src={item.avatar} mode='aspectFill'/>
              <Text className='list_item_text'>{item.createTime.substring(0,11)}</Text>
            </View>
            <Image className='list_item_img' src={item.images[0]||require('../../assets/images/image_404.png')}/>
            <Text className='list_item_content'>{item.wordContent}</Text>
          </View>
        })
      }
    </View>
  }
  renderRight(list){
    return <View className='right'>
      {
        list.map(item=>{
          return <View onClick={this.redirectToHopeDetail.bind(this,item.id)} className='list_item'>
            <View className='list_item_top'>
              <Image className='list_item_photo' src={item.avatar} mode='aspectFill'/>
              <Text className='list_item_text'>{item.createTime.substring(0,11)}</Text>
            </View>
            <Image className='list_item_img' src={item.images[0]||require('../../assets/images/image_404.png')}/>
            <Text className='list_item_content'>{item.wordContent}</Text>
          </View>
        })
      }
    </View>;
  }
  render () {
    const {left,right}=this.state;
    return (
      <View className='hopes'>
        <NavBar title="心愿"/>
        <BarTakeUp/>
        <Loading display={this.state.loading}/>
        <View className='all'>
          {this.renderLeft(left)}
          {this.renderRight(right)}
        </View>
        <AtButton className="btn" onClick={this.redirectToCreateHope.bind(this)}>创建心愿</AtButton>
      </View>
    )
  }
}
