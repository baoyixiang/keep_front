import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image, Button} from '@tarojs/components'
import './mine.scss'
import React from "react";
import hope_list from "../../assets/images/mine/hope_list.png";
import keep_statics from "../../assets/images/mine/keep_statics.png";
import concerned from "../../assets/images/mine/concerned.png";
import {AtIcon} from "taro-ui";
export default class Mine extends Component {

  constructor(props){
    super(props);
    this.state={
      photo:"",
      nickName:"",
      city:""
    }
  }

  componentDidMount() {
    let that=this;
    Taro.getStorage({
      key:'userInfo',
      success(res){
        // console.log(res.data)
        that.setState({
          nickName:res.data.nickName,
          photo:res.data.avatarUrl,
          city:res.data.province+"-"+res.data.city,
        })
      }
    })
  }

  handleClickNav(id){
    const {photo}=this.state;
    if(photo===""){
      Taro.showModal({
        title:"提示",
        content:"请先去登录",
        showCancel:false

      })
      return;
    }
    switch(id){
      case 0:
        Taro.navigateTo({
          url:"../mineHomePage/mineHomePage"
        })
        break;
      case 1:
        Taro.navigateTo({
          url:"../insistStatistics/insistStatistics"
        });
        break;
      case 2:
        Taro.navigateTo({
          url:'../mineCommunity/mineCommunity'
        })
      default:break;
    }
  }

  renderNavItems(){
    let obj=[
      {id:0,img:hope_list,text:"我的主页"},
      {id:1,img:keep_statics,text:"坚持统计"},
      {id:2,img:hope_list,text:"我的社区"},
      {id:3,img:concerned,text:"我的关注"},
    ];
    return obj.map(item=>{
      return <View onClick={this.handleClickNav.bind(this,item.id)} className='mine_nav_item'>
        <Image className='mine_nav_item_img' src={item.img}/>
        <Text className='mine_nav_item_text' >{item.text}</Text>
        <AtIcon className='mine_nav_item_icon' size={20} value='chevron-right'/>
      </View>
    })
  }
  getUserInfo (res){
    Taro.setStorage({
      key:'userInfo',
      data:res.detail.userInfo
    });
    let that=this;
    Taro.getStorage({
      key:'userInfo',
      success(res){
        // console.log(res.data)
        that.setState({
          nickName:res.data.nickName,
          photo:res.data.avatarUrl,
          city:res.data.province+"-"+res.data.city,
        })
      }
    })
  }
  outLogin(){
    let that=this;
    Taro.showModal({
      title:"提示",
      content:"是否确认退出？",
      confirmText:"确认退出",
      confirmColor:"#DD2C4B",
      cancelText:"关闭",
      success(e){
        if(e.confirm){
          Taro.clearStorage();
          that.setState({
            photo:"",
            nickName:"",
            city:"",
          })
        }else{
          console.log('cancel')
        }

      }
    })

  }
  render () {
    const {photo,nickName,city}=this.state;
    return (
      <View className='mine'>
        <View className='mine_topBack'>
          {photo?<View>
            <Image className='mine_topBack_headImg' src={photo}/>
            <Text className='mine_topBack_nickName'>{nickName}</Text>
            <Text className='mine_topBack_headText'>{city}</Text>
          </View>:
            <Button className="mine_topBack_login" openType="getUserInfo" onGetUserInfo={this.getUserInfo} lang={"zh_CN"}>登 录</Button>
          }
        </View>
        <View className='mine_nav'>
          {this.renderNavItems()}
        </View>
        {photo?<Button className="mine_outLogin" onClick={this.outLogin.bind(this)}>退出登录</Button>:null}
      </View>
    )
  }
}
