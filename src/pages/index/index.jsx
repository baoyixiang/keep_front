import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import React from "react";
import photo from '../../assets/images/mine/keep_statics.png'
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import {getRecommendCustomList, getUserCustomList} from "../../api/apis";
export default class Index extends Component {

  constructor(props){
    super(props);
    this.state={
      statusBarHeight:0,
      habitsList:[]
    }
  }

  componentWillMount () {
    Taro.getStorage({
      key:'userInfo',
      fail(){
        Taro.navigateTo({
          url:'../login/login'
        })
      }
    })
  }

  componentDidMount () {
    Taro.getStorage({
      key:'userInfoModel',
      success(res){
        const params={
          pageNo:0,
          pageSize:10,
          userId:res.data.id
        }
        getUserCustomList(params).then(res=>{
          console.log(res)
        })
      }
    })
    // getRecommendCustomList()
    let that=this;
    const habitsList=[
      {
        image:photo,
        title:"考研",
        days:1
      },
      {
        image:photo,
        title:"考研",
        days:1
      },
      {
        image:photo,
        title:"考研",
        days:1
      },
    ]
     this.setState({
       habitsList
     })

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }



  createHabit(){
    Taro.navigateTo({
      url:'../createHabit/createHabit'
    })
  }

  redirectToHabit(){
    Taro.navigateTo({
      url:"../habitSign/habitSign?id=123",
    })
  }

  renderHabits(){
    const {habitsList}=this.state;
    return habitsList.map(item=>{
      return <View onClick={this.redirectToHabit.bind(this)} className='list_item'>
        <Image className='list_item_icon' src={item.image}/>
        <Text className='list_item_title'>{item.title}</Text>
        <Text className='list_item_days'>已坚持{item.days}天</Text>
      </View>
    })
  }

  render () {
    let data=[1]
    return (
      <View className='index' >
        <NavBar title={"点滴习惯"} back={false}/>
        <BarTakeUp/>

        {
          data.length===0?<Text>暂无习惯</Text>:
            <View>{this.renderHabits()}</View>
        }
        <AtButton className="create_habit_button" onClick={this.createHabit.bind(this)}>添加习惯</AtButton>

      </View>
    )
  }
}
