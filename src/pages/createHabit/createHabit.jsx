import Taro,{Component} from "@tarojs/taro";
import React from 'react';
import {View, Text, Image, Button} from '@tarojs/components'
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import {AtButton, AtModalAction, AtModalContent, AtModalHeader, AtSearchBar, AtModal, AtImagePicker} from "taro-ui";
import './createHabit.scss'
import {createCustom, getRecommendCustomList} from "../../api/apis";
import {joinCustom} from "../../common/joinCustom/joinCustom";
import Loading from "../../common/loading/loading";
let flag=0;
export default class CreateHabit extends Component{
  constructor(props){
    super(props);
    this.state={
      habitName:"",
      recommendList:[],
      tips:true,
      file:[],
      isOpen:false,
      loading:false,
    }
  }

  componentDidMount() {
    let userInfo = Taro.getStorageSync('userInfoModel');
    let recommendList = [];
    getRecommendCustomList(userInfo.id,"学习").then((result)=>{
      flag++;
      recommendList = recommendList.concat(result.data);
    });
    getRecommendCustomList(userInfo.id,"运动").then((result)=>{
      flag++;
      recommendList = recommendList.concat(result.data);
    });
    getRecommendCustomList(userInfo.id,"音乐").then((result)=>{
      flag++;
      recommendList = recommendList.concat(result.data);
      this.setState({
        recommendList: recommendList
      })
    });
  }
  createCustom(){
    this.setState({
      isOpen:true
    })
  }
  cancelCreate(){
    this.setState({
      isOpen:false,
      file:[]
    })
  }
  createCustomConfirm(){
    let that=this;
    if(this.state.habitName===''||this.state.file.length===0){
      Taro.showModal({
        title:'提示',
        content:'名称||图片不能为空',
        showCancel:false
      })
      return;
    }
    this.setState({
      loading:true,
      isOpen:false
    })
    Taro.getStorage({
      key:'userInfoModel',
      success(res){
        const filePath=that.state.file[0].url;
        let pos=filePath.lastIndexOf('.');
        let ext=filePath.substr(pos,filePath.length)
        Taro.cloud.uploadFile({
          cloudPath:'habitIcon/'+Date.parse(new Date())+ext,
          filePath:that.state.file[0].url,
          success:r=>{
            const params={
              logo:r.fileID,
              title:that.state.habitName,
              userId:res.data.id
            }
            createCustom(params).then(res=>{
              that.setState({
                loading:false
              })
              Taro.showToast({
                icon:"success",
                duration:2000,
              }).then(()=>{
                Taro.navigateBack()
              })
            })
          },
          fail: res=>{

          }
        })
      }
    })
    console.log(this.state)
  }
  onChange (file) {
    this.setState({
      file
    })
  }
  changeHabitName(e){
    this.setState({
      habitName:e,
    })
  }
  clearHabitName(){
    this.setState({
      tips:false,
      habitName:""
    })
  }

  joinCustomAndDelete(recommendList,recommendItem,customId) {
    joinCustom(customId);
    for (let i = 0; i < recommendList.length; i++) {
      if(recommendList[i] == recommendItem) {
        recommendList.splice(i,i+1);
      }
    }
    this.setState({
      recommendList: recommendList,
    });
  }

  renderRecommendList(){
    const {recommendList}=this.state;
    return recommendList.map(item=>{
      return (
        <View className="createHabit_recommend_content at-row">
          <Image src={item.logo} className="createHabit_recommend_content_img"/>
          <View>
            <View className="createHabit_recommend_content_text at-row">
              <Text className="createHabit_recommend_content_text_title">{item.title}</Text>
              <Text className="createHabit_recommend_content_text_num">已有2位萌友正在坚持</Text>
            </View>
          </View>
          <Button className="createHabit_recommend_content_btn" onClick={this.joinCustomAndDelete.bind(this,recommendList,item,item.id)}>加入</Button>
          <View style={{clear:"both"}}></View>
        </View>
      )
    })
  }

  render() {
    const {habitName, tips,isOpen}=this.state;
    return(
      <View className="createHabit">
        <Loading display={this.state.loading}/>
        <AtModal isOpened={isOpen}>
          <AtModalHeader>选择图标</AtModalHeader>
          <AtModalContent>
            {
              this.state.file.length===1?<AtImagePicker
                length={1}
                files={this.state.file}
                onChange={this.onChange.bind(this)}
                showAddBtn={false}
              />:<AtImagePicker
                length={1}
                files={this.state.file}
                onChange={this.onChange.bind(this)}
              />
            }
          </AtModalContent>
          <AtModalAction> <Button onClick={this.cancelCreate.bind(this)}>取消</Button> <Button onClick={this.createCustomConfirm.bind(this)}>确定</Button> </AtModalAction>
        </AtModal>
        <NavBar back={true} title={"创建个人习惯"}/>
        <BarTakeUp height={50}/>
          <AtSearchBar value={habitName} onClear={this.clearHabitName.bind(this)} onChange={this.changeHabitName.bind(this)} placeholder={"输入习惯名称"} actionName={tips?"添加":"创建"}/>
        {habitName!==""?<View className="createHabit_tips">
          {/*{tips?`习惯"${habitName}"已经存在，可以添加`:`习惯"${habitName}"尚未创建`}*/}
          {`是否创建习惯"${habitName}"?`}
          <Button onClick={this.createCustom.bind(this)} className="createHabit_tips_btn">{"创建"}</Button>
        </View>:null}
        <View className="createHabit_recommend">
          <Text className="createHabit_recommend_title">智能推荐</Text>
          <View className="createHabit_recommendContent">{this.renderRecommendList()}</View>
        </View>
      </View>
    )
  }

}
