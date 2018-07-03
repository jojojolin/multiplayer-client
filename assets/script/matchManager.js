// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        if(cc.sys.isNative){//mobile
            //window.io = SocketIO;
            console.log("cc.sys.isNative");
        }
         else{//web
            require('./socket.io');
            console.log("!cc.sys.isNative");
        }
        //http://192.168.1.112 local  //119.23.224.88:5051 remote
        //G.queueSocket = io.connect('http://119.23.224.88:5051/queue', {'force new connection': true});
        G.queueSocket = io.connect('http://119.23.224.88:5051/queue');
        
        G.queueSocket.on('set stand', function(stand){
            // if(stand===1){
            //     G.stand=1;
            // }
            // else if(stand===2){
            //     G.stand=2;
            // }
            G.stand = stand;
        });
        
        G.queueSocket.on('match success', function(roomId){
            G.roomId=roomId;
            //G.roomSocket = io.connect('http://119.23.224.88:5051/rooms' + G.roomId, {'force new connection': true});//instantiate a new connection
            G.roomSocket = io('http://119.23.224.88:5051/rooms' + G.roomId); //redirect the same connection
            //G.queueSocket.disconnect();//if this line is removed, need to do people -- at somewhere else
            cc.director.loadScene('game');
        });
    },

    start () {

    },

    // update (dt) {},
});
