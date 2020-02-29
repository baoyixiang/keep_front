import Taro,{Component} from "@tarojs/taro";
import React from "react";
import './recordMood.scss'
import {Image, Text, View} from "@tarojs/components";
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import {AtTextarea, AtImagePicker, AtButton, AtIcon, AtProgress} from "taro-ui";
import Loading from "../../common/loading/loading";
let timer;
let recordManager;
let soundTime=0;
const soundPercentWidth=0.5;
let ica=null;
let tryTimer=null;
let total=0;
export default class RecordMood extends Component{
  constructor(props){
    super(props);
    this.state={
      screenWidth:0,
      moodText:"",
      files:[],
      isSound:false,
      isPause:false,
      soundTime:0,
      sound:null,
      isFinished:false,
      percentage:0,
      trySoundTime:0,
      totalTime:0,
      isListen:false,
      loading:false,
    }
  }
  componentDidMount() {
    let that=this;
    recordManager=Taro.getRecorderManager();
    recordManager.onStop((res)=>{
      ica.src=res.tempFilePath;
      that.setState({
        sound:res.tempFilePath,
      })
    })
    recordManager.onError((res)=>{
      console.log(res)
    })
    Taro.getSystemInfo().then(res=>{
      this.setState({
        screenWidth:res.screenWidth,
      })
    })
    ica=Taro.createInnerAudioContext();
    ica.onStop(()=>{
      clearInterval(tryTimer);
      tryTimer=null;
      this.setState({
        isListen:false,
        percentage:1,
      })
    })
  }

  componentWillUnmount() {
    recordManager.stop();
    ica.stop();
    clearInterval(tryTimer);
  }

  onChange (files) {
    this.setState({
      files
    })
  }

  onFail (mes) {
    console.log(mes)
  }

  changeMoodText(e){
    this.setState({
      moodText:e.target.value,
    })
  }

  uploadFiles(){
    let that=this;
    const filePath=that.state.files[0].url;
    let pos=filePath.lastIndexOf('.');
    let ext=filePath.substr(pos,filePath.length)
    Taro.cloud.uploadFile({
      cloudPath:'recordMood/'+Date.parse(new Date())+ext,
      filePath:that.state.files[0].url,
      success:res=>{
        const data=res.fileID;
        that.uploadSound(data);
      },
      fail: res=>{

      }
    })

  }

  submit(){

    if(this.state.moodText==""){
      Taro.showModal({
        title:"提示",
        content:"请输入文字",
        showCancel:false
      })
      return;
    }

    this.uploadFiles()
  }

  uploadSound(picUrl){
    let sound=this.state.sound;
    if(sound){
      let pos=sound.lastIndexOf('.');
      let ext=sound.substr(pos,sound.length)
      Taro.cloud.uploadFile({
        cloudPath:'recordSound/'+Date.parse(new Date())+ext,
        filePath:sound,
        success:res=>{
          console.log(res.fileID)
        },
        fail: res=>{

        }
      })
    }else{
      // {
      //   "checkInId": 0,
      //   "images": [
      //   "string"
      // ],
      //   "voice": "string",
      //   "wordContent": "string"
      // }
      recordMineMood(params)
    }
  }

  startSay(){
    timer=setInterval(()=>{
      total=this.state.totalTime+1
      this.setState({
        soundTime:this.state.soundTime+1,
        totalTime:this.state.totalTime+1,
      })
    },1000)
    this.setState({
      isSound:!this.state.isSound,
    })
    recordManager.start();
  }

  changeSoundStatus(){
    if(this.state.isPause){
      recordManager.resume();
      timer=setInterval(()=>{
        this.setState({
          soundTime:this.state.soundTime+1
        })
      },1000)
    }else{
      recordManager.pause();
      clearInterval(timer)
    }
    this.setState({
      isPause:!this.state.isPause
    })
  }

  finishSound(){
    this.setState({
      isFinished:true,
      isSound:!this.state.isSound,
      isPause:false,
      soundTime:0,
    })
    clearInterval(timer);
    recordManager.stop();
  }

  cancelSound(){
    this.setState({
      isSound:!this.state.isSound,
      soundTime:0,
      isPause:false,
    })
    recordManager.stop();
    clearInterval(timer);
  }

  moveFinger(e){
    const {screenWidth}=this.state;
    let pageX=e.touches[0].pageX-4;
    let left=screenWidth*0.25;
    let right=screenWidth*0.75;
    let percent=(pageX-left)/(screenWidth*soundPercentWidth)
    if(pageX>=left&&pageX<=right){
      ica.seek(percent*this.state.totalTime)
      this.setState({
        percentage:percent,
      })
    }
  }

