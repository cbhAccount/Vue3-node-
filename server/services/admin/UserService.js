const UserModel = require("../../models/UserModel");

const UserService = {
  login: async ({ username, password }) => {
    return UserModel.findOne({ username, password });
  },
  upload: async (params) => {
    console.log(params);
    if (params.avatar) {
      return UserModel.updateOne(
        { _id: params.id },
        {
          gender: Number(params.gender),
          username: params.username,
          introduction: params.introduction,
          avatar: params.avatar,
        }
      );
    } else {
      return UserModel.updateOne(
        { _id: params.id },
        {
          username: params.username,
          introduction: params.introduction,
          gender: Number(params.gender),
        }
      );
    }
  },
  getUserImage: async (id) => {
    return UserModel.findById({ _id: id });
  },
  //判断是否有重复的用户名并计数
  checkUsername: async (username) => {
    return UserModel.findOne({username: username});
  },
  add: async (params) => {
    return UserModel.create({
      username: params.username,
      password: params.password,
      role: Number(params.role),
      avatar: params.avatar,
      introduction: params.introduction,
      gender: Number(params.gender),
    });
  },
  userList: async (pagenum,pagesize) => {
    //分页查询并返回总数
    let result = {};
    const total = await UserModel.countDocuments().then((res)=>{
      return res;
    });
    const list = await UserModel.find().skip((pagenum-1)*pagesize).limit(Number(pagesize)).then((res)=>{
      return res;
    });
   result.total = total;
    result.list= list;
   return result;
},
  deleteUser: async (id) => {
    return UserModel.deleteOne({ _id: id });
  },
  updateUser: async (params) => {
    console.log(params);
    if (params.avatar) {
      return UserModel.updateOne(
        { _id: params.id },
        {
          role: Number(params.role),
          gender: Number(params.gender),
          password: params.password,
          username: params.username,
          introduction: params.introduction,
          avatar: params.avatar,
        }
      );
    } else {
      return UserModel.updateOne(
        { _id: params.id },
        { 
          role: Number(params.role),
          password: params.password,
          username: params.username,
          introduction: params.introduction,
          gender: Number(params.gender),
        }
      );
    }
  },
};


module.exports = UserService;
