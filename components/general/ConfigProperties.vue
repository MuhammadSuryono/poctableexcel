<script setup lang="ts">
import type {DataRow} from "~/types/quotation/fabric";

const { $store } = useNuxtApp();
const dataRow = computed((): Map<string, DataRow> => $store.quotationFabric.dataRow);
const isModalVisisble = ref<boolean>(false);
const optionCopyPasteRow = ref<{
  position: string;
  numberOfRow: number;
}>({
  position: "After",
  numberOfRow: 1
})
//
const confirmCopiedData = () => {
  if (optionCopyPasteRow.value.position === 'Before' || dataRow.value.size === optionCopyPasteRow.value.numberOfRow) {
    optionCopyPasteRow.value.numberOfRow -= 1;
  }
  $store.quotationFabric.addDivider(optionCopyPasteRow.value.numberOfRow);
  isModalVisisble.value = false;
  $store.quotationFabric.clearRowSelected();
}
</script>

<template>
  <div class="border my-4 px-3 py-1 border-gray-500 w-full text-[11px] no-print shadow-lg">
    <div class="flex flex-col w-fit border py-1 px-2 rounded-md cursor-pointer hover:bg-gray-200 border-gray-500" @click="isModalVisisble = true">
      <span>Divider</span>
      <span class="rounded-xl px-2 py-1 bg-yellow-300"></span>
    </div>
  </div>
  <GeneralModal :is-visible="isModalVisisble" title="Copy Row" @onClose="(v: boolean) => isModalVisisble = v">
    <div class="flex flex-col gap-2">
      <div class="mb-4">
        <label for="position" class="block text-gray-700 font-bold mb-2">Position</label>
        <select type="text" v-model="optionCopyPasteRow.position" id="position" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option>Before</option>
          <option>After</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="numberRow" class="block text-gray-700 font-bold mb-2">Number Of Row</label>
        <input type="number" v-model="optionCopyPasteRow.numberOfRow" id="numberRow" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="John Doe">
      </div>
      <div class="flex justify-items-center gap-3">
        <button class="bg-white rounded-md px-4 py-2 border-gray-500 border" @click="isModalVisisble = false">Cancel</button>
        <button class="bg-biru-100 rounded-md px-4 py-2 text-white" @click="confirmCopiedData()">Ok</button>
      </div>
    </div>
  </GeneralModal>
</template>

<style scoped>

</style>