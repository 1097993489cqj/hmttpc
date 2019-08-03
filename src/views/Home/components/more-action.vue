<template>
<van-dialog :value="value" closeOnClickOverlay @input="$emit('input')"
:showConfirmButton="false" :show-confirm-button="false">

更多内容
</van-dialog>
</template>

<script>
export default {
  name: 'MoreAction',
  //   props:['']
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='less' scoped>

</style>
