<script setup lang="ts">

import type {DataRow} from "~/types/quotation/fabric";

const {$store} = useNuxtApp();
const copiedData = ref<any[]|null>([]);

const dataRow = computed((): Map<string, DataRow> => $store.quotationFabric.dataRow);
const grandTotal = computed((): Map<string, DataRow> => $store.quotationFabric.grandTotal);

const indexRowSelected = ref<string | null>(null);
const shiftIsActive = ref<boolean>(false);
const isModalVisisble = ref<boolean>(false);
const alreadyCopied = ref<boolean>(false);
const optionCopyPasteRow = ref<{
  position: string;
  numberOfRow: number;
}>({
  position: "After",
  numberOfRow: 1
})
const moreThanOneRowSelected = ref<string[]>([]);
const moreThanOneRowColumSelected = ref<number | null>(null);
//
//
// Function to copy selected cells
const copySelectedCells = () => {
  // Log copied data for debugging
  if (indexRowSelected.value !== null) {
    alreadyCopied.value = true;
  }
}
//
const pasteCopiedData = () => {
  if (indexRowSelected.value !== null) {
    isModalVisisble.value = true;
    alreadyCopied.value = false;
  }

  // Log for debugging
  console.log('Data pasted');
}
//
const confirmCopiedData = () => {
  if (optionCopyPasteRow.value.position === 'Before' || dataRow.value.size === optionCopyPasteRow.value.numberOfRow) {
    optionCopyPasteRow.value.numberOfRow -= 1;
  }
  $store.quotationFabric.copyData(optionCopyPasteRow.value.numberOfRow, indexRowSelected.value);
  isModalVisisble.value = false;
  indexRowSelected.value = null;
  $store.quotationFabric.clearRowSelected();
}

const updateItem = (index:number, key: string, value: any) => {
  $store.quotationFabric.updateItem(index, key, value);
}
//
// // const clickedNumber = ref(0);
const onClickRow = (index: string) => {
  if (!shiftIsActive.value) {
    document.querySelectorAll('tbody tr td.selected').forEach(row => {
      // Menghapus class 'selected' dari setiap elemen <tr>
      row.classList.remove('selected');
    });
    if (index !== indexRowSelected.value) {
      document.querySelectorAll('tbody tr.selected').forEach(row => {
        // Menghapus class 'selected' dari setiap elemen <tr>
        row.classList.remove('selected');
      });
    }

    $store.quotationFabric.setSelectedRow(index)
    indexRowSelected.value = index;
  }

  if (shiftIsActive.value) {
    $store.quotationFabric.clearRowSelected(index)
    indexRowSelected.value = null;
  }
}
const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}
//
onMounted(() => {

// Paste functionality on Ctrl + V
  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'v') {
      pasteCopiedData();
    }
    if (event.ctrlKey && event.key === 'c') {
      copySelectedCells();
    }
    if (event.key === 'Delete') {
      $store.quotationFabric.delete(indexRowSelected.value)
      indexRowSelected.value = null
    }
    if (event.key === 'Control') {
      shiftIsActive.value = true;
    }
  });
  document.addEventListener('keyup', function(event) {
    if (event.key === 'Control') {
      shiftIsActive.value = false;
      moreThanOneRowColumSelected.value = [];
      moreThanOneRowColumSelected.value = null;
    }
  });
  document.querySelectorAll('tbody tr td').forEach(cell => {
    cell.addEventListener('click', function() {
      const keys = [...dataRow.value.keys()];
      if (shiftIsActive.value) {
        let rowArray = new Set(moreThanOneRowSelected.value);
        // Mendapatkan baris dan kolom dari sel yang diklik
        const rowIndex = this.parentNode.rowIndex; // Indeks baris
        const cellIndex = this.cellIndex;          // Indeks kolom

        rowArray.add(keys[rowIndex - 1])
        moreThanOneRowColumSelected.value = cellIndex;
        moreThanOneRowSelected.value = [...rowArray]
        this.classList.toggle('selected');
      }
    });
  });
})
</script>

<template>
  <div>
    <QuotationHeader />
  </div>
  <div class="flex flex-row items-center text-[9pt]">
    <table id="tableQuotation" class="table-auto w-full border border-collapse border-black">
      <thead>
      <tr>
        <th class="border border-black px-1 py-2 bg-gray-200">No</th>
        <th class="border border-black px-4 py-2">Item</th>
        <th class="border border-black px-4 py-2">Description</th>
        <th class="border border-black px-4 py-2">Image</th>
        <th class="border border-black px-1 py-2">Qty</th>
        <th class="border border-black px-1 py-2">Unit</th>
        <th class="border border-black px-4 py-2">Unit Cost</th>
        <th class="border border-black px-4 py-2">Total Cost</th>
        <th class="border border-black px-4 py-2">Remarks</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, key) in dataRow" :key="key" @click="onClickRow(value[0])" :class="{'selected': value[1].isSelected}">
        <td class="border border-black px-2 py-2 text-center hover:cursor-no-drop bg-gray-200">{{key+1}}</td>
        <td class="border border-black px-2 py-2 hover:cursor-cell w-[10%]">{{value[1].item.value}}</td>
        <td class="border border-black px-2 py-2 truncate w-[20%] hover:cursor-cell text-wrap">{{value[1].description.value}}</td>
        <td class="border border-black px-3 py-2 hover:cursor-cell">{{value[1].image.value}}</td>
        <td class="border border-black px-4 py-2 text-center hover:cursor-cell" contenteditable="true"
            @input="updateItem(value[0], 'qty', $event.target.innerText)">
          {{value[1].qty.value}}
        </td>
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
        <td class="border border-black px-4 py-2 truncate w-[20%] text-wrap">
          {{value[1].remarks.value}}
        </td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="7" class="py-2 px-2 font-bold text-right border border-black">TOTAL</td>
        <td class="py-2 px-2 font-bold text-justify border border-black">
          <div class="flex justify-between">
            <span class="font-semibold">IDR</span>
            <span class="font-semibold">{{formatCurrency(grandTotal, 'id-ID', 'IDR')}}</span>
          </div>
        </td>
      </tr>
      </tfoot>
    </table>
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
  </div>
</template>

<style scoped>
/**
td {
  padding: 5px;
  border: 1px solid black;
}
table {
  border-collapse: collapse;
}
**/
.selected {
  border: 2px solid red;
}
</style>