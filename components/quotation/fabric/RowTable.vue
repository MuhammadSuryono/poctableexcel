<script setup lang="ts">
const { $store } = useNuxtApp();
interface Props {
  keyRow: number;
  value: any[] | null
}

withDefaults(defineProps<Props>(), {
  keyRow: 0,
  value: []
})

const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

const updateItem = (index:number, key: string, value: any) => {
  $store.quotationFabric.updateItem(index, key, value);
}
</script>

<template>
  <td class="border border-black px-4 py-2 hover:cursor-cell">{{value[1].item.value}}</td>
  <td class="border border-black px-4 py-2 truncate w-[10%] hover:cursor-cell">{{value[1].description.value}}</td>
  <td class="border border-black px-3 py-2 hover:cursor-cell">{{value[1].image.value}}</td>
  <td class="border border-black px-4 py-2 text-center hover:cursor-cell" contenteditable="true" @input="updateItem(value[0], 'qty', $event.target.innerText)">{{value[1].qty.value}}</td>
  <td class="border border-black px-4 py-2 text-center hover:cursor-cell">{{value[1].unit.value}}</td>
  <td class="border border-black px-4 py-2">
    <div class="flex justify-end">
      <!--            <span>Rp</span>-->
      <span>{{formatCurrency(value[1].unitCost.value, 'id-ID', 'IDR')}}</span>
    </div>
  </td>
  <td class="border border-black px-4 py-2">
    <div class="flex justify-end">
      <!--            <span>Rp</span>-->
      <span>{{formatCurrency(value[1].totalCost.value, 'id-ID', 'IDR')}}</span>
    </div>
  </td>
  <td class="border border-black px-4 py-2 truncate w-[20%]">{{value[1].remarks.value}}</td>
</template>

<style scoped>

</style>