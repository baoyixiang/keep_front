import Taro,{Component} from "@tarojs/taro";
import React from "react";
import './record.scss';
import {Image, Input, Text, View} from "@tarojs/components";
import comment from '../../assets/images/record/comment.png';
import like from '../../assets/images/record/like.png';
import on_like from '../../assets/images/record/on_like.png'
import {AtInput} from "taro-ui";
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
    };
  }

  componentWillUnmount() {
    iac.stop();
  }

  componentDidMount() {
    iac=Taro.createInnerAudioContext();
  }

  renderComments(item){
    return item.comments.map(i=>{
      return <View onClick={this.changeAnswering.bind(this,item.id,i.from)} key={i.id} style={{overflow:"scroll"}}>
          {
            i.to?<Text className="comments_content">
                <Text className="comments_content_nickName">{i.from}</Text><Text className="comments_content_text"> 回复 </Text><Text className="comments_content_nickName">{i.to} </Text><Text className="comments_content_text">:{item.content}</Text>
            </Text>:
              <Text className="comments_content">
                <Text><Text className="comments_content_nickName">{i.from}</Text><Text className="comments_content_text">: {i.content}</Text></Text>
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
      placeHolder:"评论一下~"
    })
  }

  changeAnswering(id,pl){
    let placeHolder="评论一下~";
    if(pl){
      placeHolder="回复"+pl;
    }
    this.setState({
      answering:id,
      placeHolder,
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
      console.log(234)
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
            <Image className="img" src={item.avatar}/>
            <Text className="nickName">{item.nickName}</Text>
            <View className="insist">坚持<Text className="insist_day">{item.title}</Text></View>
            <Text className="date">{item.date}</Text>
            <Text className="day">{item.day}</Text>
          </View>
          {item.sound?<View onClick={this.playSound.bind(this,item.sound.url)} className="record_item_sound">
            <View style={{marginLeft:"10px",width:iac.src===item.sound.url?soundWidth+"%":"24%"}} className="record_item_sound_iconView">
              <Image className="record_item_sound_iconView_img" src={require('../../assets/images/record/sound.png')}/>
            </View>
            <View className="record_item_sound_time">{item.sound.time}</View>
          </View>:null}
          <Image onClick={this.handlePreview.bind(this,item.img)} src={item.img} className="content_img"/>
          <View className="content_text">
            <Text className="content_text_text">{item.content}</Text>
          </View>
          <View className="comments">
            {this.renderComments(item)}
          </View>
          {answering===item.id? <View className="inpView"><Input autoFocus={true} onBlur={this.blurInput} placeholder={placeHolder} className="inpView_input"/></View>:null}
          <View className="comment">
            <View onClick={this.changeAnswering.bind(this,item.id,"")} className="text">
              <Image src={comment} className={"text_icon"}/>
              <Text className="text_text">0</Text>
            </View>
            {!item.isLike?<View className="like">
              <Image onClick={this.props.changeStatus.bind(this,item.id)} src={like} className="like_icon"/>
              <Text className="like_text">10</Text>
            </View>:<View className="like">
            <Image onClick={this.props.changeStatus.bind(this,item.id)} src={on_like} className="like_icon like_on"/>
            <Text className="like_text">10</Text>
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
