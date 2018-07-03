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
        if(cc.sys.isNative){
            //window.io = SocketIO;
            console.log("cc.sys.isNative");
        }
         else{
            require('./socket.io');
            console.log("!cc.sys.isNative");
        }

        //G.globalSocket = io.connect('http://119.23.224.88:5051');
        //G.hallSocket = io.connect('http://119.23.224.88:5051/hall', {'force new connection': true});
    },

    start () {
        this.soundManager = this.getComponent("SoundManager");
        this.soundManager.playWelcomeSound();
    },

    // update (dt) {},

    onBtnStart(){
        //G.hallSocket.disconnect();
        cc.director.loadScene('match');
    }
});
