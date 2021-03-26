//auth用请求，不加Authorization
function getAuthRequest(url, params, successCallback) {
    $.ajax({
        type: "GET",
        url: url,
        data: params,
        dataType: "JSON",
        async: true,//true 表示发送异步请求，当为 false 表示发送同步请求
        success: function (result) {
            if (successCallback && typeof (successCallback) == "function") {
                successCallback(result);
            }
        },
        fail: function (result) {
            console.log("fail" + JSON.stringify(result));
        }
    });
}
//普通请求，加Authorization
function postRequest(url, data, successCallback) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        async: true,//true 表示发送异步请求，当为 false 表示发送同步请求
        dataType:"json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            let tokenInfo = JSON.parse(sessionStorage.getItem('tokenInfo'));
            token = tokenInfo['token_type'] + tokenInfo['access_token'];
            xhr.setRequestHeader("Authorization", token);
        },
        success: function (result) {
            if (successCallback && typeof (successCallback) == "function") {
                successCallback(result);
            }
        },
        fail: function (result) {
            console.log("fail" + JSON.stringify(result));
        }
    });
}
//发送验证码
function sendCode() {
    try {
        let isSend = true;
        let mobile = $("#form-concat-mobile").val();
        let mobileErr = "";
        if (mobile.replace(/\ +/g, "") == "") {
            mobileErr = "请填写手机号";
            isSend = false;
        } else {
            let regMobile = /^1[3|4|5|8|7|6|9]\d{9}$/;
            if (!mobile.match(regMobile)) {
                mobileErr = "请填写正确的手机号";
                isSend = false;
            } else {
                mobileErr = "";
            }
        }
        if (isSend) {
            postRequest(base.baseUrl + '/app/user/getCode?phone='+mobile,{},function(data){
                if(data){
                    console.log("发送验证码成功");
                }
                else{
                    console.log("发送验证码失败");
                }
            });
        }
        else{
            alert(mobileErr);
        }

    } catch (err) { }
}
//检验验证码的结果
let yzmCheck=false;
//检验验证码的有效性
function checkSmscode() {
    try {
        let isSend = true;
        let mobile = $("#form-concat-mobile").val();
        let yzm=$("#form-concat-yzm").val();
        let mobileErr = "";
        if (mobile.replace(/\ +/g, "") == "") {
            mobileErr = "请填写手机号";
            isSend = false;
        } else {
            let regMobile = /^1[3|4|5|8|7|6|9]\d{9}$/;
            if (!mobile.match(regMobile)) {
                mobileErr = "请填写正确的手机号";
                isSend = false;
            } else {
                mobileErr = "";
                if(yzm.replace(/\ +/g, "") == ""){
                    mobileErr = "请填写验证码";
                    isSend = false;
                }
            }
            
            if (isSend) {
                let data={};
                let url=base.baseUrl + '/app/user/checkCodeIsCorrect?code='+yzm+"&phone="+mobile;
                let data1={
                    code:yzm,
                    phone:mobile
                };
                let url1=base.baseUrl + '/app/user/checkCodeIsCorrect';
                postRequest(url, data1, function (result) {
                    yzmCheck=result;
                    if(result){
                        console.log("验证码检验通过");
                    }
                    else{
                        console.log("验证码检验未通过");
                    }
                });
            }
            else {
                alert(mobileErr);
            }
        }
    } catch (err) { }
}



$(function () {
    getAuth(null);
    function getAuth(callback) {
        let params = {
            'grant_type': 'client_credentials',
            'client_id': base.clientId,
            'client_secret': base.clientSecret
        };
        getAuthRequest(base.baseUrl + '/oauth/token', params, function (data) {
            sessionStorage.removeItem('tokenInfo');
            sessionStorage.setItem('tokenInfo', JSON.stringify(data));
            if (callback && typeof (callback) == "function") {
                callback();
            }
        });
    }

    $("#submit").click(function (e) {
        let isSend = true;
        let company=$("#form-concat-company").val();
        let companyErr="";
        if (company.replace(/\ +/g, "") == "") {
            companyErr = "请填写公司或组织名称";
          isSend = false;
        } else {
            companyErr = "";
        }

        let username=$("#form-concat-username").val();
        let usernameErr="";
        if (username.replace(/\ +/g, "") == "") {
          usernameErr = "请填写您的姓名";
          isSend = false;
        } else {
          usernameErr = "";
        }

        let mobile=$("#form-concat-mobile").val();
        let mobileErr="";
        if (mobile.replace(/\ +/g, "") == "") {
          mobileErr = "请填写手机号";
          isSend = false;
        } else {
          let regMobile = /^1[3|4|5|8|7|6|9]\d{9}$/;
          if (!mobile.match(regMobile)) {
            mobileErr = "请填写正确的手机号";
            isSend = false;
          } else {
            mobileErr = "";
          }
        }

        let yzm=$("#form-concat-yzm").val();
        let yzmErr="";
        if (yzm.replace(/\ +/g, "") == "") {
            yzmErr = "请填写短信验证码";
            isSend = false;
        } else {
          yzmErr = "";
          if (!yzmCheck) {
            yzmErr = "短信验证码失效或错误";
            isSend = false;
          }
        }

        let message=$("#form-concat-message").val();
        let messageErr="";
        if (message.replace(/\ +/g, "") == "") {
            messageErr = "请填写留言";
          isSend = false;
        } else {
            messageErr = "";
        }
  
        if (isSend) {
          try {
            let data = {
              company: company,
              userName: username,
              mobile: mobile,
              message: message
            };
            postRequest(base.baseUrl + '/app/user/save', JSON.stringify(data), function (data) {
               if(data.result){
                   console.log("提交成功");
                   alert("已收到您的信息，请等待我们的客服人员与您联络！")
               }
               else{
                   console.log("提交失败");
               }
               //验证码检测结果重置
               yzmCheck=false;
               $("#form-concat-company").val("");
               $("#form-concat-username").val("");
               $("#form-concat-mobile").val("");
               $("#form-concat-yzm").val("");
               $("#form-concat-message").val("");
            });
          } catch (err) {}
        }
    });
});