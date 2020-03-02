import Taro,{Component} from '@tarojs/taro';
import './hopesDetail.scss';
import React from "react";
import {Image, Text, View} from "@tarojs/components";
import NavBar from "../../../common/navBar/navBar";
import BarTakeUp from "../../../common/barTakeUp/barTakeUp";
import {getHopeDetail, likeHopes} from "../../../api/apis";
import comment from "../../../assets/images/record/comment.png";
import like from "../../../assets/images/record/like.png";
import on_like from "../../../assets/images/record/on_like.png";

export default class HopeDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      loading:false,
      detail:{head:'http://img4.imgtn.bdimg.com/it/u=1505732009,4176072429&fm=26&gp=0.jpg',
        time:'2019-05-12',
        content:'这是第一段文字，这是第一段文字，这是第一段文字,这是第一段文字，这是第一段文字，这是第一段文字\',这是第一段文字，这是第一段文字，这是第一段文字\'',
        pic:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073982641,3389786265&fm=26&gp=0.jpg",
        id:1,
      },
      isLike:false,
      userId:undefined,
      hopeId:undefined,

    }
  }
  componentDidMount() {
    let {id}=this.$router.params;
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    this.setState({
      loading:true,
    })
    console.log({userId:Number.parseInt(userInfoModel.id),hopeId:Number.parseInt(id)})
    getHopeDetail({userId:Number.parseInt(userInfoModel.id),hopeId:Number.parseInt(id)}).then(res=>{
      this.setState({
        loading:false,
        detail:res.data.hope,
        isLike:res.data.liked,
        userId:userInfoModel.id,
        hopeId:id
      })
      console.log(res.data)
    })
  }
  likeHope(){

    let {id}=this.$router.params;
    const params={
      hopeId:this.state.hopeId,
      likeState:Number(!this.state.isLike),
      userId:this.state.userId
    }
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    likeHopes(params).then(res=>{
      getHopeDetail({userId:Number.parseInt(userInfoModel.id),hopeId:Number.parseInt(id)}).then(res=>{
        this.setState({
          loading:false,
          detail:res.data.hope,
          isLike:res.data.liked,
          userId:userInfoModel.id,
          hopeId:id
        })
        console.log(res.data)
      })
    })
    this.setState({
      isLike:true
    })
  }
  render() {
    const {detail,isLike}=this.state;
    return (
      <View>
        <NavBar back={true} title="心愿详情"/>
        <BarTakeUp/>
        <View className='content'>
          <View className='content_top'>
            <Image className='head' src={detail.head}/>
            <Text className='time'>{detail.createTime.substring(0,10)}</Text>

          </View>
          <Text className='content_text'>{detail.wordContent}</Text>
          <Image className='pic'  mode={'widthFix'}  src={detail.images?detail.images[0]:require('../../../assets/images/image_404.png')}/>
          <View className="comment">
            {/*<View className="text">*/}
            {/*  <Image src={comment} className={"text_icon"}/>*/}
            {/*  <Text className="text_text">0</Text>*/}
            {/*</View>*/}
           <View onClick={this.likeHope.bind(this)}> {!isLike?<View className="like">
              <Image src={like} className="like_icon"/>
              <Text className="like_text">{detail.likeCount}</Text>
            </View>:<View className="like">
              <Image  src={on_like} className="like_icon like_on"/>
              <Text className="like_text">{detail.likeCount}</Text>
           </View>}</View>
          </View>
        </View>
      </View>
    )
  }
}
