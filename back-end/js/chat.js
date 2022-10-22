//登入才有聊天按鈕
function chatinit(){
    if(sessionStorage.getItem("memberAccount")){
    $("#chaticonpricture").css("display","block")
    }
}
chatinit()

//聊天室 
var storeAccount = sessionStorage.getItem("memberAccount")
var MyPoint = "/FriendWS/"+storeAccount;
var host = window.location.host;
var path = window.location.pathname;
var webCtx = path.substring(0, path.indexOf('/', 1));
var endPointURL = "ws://" + window.location.host + webCtx + MyPoint;

var statusOutput = document.getElementById("statusOutput");
var messagesArea = document.getElementById("messagesArea");
var self = storeAccount;
var webSocket;

function connect() {
    // create a websocket
    webSocket = new WebSocket(endPointURL);

    webSocket.onopen = function(event) {
        console.log("Connect Success!");
        document.getElementById('sendMessage').disabled = false;
        document.getElementById('connect').disabled = true;
        document.getElementById('disconnect').disabled = false;
    };

    webSocket.onmessage = function(event) {
        var jsonObj = JSON.parse(event.data);
        if ("open" === jsonObj.type) {
            refreshFriendList(jsonObj);
            
        } else if ("history" === jsonObj.type) {
            messagesArea.innerHTML = '';
            var ul = document.createElement('ul');
            ul.id = "area";
            messagesArea.appendChild(ul);
            // 這行的jsonObj.message是從redis撈出跟好友的歷史訊息，再parse成JSON格式處理
            var messages = JSON.parse(jsonObj.message);
            for (var i = 0; i < messages.length; i++) {
                var historyData = JSON.parse(messages[i]);
                var showMsg = historyData.message;
                var li = document.createElement('li');
                // 根據發送者是自己還是對方來給予不同的class名, 以達到訊息左右區分
                historyData.sender === self ? li.className += 'me' : li.className += 'friend';
                li.innerHTML = showMsg;
                ul.appendChild(li);
            }
            messagesArea.scrollTop = messagesArea.scrollHeight;
        } else if ("chat" === jsonObj.type) {
            //可以留言 創造一個新的ul 
            if(messagesArea.innerHTML == ""){
                messagesArea.innerHTML = '';
                var ul = document.createElement('ul');
                ul.id = "area";
                messagesArea.appendChild(ul);
            }
            var li = document.createElement('li');
            jsonObj.sender === self ? li.className += 'me' : li.className += 'friend';
            li.innerHTML = jsonObj.message;
            console.log(li);
            console.log(jsonObj.sender);
                document.getElementById("area").appendChild(li);
            messagesArea.scrollTop = messagesArea.scrollHeight;
        } else if ("close" === jsonObj.type) {
            offWS(jsonObj);
        } else if ("onstatus" === jsonObj.type) {
            onstatus(jsonObj)
        }
    };

    webSocket.onclose = function(event) {
        console.log("Disconnected!");
    };
}

function sendMessage() {
    var inputMessage = document.getElementById("message");
    var friend = statusOutput.textContent;
    var message = inputMessage.value.trim();

    if (message === "") {
        alert("Input a message");
        inputMessage.focus();
    } else if (friend === "") {
        alert("Choose a friend");
    } else {
        var jsonObj = {
            "type" : "chat",
            "sender" : self,
            "receiver" : friend,
            "message" : message
        };
        webSocket.send(JSON.stringify(jsonObj));
        inputMessage.value = "";
        inputMessage.focus();
    }
}

//上線狀態
function onstatus(jsonObj) {
    var friends = jsonObj.users;
    var row = document.getElementById("row");
    var livefrends = row.children;

    for (var i = 0; i < friends.length; i++) {
        if (friends[i] === self) { continue;}
        for(var j = 0; j < livefrends.length; j++){
            if(livefrends[j].getAttribute("value") == friends[i]){
            livefrends[j].style['background-color'] = 'green';
        
        } 
        }
            
    }
    addListener();
}
//離線狀態
function offWS(jsonObj) {
    
    var row = document.getElementById("row");	
    var livefrends = row.children;
    console.log(jsonObj.user)
    

    for(var i = 0; i < livefrends.length; i++){
        if(livefrends[i].getAttribute("value") == jsonObj.user){
            livefrends[i].style['background-color'] = 'white';
        
        } 
    }
        
    
    addListener();
}
// 拿取歷史聊過天的人 且有上線的人加綠色
function refreshFriendList(jsonObj) {
    var friends = jsonObj.users;
    var row = document.getElementById("row");
    var livefrends = jsonObj.otherNames
    row.innerHTML = '';
    for (var i = 0; i < friends.length; i++) {
        if (friends[i] === self ) { continue; }
        row.innerHTML +='<div id=' + friends[i] + ' class="column" name="friendName" value=' + friends[i] + ' ><h5>' + friends[i] + '</h5></div>';
        for(var j = 0; j < livefrends.length; j ++){
            if(livefrends[j] == friends[i] ){
                var ans = livefrends[j]
                document.querySelector("#"+ans).style['background-color'] = 'green'
            }
        }
    }
    addListener();
}
// 註冊列表點擊事件並抓取好友名字以取得歷史訊息
function addListener() {
    var container = document.getElementById("row");
    container.addEventListener("click", function(e) {
        var friend = e.srcElement.textContent;
        updateFriendName(friend);
        var jsonObj = {
                "type" : "history",
                "sender" : self,
                "receiver" : friend,
                "message" : ""
            };
        webSocket.send(JSON.stringify(jsonObj));
    });
}

function disconnect() {
    webSocket.close();
    document.querySelector("#row").innerHTML="";
    statusOutput.innerHTML = "";
    document.getElementById('sendMessage').disabled = true;
    document.getElementById('connect').disabled = false;
    document.getElementById('disconnect').disabled = true;
}

function updateFriendName(name) {
    statusOutput.innerHTML = name;
}