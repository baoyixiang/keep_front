import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import './hopes.scss'
import React from "react";
import NavBar from "../../common/navBar/navBar";
import {AtButton, AtSwitch,AtIcon} from 'taro-ui'
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import {delMyHope, getAllHopes, getMyHope} from "../../api/apis";
import Loading from "../../common/loading/loading";
import Bottom from "../../common/bottom/Bottom";
export default class Hopes extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      loading:false,
      left:[],
      seeMe:false,
      right:{}
    }
  }
  componentWillMount () { }


  componentDidMount () {
    let that=this;
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    getAllHopes({
      pageNo:0,
      pageSize:100,
      myUserId:userInfoModel.id
    }).then(res=>{
      let left=[];
      let right=[];
      res.data.forEach((item,index)=>{
        if(index%2===0){
          left.push(item)
        }else{
          right.push(item)
        }
      })
      that.setState({
        left,right,
        loading:false,
      })
    })
  }

  componentWillUnmount () {

  }

  componentDidShow () {

    let that=this;
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    if(!this.state.seeMe){
      getAllHopes({
        pageNo:0,
        pageSize:100,
        myUserId:userInfoModel.id
      }).then(res=>{
        let left=[];
        let right=[];
        res.data.forEach((item,index)=>{
          if(index%2===0){
            left.push(item)
          }else{
            right.push(item)
          }
        })
        that.setState({
          left,right,
          loading:false
        })
      })
    }else{
      getMyHope({
        pageNo:0,
        pageSize:100,
        userId:userInfoModel.id
      }).then(res=>{
        let left=[];
        let right=[];
        res.data.forEach((item,index)=>{
          if(index%2===0){
            left.push(item)
          }else{
            right.push(item)
          }
        })
        that.setState({
          left,right,
        })
      })
    }


  }

  componentDidHide () { }

  redirectToHopeDetail(id,avatar,name,canSee){
    if(canSee){
      avatar='';
    }
    Taro.navigateTo({
      url:`./hopes_detail/hopesDetail?id=${id}&avatar=${avatar}&name=${name}`
    })
  }

  redirectToCreateHope(){
    Taro.navigateTo({
      url:'./createHope/createHope'
    })
  }

  renderLeft(list){
    return <View className='left'>
      {
        list.map(i=>{
          return <View className='list_item'>
            <View className='list_item_top'>
              {i.isAnonymous? <Image className='list_item_photo' src={require('../../assets/images/user.png')}/>:<Image onClick={this.viewOtherIndex.bind(this,i.createUserId,i.avatar,i.name)} className='list_item_photo' src={i.avatar} mode='aspectFill'/>}
              <Text  onClick={this.redirectToHopeDetail.bind(this, i.id, i.avatar,i.name,i.isAnonymous)} className='list_item_text'>{i.isAnonymous?"匿名用户":i.name}</Text>
            </View>
            <Image  onClick={this.redirectToHopeDetail.bind(this, i.id, i.avatar,i.name,i.isAnonymous)} mode='aspectFill' className='list_item_img' src={i.images[0]||""}/>
            <Text  onClick={this.redirectToHopeDetail.bind(this, i.id, i.avatar,i.name,i.isAnonymous)} className='list_item_content'>{i.wordContent}</Text>
            {this.state.seeMe?<View onClick={this.delMyHope.bind(this,i.id)} className='list_item_close'><AtIcon value='close' size='13' color='#25A2F9'></AtIcon></View>:null}
          </View>})
      }
    </View>
  }

  delMyHope(id){
    let that=this;
    Taro.showModal({
      title:"提示",
      content:"是否确认删除？",
      confirmText:"确认删除",
      confirmColor:"#DD2C4B",
      cancelText:"关闭",
      success(e){

        if(e.confirm){
          that.setState({
            loading:true,
          })
          let userInfoModel = Taro.getStorageSync('userInfoModel');
          const params={
            hopeId:id,
            userId:userInfoModel.id
          }
          delMyHope(params).then(res=>{
            getMyHope({
              pageNo:0,
              pageSize:100,
              userId:userInfoModel.id
            }).then(res=>{
              let left=[];
              let right=[];
              res.data.forEach((item,index)=>{
                if(index%2===0){
                  left.push(item)
                }else{
                  right.push(item)
                }
              })
              that.setState({
                left,right,
                loading:false
              })
            })
          })
        }else{
        }
      }
    })
  }

  renderRight(list){
    return <View className='right'>
      {
        list.map(i=>{
          return <View className='list_item'>
            <View className='list_item_top'>
              {i.isAnonymous? <Image className='list_item_photo' src={require('../../assets/images/user.png')}/>:<Image onClick={this.viewOtherIndex.bind(this,i.createUserId,i.avatar,i.name)} className='list_item_photo' src={i.avatar} mode='aspectFill'/>}
              <Text  onClick={this.redirectToHopeDetail.bind(this, i.id, i.avatar,i.name,i.isAnonymous)} className='list_item_text'>{i.isAnonymous?"匿名用户":i.name}</Text>
            </View>
            <Image  onClick={this.redirectToHopeDetail.bind(this, i.id, i.avatar,i.name,i.isAnonymous)} mode='aspectFill' className='list_item_img' src={i.images[0]||""}/>
            <Text  onClick={this.redirectToHopeDetail.bind(this, i.id, i.avatar,i.name,i.isAnonymous)} className='list_item_content'>{i.wordContent}</Text>
            {this.state.seeMe?<View onClick={this.delMyHope.bind(this,i.id)} className='list_item_close'><AtIcon value='close' size='13' color='#25A2F9'></AtIcon></View>:null}
          </View>})
      }
    </View>;
  }

  viewOtherIndex(userId,photo,nickName){
    Taro.navigateTo({
      url:`../mineHomePage/mineHomePage?id=${userId}&avatar=${photo}&name=${nickName}`
    });
  }
  render () {
    const {left,right}=this.state;
    return (
      <View className='hopes'>
        <NavBar title="心愿"/>
        <BarTakeUp/>
        <Loading display={this.state.loading}/>
        <View className='all'>
          {this.renderLeft(left)}
          {this.renderRight(right)}
        </View>
        <Bottom/>
        <AtSwitch  className="btn1" title='只看自己' onChange={this.onlySeeMe.bind(this)} checked={this.state.seeMe} />
        <AtButton className="btn" onClick={this.redirectToCreateHope.bind(this)}>创建心愿</AtButton>
      </View>
    )
  }
  onlySeeMe(){
    this.setState({
      seeMe:!this.state.seeMe
    })
    let that=this;
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    if(this.state.seeMe){
      getAllHopes({
        pageNo:0,
        pageSize:100,
        myUserId:userInfoModel.id
      }).then(res=>{
        let left=[];
        let right=[];
        res.data.forEach((item,index)=>{
          if(index%2===0){
            left.push(item)
          }else{
            right.push(item)
          }
        })
        that.setState({
          left,right,
          loading:false
        })
      })
    }else{
      getMyHope({
        pageNo:0,
        pageSize:100,
        userId:userInfoModel.id
      }).then(res=>{
        let left=[];
        let right=[];
        res.data.forEach((item,index)=>{
          if(index%2===0){
            left.push(item)
          }else{
            right.push(item)
          }
        })
        that.setState({
          left,right,
        })
      })
    }


  }
}
