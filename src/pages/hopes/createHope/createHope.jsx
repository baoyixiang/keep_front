import Taro,{Component} from '@tarojs/taro';
import './createHope.scss'
import React from "react";
import {View} from "@tarojs/components";
import NavBar from "../../../common/navBar/navBar";
import BarTakeUp from "../../../common/barTakeUp/barTakeUp";
import {AtButton, AtImagePicker, AtTextarea} from "taro-ui";

export default class CreateHope extends Component{
  constructor(props){
    super(props);
    this.state={
      hopeText:'',
      files:[]
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

  componentDidMount() {
  }

  render() {
    return(
      <View>
        <NavBar title={"创建心愿"} back={true}/>
        <BarTakeUp/>
        <AtTextarea customStyle={{width:"95%",margin:"20px auto"}} placeholder="写下自己的心愿吧" value={this.state.hopeText}/>
        {
          this.state.files.length===1?null:<AtImagePicker
            length={3}
            files={this.state.files}
            onChange={this.onChange.bind(this)}
            onFail={this.onFail.bind(this)}
          />
        }


        <AtButton className="submit">发 布</AtButton>
      </View>
    )
  }
}
