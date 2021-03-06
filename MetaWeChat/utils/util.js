
var app = getApp()


function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function transformDate(year, month, day) {
  return year + " " + month + "." + day
}

// 无参数 post 网络请求
function postRequest(url, callBack) {
  wx.request({
    url: app.globalData.BaseURL + url,
    data: {},
    method: 'Post',
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      callBack(res.data)
    },
    fail: function () {
      // fail
      
    }
  })
}

export const request = (method = 'POST') => (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success: function(res) {
        resolve(res.data)
      },
      fail: function(err) {
        reject(err)
      }
    });
  })
}

// function request(params) {
//   return new Promise(function (resolve, reject) {

//     if (!params) {
//       reject(new Error(params));
//     }

//     wx.request({
//       url: app.globalData.BaseURL + params.url,
//       method: "POST",
//       data: {},
//       header: {
//       "Content-Type": "application/x-www-form-urlencoded"
//       },
//       success: function(res){
//         if (res.statusCode === 200 || res.statusCode === 201){
//           resolve(res.data);
//         }else{
//           console.log('[error]: ', res)
//           reject(res);          
//         }
//       },
//       fail: function(res) {
//         reject(res);
//       }
//     })
//   })
// }

function courseListReques(categoryName, courseName, gradeName, pageIndex, sortStatus, callBack) {
  wx.request({
    url: app.globalData.BaseURL + "open/b-iphone/anon/course-list.do",
    data: {
      categoryName: categoryName ,
      courseName: courseName ,
      gradeName: gradeName ,
      pageIndex: pageIndex ,
      sortStatus: sortStatus,
      pageSize: 20
    },
    method: 'Post',
    header: {},
    success: function (res) {
      // success
      callBack(res.data)
    },
    fail: function () {
      // fail
    }
  })
}

module.exports = {
  formatTime: formatTime,
  postRequest: postRequest,
  courseListReques: courseListReques,
  transformDate: transformDate,
  request: request
}
