<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 15.688 15.658"
  >
    <path
      id="Path_13087"
      data-name="Path 13087"
      d="M5.961,3.263V.541A.541.541,0,0,0,5.018.179L.145,5.593a.541.541,0,0,0-.017.7L5,12.252a.541.541,0,0,0,.96-.342v-2.7c4.277.139,6.946,1.967,8.149,5.576a.541.541,0,0,0,.513.37.525.525,0,0,0,.087-.007.541.541,0,0,0,.454-.534C15.165,8.242,11.327,3.558,5.961,3.263ZM5.42,8.121a.541.541,0,0,0-.541.541v1.732L1.261,5.972l3.618-4.02V3.789a.541.541,0,0,0,.541.541c4.255,0,7.44,2.945,8.378,7.437C12.056,9.345,9.25,8.121,5.42,8.121Z"
      transform="translate(0.273 0.25)"
      :fill="`${disabled ? '#CFD8DC' : '#000'}`"
      :stroke="`${disabled ? '#CFD8DC' : '#000'}`"
      stroke-width="0.5"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '15.688',
    },
    height: {
      type: String,
      default: '15.658',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
