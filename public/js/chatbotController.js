angular.module('HMS')
.controller('ChatbotController', function ($http, $scope, $cookies) {
    $scope.showChat = $cookies.get("googleToken") ? true : false;
    $scope.welcomeMessage = "";
    $scope.messages = [];
    $scope.currentFlow = null;
    var init = function(){
        $http.get("http://redmine.vnclink.com:3000/reply?type=menu&user=" + $cookies.get("googleToken")).then(function(replyMessage){
            $scope.welcomeMessage = {
                "body" : replyMessage.data,
                "type" : "receiver"
            }
        });
        $(window).off("keydown.sendMessage");
        $(window).on("keydown.sendMessage", function(e){
            if($(e.target).is(".chatbot .chatbot-footer textarea") && e.keyCode === 13 ){
                $scope.sendMessage();
                e.preventDefault();
            }
        });
    }
    var sendMessage = function(messageText, flow, callback){
        let message = {
            "message" : messageText,
            "flow" : flow,
            "user" : $cookies.get("googleToken")
        }
        $http.post("http://redmine.vnclink.com:3000/sendMessage", message).then(function(replyMessage){
            callback(replyMessage);
        })
    }
    $scope.sendMessage = function(flow = null){
        if(!flow)
            flow = $scope.currentFlow;
        if($scope.message){
            let userMessage = $scope.message;
            let message1 = {
                "body" : [
                    {
                        "text" : userMessage
                    }
                ],
                "type" : "sender"
            };
            $scope.messages.push(message1);
            $scope.message = null;
            $(".chatbot .chatbot-footer textarea").val(null);
            sendMessage(userMessage, flow, function(replyMessage){
                let message2 = {
                    "body" : [],
                    "type" : "receiver"
                }
                message2.body = replyMessage.data;
                let bodyLength = message2.body.length;
                for(let i = 0; i < bodyLength; i++){
                    message2.body[i].text = message2.body[i].text.replace(/\\n/g,"<br />");
                }
                $scope.messages.push(message2);
            });
        }
    }
    $scope.select = function(value){
        let message = {
            "body": [
            {
                "text" : "",
                "buttons" : []
            }
            ],
            "type" :"receiver"  
        };
        if(value === "create"){
            $scope.currentFlow = "create";
            message.body[0].text = "Tên công trình";
            message.type = "receiver";
            $scope.messages.push(message);
        }
        else{

        }
    }
    init();
});