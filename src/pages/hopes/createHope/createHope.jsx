import Taro,{Component} from '@tarojs/taro';
import './createHope.scss'
import React from "react";
import {View} from "@tarojs/components";
import NavBar from "../../../common/navBar/navBar";
import BarTakeUp from "../../../common/barTakeUp/barTakeUp";
import {AtButton, AtImagePicker, AtTextarea,AtSwitch} from "taro-ui";
import {createHope, getUserCustomList} from "../../../api/apis";
import Loading from "../../../common/loading/loading";

export default class CreateHope extends Component{
  constructor(props){
    super(props);
    this.state={
      hopeText:'',
      files:[],
      isSeeSelf:false,
      isAnonymous:false,
      loading:false,
    }
  }

  onChange (files) {
    this.setState({
      files
    })
  }

  onFail (mes) {
    console.log(mes)
  }

  getDate(){
    let date=new Date();
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let day=date.getDate();
    let hh=date.getHours();
    let mm=date.getMinutes();
    let ss=date.getSeconds();
    let rq=year+'-'+month+'-'+day+' '+hh+":"+mm+":"+ss;
    return rq
  }
  componentDidMount() {
    // console.log(this.getDate())
  }

  handleChange = isSeeSelf => {
    console.log(isSeeSelf)
    this.setState({ isSeeSelf })
  }
  handleChange2=isAnonymous=>{
    this.setState({isAnonymous})
  }

  submitHope(){
    let that=this;
    const filePath=that.state.files[0].url;
    let pos=filePath.lastIndexOf('.');
    let ext=filePath.substr(pos,filePath.length);
    if(that.state.hopeText===''||that.state.files.length===0){
      Taro.showModal({
        title:'提示',
        content:'文字&图片不能为空',
        showCancel:false
      })
      return;
    }
    this.setState({
      loading:true,
    })
    Taro.cloud.uploadFile({
      cloudPath:'recordMood/'+Date.parse(new Date())+ext,
      filePath:that.state.files[0].url,
      success:res=>{
        const data=res.fileID;

        Taro.getStorage({
          key:'userInfoModel',
          success(r){
            const params={
              images:[{url:res.fileID},{}],
              createUserId:r.data.id,
              isSeeSelf: that.state.isSeeSelf,
              isAnonymous:that.state.isAnonymous,
              voice:"",
              wordContent:that.state.hopeText
            }
            console.log(params)
            createHope(params).then(res=>{
              if(res.statusCode){
                that.setState({
                  loading:false,
                })
                Taro.navigateBack();
              }
            })
          }
        })

      },
      fail: res=>{

      }
    })
  }

  changeHopeText(e){
    this.setState({
      hopeText:e.target.value
    })
  }


  render() {
    return(
      <View>
        <NavBar title={"创建心愿"} back={true}/>
        <BarTakeUp/>
        <Loading display={this.state.loading}/>
        <AtTextarea customStyle={{width:"95%",margin:"20px auto"}} placeholder="写下自己的心愿吧" onChange={this.changeHopeText.bind(this)} value={this.state.hopeText}/>
        {
          this.state.files.length===1?<AtImagePicker
            length={3}
            files={this.state.files}
            onChange={this.onChange.bind(this)}
            onFail={this.onFail.bind(this)}
            showAddBtn={false}
          />:<AtImagePicker
            length={3}
            files={this.state.files}
            onChange={this.onChange.bind(this)}
            onFail={this.onFail.bind(this)}
          />
        }
        <View className='isSeeSelf'>
          <AtSwitch title='匿名' checked={this.state.isSeeSelf} onChange={this.handleChange} />
        </View>
        <View className='isAnonymous'>
          <AtSwitch title='仅自己可见' checked={this.state.isAnonymous} onChange={this.handleChange2} />
        </View>
        <AtButton onClick={this.submitHope.bind(this)} className="submit">发 布</AtButton>
      </View>
    )
  }
}
