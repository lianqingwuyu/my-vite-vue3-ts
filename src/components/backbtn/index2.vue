<template>
  <div class="backbtn">
    <i class="el-icon-s-unfold" @click="init()"></i>
    <el-drawer title="我是标题" :append-to-body="false" :modal-append-to-body="false" :visible.sync="drawer"
               direction="ltr" size="15%" :with-header="false">
      <el-menu class="el-menu-vertical-demo" @select="handleselect" @close="handleClose"
               background-color="rgba(0, 0, 0,0)" text-color="#fff" active-text-color="#fff">
        <template v-for="(item, idx) in MenuData">
          <el-submenu v-if="item.children&&item.children.length>0" :index="item.path" :key="idx">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.menuName }}</span>
            </template>
            <el-menu-item-group v-for="(n, i) in item.children" :key="i">
              <el-menu-item :index="n.path">
                <template>
                  <i :class="n.icon"></i>
                  <span slot="title">{{ n.menuName }}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-else :key="idx" :index="item.path">
            <template>
              <i :class="item.icon"></i>
              <span slot="title">{{ item.menuName }}</span></template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {},
  data() {
    return {
      drawer: false,
      MenuData: [],
      fullscreenLoading: false,
    };
  },
  props: {
    isfp: {
      type: String,
      default: "",
    },
    issdp: {
      type: String,
      default: "",
    },
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    open() {
      this.$confirm("即将退出登录, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$ajax({
            method: "GET",
            url: '/misapi/swdp-auth/oauth/logout',
            headers: {
              TenantId: "10000",
            },
            params: {},
          })
            .then((res) => {
              this.$message({
                type: "success",
                message: "退出成功!",
              });
              window.localStorage.removeItem("BladeAuth");
              window.localStorage.removeItem("refresh_token");
              let url = "";
              if (window.location.href.indexOf("localhost") == -1) {
                url = window.location.origin + "/mis/#/login";
              } else {
                url = "http://localhost:1888/mis/#/login";
              }

              location.replace(url);
            })
            .catch((err) => {
            });
        })
        .catch(() => {
        });
    },
    // handleOpen(key, keyPath) {
    //   let url = "";
    //   const token = window.localStorage.BladeAuth;
    //   const refresh_token = window.localStorage.refresh_token;
    //   console.log("89898989", this.MenuData[key]);
    //   if (this.MenuData[key].children.length == 0) {
    //     if (this.MenuData[key].menuCode == "login") {
    //       this.open();
    //       return;
    //     }
    //     if (this.MenuData[key].menuCode == "sykjj") {
    //       url =
    //         this.MenuData[key].path;
    //       localStorage.setItem("path", this.$route.path);
    //     } else {
    //       url = this.MenuData[key].path;
    //       localStorage.setItem("path", this.$route.path);
    //     }
    //     location.replace(url);
    //   }
    //   return
    // },

    handleselect(key, keyPath) {
      console.log(key, keyPath)
      //debugger
      //return
      let url = "";
      const token = window.localStorage.BladeAuth;
      const refresh_token = window.localStorage.refresh_token;
      console.log("89898989", this.MenuData[key]);
      if (key == "/mis") {
        this.open();
        return;
      } else {
        url = key;
        localStorage.setItem("path", this.$route.path);
      }
      location.replace(url);
      return
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    init() {
      this.drawer = true;
      this.getMenu();
      // if(this.issdp == 'Y'){
      //   this.$router.replace('/');
      // }else{
      //   //console.log(this.$route.query.back2)
      //   let back = this.$route.query.back2
      //   if(back == 'b'){
      //     this.$router.replace('/menu');
      //   }else{
      //     this.$router.replace('/menu2');
      //   }
      // }
    },
    getMenu() {
      this.$ajax({
        method: "GET",
        url: "/api/common/user-grant-menu",
        params: {
          parentId: "0",
        },
      })
        .then((res) => {
          this.MenuData = res.data.data;
          this.MenuData.push({
            menuId: 0,
            menuCode: "login",
            menuName: "退出登录",
            path: "/mis",
          });
          console.log("this.MenuData", this.MenuData);
        })
        .catch((err) => {
        });
    },
  },
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: Chuangxiang;
  src: url("~@/assets/ttf/Yipin_Chuangxiang.ttf");
}

::v-deep .el-drawer {
  background: rgba(32, 34, 42, 0.8);
}

::v-deep {
  .el-drawer__body {
    background: rgba(32, 34, 42, 0);
  }
}

::v-deep {
  .el-menu-item {
    text-align: start;
  }
}


::v-deep .el-submenu__title {
  text-align: left;
}

.backbtn {
  z-index: 999999999;
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 40px;
  background: #fff;
  border-radius: 0 0px 5px 0px;
  text-align: center;
  line-height: 40px;

  .el-icon-s-unfold {
    font-size: 24px;
    color: #000;
    display: none;
  }

  &:hover {
    width: 50px;

    .el-icon-s-unfold {
      display: inline-block;
      width: 30px;
      height: 30px;
      font-size: 24px;
    }
  }
}

.ttttttt {
  font-size: 18px;
  font-family: Chuangxiang;
}
</style>
