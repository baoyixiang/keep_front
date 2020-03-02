import Taro,{Component} from "@tarojs/taro";
import React from "react";
import './mineCommunity.scss';
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import {AtButton, AtTabs, AtTabsPane} from "taro-ui";
import Record from "../../common/record/record";
import Bottom from "../../common/bottom/Bottom";
import {getCustomRecord, getUserCustomList, likeRecord} from "../../api/apis";

export default class MineCommunity extends Component{
  constructor(props){
    super(props);
    this.state={
      tabList:[],
      displayRecords:[],
      statusBarHeight:0,
      displayTop:false,
      hiddenBack:"",
      customId:undefined
    }
  }
  onPageScroll(obj) {
    if(obj.scrollTop>=100&&!this.state.displayTop){
      this.setState({
        displayTop:true,
        hiddenBack:""
      })
    }else if (obj.scrollTop<100&&this.state.displayTop){
      this.setState({
        hiddenBack:"backToTop_hidden"
      })
      setTimeout(()=>{
        this.setState({
          displayTop:false,
        })
      },280)
    }
  }

  componentDidMount() {
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const params={
      pageNo:0,
      pageSize:10,
      userId:userInfoModel.id
    };
    getUserCustomList(params).then(res=>{
      let tabList=[];
      let customId=res.data.list[0].custom.id;
      res.data.list.forEach(item=>{
        tabList.push({title:item.custom.title,id:item.custom.id})
      })
      const param={
        customId:customId,
        pageNo: 0,
        pageSize: 100,
        myUserId:userInfoModel.id
      }
      getCustomRecord(param).then(res=>{
        console.log('a',res.data.items)
        this.setState({
          tabList:tabList,
          displayRecords:res.data.items,
          customId,
        })
      })

    })
    Taro.getSystemInfo({
    }).then(res => {
      this.setState({
        statusBarHeight:  res.statusBarHeight || 0,
      });})
  }

  handleClick (value) {
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    this.setState({
      displayRecords:[]
    })
    const param={
      customId:this.state.tabList[value].id,
      pageNo: 0,
      pageSize: 100,
      myUserId:userInfoModel.id
    }
    getCustomRecord(param).then(res=>{
      console.log('a',res.data.items)
      this.setState({
        displayRecords:res.data.items,
        current: value,
        customId:this.state.tabList[value].id
      })
    })
  }

  goTop (e) {  // 一键回到顶部
    if (Taro.pageScrollTo) {
      Taro.pageScrollTo({
        scrollTop: 0
      })
    } else {
      Taro.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  }
  changeLikeStatus(id){
    console.log(id)
    let userInfoModel = Taro.getStorageSync('userInfoModel');

    const params={
      checkInId:id,
      userId:userInfoModel.id
    }
    likeRecord(params).then(res=>{
      const param={
        customId:this.state.customId,
        pageNo: 0,
        pageSize: 100,
        myUserId:userInfoModel.id
      }
      getCustomRecord(param).then(res=>{
        console.log('a',res.data.items)
        this.setState({
          displayRecords:res.data.items,
        })
      })
    })

    let {displayRecords}=this.state;
    displayRecords.forEach(item=>{
      if(item.checkIn.id===id){
        item.isSelfLike=!item.isSelfLike;
      }
    })
    this.setState({
      displayRecords
    })
  }
  render() {
    const {tabList,displayRecords,displayTop}=this.state;
    return (
      <View>
        <NavBar title={"我的社区"} back={true}/>
        <BarTakeUp height={45}/>
        <AtTabs className="hopes_tabBar"
                current={this.state.current}
                scroll={true}
                tabList={tabList}
                onClick={this.handleClick.bind(this)}>
          {
            tabList.map((item,index)=>{
              return <AtTabsPane customStyle={{overflow:"scroll"}} current={this.state.current} index={index}>
                  <Record changeStatus={this.changeLikeStatus.bind(this)} data={displayRecords}/>
              </AtTabsPane>
            })
          }
        </AtTabs>
        {displayTop?<View onClick={this.goTop.bind(this)} className={["backToTop",this.state.hiddenBack]}>
       <Text>去顶部</Text>
        </View>:null}
        <Bottom/>
      </View>
    )
  }
}
