import Taro from "@tarojs/taro";
import {JoinCustom} from "../../api/apis";

export const joinCustom = (customId) => {
  let userInfo = Taro.getStorageSync('userInfoModel');
  let params = {
    userId: userInfo.id,
    customId: customId,
    isPublic: true,
    targetDay: 1000,
    beansCount: userInfo.beansCount
  };
  JoinCustom(params).then((result)=> {
    if(result.statusCode == 200) {
      Taro.showToast({
        title: "添加成功",
        icon: "success",
        duration: 1000
      }).then();
    }
  })
}
