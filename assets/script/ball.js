cc.Class({
    extends: cc.Component,
    // 属性列表，它将会作为组件实例的数据成员，到组件里面,绑定到我们的编辑器上;
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

        player1: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },


    start () {
        var setBallPos = (x, y) => {
            this.node.x=x;
            this.node.y=y;
        }
        if(G.stand==1){
            // let colli=this.getComponent(cc.PhysicsCircleCollider);

        }
        else if(G.stand==2){
            /**
             * 监听足球位置
             */
            var setBallPos = (x, y, v) => {
                this.node.x=x;
                this.node.y=y;
                this.body = this.getComponent(cc.RigidBody);
                this.body.linearVelocity= cc.v2((-1)*v.x, (-1)*v.y);
            }
            G.ballSocket.on('update ball position', function(msg){
                setBallPos((-1)*msg.position.x, (-1)*msg.position.y, msg.position.v);
            });
        }
    },


    // dt: 距离上一次刷新的时间;
    update (dt) {
        /**
         * 发送足球位置
         */
        // if(G.stand==1){
        //     G.ballSocket.emit('update ball position', {position: {x:this.node.x, y:this.node.y}});
        // }
    },
    

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider){
        if(G.stand==1){
            var worldManifold = contact.getWorldManifold();
            var points = worldManifold.points;
            var normal = worldManifold.normal;
            this.body = this.getComponent(cc.RigidBody);

            if(otherCollider.node.groupIndex == 3){
                //console.log("otherCollider.group=='player'");
                this.body.applyLinearImpulse(cc.p(-normal.x*80, -normal.y*80), points[0], true);
            }
            if(G.stand==1){
                
                let v = this.body.linearVelocity;

                console.log("vx: "+ v.x); 
                G.ballSocket.emit('update ball position', {position: {x:this.node.x, y:this.node.y, v:this.body.linearVelocity}});
            }
            // cc.log("normal "+normal);
            // cc.log("relativeVelocity "+relativeVelocity+" "+relativeVelocity.x+" "+relativeVelocity.y);
            // cc.log("检测到碰撞");
        }
    },


    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function (contact, selfCollider, otherCollider) {
        
    },


    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function (contact, selfCollider, otherCollider) {

    },


    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve: function (contact, selfCollider, otherCollider) {
        
    },



    // /**
    //  * 当碰撞产生的时候调用
    //  * @param  {Collider} other 产生碰撞的另一个碰撞组件
    //  * @param  {Collider} self  产生碰撞的自身的碰撞组件
    //  */
    // onCollisionEnter: function (other, self) {
    //     console.log('on collision enter');
    // },


    // /**
    //  * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
    //  * @param  {Collider} other 产生碰撞的另一个碰撞组件
    //  * @param  {Collider} self  产生碰撞的自身的碰撞组件
    //  */
    // onCollisionStay: function (other, self) {
    //     console.log('on collision stay');
    // },


    // /**
    //  * 当碰撞结束后调用
    //  * @param  {Collider} other 产生碰撞的另一个碰撞组件
    //  * @param  {Collider} self  产生碰撞的自身的碰撞组件
    //  */
    // onCollisionExit: function (other, self) {
    //     console.log('on collision exit');
    // }
});
















