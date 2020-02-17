import Taro,{Component} from "@tarojs/taro";
import React from 'react';
import {View, Text, Image, Button} from '@tarojs/components'
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import {AtButton, AtSearchBar} from "taro-ui";
import './createHabit.scss'
export default class CreateHabit extends Component{
  constructor(props){
    super(props);
    this.state={
      habitName:"",
      recommendList:[],
      tips:true
    }
  }

  componentDidMount() {
    let recommendList=[
      {img:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',title:"兴趣爱好",num:3},
      {img:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',title:"兴趣爱好",num:3},
      {img:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',title:"兴趣爱好",num:3},
      {img:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',title:"兴趣爱好",num:3},
      {img:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',title:"兴趣爱好",num:3},
    ];
    this.setState({
      recommendList
    })
  }

  changeHabitName(e){
    this.setState({
      habitName:e,
    })
  }
  clearHabitName(){
    this.setState({
      tips:false,
      habitName:""
    })
  }

  renderRecommendList(){
    const {recommendList}=this.state;
    return recommendList.map(item=>{
      return (
        <View className="createHabit_recommend_content">
          <Image src={item.img} className="createHabit_recommend_content_img"/>
          <View className="createHabit_recommend_content_text">
            <Text className="createHabit_recommend_content_text_title">{item.title}</Text>
            <Text className="createHabit_recommend_content_text_num">已有{item.num}位萌友正在坚持</Text>
          </View>
          <Button className="createHabit_recommend_content_btn">加入</Button>
          <View style={{clear:"both"}}></View>
        </View>
      )
    })
  }

  render() {
    const {habitName, tips}=this.state;
    return(
      <View className="createHabit">
        <NavBar back={true} title={"创建个人习惯"}/>
        <BarTakeUp height={50}/>
          <AtSearchBar value={habitName} onClear={this.clearHabitName.bind(this)} onChange={this.changeHabitName.bind(this)} placeholder={"输入习惯名称"} actionName={tips?"添加":"创建"}/>
        {habitName!==""?<View className="createHabit_tips">
          {tips?`习惯"${habitName}"已经存在，可以添加`:`习惯"${habitName}"尚未创建`}
          <Button className="createHabit_tips_btn">{tips?"添加":"创建"}</Button>
        </View>:null}
        <View className="createHabit_recommend">
          <Text className="createHabit_recommend_title">智能推荐</Text>
          <View className="createHabit_recommendContent">{this.renderRecommendList()}</View>
        </View>
      </View>
    )
  }

}
