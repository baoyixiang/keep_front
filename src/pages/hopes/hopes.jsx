import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import './hopes.scss'
import React from "react";
import NavBar from "../../common/navBar/navBar";
import {AtButton, AtTabs, AtTabsPane} from 'taro-ui'
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
export default class Hopes extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      list:[
        {icon:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',
          time:'2019-05-12',
          content:'这是第一段文字，这是第一段文字，这是第一段文字',
          pic:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073982641,3389786265&fm=26&gp=0.jpg",
          id:1,
        },
        {icon:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',
          time:'2019-05-12',
          content:'这是第二段文字，这是第一段文字，这是第一段文字',
          pic:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=34693802,4065768970&fm=26&gp=0.jpg"},
        {icon:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',
          time:'2019-05-12',
          content:'这是第一段文字，这是第一段文字，这是第一段文字',
          pic:"http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg"},
        {icon:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',
          time:'2019-05-12',
          content:'这是第一段文字，这是第一段文字，这是第一段文字',
          pic:"http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg"},
        {icon:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',
          time:'2019-05-12',
          content:'这是一串文字文字这是一串文字文字这是一串文字文字这是一串文字文字这是一串文字文字',
          pic:"http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg"},

      ],
      left:[],
      right:{}
    }
  }
  componentWillMount () { }

  componentDidMount () {
    let left=[];
    let right=[];
    this.state.list.forEach((item,index)=>{
      if(index%2===0){
        left.push(item)
      }else{
        right.push(item)
      }
    })
    this.setState({
      left,right
    })
  }

  componentWillUnmount () {

  }

  componentDidShow () { }

  componentDidHide () { }

  redirectToHopeDetail(id){
    Taro.navigateTo({
      url:'./hopes_detail/hopesDetail?id='+id
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
              <Image className='list_item_photo' src={item.icon} mode='aspectFill'/>
              <Text className='list_item_text'>{item.time}</Text>
            </View>
            <Image className='list_item_img' src={item.pic}/>
            <Text className='list_item_content'>{item.content}</Text>
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
              <Image className='list_item_photo' src={item.icon} mode='aspectFill'/>
              <Text className='list_item_text'>{item.time}</Text>
            </View>
            <Image className='list_item_img' src={item.pic}/>
            <Text className='list_item_content'>{item.content}</Text>
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
        <View className='all'>
          {this.renderLeft(left)}
          {this.renderRight(right)}
        </View>
        <AtButton className="btn" onClick={this.redirectToCreateHope.bind(this)}>创建心愿</AtButton>
      </View>
    )
  }
}
