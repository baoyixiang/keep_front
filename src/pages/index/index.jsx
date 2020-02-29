import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import React from "react";
import photo from '../../assets/images/mine/keep_statics.png'
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import {getOwnCustoms, getRecommendCustomList, getUserCustomList} from "../../api/apis";
import Loading from "../../common/loading/loading";
export default class Index extends Component {

  constructor(props){
    super(props);
    this.state={
      statusBarHeight:0,
      loading:true,
      habitsList:[
        {
          custom: {},
        }
      ]
    }
  }

  pageNo = 0;

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

  }

  componentWillUnmount () { }

  componentDidShow () {
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const params={
      pageNo:0,
      pageSize:10,
      userId:userInfoModel.id
    };
    getUserCustomList(params).then(res=>{
      console.log(res)
      this.setState({
        habitsList: res.data.list,
        loading:false,
      })
    })
  }

  componentDidHide () { }



  createHabit(){
    Taro.navigateTo({
      url:'../createHabit/createHabit'
    })
  }

  redirectToHabit(id,title,completed){
    Taro.navigateTo({
      url:"../habitSign/habitSign?id="+id+"&title="+title+"&completed="+completed,
    })
  }

  renderHabits(){
    const {habitsList} = this.state;
    return habitsList.map(item=>{
      return (
        <View onClick={this.redirectToHabit.bind(this,item.custom.id,item.custom.title,item.joinCustom.completed)} className='list_item'>
          <Image className='list_item_icon' src={item.custom.logo}/>
          <Text className='list_item_title'>{item.custom.title}</Text>
          <Text className='list_item_days'>已坚持{item.joinCustom.checkDaysCount}天</Text>
        </View>
      )
    })
  }

  render () {
    let {habitsList} = this.state;
    return (
      <View className='index' >
        <NavBar title={"点滴习惯"} back={false}/>
        <BarTakeUp/>
        <Loading display={this.state.loading}/>
        {
          habitsList.length===0?<Text className={'noHabit'}>暂无习惯</Text>:
            <View>{this.renderHabits()}</View>
        }
        <AtButton className="create_habit_button" onClick={this.createHabit.bind(this)}>添加习惯</AtButton>

      </View>
    )
  }
}
