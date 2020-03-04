import Taro,{Component} from "@tarojs/taro";
import React from 'react';
import {Image, ScrollView, Text, View} from "@tarojs/components";
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import './mineHomePage.scss'
import Record from "../../common/record/record";
import {getUserCustomList, myFollowing, followedMe, followPeople, likeRecord, getCustomRecord} from "../../api/apis";

export default class MineHomePage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      habitsList: [],
      photo: "",
      nickName: '',
      fans: 0,
      follow: 0,
      isFollowing: false,
      followList: [],
      habitNumber: 0,
      bigIndex: 0,
      recordList: [],
      displayRecords: [],
      isOpen:false,
      customId:undefined
    }
  }

  componentDidShow() {
    let that = this;
    // let userInfoModel = Taro.getStorageSync('userInfoModel');
    that.setState({
      photo :this.$router.params.avatar,
      nickName: this.$router.params.name,
      userId: this.$router.params.id,
    });
    const params= {
      pageNo: 0,
      pageSize: 100,
      userId: this.$router.params.id
    };
    getUserCustomList(params).then( res => {
      that.setState({
        habitsList: res.data.list,
        habitNumber: res.data.total,
      });
    });
  }

  componentDidMount() {
    let that = this;
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const myId = userInfoModel.id;
    myFollowing({
      userId: this.state.userId,
    }).then( res => {
      that.setState({
        followList: res.data,
        follow: res.data.length,
      });
    });
    if( myId == this.$router.params.id){//使用===会出问题
      that.setState({
        isFollowing: true,
      });
      const param={
        pageNo: 0,
        pageSize: 100,
        myUserId: myId,
        userId: myId,
      };
      getCustomRecord(param).then(res=>{
        this.setState({
          displayRecords:res.data.items,
        })
      })
    }else{
      myFollowing({
        userId: myId,
      }).then( res => {
        res.data.map( (item) => {
          if( item.id == this.state.userId){
            that.setState({
              isFollowing: true
            });
          }
        });
      });
    }
    followedMe({
      userId: this.state.userId,
    }).then( res => {
      that.setState({
        fans: res.data.length,
      });
    });
    const param={
      pageNo: 0,
      pageSize: 100,
      myUserId: myId,
      userId: this.state.userId,
    };
    getCustomRecord(param).then(res=>{
      this.setState({
        displayRecords:res.data.items,
      })
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
      return <View onClick={this.selectBook.bind(this,index)} className={index!==bigIndex?"homePage_insist_content_item":"homePage_insist_content_item bigItem"}>
        <Image className="homePage_insist_content_item_cover" src={item.custom.logo}/>
        <Text className="homePage_insist_content_item_title">{item.custom.title}</Text>
        <Text className="homePage_insist_content_item_day">已坚持{item.joinCustom.checkDaysCount}天</Text>
      </View>
    })
  }

  redirectToPerson(title){
    Taro.navigateTo({
      url:"./fansOrAttention/fansOrAttention?id="+this.state.userId+"&title="+title,
    })
  }

  changeLikeStatus(id){
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const params={
      checkInId:id,
      userId:userInfoModel.id
    };
    likeRecord(params).then(res=>{
      this.refreshRecordList()
    });

    let {displayRecords}=this.state;
    displayRecords.forEach(item=>{
      if(item.checkIn.id===id){
        item.isSelfLike=!item.isSelfLike;
      }
    });
    this.setState({
      displayRecords
    })
  }

  refreshRecordList () {
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const myId = userInfoModel.id;
    if( myId == this.$router.params.id){
      const param={
        pageNo: 0,
        pageSize: 100,
        myUserId:userInfoModel.id,
        userId: myId,
      };
      getCustomRecord(param).then(res=>{
        this.setState({
          displayRecords:res.data.items,
        })
      })
    }else {
      const param={
        pageNo: 0,
        pageSize: 100,
        myUserId: myId,
        userId: this.state.userId,
      };
      getCustomRecord(param).then(res=>{
        this.setState({
          displayRecords:res.data.items,
        })
      })
    }
  }

  followPeople = () => {
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const params = {
      followedUserId: this.state.userId,
      userId: userInfoModel.id,
    };
    followPeople(params).then( res => {
      if(res.statusCode === 200){
        Taro.showToast({
          title: "已关注",
          icon: "success",
          duration: 1000,
        }).then(
          myFollowing({
            userId: this.state.userId,
          }).then( res => {
            this.setState({
              persons: res.data,
            });
          })
        );
      }
    })
  };

  render() {
    const {
      photo,
      nickName,
      fans,
      follow,
      habitNumber,
      displayRecords
    } = this.state;
    return(
      <View className="homePage">
        <NavBar back={true} title={"个人主页"}/>
        <BarTakeUp/>
        <View className="homePage_top">
          <Image className="homePage_top_photo" src={photo}/>
          <Text className="homePage_top_name">{nickName}</Text>
          <Text className="homePage_top_text">遇见更好的自己</Text>
        </View>
        <View className={this.state.isFollowing ? "homePage_relate_follow" : "homePage_relate_unFollow"}>
          <View className="homePage_relate_fans" onClick={this.redirectToPerson.bind(this,"粉丝")}>粉丝 {fans}</View>
          <View className="homePage_relate_follow" onClick={this.redirectToPerson.bind(this,"关注")}>关注 {follow}</View>
          {this.state.isFollowing ? null :
            <View className="homePage_relate_attention" onClick={()=>{this.followPeople()}}>
            关注TA
            </View>}
        </View>
        <View className="homePage_insist">
          {habitNumber === 0 ? <Text className="homePage_no_habit">快去加入习惯吧!</Text> :
            <View>
              <Text className="homePage_insist_title">{habitNumber}个正在坚持的习惯</Text>
              <View className="homePage_insist_content">
                {this.renderHabitBook()}
              </View>
            </View>}
        </View>
        <View className="homePage_record">
          <Text className="homePage_record_title">打卡记录</Text>
          <Record refresh={this.refreshRecordList.bind(this)}
                  changeStatus={this.changeLikeStatus.bind(this)} data={displayRecords}/>
        </View>
      </View>
    )
  }
}
