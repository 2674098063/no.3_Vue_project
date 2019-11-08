<template>
  <div>
    <van-nav-bar
      title="地址"
      @click-left="returnPrevious"
      @click-right="recycling"
      left-text="返回"
      left-arrow
      to="/main/setting/index"
    >
      <van-icon name="arrow-down" slot="right" class="recycl" />
    </van-nav-bar>

    <van-radio-group v-model="radio">
      <van-cell-group class="group" v-for="(item,index) in list" :key="index">
        <van-cell clickable @click="radio = item.id">
          <div>
            <p class="user">
              <span class="uname" v-text="item.name"></span> ——
              <span class="utel" v-text="item.tel">13397728507</span>
            </p>
            <p class="uadd" v-text="item.address">广州市天河区</p>
            <van-icon name="edit" class="fr edit" @click="onEdit(item,index)" />
          </div>
          <van-radio slot="right-icon" :name="item.id" v-model="radio" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <van-button type="primary" size="large" class="addressBtn" @click="according">
      <van-icon name="add-o" size="14px" class="add_o" />添加地址
    </van-button>
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      class="addressEdit"
    />
    <van-address-edit
      :address-info="info"
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="upSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      class="addressUpdata"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {},
      radio: "1",
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号"
        }
      ],
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市",
          440000: "广东省"
        },
        city_list: {
          110100: "北京市",
          120100: "天津市",
          440100: "广州市",
          440300: "深圳市",
          440600: "佛山市",
          441900: "东莞市"
        },
        county_list: {
          440103: "荔湾区",
          440104: "越秀区",
          440105: "海珠区",
          440106: "天河区",
          440111: "白云区",
          440112: "黄埔区",
          440113: "番禺区",
          440114: "花都区",
          440115: "南沙区",
          440117: "从化区",
          440118: "增城区"
        }
      },
      searchResult: []
    };
  },

  methods: {
    onEdit(item) {
      //   window.console.log(item, index);
      this.info = item;
      document.querySelector(".addressUpdata").style.top = "10%";
      document.querySelector(".recycl").style.display = "inline-block";
    },
    onSave(content) {
      //   this.Toast("save");
      let len = this.list.length;

      let obj = {
        id: this.list[len].id + 1,
        name: content.name,
        tel: content.tel,
        address:
          content.province + " " + content.city + " " + content.addressDetail
      };
      this.list.push(obj);
      if (content.isDefault) {
        this.radio = len + 1;
      }
      document.querySelector(".addressEdit").style.top = "100%";
    },
    upSave(content) {
      let index = content.id;
      if (content.isDefault) {
        this.radio = index;
      }
      let obj = {
        name: content.name,
        tel: content.tel,
        address:
          content.province + " " + content.city + " " + content.addressDetail
      };
      Object.assign(this.list[index - 1], obj);
      document.querySelector(".addressUpdata").style.top = "100%";
      document.querySelector(".recycl").style.display = "none";
    },
    onDelete(content) {
      if (content.id) {
        this.list.map((item, index) => {
          if (item.id == content.id) {
            this.list.splice(index, 1);
          }
        });
        window.console.log(this.list);
        document.querySelector(".addressUpdata").style.top = "100%";
      } else {
        document.querySelector(".addressEdit").style.top = "100%";
      }
      document.querySelector(".recycl").style.display = "none";
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "B9",
            address: "慧通产业园"
          }
        ];
      } else {
        this.searchResult = [];
      }
    },

    returnPrevious() {
      window.location.href = "http://localhost:8081/#/main/setting";
    },
    according() {
      document.querySelector(".addressEdit").style.top = "10%";
      document.querySelector(".recycl").style.display = "inline-block";
    },
    recycling() {
      document.querySelector(".addressUpdata").style.top = "100%";
      document.querySelector(".addressEdit").style.top = "100%";
      document.querySelector(".recycl").style.display = "none";
    }
  }
};
</script>
<style lang="scss" scoped>
.recycl {
  display: none;
}
.addressEdit,
.addressUpdata {
  position: fixed;
  width: 100%;
  transition: top 0.3s;
  top: 100%; //10
}
.addressBtn {
  position: fixed;
  bottom: 0px;
  left: 0;
  z-index: 2;
  font-size: 14px;
  background: #fff;
  border: 1px solid #0085ff;
  color: #0085ff;
}
.add_o {
  position: absolute;
  top: 50%;
  transform: translate(-100%, -50%);
  z-index: 0;
}
.group {
  position: relative;
  .user {
    width: 280px;
    font-size: 18px;
    font-weight: 600;
    color: rgb(54, 53, 53);
  }
  .uadd {
    width: 280px;
    font-size: 12px;
    color: rgb(175, 175, 175);
  }
  .edit {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 24px;
  }
}
.fr {
  float: right;
}
</style>