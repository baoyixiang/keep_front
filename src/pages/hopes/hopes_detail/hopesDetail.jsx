import Taro,{Component} from '@tarojs/taro';
import './hopesDetail.scss';
import React from "react";
import {Image, Text, View} from "@tarojs/components";
import NavBar from "../../../common/navBar/navBar";
import BarTakeUp from "../../../common/barTakeUp/barTakeUp";
import {getHopeDetail} from "../../../api/apis";
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
      isLike:false
    }
  }
  componentDidMount() {
    let {id}=this.$router.params;
    this.setState({
      loading:true,
    })
    getHopeDetail(id).then(res=>{
      this.setState({
        loading:false,
        detail:res.data
      })
      console.log(res.data)
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
            <Text className='time'>{detail.time}</Text>

          </View>
          <Text className='content_text'>{detail.wordContent}</Text>
          <Image className='pic' src={detail.images?detail.images[0]:require('../../../assets/images/image_404.png')}/>
          <View className="comment">
            {/*<View className="text">*/}
            {/*  <Image src={comment} className={"text_icon"}/>*/}
            {/*  <Text className="text_text">0</Text>*/}
            {/*</View>*/}
           <View onClick={()=>{this.setState({isLike:!this.state.isLike})}}> {!isLike?<View className="like">
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
