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
        ball:{
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.robotx=this.node.x;
        this.roboty=this.node.y;
    },

    start () {
        /**
         * 机器人对手
         */
        // this.schedule(function() {
        //     //console.log("a");
        //     //console.log("x, y: " + this.ball.x + " " + this.ball.y);
        //     var ballx=this.ball.x;
        //     var bally=this.ball.y;

        //     if(bally<-155) {
        //         this.robotx = 0;
        //         this.roboty = 150;
        //     }
        //     else if(bally>30){
        //         this.robotx = ballx;
        //         this.roboty = bally + 30;
        //     }

        //     this.node.x = this.robotx;
        //     this.node.y = this.roboty;
        // }, 0.01);


        /**
         * 人类联机对手
         */
        var setPlayer2Pos = (x, y) => {
            this.node.x=x;
            this.node.y=y;
        }

        // 更新对手位置
        G.roomSocket.on('update player position', function(msg){
            if(msg.stand!=G.stand){
                if(G.stand==1){//不对称
                    setPlayer2Pos((-1)*msg.position.x, (-1)*msg.position.y);
                }
                else{
                    setPlayer2Pos((-1)*msg.position.x, (-1)*msg.position.y);
                }
                
            }
        });
    },

    // update (dt) {},
});
