import Taro,{Component} from '@tarojs/taro';
import React from "react";
import NavBar from "../../../common/navBar/navBar";
import BarTakeUp from "../../../common/barTakeUp/barTakeUp";
import {Image, Text, View} from "@tarojs/components";
import './fansOrAttention.scss'
import Bottom from "../../../common/bottom/Bottom";

export default class FansOrAttention extends Component{
  constructor(props){
    super(props);
    this.state={
      title:"",
      type:0,
      persons:[
        {
          photo:'http://img2.imgtn.bdimg.com/it/u=3118813608,3660597234&fm=26&gp=0.jpg',
          nickName:"奥利奥",
        },  {
          photo:'http://img2.imgtn.bdimg.com/it/u=3118813608,3660597234&fm=26&gp=0.jpg',
          nickName:"奥利奥",
        },  {
          photo:'http://img2.imgtn.bdimg.com/it/u=3118813608,3660597234&fm=26&gp=0.jpg',
          nickName:"奥利奥",
        }
      ]
    }
  }
  componentDidMount() {
    let type=0;
    if(this.$router.params.title.indexOf("关注")!=-1){
      type=1
    }else{
      type=0;
    }
    this.setState({
      title:this.$router.params.title,type
    })
  }

  render() {
    const {persons,type}=this.state;
    return <View>
      <NavBar title={this.state.title} back={true}/>
      <BarTakeUp height={45}/>
      <View>
        {
          persons.map(item=>{
            return <View className='list'>
              <Image className='photo' src={item.photo} alt={"头像"}/>
              <Text className='name'>{item.nickName}</Text>
              {type===1?<Text className='cancelAttention'>取消关注</Text>:null}
            </View>
          })
        }
      </View>
      <Bottom text={"我是有底线的~"}/>
    </View>
  }
}
