<template>
    <div class="login">
        <Card class="form" style="width:300px">
            <p slot="title">欢迎登录</p>
            <Form ref="refLogin" :model="modelLogin" :rules="ruleLogin" @keydown.enter.native="handleSubmit">
                <FormItem prop="user">
                    <Input type="text" v-model="modelLogin.user" placeholder="请输入用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="modelLogin.password" placeholder="请输入密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button long type="primary" @click="handleSubmit">登录</Button>
                </FormItem>
            </Form>
            <p class="tooltip">请输入用户名和密码</p>
        </Card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      modelLogin: {
        user: "",
        password: ""
      },
      ruleLogin: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不能小于6位数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    handleSubmit() {
      let _this = this
      this.$refs.refLogin.validate(valid => {
        if (valid) {
          this.handleLogin(_this.modelLogin).then(res=>{
              if(res){
                this.$Message.success("登录成功");
              }
          })
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .form {
    position: absolute;
    top: 40%;
    right: 10%;
    transform: translateY(-50%);
    .tooltip {
      text-align: center;
      color: #c3c3c3;
      font-size: 10px;
    }
  }
}
</style>