import Taro,{Component} from '@tarojs/taro';
import './hopesDetail.scss';
import React from "react";
import {View} from "@tarojs/components";
import NavBar from "../../../common/navBar/navBar";
import BarTakeUp from "../../../common/barTakeUp/barTakeUp";

export default class HopeDetail extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <View>
        <NavBar back={true} title="心愿详情"/>
        <BarTakeUp/>
        detail
      </View>
    )
  }
}
