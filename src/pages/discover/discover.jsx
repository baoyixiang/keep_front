import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image, ScrollView} from '@tarojs/components'
import './discover.scss'
import React from "react";
import Loading from "../../common/loading/loading";
import {AtButton, AtSearchBar} from "taro-ui";
import {getRecommendCustomList, getRecommendUserList, JoinCustom} from "../../api/apis";
import NavBar from "../../common/navBar/navBar";
import {joinCustom} from "../../common/joinCustom/joinCustom";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";

export default class Discover extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: '',
      recommendUserList: [],
      recommendCustomList: [],
      title: "",
      logo: "",
      studyTag: "学习",
      sportTag: "运动",
      musicTag: "音乐",
      recommendStudyList: [],
      recommendSportList: [],
      recommendMusicList: [],
    }
  }

  state={
    isLoading:true,
  }

  componentWillMount () { }

  componentDidMount () {
    let {studyTag,sportTag,musicTag} = this.state;

    let userInfo = Taro.getStorageSync('userInfoModel');

    getRecommendUserList().then((result)=>{
      this.setState({
        recommendUserList: result.data
      })
    });

    getRecommendCustomList(userInfo.id,studyTag).then((result)=>{
      this.setState({
        recommendStudyList: result.data
      })
    });

    getRecommendCustomList(userInfo.id,sportTag).then((result)=>{
      this.setState({
        recommendSportList: result.data
      })
    });

    getRecommendCustomList(userInfo.id,musicTag).then((result)=>{
      this.setState({
        recommendMusicList: result.data
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
    let {recommendStudyList,recommendSportList,recommendMusicList} = this.state;
    return (
      <View className='discover-page'>
        <NavBar title="发现"/>
        <BarTakeUp/>
        {/*<View className='discover-divider-0'></View>*/}
        {this.renderSearch()}
        <View className='discover-divider-1'></View>
        {this.renderRecommend()}
        {this.renderRecommendStudy(recommendStudyList)}
        {this.renderRecommendSport(recommendSportList)}
        {this.renderRecommendMusic(recommendMusicList)}
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

  renderRecommendStudy() {
    let {studyTag} = this.state;
    return(
      <View className='discover-habit'>
        <View className='discover-habit-text at-row'>
          <View className='discover-habit-text-left'>
            <Text>{studyTag}</Text>
          </View>
          <View className='discover-habit-text-right' onClick={()=>Taro.navigateTo({
            url: `/pages/discover/recommendCustom/recommendCustom?tags=${studyTag}`,
          }).then()}>
            <Text>查看全部</Text>
          </View>
        </View>
        <View className='discover-habit-divider'></View>
        <View className='discover-habit-list at-row'>
          {this.renderStudy()}
        </View>
      </View>
    );
  }

  renderRecommendSport() {
    let {sportTag} = this.state;
    return(
      <View className='discover-habit'>
        <View className='discover-habit-text at-row'>
          <View className='discover-habit-text-left'>
            <Text>{sportTag}</Text>
          </View>
          <View className='discover-habit-text-right' onClick={()=>Taro.navigateTo({
            url: `/pages/discover/recommendCustom/recommendCustom?tags=${sportTag}`,
          }).then()}>
            <Text>查看全部</Text>
          </View>
        </View>
        <View className='discover-habit-divider'></View>
        <View className='discover-habit-list at-row'>
          {this.renderSport()}
        </View>
      </View>
    );
  }

  renderRecommendMusic() {
    let {musicTag} = this.state;
    return(
      <View className='discover-habit'>
        <View className='discover-habit-text at-row'>
          <View className='discover-habit-text-left'>
            <Text>{musicTag}</Text>
          </View>
          <View className='discover-habit-text-right' onClick={()=>Taro.navigateTo({
            url: `/pages/discover/recommendCustom/recommendCustom?tags=${musicTag}`,
          }).then()}>
            <Text>查看全部</Text>
          </View>
        </View>
        <View className='discover-habit-divider'></View>
        <View className='discover-habit-list at-row'>
          {this.renderMusic()}
        </View>
      </View>
    );
  }

  joinStudyCustomAndDelete(customList,customItem,customId) {
    joinCustom(customId);
    for (let i = 0; i < customList.length; i++) {
      if(customList[i] == customItem) {
        customList.splice(i,i+1);
      }
    }
    this.setState({
      recommendStudyList: customList,
    });
  }

  renderStudy() {
    let {recommendStudyList} = this.state;
    const customItem = recommendStudyList.length > 0 ?
      recommendStudyList.map((item,index)=> {
        while(index < 3) {
          return <View className='discover-habit-item at-row'>
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
                      <Text>已有{item.joinCount}位朋友在坚持</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <AtButton className='discover-habit-item-button' onClick={this.joinStudyCustomAndDelete.bind(this,recommendStudyList,item,item.id)}>加入</AtButton>
          </View>
        }
      }
    ) :
    <View className='discover-habit--no-item'>
      <Text>暂无推荐列表</Text>
    </View>
    return(
      <View className='discover-habit-list at-row'>
        {customItem}
      </View>
    );
  }

  joinSportCustomAndDelete(customList,customItem,customId) {
    joinCustom(customId);
    for (let i = 0; i < customList.length; i++) {
      if(customList[i] == customItem) {
        customList.splice(i,i+1);
      }
    }
    this.setState({
      recommendSportList: customList,
    });
  }

  renderSport() {
    let {recommendSportList} = this.state;
    const customItem = recommendSportList.length > 0 ?
      recommendSportList.map((item,index)=> {
        if(index < 3) {
          return <View className='discover-habit-item at-row'>
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
                      <Text>已有{item.joinCount}位朋友在坚持</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <AtButton className='discover-habit-item-button' onClick={this.joinSportCustomAndDelete.bind(this,recommendSportList,item,item.id)}>加入</AtButton>
          </View>
        }
      }
      ) :
      <View className='discover-habit--no-item'>
        <Text>暂无推荐列表</Text>
      </View>
    return(
      <View className='discover-habit-list at-row'>
        {customItem}
      </View>
    );
  }

  joinMusicCustomAndDelete(customList,customItem,customId) {
    joinCustom(customId);
    for (let i = 0; i < customList.length; i++) {
      if(customList[i] == customItem) {
        customList.splice(i,i+1);
      }
    }
    this.setState({
      recommendMusicList: customList,
    });
  }

  renderMusic() {
    let {recommendMusicList} = this.state;
    const customItem = recommendMusicList.length > 0 ?
      recommendMusicList.map((item,index)=> {
        return <View className='discover-habit-item at-row'>
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
                    <Text>已有{item.joinCount}位朋友在坚持</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <AtButton className='discover-habit-item-button' onClick={this.joinMusicCustomAndDelete.bind(this,recommendMusicList,item,item.id)}>加入</AtButton>
        </View>
      }
      ) :
      <View className='discover-habit--no-item'>
        <Text>暂无推荐列表</Text>
      </View>
    return(
      <View className='discover-habit-list at-row'>
        {customItem}
      </View>
    );
  }
}
