<template>
  <div class="page">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue'


  export default {
    name: '',
    components: {
      // HelloWorld
    },
    data() {
      return {}
    },
    computed: {},
    created: function () {

    },
    methods: {
      getTicketByActivity() {
        var vm = this;
        vm.loadToast('加载中...');
        setTimeout(() => {
          vm.$http.post(vm.API.getTicketByActivity, {
            act_id: vm.id
          }).then(function (data) {
            // console.log(data);
            vm.loadToast(false);
            vm.ticketFun(data);
          }).catch(function (error) {
            console.log(error);
            vm.loadToast(false);
            vm.showToast('网络繁忙，请稍后再试!');
          })
        }, 500);
      },
    },
  }
</script>
<style scoped>

</style>