import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import './app.scss'
import 'taro-ui/dist/style/index.scss'
import React from "react";
class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/discover/recommendCustom/recommendCustom',
      'pages/discover/discover',
      'pages/hopes/hopes',
      'pages/hopes/hopes_detail/hopesDetail',
      'pages/hopes/createHope/createHope',
      'pages/mine/mine',
      'pages/login/login',
      'pages/createHabit/createHabit',
      'pages/mineHomePage/mineHomePage',
      'pages/minePlaceFiles/minePlaceFiles',
      'pages/mineHomePage/fansOrAttention/fansOrAttention',
      'pages/mineHomePage/othersHomePage/othersHomePage',
      'pages/insistStatistics/insistStatistics',
      'pages/habitSign/habitSign',
      'pages/mineCommunity/mineCommunity',
      'pages/recordMood/recordMood',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle:"black",
      navigationStyle:"custom"
    },
    tabBar: {
      color: "#000000",
      selectedColor: "#1296db",
      backgroundColor: '#ffffff',
      borderStyle: 'black',
      list: [{
        text: "主页",
        pagePath: "pages/index/index",
        iconPath: "assets/images/tabbar/index.png",
        selectedIconPath: "assets/images/tabbar/index_selected.png"
      }, {
        text: "发现",
        pagePath: "pages/discover/discover",
        iconPath: "assets/images/tabbar/discover.png",
        selectedIconPath: "assets/images/tabbar/discover_selected.png"
      },{
        text: "社区",
        pagePath: "pages/hopes/hopes",
        iconPath: "assets/images/tabbar/hope.png",
        selectedIconPath: "assets/images/tabbar/hope_selected.png"
      },{
        text: "我的",
        pagePath: "pages/mine/mine",
        iconPath: "assets/images/tabbar/mine.png",
        selectedIconPath: "assets/images/tabbar/mine_selected.png"
      }]
    },
  }

  componentDidMount () {
    Taro.cloud.init({
      env:"forever-hope-bstqt"
    })
    let value = Taro.getStorageSync('userInfo');
    if(!value){
      Taro.cloud.callFunction({
        name:'getOpenid',
        success(res) {
         Taro.setStorage({
            key:'open_id',
            data:res.result.userInfo.openid
          })
        },
        fail(res){
          console.log("获取openid失败")
        }
      })
    }

  }

  componentDidShow () {

  }

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
