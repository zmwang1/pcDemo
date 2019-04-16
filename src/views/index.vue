<template>
  <el-container>
    <!-- 左侧导航 -->
    <el-aside width="200px">
      <router-link :to="{ name: 'home'}" class="logo" title="互动专家">
        <i class="logobase64"></i>
        <span>互动专家</span>
      </router-link>
      <el-menu router :default-active="routerurl" class="el-menu-vertical-demo" background-color="#333333" text-color="#fff" active-text-color="#fff">
        <el-menu-item :index='$fun.searchMenuMap(["Index", "Userlist"], {query:{type:"NONE"}})' >
          <i class="iconfont icon-people"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-submenu index="1" >
          <template slot="title">
            <i class="iconfont icon-vipcard"></i>
            <span>订单录入人员账户</span>
          </template>
          <el-menu-item :index='$fun.searchMenuMap(["Index", "Cardlist"], {query:{type:"NONE"}})'>卡片管理</el-menu-item>
          <el-menu-item :index='$fun.searchMenuMap(["Index", "Cardpk"])'>PK组管理</el-menu-item>
          <el-menu-item :index='$fun.searchMenuMap(["Index", "Cardcomment"])'>评论管理</el-menu-item>
          <el-menu-item :index='$fun.searchMenuMap(["Index", "Cardpool"])'>卡片池管理</el-menu-item>
          <el-menu-item :index='$fun.searchMenuMap(["Index", "Cardcheck"])'>卡片审核</el-menu-item>
        </el-submenu>
        <!-- 影子账户卡片列表 -->
        <el-menu-item :index='$fun.searchMenuMap(["Index", "Cardlist"])' v-if="!$fun.getAuth()">
          <i class="iconfont icon-vipcard"></i>
          <span slot="title">卡片管理</span>
        </el-menu-item>

        <el-menu-item :index='$fun.searchMenuMap(["Index", "Userlist"], {query:{type:"1"}})' >
          <i class="iconfont icon-profile_light"></i>
          <span slot="title">影子账户</span>
        </el-menu-item>
        <el-menu-item :index='$fun.searchMenuMap(["Index", "ProductList"])' >
          <i class="iconfont icon-goods"></i>
          <span slot="title">产品管理</span>
        </el-menu-item>
        <el-menu-item :index='$fun.searchMenuMap(["Index", "OrderList"])' >
          <i class="iconfont icon-form_light"></i>
          <span slot="title">兑换订单</span>
        </el-menu-item>
 
        <el-menu-item index="7" >
          <i class="iconfont icon-comment_light"></i>
          <span slot="title">其它</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 顶部菜单 -->
      <el-header>
        <span v-on:click="$router.push('home')">互动专家后台管理系统</span>
        <el-dropdown @command="handleCommand">
          <el-button type="text">
            <!-- {{curUser.username}} -->
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="myUser" >我的账号</el-dropdown-item>
            <el-dropdown-item command="back">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 主体 -->
      <router-view class="view"></router-view>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        routerurl: '',
      }
    },
    watch: {
      $route() {
        // route
        this.routeConfig();
      }
    },
    created: function () {
      this.routeConfig();
    },
    methods: {
      routeConfig() {
        var vm = this;
        setTimeout(() => { 
          // vm.routerurl = vm.$fun.getMenuIndexByRoute(vm.$route);
          vm.routerurl = '/Index/Userlist?page=1&type=NONE';
          console.log(vm.routerurl)
        }, 500);
      },
      handleCommand(command) {
        if (command == 'myUser') {
          this.$router.push({
            name: 'AdminOne'
          })
        } else if (command == 'back') {
          localStorage.setItem('loginState', false);
          this.$router.push('/login');
        }
      }
    }
  }
</script>