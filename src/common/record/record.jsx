import Taro,{Component} from "@tarojs/taro";
import React from "react";
import './record.scss';
import {Image, Input, Text, View} from "@tarojs/components";
import comment from '../../assets/images/record/comment.png';
import like from '../../assets/images/record/like.png';
import on_like from '../../assets/images/record/on_like.png'
import {AtInput} from "taro-ui";
import {recordComment} from "../../api/apis";
let iac;
let timer;
export default class Record extends Component{
  constructor(props){
    super(props);
    this.state={
      answering:-1,
      canBlur:false,
      placeHolder:"评论一下~",
      soundWidth:24,
      commentContent:"",
      replyId:undefined
    };
  }

  componentWillUnmount() {
    iac.stop();
  }

  componentDidMount() {
    iac=Taro.createInnerAudioContext();
  }

  viewOtherIndex(userId,photo,nickName){
    console.log(userId,photo,nickName)
    Taro.navigateTo({
      url:`../mineHomePage/mineHomePage?id=${userId}&avatar=${photo}&name=${nickName}`
    });
  }

  renderComments(item){
    const checkInComments=item.checkInComments;
    return checkInComments.map(i=>{
      return <View onClick={this.changeAnswering.bind(this,item.checkIn.id,i.userName,i.userId)} key={i.id} style={{overflow:"scroll"}}>
          {
            i.replyTo?<Text className="comments_content">
                <Text onClick={this.viewOtherIndex.bind(this,i.userId,i.userAvatar,i.userName)} className="comments_content_nickName">{i.userName}</Text><Text className="comments_content_text"> 回复 </Text><Text onClick={this.viewOtherIndex.bind(this,i.replyTo,i.replyToAvatar,i.replyToName)} className="comments_content_nickName">{i.replyToName} </Text><Text className="comments_content_text">:{i.commentContent}</Text>
            </Text>:
              <Text className="comments_content">
                <Text><Text className="comments_content_nickName" onClick={this.viewOtherIndex.bind(this,i.userId,i.userAvatar,i.userName)}>{i.userName}</Text><Text className="comments_content_text">: {i.commentContent}</Text></Text>
              </Text>
          }
        </View>
    })
  }

  handlePreview(url){
  }

  blurInput(){
    this.setState({
      answering:-1,
      placeHolder:"评论一下~",
      commentContent:'',
      replyId:undefined
    })
  }

  changeAnswering(id,pl,replyId){
    let placeHolder="评论一下~";
    if(pl){
      placeHolder="回复"+pl;
    }
    this.setState({
      answering:id,
      placeHolder,
      replyId,
    })
  }
  playSound(url){
    if(timer&&(iac.src===url)){
      clearInterval(timer);
      timer=null;
      iac.stop();
      this.setState({
        soundWidth:24,
      })
      return;
    }
    clearInterval(timer);
    timer=null;
    timer=setInterval(()=>{
      let width=this.state.soundWidth;
      if(width===6){
        width=13
      }else if(width===13){
        width=24
      }else{
        width=6;
      }
      this.setState({
        soundWidth:width
      })
    },500);
    iac.stop();
    iac=Taro.createInnerAudioContext();
    iac.src=url;
    iac.play();
    // Taro.playBackgroundAudio({
    //   dataUrl:url,
    //   title:"录音",
    //   coverImgUrl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1246423552,102603141&fm=26&gp=0.jpg"
    // })
    iac.onEnded(()=>{
      clearInterval(timer);
      timer=null;
      this.setState({
        soundWidth:24
      })
    })
  }

  replyToOthers(checkInId){
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    let params;
    if(!this.state.replyId){
      params={
        checkInId:checkInId,
        commentContent: this.state.commentContent,
        userId:userInfoModel.id
      }
    }else{
      params={
        checkInId:checkInId,
        commentContent: this.state.commentContent,
        userId:userInfoModel.id,
        replyTo:this.state.replyId
      }
    }
    recordComment(params).then(res=>{
      if(res.statusCode===200){
        this.props.refresh();
      }
    })
  }
  changeCommentContent(e){
    this.setState({
      commentContent:e.target.value,
    })
  }
  renderList(){
    let {data}=this.props;
    const {soundWidth}=this.state;
    if(!data){data=[]}
    const {answering,placeHolder}=this.state;
    return data.map((item,index)=>{
      return <View className="record_item">
        <View style={{position:"relative",width:"92%",margin:"0 auto"}}>
          <View className="top">
            <Image className="img"  onClick={this.viewOtherIndex.bind(this,item.user.id,item.user.avatar,item.user.name)} src={item.user.avatar}/>
            <Text className="nickName">{item.user.name}</Text>
            <View className="insist">坚持<Text className="insist_day">{item.customTitle}</Text></View>
            <Text className="date">{item.date}</Text>
            {/*<Text className="day">{item.day}</Text>*/}
          </View>
          {item.sound?<View onClick={this.playSound.bind(this,item.sound.url)} className="record_item_sound">
            <View style={{marginLeft:"10px",width:iac.src===item.sound.url?soundWidth+"%":"24%"}} className="record_item_sound_iconView">
              <Image className="record_item_sound_iconView_img" src={require('../../assets/images/record/sound.png')}/>
            </View>
            <View className="record_item_sound_time">{item.sound.time}</View>
          </View>:null}
          <Image mode={"widthFix"} onClick={this.handlePreview.bind(this,item.img)} src={item.checkIn.images[0]} className="content_img"/>
          <View className="content_text">
            <Text className="content_text_text">{item.checkIn.wordContent}</Text>
          </View>
          <View className="comments">
            {this.renderComments(item)}
          </View>
          {answering===item.checkIn.id? <View className="inpView"><Input onInput={this.changeCommentContent.bind(this)} onConfirm={this.replyToOthers.bind(this,item.checkIn.id)} autoFocus={true} onBlur={this.blurInput} placeholder={placeHolder} className="inpView_input"/></View>:null}
          <View className="comment">
            <View onClick={this.changeAnswering.bind(this,item.checkIn.id,"","")} className="text">
              <Image src={comment} className={"text_icon"}/>
              {/*<Text className="text_text">0</Text>*/}
            </View>
            {!item.isSelfLike?<View className="like">
              <Image onClick={this.props.changeStatus.bind(this,item.checkIn.id)} src={like} className="like_icon"/>
              <Text className="like_text">{item.likeUsers.length}</Text>
            </View>:<View className="like">
            <Image src={on_like} className="like_icon like_on"/>
            <Text className="like_text">{item.likeUsers.length}</Text>
          </View>}
          </View>
        </View>
      </View>
    })
  }

  render() {

    return(
      <View className="record" style={{overflow:"scroll"}}>
        {this.renderList()}
      </View>
    )
  }
}

