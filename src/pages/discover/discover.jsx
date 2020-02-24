import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image, ScrollView} from '@tarojs/components'
import './discover.scss'
import React from "react";
import Loading from "../../common/loading/loading";
import {AtButton, AtSearchBar} from "taro-ui";
import {getRecommendCustomList, getRecommendUserList} from "../../api/apis";
import NavBar from "../../common/navBar/navBar";

export default class Discover extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: '',
      recommendUserList: [],
      recommendCustomList: [],
      title: "",
      logo: "",
      tagsList: ["考研","运动","音乐"],
    }
  }

  state={
    isLoading:true,
  }

  componentWillMount () { }

  componentDidMount () {
    let {tagsList} = this.state;

    getRecommendUserList().then((result)=>{
      this.setState({
        recommendUserList: result.data
      })
    });

    getRecommendCustomList(1,tagsList).then((result)=>{
      this.setState({
        recommendCustomList: result.data
      })
    });

    setTimeout(()=>{
      this.setState({
        isLoading:false
      })
    },2000)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='discover-page'>
        <NavBar title="发现"/>
        <View className='discover-divider-0'></View>
        {this.renderSearch()}
        <View className='discover-divider-1'></View>
        {this.renderRecommend()}
        {this.renderRecommendHabit()}
        <Loading display={this.state.isLoading}/>
      </View>
    )
  }

  onChange(value) {
    this.setState({
      value: value
    })
  }

  renderSearch() {
    let {value} = this.state;
    return (
      <View className='discover-search'>
        <AtSearchBar
          value={value}
          onChange={this.onChange.bind(this)}
        />
      </View>
    );
  }

  //推荐用户
  renderRecommend() {
    let {recommendUserList} = this.state;
    const recommendItem = (recommendUserList.length || 0) === 0 ?
      <View className='discover-no-recommend'>暂无推荐用户</View> :
      recommendUserList.map((item)=>
        <View className='discover-recommend-item'>
          <Image className='discover-recommend-item-image' src={item.avatar} onClick={()=>{}} mode={"aspectFill"}/>
        </View>
      );
    return(
      <View className='discover-recommend'>
        <View className='discover-recommend-text'>
          <Text>推荐用户</Text>
          <ScrollView
            className='discover-recommend-swiper'
            scrollX={true}
          >
            <View className='discover-recommend-avatars at-row'>
              {recommendItem}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  renderRecommendHabit() {
    let {recommendCustomList} = this.state;
    const recommendCustomItem = recommendCustomList.length > 0 ?
      recommendCustomList.map((item)=>
      // <View>
      //   {this.renderHabit(item.customList,item.title)}
      // </View>
      <View className='discover-habit'>
        <View className='discover-habit-text at-row'>
          <View className='discover-habit-text-left'>
            <Text>{item.title}</Text>
          </View>
          <View className='discover-habit-text-right' onClick={()=>Taro.navigateTo({
            url: `/pages/discover/recommendCustom/recommendCustom?tags=${item.title}`,
          }).then()}>
            <Text>查看更多</Text>
          </View>
        </View>
        <View className='discover-habit-divider'></View>
        <View className='discover-habit-list at-row'>
          {this.renderHabit(item.customList)}
        </View>
      </View>
    ) :
      <View>
        <View>暂无推荐列表</View>
      </View>
    return(
      <View>
        {recommendCustomItem}
      </View>
    );
  }

  gotoRecommendCustom(tags) {
    Taro.navigateTo({
      url: `/pages/discover/recommendCustom/recommendCustom?tags=${tags}`,
    }).then()
  }

  renderHabit(customList) {
    const customItem = customList.map((item)=>
      <View className='discover-habit-item at-row'>
        <View>
          <View className='at-row'>
            <Image className='discover-habit-item-image' src={item.logo} />
            <View className='discover-habit-item-divider'></View>
            <View>
              <View className='discover-habit-item-text at-row'>
                <View className='discover-habit-item-text-top'>
                  <Text>{item.title || "暂无"}</Text>
                </View>
                <View className='discover-habit-item-text-bottom'>
                  <Text>已有233位朋友在坚持</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <AtButton className='discover-habit-item-button'>加入</AtButton>
      </View>
    )
    return(
      <View className='discover-habit-list at-row'>
        {customItem}
      </View>
    );
    // return(
    //   <View className='discover-habit'>
    //     <View className='discover-habit-text at-row'>
    //       <View className='discover-habit-text-left'>
    //         <Text>{title}</Text>
    //       </View>
    //       <View className='discover-habit-text-right' onClick={()=>Taro.navigateTo({
    //         url: `/pages/discover/recommendCustom/recommendCustom?tags=${title}`,
    //       }).then()}>
    //         <Text>查看更多</Text>
    //       </View>
    //     </View>
    //     <View className='discover-habit-divider'></View>
    //     <View className='discover-habit-list at-row'>
    //       {customItem}
    //     </View>
    //   </View>
    // );
  }
}
