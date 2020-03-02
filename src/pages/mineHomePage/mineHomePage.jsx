import Taro,{Component} from "@tarojs/taro";
import React from 'react';
import {Image, ScrollView, Text, View} from "@tarojs/components";
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import './mineHomePage.scss'
import Record from "../../common/record/record";
import { AtFloatLayout } from "taro-ui"
import { getUserCustomList, myFollowing, followedMe } from "../../api/apis";

export default class MineHomePage extends Component{
  constructor(props) {
    super(props);
    this.book=[];
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
      isOpen:false,
    }
  }

  componentDidShow() {
    let that = this;
    that.setState({
      photo :this.$router.params.avatar,
      nickName: this.$router.params.name,
      userId: this.$router.params.id,
    });
    const params= {
      pageNo: 0,
      pageSize: 10,
      userId: this.$router.params.id
    };
    getUserCustomList(params).then( res => {
      console.log('habitList',res);
      that.setState({
        habitsList: res.data.list,
        habitNumber: res.data.total,
      });
    });
    // myFollowing({
    //   userId: this.state.userId,
    // }).then( res => {
    //   that.setState({
    //     followList: res.data,
    //     follow: res.data.length,
    //   });
    //   res.data.map( (item) => {
    //     if( item.id === this.state.userId){
    //       that.setState({
    //         isFollowing: true
    //       });
    //     }
    //   });
    //   console.log('followList1',res.data);
    //   console.log('followList2',this.state.followList);
    // });
    // followedMe({
    //   userId: this.state.userId,
    // }).then( res => {
    //   that.setState({
    //     fans: res.data.length,
    //   });
    // });
    // console.log('isFollowing:',this.state.isFollowing)
  }

  componentDidMount() {
    let that = this;
    myFollowing({
      userId: this.state.userId,
    }).then( res => {
      that.setState({
        followList: res.data,
        follow: res.data.length,
      });
      console.log('followList1',res.data);
      console.log('followList2',this.state.followList);
    });
    followedMe({
      userId: this.state.userId,
    }).then( res => {
      that.setState({
        fans: res.data.length,
      });
      console.log('res',res);
    });
    this.state.followList.map( (item) => {
      if( item.id === this.state.userId){
        this.setState({
          isFollowing: true
        });
      }
    });
    console.log('isFollowing:',this.state.isFollowing)
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
        <View onClick={this.handleClose.bind(this,item.custom.id)}  className="homePage_insist_content_item_set">
          <Image className="homePage_insist_content_item_set_icon" src={require('../../assets/images/homePage/set.png')}/>
        </View>
        <Text className="homePage_insist_content_item_title">{item.custom.title}</Text>
        <Text className="homePage_insist_content_item_day">{item.joinCustom.checkDaysCount}天</Text>
      </View>
    })
  }

  redirectToPerson(title){
    Taro.navigateTo({
      url:"./fansOrAttention/fansOrAttention?id="+this.state.userId+"&title="+title,
    })
  }

  changeLikeStatus(id){
    console.log(id);
    let {recordList}=this.state;
    recordList.forEach(item=>{
      if(item.id===id){
        item.isLike=!item.isLike;
      }
    });
    this.setState({
      recordList
    })
  }

  handleClose(id){
    console.log(id);
    this.setState({
      isOpen:!this.state.isOpen
    })
  }

  handleHabit(flag){
    let info="";
    if(flag===0){
      info="删除"
    }else {
      info="归档"
    }
    let that=this;
    Taro.showModal({
      title:"提示",
      content:`是否确认${info}？`,
      confirmText:"确认",
      confirmColor:"#DD2C4B",
      cancelText:"关闭",
      success(e){
        if(e.confirm){
          that.handleClose();
        }else{
          that.handleClose()
        }
      }
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
    } = this.state;
    return(
      <View className="homePage">
        <NavBar back={true} title={"个人主页"}/>
        <BarTakeUp/>
        <AtFloatLayout isOpened={this.state.isOpen}  onClose={this.handleClose.bind(this,0)}>
          <View>
            <View className='floatLay' onClick={this.handleHabit.bind(this,0)}>删除习惯</View>
            <View className='floatLay' onClick={this.handleHabit.bind(this,1)}>归档习惯</View>
            <View className='floatLay' onClick={this.handleClose.bind(this)}>取消</View>
          </View>
        </AtFloatLayout>
        <View className="homePage_top">
          <Image className="homePage_top_photo" src={photo}/>
          <Text className="homePage_top_name">{nickName}</Text>
          <Text className="homePage_top_text">遇见更好的自己</Text>
        </View>
        <View className="homePage_relate">
          <View className="homePage_relate_fans" onClick={this.redirectToPerson.bind(this,"粉丝")}>粉丝 {fans}</View>
          <View className="homePage_relate_follow" onClick={this.redirectToPerson.bind(this,"关注")}>关注 {follow}</View>
          {/*<View className="homePage_relate_attention">关注TA</View>*/}
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
          <Text className="homePage_record_title">我的打卡记录</Text>
          <Record changeStatus={this.changeLikeStatus.bind(this)} data={recordList}/>
        </View>
      </View>
    )
  }
}
