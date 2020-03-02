import Taro,{Component} from '@tarojs/taro';
import React from "react";
import NavBar from "../../../common/navBar/navBar";
import BarTakeUp from "../../../common/barTakeUp/barTakeUp";
import {Image, Text, View} from "@tarojs/components";
import './fansOrAttention.scss'
import Bottom from "../../../common/bottom/Bottom";
import {followedMe, myFollowing} from "../../../api/apis";

export default class FansOrAttention extends Component{
  constructor(props){
    super(props);
    this.state={
      title:"",
      userId: 0,
      type:0,
      persons:[]
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
        console.log('persons',this.state.persons);
      })
    }
  }

  componentDidMount() {
    let type=0;
    if(this.$router.params.title.indexOf("关注")!==-1){
      type=1
    }else{
      type=0;
    }
    this.setState({
      title:this.$router.params.title,
      type
    })
  }

  redirectToPerson = (id, avatar, name) => {
    console.log('id:',id);
    Taro.navigateTo({
      url:`../mineHomePage?id=${id}&avatar=${avatar}&name=${name}`
    })
  };

  render() {
    const {persons,type}=this.state;
    return <View>
      <NavBar title={this.state.title} back={true}/>
      <BarTakeUp height={45}/>
      <View>
        {
          persons.map(item=>{
            return <View onClick={ () => {this.redirectToPerson(item.id, item.avatar, item.name)} } className='list'>
              <Image className='photo' src={item.avatar} alt={"头像"}/>
              <Text className='name'>{item.name}</Text>
              {type===1?<View className='cancelAttention'>取消关注</View>:null}
            </View>
          })
        }
      </View>
      <Bottom text={"我是有底线的~"}/>
    </View>
  }
}
