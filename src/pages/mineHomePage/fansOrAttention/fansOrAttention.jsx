import Taro,{Component} from '@tarojs/taro';
import React from "react";
import NavBar from "../../../common/navBar/navBar";
import BarTakeUp from "../../../common/barTakeUp/barTakeUp";
import {Button, Image, Text, View} from "@tarojs/components";
import './fansOrAttention.scss'
import Bottom from "../../../common/bottom/Bottom";
import {cancelFollowPeople, followedMe, myFollowing} from "../../../api/apis";
// import '~taro-ui/dist/style/components/flex.scss';

export default class FansOrAttention extends Component{
  constructor(props){
    super(props);
    this.state={
      title:"",
      userId: 0,
      type:0,
      persons:[],
      isMyself: false,
    }
  }

  componentWillMount() {
    console.log("hhh",this.$router.params);
    if( this.$router.params.title === "粉丝"){
      followedMe({
        userId: this.$router.params.id,
      }).then( res => {
        this.setState({
          userId: this.$router.params.id,
          persons: res.data,
        });
        console.log('persons',this.state.persons);
      })
    }else if( this.$router.params.title === "关注"){
      myFollowing({
        userId: this.$router.params.id,
      }).then( res => {
        this.setState({
          userId: this.$router.params.id,
          persons: res.data,
        });
      })
    }
  }

  componentDidMount() {
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    let type;
    if(this.$router.params.title.indexOf("关注")!==-1){
      type=1
    }else{
      type=0;
    }
    this.setState({
      title:this.$router.params.title,
      type
    });
    if( this.$router.params.id == userInfoModel.id){
      this.setState({
        isMyself: true
      })
    }
  }

  redirectToPerson = (id, avatar, name) => {
    console.log('id:',id);
    Taro.navigateTo({
      url:`../mineHomePage?id=${id}&avatar=${avatar}&name=${name}`
    })
  };

  followPeople = (id) => {
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const params = {
      followedUserId: id,
      userId: userInfoModel.id,
    };
    cancelFollowPeople(params).then( res => {
      if(res.statusCode === 200){
        Taro.showToast({
          title: "已取消关注",
          icon: "success",
          duration: 1000,
        }).then(
          myFollowing({
            userId: this.$router.params.id,
          }).then( res => {
            this.setState({
              userId: this.$router.params.id,
              persons: res.data,
            });
          })
        );
      }
    })
  };

  render() {
    const { persons, type, isMyself}=this.state;
    return <View>
      <NavBar title={this.state.title} back={true}/>
      <BarTakeUp height={45}/>
      <View>
        {
          persons.map(item=>{
            return <View className='list'>
              <View onClick={ () => {this.redirectToPerson(item.id, item.avatar, item.name)} } >
                <Image className='photo' src={item.avatar} alt={"头像"}/>
                <Text className='name'>{item.name}</Text>
              </View>
                { isMyself ? <View>
                  {type === 1 ? <View className='cancelAttention' onClick={()=>{this.followPeople(item.id)}}>
                    取消关注</View>:null}
                </View> : null
                }
            </View>
          })
        }
      </View>
      <Bottom text={"我是有底线的~"}/>
    </View>
  }
}
