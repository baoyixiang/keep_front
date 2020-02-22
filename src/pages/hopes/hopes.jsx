import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import './hopes.scss'
import React from "react";
import NavBar from "../../common/navBar/navBar";
import { AtTabs ,AtTabsPane} from 'taro-ui'
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
export default class Hopes extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      list:[
        {icon:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',
          nickName:'*****',
          content:'asasasasas',
          pic:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073982641,3389786265&fm=26&gp=0.jpg"},
        {icon:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',
          nickName:'*****',
          content:'asasasasas',
          pic:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=34693802,4065768970&fm=26&gp=0.jpg"},
        {icon:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',
          nickName:'*****',
          content:'asasasasas',
          pic:"http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg"},
        {icon:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',
          nickName:'*****',
          content:'asasasasas',
          pic:"http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg"},
        {icon:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',
          nickName:'*****',
          content:'asasasasas',
          pic:"http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg"},

      ],
    }
  }
  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () {

  }

  componentDidShow () { }

  componentDidHide () { }

  renderList(list){
   return list.map((item,index)=>{
      return <View className='list_item'>
        {index%2===0?<Image className='list_item_img' src={item.pic} mode='aspectFill'/>:null}
        {item.content}
      </View>
    })

  }

  render () {
    return (
      <View className='hopes'>
        <NavBar title={"心愿墙"} back={false}/>
        <BarTakeUp/>
        <View className="all">
          {this.renderList(this.state.list)}
        </View>

      </View>
    )
  }
}
