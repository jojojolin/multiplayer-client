// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

// 定义了一个类, new 构造函数模拟;
// extends: 扩展自 component;
// new 类， 实例化一个组件类， 往对应的节点上添加我们的组件,new出来来组件实例;
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

        player: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },


    start () {
        if(G.stand==1){
            // let colli=this.getComponent(cc.PhysicsCircleCollider);

        }
        else if(G.stand==2){
            /**
             * 监听足球位置
             */
            var setBallPos = (x, y) => {
                this.node.x=x;
                this.node.y=y;
            }
            G.roomSocket.on('update ball position', function(msg){
                setBallPos((-1)*msg.position.x, (-1)*msg.position.y);
            });
        }
    },


    // dt: 距离上一次刷新的时间;
    update (dt) {
        /**
         * 发送足球位置
         */
        if(G.stand==1){
            G.roomSocket.emit('update ball position', {position: {x:this.node.x, y:this.node.y}});
        }
    },
    

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider){
        if(G.stand==1){
            var worldManifold = contact.getWorldManifold();
            var points = worldManifold.points;
            var normal = worldManifold.normal;

            //获取到两个碰撞体相互碰撞时在碰撞点上的相对速度
            var vel1 = this.getComponent(cc.RigidBody).getLinearVelocityFromWorldPoint( worldManifold.points[0] );
            var vel2 = this.player.getComponent(cc.RigidBody).getLinearVelocityFromWorldPoint( worldManifold.points[0] );
            var relativeVelocity = vel1.sub(vel2);

            this.body = this.getComponent(cc.RigidBody);
            if(otherCollider.node.groupIndex == 3){
                //console.log("otherCollider.group=='player'");
                this.body.applyLinearImpulse(cc.p(-normal.x*80, -normal.y*80), points[0], true);
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
















