const { SuccessModel, ErrorModel } = require("../model/resModel");

const {
  getList,
  newBlog,
  getDetail,
  updateBlog,
  dleBlog,
} = require("../controller/blog.js");

const handleBlogRouter = (req, res) => {
  const id = req.query.id;

  if (req.method === "GET" && req.path === "/api/blog/list") {
    debugger;
    const author = req.query.author;
    const keyword = req.query.keyword;
    const result = getList(author, keyword);
    return result.then((data) => {
      return new SuccessModel(data);
    });
  }

  if (req.method === "GET" && req.path === "/api/blog/detail") {
    return getDetail(id).then((data) => {
      return new SuccessModel(data);
    });
  }

  if (req.method === "POST" && req.path === "/api/blog/new") {
    //用户模块待做,暂时假参数
    req.body.author = "zhanghua";
    return newBlog(req.body).then((data) => {
      return new SuccessModel(data);
    });
  }

  if (req.method === "POST" && req.path === "/api/blog/update") {
    return updateBlog(id, req.body).then((result) => {
      if (result) return new SuccessModel("更新成功");
      else return new ErrorModel("更新失败");
    });
  }

  if (req.method === "POST" && req.path === "/api/blog/del") {
    //用户模块待做,暂时假参数
    const author = "zhangsan";
    return dleBlog(id, author).then((val) => {
      if (val) return new SuccessModel();
      else return new ErrorModel("失败");
    });
  }
};
module.exports = handleBlogRouter;
