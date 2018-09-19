export class FaultRecordManholeCover {
  id: string;
  manholeId: string; // 井Id
  failureTime: string; // 发生故障时间
  waterLevel: string; // 水位
  flow: string; //水流量
  permeability: string; // 渗透率
  state: string; // 井的状态
  repairFrequency: string; // 维修次数
  receivingTime: string; // 接受任务时间
  repairState: string; // 维修状态
  completeTime: string; // 完成时间
  name: string; // 维修人员名字
  flag: number; // 标记是哪一端出问题
}
export class Fault {
  currentPage: number;
  pageSize: number;
  startRecord: number;
  totalPage: number;
  totalRecord: number;
  datas: Array<FaultRecordManholeCover>;
}
export class WorkUser {
  id: string;
  nickname: string;
  username: string; // 账号
  password: string; // 密码（这个可以忽略）
  gender: string; // 用户性别
  age: string; // 用户年纪
  phone: string; // 用户电话
  address: string; // 用户住址
  locked: string; // 账号是否锁定，1：锁定，0未锁定
}
