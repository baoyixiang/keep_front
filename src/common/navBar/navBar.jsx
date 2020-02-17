import Taro, {Component} from "@tarojs/taro";
import React from "react";
import {View} from "@tarojs/components";
import {AtNavBar} from "taro-ui";
import './navBar.scss';


export default class NavBar extends Component{

  constructor(props){
    super(props);
    this.state = {
      statusBarHeight: 0,
    };
  }

  componentDidMount() {
    Taro.getSystemInfo({
    }).then(res => {
      this.setState({
        statusBarHeight:  res.statusBarHeight || 0,
      });})
  }

  render() {
    const style = {
      paddingTop: this.state.statusBarHeight + 'px',
    };
    return(
      <View>
        <AtNavBar
          leftIconType={this.props.back?'chevron-left':''}
          onClickLeftIcon={()=>{Taro.navigateBack()}}
          color='#000'
          title={this.props.title || "点滴习惯"}
          fixed={true}
          customStyle={style}
        />
      </View>
    )
  }
}
