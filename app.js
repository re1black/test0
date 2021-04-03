const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

//获取post数据
function getPostdata(req) {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    //
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let result = [];
    req.on("data", (chunk) => result.push(chunk));
    req.on("end", () => {
      let data = Buffer.concat(result);
      if (!data) {
        resolve({});
        return;
      }
      resolve(JSON.parse(data.toString()));
    });
  });
  return promise;
}

function serverHandle(req, res) {
  res.setHeader("content-type", "application/json");
  const url = req.url;
  req.path = url.split("?")[0];
  //解析query
  req.query = querystring.parse(url.split("?")[1]);

  getPostdata(req).then((postdata) => {
    req.body = postdata;
    const blogresult = handleBlogRouter(req, res);
    if (blogresult) {
      blogresult.then((data) => {
        res.end(JSON.stringify(data));
      });
      return;
    }
    // const userData = handleUserRouter(req, res);
    // if (userData) {
    //   res.end(JSON.stringify(userData));
    //   return;
    // }
    //未符合以上路由时
    res.writeHead(404, { "content-type": "text/plain" });
    res.write("404 not found");
    res.end();
  });
}

module.exports = serverHandle;
