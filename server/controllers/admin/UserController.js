//导入UserService
const UserService = require("../../services/admin/UserService");
const JWT = require("../../utils/JWT");

const UserController = {
  login: async (req, res) => {
    //req.body
    console.log("11", req.body);
    const result = await UserService.login(req.body);
    console.log("22", result);
    if (result !== null) {
      //生成token
      let token = JWT.generate(
        {
          _id: result._id,
          username: result.username,
        },
        "1d"
      );
      res.header("Authorization", token);
      res.json({
        code: 200,
        msg: "登录成功",
        data: {
          username: result.username,
          role: result.role ? result.role : 0, //角色默认为0 1
          gender: result.gender ? result.gender : 0, //性别默认为0 1 2
          introduction: result.introduction ? result.introduction : "",
          avatar: result.avatar ? result.avatar : "",
        },
      });
    } else {
      res.json({
        code: 400,
        msg: "登录失败,用户名或密码错误",
      });
    }
  },
  upload: async (req, res) => {
    console.log(req.body, req.file);
    //调用UserService的更新数据库方法
    const token = req.headers.authorization.split(" ")[1];
    const result = JWT.verify(token);
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    //调用UserService的更新数据库方法
    await UserService.upload({ id: result._id, ...req.body, avatar: avatar });
    const userImage = await UserService.getUserImage(result._id);
    console.log("111", userImage);
    res.json({
      code: 200,
      msg: "上传成功",
      data: {
        username: req.body.username,
        introduction: req.body.introduction,
        gender: Number(req.body.gender),
        avatar: userImage.avatar,
      },
    });
  },
  add: async (req, res) => {
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    //调用UserService的更新数据库方法
    const checkUsername = await UserService.checkUsername(req.body.username);
    if(!checkUsername){
    await UserService.add({ ...req.body, avatar: avatar });
    res.json({
      code: 200,
      msg: "添加成功",
      data: {
        username: req.body.username,
        introduction: req.body.introduction,
      },
    });
    } else{
      res.json({
        code: 400,
        msg: "添加失败,用户名已存在",
      });
    }
  },
  userList: async (req, res) => {
    // console.log(req.query);
    const { pagenum, pagesize } = req.query;
    const result = await UserService.userList(pagenum,pagesize);
    // console.log(result);
  //将resule中的gender和role转换为男女和角色
    let data = []
    result.list.map((item) => {
      let object ={}
      object.gender = item.gender===0 ? '男' : '女'
      object.role = item.role===1 ? '管理员' : '普通用户'
      object.username = item.username
      object.password = item.password
      object.introduction = item.introduction
      object.avatar ='http://localhost:3000'+ item.avatar
      object.id = item._id
      data.push(object)
      return data
    })
    res.json({
      code: 200,
      data: {
        total: result.total,
        data: data,
      },
    });
  },
  deleteUser: async (req, res) => {
    console.log(req.params.id);
    await UserService.deleteUser(req.params.id);
    res.json({
      code: 200,
      msg: "删除成功",
    });
  },
  updateUser: async (req, res) => {
    console.log(req.body, req.file);
    //调用UserService的更新数据库方法
    const token = req.headers.authorization.split(" ")[1];
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    //调用UserService的更新数据库方法
    const checkUsername = await UserService.checkUsername(req.body.username);
    if(!checkUsername){
      await UserService.updateUser({...req.body, avatar: avatar });
      const userImage = await UserService.getUserImage(req.body.id);
      console.log("111", userImage);
      res.json({
        code: 200,
        msg: "上传成功",
        data: {
          username: req.body.username,
          introduction: req.body.introduction,
          gender: Number(req.body.gender),
          avatar: userImage.avatar,
        },
      });
    } else{
      res.json({
        code: 400,
        msg: "更新失败,用户名已存在",
      });
    }
    
  },
};
module.exports = UserController;
