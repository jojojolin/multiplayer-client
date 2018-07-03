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
        maxTime: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },


    start () {
        this.time = this.maxTime;
        this.getComponent(cc.Label).string = "30 : 00";
        this.counting=true;
        this.scheduleOnce(this._callback, this.maxTime);
    },


    update (dt) {
        if (this.counting && (this.time-dt) >= 0){
            this.time -= dt;
            let text = this.time.toFixed(2)
            if(text.length === 4){
                text = '0'+text;
            }
            this.getComponent(cc.Label).string = text.replace('.', ' : ');            
        }
    },

    
    _callback: function(){
        this.time = this.maxTime;
        this.getComponent(cc.Label).string = '00 : 00';
        this.counting=false;
        this.unschedule(this._callback);
    },
});
