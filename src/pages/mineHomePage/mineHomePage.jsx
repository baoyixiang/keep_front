import Taro,{Component} from "@tarojs/taro";
import React from 'react';
import {Image, ScrollView, Text, View} from "@tarojs/components";
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import './mineHomePage.scss'
import Record from "../../common/record/record";
export default class MineHomePage extends Component{
  constructor(props) {
    super(props);
    this.book=[];
    this.state = {
      habitsList: [],
      photo: "",
      nickName: '',
      fans: 0,
      follow: 0,
      habitNumber: 5,
      bigIndex: 0,
      recordList: [],
    }
  }

  componentDidMount() {
    let that=this;
    Taro.getStorage({
      key:"userInfo",
      success(res){
        console.log(res)
        const data=res.data;
        that.setState({
          photo:data.avatarUrl,
          nickName:data.nickName
        })
      }
    })
    const habitsList=[
      {cover:"",title:"考研",num:21},
      {cover:"",title:"自律~运动",num:12},
      {cover:"",title:"背单词",num:30},
      {cover:"",title:"考研",num:21},
      {cover:"",title:"自律~运动",num:12},
      {cover:"",title:"背单词",num:30},
    ];
    const recordList=[
      {id:1,avatar:"https://wx.qlogo.cn/mmopen/vi_32/bBia1LLVBHnd823ezdhCaS5HwJFJicWMwSUacGNRtZ6x0N2lic6zswyeyVOolgQnESERZXPkJwKJ7fIIAAxokbOGw/132",nickName:"carrier",title:"记录当天的小幸福",day:127,date:"01-19 16:43",img:"http://img0.imgtn.bdimg.com/it/u=2658774027,2205418363&fm=26&gp=0.jpg",content:"这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录这是一段记录",
        comments:[{from:"与我西南",to:"珊莎",content:"向你学习向你学习向你学习向你学习向你学习向你学习向你学习向你学习"},{from:"珊莎",to:"",content: "谢谢大家"}],
        sound:{url:"https://666f-forever-hope-bstqt-1300943694.tcb.qcloud.la/recordSound/1580207782000.m4a",time:"00:59"},
      },
      {id:2,avatar:"https://wx.qlogo.cn/mmopen/vi_32/bBia1LLVBHnd823ezdhCaS5HwJFJicWMwSUacGNRtZ6x0N2lic6zswyeyVOolgQnESERZXPkJwKJ7fIIAAxokbOGw/132",nickName:"carrier",title:"记录当天的小幸福",day:127,date:"01-19 16:43",img:"http://img0.imgtn.bdimg.com/it/u=2658774027,2205418363&fm=26&gp=0.jpg",content:"这是一段记录",
        comments:[{from:"与我西南",to:"珊莎",content:"向你学习"},{from:"珊莎",to:"",content: "谢谢大家"}],
        sound:{url:"https://666f-forever-hope-bstqt-1300943694.tcb.qcloud.la/recordSound/1580276079000.m4a",time:"00:13"},
      },
      {id:3,avatar:"https://wx.qlogo.cn/mmopen/vi_32/bBia1LLVBHnd823ezdhCaS5HwJFJicWMwSUacGNRtZ6x0N2lic6zswyeyVOolgQnESERZXPkJwKJ7fIIAAxokbOGw/132",nickName:"carrier",title:"记录当天的小幸福",day:127,date:"01-19 16:43",img:"http://img0.imgtn.bdimg.com/it/u=2658774027,2205418363&fm=26&gp=0.jpg",content:"这是一段记录",
        comments:[]
      },
    ]
    this.setState({
      habitsList,
      recordList
    })
  }

  selectBook(index){
    this.setState({
      bigIndex:index
    })
  }

  renderHabitBook(){
    const {bigIndex,habitsList}=this.state;
    return habitsList.map((item,index)=>{
      return <View onClick={this.selectBook.bind(this,index)} className={index!=bigIndex?"homePage_insist_content_item":"homePage_insist_content_item bigItem"}>
        <Image className="homePage_insist_content_item_cover" src={"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2557850634,2312125362&fm=11&gp=0.jpg"}/>
        <View className="homePage_insist_content_item_set"><Image className="homePage_insist_content_item_set_icon" src={require('../../assets/images/homePage/set.png')}/></View>
        <Text className="homePage_insist_content_item_title">{item.title}</Text>
        <Text className="homePage_insist_content_item_day">{item.num}天</Text>
      </View>
    })
  }

  sliceEnd() {
  }

  changeLikeStatus(id){
    console.log(id)
    let {recordList}=this.state;
    recordList.forEach(item=>{
      if(item.id===id){
        item.isLike=!item.isLike;
      }
    })
    this.setState({
      recordList
    })
  }
  render() {
    const {
      photo,
      nickName,
      fans,
      follow,
      habitNumber,
      recordList
    }=this.state;
    return(
      <View className="homePage">
        <NavBar back={true} title={"个人主页"}/>
        <BarTakeUp/>
        <View className="homePage_top">
          <Image className="homePage_top_photo" src={photo}/>
          <Text className="homePage_top_name">{nickName}</Text>
          <Text className="homePage_top_text">遇见更好的自己</Text>
        </View>
        <View className="homePage_relate">
          <View className="homePage_relate_fans">粉丝 {fans}</View>
          <View className="homePage_relate_follow">关注 {follow}</View>
        </View>
        <View className="homePage_insist">
          <Text className="homePage_insist_title">{habitNumber}个正在坚持的习惯</Text>
          <View onTouchEnd={this.sliceEnd.bind(this)} className="homePage_insist_content">
            {/*<View className="homePage_insist_content_itemLR" style={{transform:'translate('+transX+'px)'}}></View>*/}
            {this.renderHabitBook()}
            {/*<View className="homePage_insist_content_itemLR" style={{transform:'translate('+transX+'px)'}}></View>*/}
          </View>
        </View>
        <View className="homePage_record">
          <Text className="homePage_record_title">我的打卡记录</Text>
          <Record changeStatus={this.changeLikeStatus.bind(this)} data={recordList}/>
        </View>
      </View>
    )
  }
}
