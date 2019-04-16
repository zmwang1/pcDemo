/*   说明：插件
 * */
// menu主菜单栏index映射初始地址   key:组件标记 value:所属menu菜单栏标记（初始化地址）
var menuIndexMap = {
  Index: {
      Welcome: "/Index/Welcomeindex",
      //Userlist: "/Index/Userlist?page=1&type=0", //用户管理
      Userlist(route) {
          if (!!route && !!route.query && route.query.type == 'NONE') {
              return "/Index/Userlist?page=1&type=NONE";
          } else {
              return "/Index/Userlist?page=1&type=SHADOW";
          }
      },
      Cardlist(route) {
          if (!!route && !!route.query && (route.query.type == 'NONE' || route.query.type == 'SHADOW')) {
              return "/Index/Cardlist?page=1&type=NONE";
          } else {
              return "/Index/Cardlist?page=1";//影子账户卡片
          }
      },
      Cardcomment: "/Index/Cardcomment?page=1", //
      Cardcheck: "/Index/Cardcheck?page=1", //
      Cardpk: "/Index/Cardpk?page=1&type=0", //
      Cardpool: "/Index/Cardpool?page=1", //
      ProductList: "/Index/ProductList?page=1", //
      OrderList: "/Index/OrderList?page=1", //
      SettingBanner: "/Index/SettingBanner?page=1", //
      SettingBannerOne: "/Index/SettingBannerOne", //
      SettingBoot: "/Index/SettingBoot", //
  }
};
export default {
  install: function (Vue, options) {
    Vue.prototype.webUrl = options.url;
    Vue.prototype.API = options.api;
    Vue.prototype.curUser = JSON.parse(localStorage.getItem('userInfo'));
    Vue.prototype.$fun = {
      // 获取权限
      getAuth: function () {
           
      },
      // 自定义方法...
      setCurUser: function (data) {
          Vue.prototype.curUser = data;
          localStorage.setItem('loginState', true);
          localStorage.setItem('userInfo', JSON.stringify(data));
      },
      searchMenuMap(indexArr, route) {
          var obj = menuIndexMap;
          for (var i = 0; i < indexArr.length; i++) {
              if (!!obj[indexArr[i]] && (typeof obj === "object")) {
                  obj = obj[indexArr[i]];
              } else {
                  return typeof obj === "string" ? obj : "/";
              }
          }
          if (typeof obj === "function") {
              obj = obj(route);
          }
          if (typeof obj === "object" && obj === menuIndexMap) {
              console.log("MeunIndexNotRegister");
              return "/";
          }
          return obj;
      },
      getMenuIndexByRoute(route) {
          var path = JSON.parse(JSON.stringify(route.path));
          var indexArr = path.split('/');
          indexArr.splice(0, 1);
          return this.searchMenuMap(indexArr, route);
      }
  }

    //  注入组件
    Vue.mixin({
      methods: {
        // getStatus() {
        //   var vm = this;
        //   setTimeout(() => {
        //     vm.$http.get('/checkApi/isClose.json').then(function (data) {
        //       if (data.code == 1) {
        //         vm.$store.commit('setClose', true);
        //       } else {
        //         vm.$store.commit('setClose', false);
        //       }
        //     })
        //   }, 500);
        // },

        // alertDialog(content, title, icon, fun) {
        //   // vm.alertDialog('');
        //   this.$alert(content ? content : 'error', title, {
        //     confirmButtonText: '确定',
        //     dangerouslyUseHTMLString: true,
        //     type: icon ? icon : "warning",
        //     iconClass: icon,
        //     callback: action => {
        //       if (action == 'confirm' && fun) {
        //         return fun();
        //       }
        //     }
        //   });
        // },

        // showToast(txt) {
        //   // vm.showToast();
        //   // console.log('txt:' + txt)
        //   this.$message({
        //     message: txt ? txt : 'error',
        //     type: 'warning'
        //   });
        // },
        // data:对比的时间 num 调整的时间  type 2 返回时间长度 else 返回调整过的时间日期
        getStartStopDate(data, num, type) {
          if (!data) return;
          var finalTime = new Date(this.getDateDiff(data));
          var startTime = finalTime.getTime() + num;
          var curTime = new Date();
          if (type) {
            if (type == 2) {
              return startTime - curTime.getTime();
            }
            return this.dataToFormat(new Date(startTime));
          }
          // 当前时间是否大于传入时间 返回 true false

          return curTime.getTime() > startTime;
        },
        filterDate(data, type) {
          if (!data) return '';
          var date = type ? data : data.split(' ')[0];
          return date.replace(/-/g, '.');
        },
        filterTimes(data) {
          if (!data) return '';
          var time = data.split(' ')[1];
          return time.slice(0, 5);
        },
        // 对比字符串时间返回时间差
        getHours(startTimes, endTimes) {
          if (!startTimes) return 0;
          var startDate = new Date(this.getDateDiff(startTimes));
          var endDate = new Date(this.getDateDiff(endTimes));
          var milliseconds = endDate.getTime() - startDate.getTime();
          return Number((milliseconds / 1000 / 60 / 60).toFixed(2));
        },
        formatNumber(n) {
          n = n.toString()
          return n[1] ? n : '0' + n
        },
        // 时间格式转字符串
        dataToFormat(date, isShort) {
          if (!date) return ''
          if (isShort) {
            return date.getFullYear() + '-' + this.formatNumber((date.getMonth() + 1)) + '-' + this.formatNumber(date.getDate())
          } else {
            return date.getFullYear() + '-' + this.formatNumber((date.getMonth() + 1)) + '-' + this.formatNumber(date.getDate()) + ' ' + this.formatNumber(date.getHours()) + ':' +
              this.formatNumber(date.getMinutes()) + ':' + this.formatNumber(date.getSeconds());
          }
        },
        // 字符串转时间格式
        formatToDate(strDate) {
          var tmp = new Date(this.getDateDiff(strDate));
          return tmp != 'Invalid Date' ? tmp : '';
        },
        // 兼容代码时间转换 iOS safari
        getDateDiff(data) {
          //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
          return data ? data.replace(/-/g, "/") : ''
        },
        setItem(key, value) {
          var curTime = new Date().getTime();
          localStorage.setItem(key, JSON.stringify({
            data: value,
            time: curTime
          }));
        },
        getItem(key, exp) {
          var data = localStorage.getItem(key);
          var dataObj = JSON.parse(data);
          if (dataObj && new Date().getTime() - dataObj.time < exp) {
            return JSON.parse(dataObj.data);
          } else {
            return '';
          }
        },
        deleteItem(key) {
          localStorage.removeItem(key);
        }
        // setTimeout(() => {  }, 1000);
      }
    })
  },
};