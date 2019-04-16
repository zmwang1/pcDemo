<template>
  <div style="padding-top:200px;width:360px;margin:0 auto;">
    <el-form :model="LoginForm" :rules="loginRules" ref="LoginForm" label-width="100px" @keyup.enter.native="submitForm('LoginForm')">
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="LoginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="LoginForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="space-between">
          <el-button @click="retrieve_password_visible = true">忘记密码?</el-button>
          <el-button :loading="loading" type="primary" style="width:100%" @click="submitForm()">登录</el-button>
        </el-row>
      </el-form-item>
    </el-form>
    <el-dialog title="找回密码" :visible.sync="retrieve_password_visible" width="600px">
      <el-form :model="retrievePasswordForm" label-width="110px" :rules="retrievePasswordRules" ref="retrievePasswordForm">
        <el-form-item label="请输入邮箱" prop="email" v-show="!next_visible">
          <el-input v-model="retrievePasswordForm.email"></el-input>
        </el-form-item>
        <el-form-item label="请输入验证码" prop="oxcode" v-show="!next_visible">
          <el-input v-model="retrievePasswordForm.oxcode">
            <el-button slot="append" @click="getCode('retrievePasswordForm')">获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="npassword" v-show="next_visible">
          <el-input type="password" v-model="retrievePasswordForm.npassword"></el-input>
        </el-form-item>
        <el-form-item label="再次输入" prop="password" v-show="next_visible">
          <el-input type="password" v-model="retrievePasswordForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setCode()">确 认</el-button>
        <el-button @click="cancelPwd()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.retrievePasswordForm.password !== "") {
          this.$refs["retrievePasswordForm"].validateField("password");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.retrievePasswordForm.npassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      is_admin: true,
      LoginForm: {
        username: "admin",
        password: "admin"
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      retrievePasswordForm: {
        email: "",
        oxcode: "",
        npassword: "",
        password: ""
      },
      retrieve_password_visible: false,
      next_visible: false,
      retrievePasswordRules: {
        npassword: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入正确的邮箱号",
            trigger: "blur"
          }
        ],
        oxcode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    cancelPwd() {
      return !this.next_visible
        ? (this.retrieve_password_visible = false)
        : (this.next_visible = false);
    },
    submitForm() {
      this.$refs["LoginForm"].validate(valid => {
        if (valid) {
          var vm = this;
          vm.loading = true;
          setTimeout(() => {
            vm.$http
              .post(
                vm.is_admin ? vm.API.Login : vm.API.loginByShadow,
                vm.LoginForm
              )
              .then(response => {
                if (response.data.code == 0) {
                  this.$message({
                    message: response.data.msg,
                    type: "success"
                  });
                  if (vm.is_admin) {
                    this.getData();
                  } else {
                    vm.$fun.setCurUser({
                      id: response.data.data.id,
                      username: response.data.data.username,
                      level_id: "SHADOW"
                    });
                    vm.login();
                  }
                } else {
                  this.$message.error(response.data.msg);
                }
                vm.loading = false;
              });
          }, 1000);
        }
      });
    },
    getData() {
      var vm = this;
      vm.$http.get(vm.API.getCurrentUser).then(response => {
        if (response.data.code == 0) {
          vm.$fun.setCurUser({
            id: response.data.data.user.user_id,
            username: response.data.data.user.username,
            level_id: response.data.data.user.level_id
          });
          vm.login();
        }
      });
    },
    login() {
      //this.$fun.getAuth();
      if (this.$route.query.redirect && this.$route.query.redirect !== "/") {
        this.$router.push(this.$route.query.redirect);
      } else {
        this.$router.push({
          name: "home"
        });
      }
    }
    // setCode() {
    //     this.$refs['retrievePasswordForm'].validateField('oxcode', (error) => {
    //         if (!error) {
    //             if (this.next_visible) {
    //                 this.editPassword();
    //             } else {
    //                 this.checkCode();

    //             }

    //         } else {
    //             return false;
    //         }
    //     });
    // },
    // checkCode() {
    //     var vm = this;
    //     vm.$http.post('/Admino/AdminUser/checkCode.json', vm.retrievePasswordForm).then((response) => {
    //         if (response.data.errno == 0) {
    //             vm.next_visible = true;
    //         } else {
    //             vm.$message.error(response.data.msg);
    //         }
    //     })
    // },
    // getCode(formName) {
    //     this.$refs[formName].validateField('email', (error) => {
    //         if (!error) {
    //             var vm = this;
    //             vm.$http.post('/Admino/AdminUser/sendVerifyToEmail.json', vm.retrievePasswordForm)
    //                 .then((response) => {
    //                     if (response.data.errno == 0) {
    //                         this.$message.success(response.data.msg);
    //                     } else {
    //                         this.$message.error(response.data.msg);
    //                     }
    //                 })
    //         } else {
    //             return false;
    //         }
    //     });
    // },
    // editPassword() {
    //     var vm = this;
    //     vm.$refs['retrievePasswordForm'].validate((valid) => {
    //         if (valid) {
    //             var vm = this
    //             vm.$http.post('/Admino/AdminUser/editPassword.json', vm.retrievePasswordForm)
    //                 .then((response) => {
    //                     if (response.data.errno == 0) {
    //                         vm.$message.success(response.data.msg);
    //                         vm.retrieve_password_visible = false;
    //                         vm.next_visible = false;
    //                         vm.$refs['retrievePasswordForm'].resetFields();
    //                     } else {
    //                         vm.$message.error(response.data.msg);
    //                     }
    //                 })
    //         }
    //     });
    // },
  }
};
</script>