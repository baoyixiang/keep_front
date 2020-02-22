import Taro,{Component} from "@tarojs/taro";
import React from "react";
import './mineCommunity.scss';
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import {Image, ScrollView, View} from "@tarojs/components";
import {AtButton, AtTabs, AtTabsPane} from "taro-ui";
import Record from "../../common/record/record";
import Bottom from "../../common/bottom/Bottom";

export default class MineCommunity extends Component{
  constructor(props){
    super(props);
    this.state={
      tabList:[],
      displayRecords:[],
      statusBarHeight:0,
      displayTop:false,
      hiddenBack:""
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
    const tabList=[
      { title: '热门' },
      { title: '关注' },
      { title: '最新' },
      { title: '背单词' },
      { title: '自律~活动' },
      { title: '2020读书' },
      { title: '老年人的胳膊之2020'}];
    const displayRecords=[
      {id:1,isLike:false,avatar:"https://wx.qlogo.cn/mmopen/vi_32/bBia1LLVBHnd823ezdhCaS5HwJFJicWMwSUacGNRtZ6x0N2lic6zswyeyVOolgQnESERZXPkJwKJ7fIIAAxokbOGw/132",nickName:"carrier",title:"记录当天的小幸福",day:127,date:"01-19 16:43",img:"http://img0.imgtn.bdimg.com/it/u=2658774027,2205418363&fm=26&gp=0.jpg",content:"这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录",
        comments:[{from:"与我西南",to:"珊莎",content:"向你学习向你学习向你学习向你学习向你学习向你学习向你学习向你学习"},{from:"珊莎",to:"",content: "谢谢大家"}]
      },
      {id:2,isLike:true,avatar:"https://wx.qlogo.cn/mmopen/vi_32/bBia1LLVBHnd823ezdhCaS5HwJFJicWMwSUacGNRtZ6x0N2lic6zswyeyVOolgQnESERZXPkJwKJ7fIIAAxokbOGw/132",nickName:"carrier",title:"记录当天的小幸福",day:127,date:"01-19 16:43",img:"http://img0.imgtn.bdimg.com/it/u=2658774027,2205418363&fm=26&gp=0.jpg",content:"这是一段记录",
        comments:[{from:"与我西南",to:"珊莎",content:"向你学习"},{from:"珊莎",to:"",content: "谢谢大家"}]
      },
      {id:3,isLike:true,avatar:"https://wx.qlogo.cn/mmopen/vi_32/bBia1LLVBHnd823ezdhCaS5HwJFJicWMwSUacGNRtZ6x0N2lic6zswyeyVOolgQnESERZXPkJwKJ7fIIAAxokbOGw/132",nickName:"marks sluaser",title:"heiheihei11123",day:127,date:"01-19 16:43",img:"http://img0.imgtn.bdimg.com/it/u=2658774027,2205418363&fm=26&gp=0.jpg",content:"这是一段记录",
        comments:[{from:"与我西南",to:"珊莎",content:"向你学习"},{from:"珊莎",to:"",content: "谢谢大家"},{from:'三胖123',to:'死兔子',content:'哈哈哈'}]
      },
    ]
    Taro.getSystemInfo({
    }).then(res => {
      this.setState({
        statusBarHeight:  res.statusBarHeight || 0,
      });})
    this.setState({
      tabList,
      displayRecords,
    })

  }

  handleClick (value) {
    this.setState({
      current: value,
      displayRecords:this.state.displayRecords.reverse()
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
    let {displayRecords}=this.state;
    displayRecords.forEach(item=>{
      if(item.id===id){
        item.isLike=!item.isLike;
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
          <Image src={require('../../assets/images/community/top.png')} className="backToTop_icon"/>
        </View>:null}
        <Bottom/>
      </View>
    )
  }
}
