import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image, ScrollView} from '@tarojs/components'
import './discover.scss'
import React from "react";
import Loading from "../../common/loading/loading";
import {AtButton, AtSearchBar} from "taro-ui";

export default class Discover extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }
  state={
    isLoading:true,
  }


  componentWillMount () { }

  componentDidMount () {
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
        <View className='discover-divider-0'></View>
        {this.renderSearch()}
        <View className='discover-divider-1'></View>
        {this.renderRecommend()}
        {this.renderHabit()}
        {this.renderHabit()}
        {this.renderHabit()}
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
    let recommendList = [
      "http://file01.16sucai.com/d/file/2013-11-11/13841505716891.jpg",
      "http://file01.16sucai.com/d/file/2013-11-11/13841505716891.jpg",
      "http://file01.16sucai.com/d/file/2013-11-11/13841505716891.jpg",
      "http://file01.16sucai.com/d/file/2013-11-11/13841505716891.jpg",
      "http://file01.16sucai.com/d/file/2013-11-11/13841505716891.jpg",
      "http://file01.16sucai.com/d/file/2013-11-11/13841505716891.jpg",
      "http://file01.16sucai.com/d/file/2013-11-11/13841505716891.jpg",
      "http://file01.16sucai.com/d/file/2013-11-11/13841505716891.jpg",
    ];
    const recommendItem = (recommendList.length || 0) === 0 ?
      <View className='discover-no-recommend'>暂无推荐用户</View> :
      recommendList.map((item,index)=>
        <View className='discover-recommend-item'>
          <Image className='discover-recommend-item-image' src={item} onClick={()=>{}} mode={"aspectFill"}/>
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

  renderHabit() {
    let habitList = [
      ["http://file01.16sucai.com/d/file/2013-11-11/13841505716891.jpg","考研","已有233位朋友在坚持"],
      ["http://file01.16sucai.com/d/file/2013-11-11/13841505716891.jpg","考研","已有233位朋友在坚持"],
      ["http://file01.16sucai.com/d/file/2013-11-11/13841505716891.jpg","考研","已有233位朋友在坚持"],
    ];
    const habitItem = habitList.map((item)=>
      <View className='discover-habit-item at-row'>
        <View>
          <View className='at-row'>
            <Image className='discover-habit-item-image' src={"http://file01.16sucai.com/d/file/2013-11-11/13841505716891.jpg"} />
            <View className='discover-habit-item-divider'></View>
            <View>
              <View className='discover-habit-item-text at-row'>
                <View className='discover-habit-item-text-top'>
                  <Text>考研</Text>
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
      <View className='discover-habit'>
        <View className='discover-habit-text at-row'>
          <View className='discover-habit-text-left'>
            <Text>热门习惯</Text>
          </View>
          <View className='discover-habit-text-right'>
            <Text>查看更多</Text>
          </View>
        </View>
        <View className='discover-habit-list at-row'>
          {habitItem}
        </View>
      </View>
    );
  }
}
