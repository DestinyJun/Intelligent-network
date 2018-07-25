export class Menus  { // 菜单
  id: string; // 权限的id
  name: string; // 资源名称
  type: string; // 资源类型：menu,button...
  percode: string; // 权限代码字符串
  available: string; // 是否可用,1：可用，0不可用
}
export class FaultRecordManholeCover { // 异常井信息
  id: string; // 井id
  manholeId: string;//井Id
  failureTime: string; // 发生故障时间
  state: string; // 井的状态
  flow: string; // 水流量
  permeability: string; // 渗透率
  repairFrequency: string; // 维修次数
  receivingTime: string; // 接收任务时间
  repairState: string; // 修理状态
  completeTime: string; // 维修完成时间
  flowOutRelationId: string; // 流出井Id
  repairman: string; // 维修人员
  name: string; // 维修人员名字
  flag: string; // 标记是哪一端出问题
  initialManhole: ManholeCoverInfo; // 起始井
  flowOutManhole: ManholeCoverInfo; // 流出井
}
export class HomepageMsg {
  faultRecordManholeCoverInfo: Array<FaultRecordManholeCover>; // 异常井信息
  menus: Array<Menus>; // 菜单
  nickname: string; // 用户昵称
  username: string; // 用户账号
  userid: string; // 用户id
  provinceRegionId: string; // 省地区id
  cityRegionId: string; // 市地区Id
  countyRegionId: string; //（县/区）地区Id
  townRegionId: string; //（镇或者乡）地区Id

}
export class ManholeCoverInfo{
  id: string; //
  initialManholemanholeId: string; // 井Id
  sensorsize: string; // 传感器个数
  material: string; // 材质
  gpsPosition: string; // 地址
  gpsId: string; // gps坐标

}
