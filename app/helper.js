


class MyHelper{

    static sendMessage(res , status , apiStatuse , data , message){
        res.status(status).send({
            apiStatuse,
            data,
            message
        })
    }

}


module.exports = MyHelper;