  tryListen(){
    console.log(ica.src)
    let that=this;
    if(this.state.isListen){
      ica.pause();
    }else{
      ica.play();
      this.setState({
        trySoundTime:ica.currentTime,
        percentage:0
      })
      clearInterval(tryTimer);
      tryTimer=null;
      tryTimer=setInterval(()=>{
        that.setState({
          percentage:ica.currentTime/that.state.totalTime>1?1:ica.currentTime/that.state.totalTime,
          trySoundTime:Math.floor(ica.currentTime),
        })
      },33)
    }
    this.setState({
      isListen:!this.state.isListen
    })
  }

  touchStart(){
    clearInterval(tryTimer);
    tryTimer=null;
    ica.pause();
  }

  touchEnd(){
    this.setState({
      trySoundTime:Math.floor(this.state.percentage*this.state.totalTime),
    })
    ica.seek(this.state.percentage*this.state.totalTime);
    console.log(ica.currentTime);
    tryTimer=setInterval(()=>{
      this.setState({
        percentage:ica.currentTime/this.state.totalTime>1?1:ica.currentTime/this.state.totalTime,
        trySoundTime:Math.floor(ica.currentTime)
      })
    },30);
    ica.play();
  }

  reRecord(){
    this.setState({
      isSound:false,
      totalTime:0,
      isFinished:false,
      isPause:false,
      isListen:false
    })
    ica.stop();
  }

  render() {
    const {screenWidth,percentage}=this.state;
    return(
      <View className="recordMood">
        <NavBar back={true} title={"记录心情"}/>
        <BarTakeUp/>
        <Loading display={this.state.loading}/>
        <AtTextarea customStyle={{width:"95%",margin:"20px auto"}} placeholder="写下今天做了什么和收获吧~" value={this.state.moodText} onChange={this.changeMoodText.bind(this)}/>
        {
          this.state.files.length===1?<AtImagePicker
            length={3}
            files={this.state.files}
            onChange={this.onChange.bind(this)}
            // onImageClick={this.onImageClick.bind(this)}
            showAddBtn={false}
          />:<AtImagePicker
            length={3}
            files={this.state.files}
            onChange={this.onChange.bind(this)}
          />
        }
        {
          this.state.isFinished?<View className="recordMood_finished" style={{position:"relative"}} >
            <View className="recordMood_finished_percentView">
              <Text className="recordMood_finished_percentView_start" onClick={this.tryListen.bind(this)}>{this.state.isListen?"暂停":"开始"}</Text>
              <Text className="recordMood_finished_percentView_current">0{Math.floor(this.state.trySoundTime/60)}:{this.state.trySoundTime%60<10?"0"+this.state.trySoundTime%60:this.state.trySoundTime%60}</Text>
              <View style={{borderRadius:5+'px',height:3+"px",width:screenWidth*soundPercentWidth+"px",position:"absolute",left:0.25*screenWidth+"px",top:20+'px',backgroundColor:"#DEDEDE"}} className="recordMood_finished_percent">
                <View style={{height:3+"px",width:percentage*100+"%",backgroundColor:"#1ECC94",borderRadius:5+'px'}}/>
                <View onTouchMove={this.moveFinger.bind(this)} onTouchStart={this.touchStart.bind(this)} onTouchEnd={this.touchEnd.bind(this)} style={{position:"absolute",width:8+'px',height:8+'px',backgroundColor:"#1ECC94",borderRadius:"50%",left:percentage*soundPercentWidth*screenWidth-4+"px",top:-2+'px'}}/>
              </View>
              <AtIcon onClick={this.reRecord.bind(this)} customStyle={{position:"absolute",top:"2px",right:"2px"}} className="recordMood_finished_cancel" value={"close-circle"} size={'18'} color='#8C8C8C'/>
              <Text className="recordMood_finished_percentView_total">0{Math.floor(this.state.totalTime/60)}:{this.state.totalTime%60<10?"0"+Math.floor(this.state.totalTime%60):Math.floor(this.state.totalTime%60)}</Text>
            </View>

          </View>: <View>{!this.state.isSound?<Image onClick={this.startSay.bind(this)} className="recordMood_song" src={require('../../assets/images/habitSign/song.png')}/>:
            <View className="recordMood_isSound">
            <AtIcon onClick={this.cancelSound.bind(this)} value='close-circle' className="recordMood_isSound_icon" size='22' color='#8C8C8C'/>
            <Text className="recordMood_isSound_time">0{Math.floor(this.state.soundTime/60)}:{this.state.soundTime%60<10?"0"+this.state.soundTime%60:Math.floor(this.state.soundTime%60)}</Text>
            <Text className="recordMood_isSound_finish" onClick={this.finishSound.bind(this)}>完成</Text>
            <View onClick={this.changeSoundStatus.bind(this)} className="recordMood_isSound_manager">
            {
              this.state.isPause?<View className="recordMood_isSound_manager_notPause"/>:<View>
                <View className="recordMood_isSound_manager_paused1"/>
                <View className="recordMood_isSound_manager_paused2"/>
              </View>
            }
            </View>
            </View>
          }</View>
        }

        <AtButton onClick={this.submit.bind(this)} className="recordMood_submit">发 布</AtButton>
      </View>
    )
  }
}
