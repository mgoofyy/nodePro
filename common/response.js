var ResponseJson = function(data,method,msg,error){
    
    //数据返回格式
    // {
    //     'code' : 1,
    //     'msg'  : '请求成功',
    //     'method': 'POST',
    //     'data' : {
    //         data...
    //     }
    // }

    //请求返回的数据;
    var code = 100;

    this.setCode = function(code) {
        if(code === 1) {
            return {
                'data' : data,
                'mehod' : method,
                'msg' : msg,
                'code' : code,
             } 
        } else {
            return {
                'mehod' : method,
                'msg' : msg,
                'code' : code,
                'error' : error,
            } 
        }
    }
}
module.exports = ResponseJson;