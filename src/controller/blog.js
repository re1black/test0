const { exec } = require("../db/mysql");

//获取博客列表
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;
  return exec(sql);
};

//获取博客详情
const getDetail = (id) => {
  let sql = `select content from blogs where id = ${id}`;
  return exec(sql).then((data) => {
    return data[0];
  });
};

//新建博客
const newBlog = (blogData = {}) => {
  const author = blogData.author; //解构也可试试
  const content = blogData.content;
  const title = blogData.title;
  const createtime = Date.now();
  let sql = `insert into blogs (author, content, title,createtime) values('${author}','${content}','${title}','${createtime}')`;
  return exec(sql).then((data) => {
    return { id: data.insertId };
  });
};

//更新博客
const updateBlog = (id, blogData = {}) => {
  const content = blogData.content;
  const title = blogData.title;
  let sql = `update blogs set content = '${content}',title = '${title}' where id = '${id}'`;
  return exec(sql).then((data) => data.affectedRows);
};
const dleBlog = (id, author) => {
  let sql = `delete from blogs where id = '${id}' and author = '${author}'`;
  return exec(sql).then((deldata) => {
    if (delData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

module.exports = { getList, newBlog, getDetail, updateBlog, dleBlog };
