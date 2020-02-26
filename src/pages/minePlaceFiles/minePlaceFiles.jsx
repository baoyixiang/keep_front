import Taro,{Component} from '@tarojs/taro';
import React from 'react';
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import {Text, View} from "@tarojs/components";
import Bottom from "../../common/bottom/Bottom";
import './minePlaceFiles.scss'
export default class MinePlaceFiles extends Component{
  constructor(props){
    super(props);
    this.state={
      list:[{title:'考研',days:5,id:1},
        {title:"自律~运动",days: 10,id:2},
        {title:'考研',days:5,id:3},
        {title:"自律~运动",days: 10,id:4},
        {title:'考研',days:5,id:5},
        {title:"自律~运动",days: 10,id:6},
        {title:'考研',days:5,id:7},
      ]
    }
  }
  componentDidMount(): void {
  }

  resetHabit(id){
    let that=this;
    Taro.showModal({
      title:"提示",
      content:"是否确认恢复归档？",
      confirmText:"恢复",
      confirmColor:"#1A80D2",
      cancelText:"关闭",
      success(e){
        if(e.confirm){
          let list=that.state.list;
          for(let i=0;i<list.length;i++){
            if(list[i].id===id){
              list.splice(i,1);
            }
          }
          that.setState({
            list
          })
          console.log('confirm')
        }else{
          console.log('cancel')
        }
      }
    })
  }

  renderList(list){
    let List= list.map(item=>{
      return (<View onLongPress={this.resetHabit.bind(this,item.id)} className='list_item'>
          <Text className='title'>{item.title}</Text>
          <Text className='days'>已坚持{item.days}天</Text>
      </View>)
    })
    const TOP=<View className='top'>{list.length}个习惯已经归档（长按可以恢复）</View>
    return <View>{TOP}{List}</View>
  }

  render(){
    return(
      <View>
        <NavBar back={true}/>
        <BarTakeUp/>
        {
          this.state.list.length===0?<View className='noPlace'>暂无归档习惯</View>:this.renderList(this.state.list)

        }
      </View>
    )
  }
}
