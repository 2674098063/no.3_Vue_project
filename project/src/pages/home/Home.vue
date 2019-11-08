<template>
  <div>
    <Search />
    <Grid />
    <DropdownMenu />
    <van-divider
      content-position="left"
      :style="{ color: '#000000', borderColor: '#000011', padding: '10px 16px' }"
    >推荐商家</van-divider>
    <Card />
  </div>
</template>
<script>
import Search from "./Search";
import Grid from "./Grid";
import Card from "./Card";
import DropdownMenu from "./DropdownMenu";
export default {
  components: {
    Search,
    Grid,
    DropdownMenu,
    Card
  }
};
</script>