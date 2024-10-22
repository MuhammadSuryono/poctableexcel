<script setup lang="ts">

import type {DataRow} from "~/types/quotation/fabric";

const {$store} = useNuxtApp();

const dataRow = computed((): Map<string, DataRow> => $store.quotationFabric.dataRow);
const grandTotal = computed((): Map<string, DataRow> => $store.quotationFabric.grandTotal);

const indexRowSelected = ref<string | null>(null);
const isModalVisisble = ref<boolean>(false);
const alreadyCopied = ref<boolean>(false);
const optionCopyPasteRow = ref<{
  position: string;
  numberOfRow: number;
}>({
  position: "After",
  numberOfRow: 1
})
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
//
// // const clickedNumber = ref(0);
const onClickRow = (index: string) => {
  if (index !== indexRowSelected.value) {
    document.querySelectorAll('tbody tr.selected').forEach(row => {
      // Menghapus class 'selected' dari setiap elemen <tr>
      row.classList.remove('selected');
    });

  }

  $store.quotationFabric.setSelectedRow(index)
  indexRowSelected.value = index;
}
//
onMounted(() => {
  // Copy functionality on Ctrl + C
  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'c') {
      copySelectedCells();
    }
  });

// Paste functionality on Ctrl + V
  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'v') {
      pasteCopiedData();
    }
  });

// Paste functionality on Ctrl + V
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
      $store.quotationFabric.delete(indexRowSelected.value)
      indexRowSelected.value = null
    }
  });
})

const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}
</script>

<template>
  <div class="flex flex-col">
    <QuotationHeader />
    <GeneralConfigProperties />
  </div>
  <div class="flex mt-2 bg-biru-100 w-full text-white p-3 font-semibold">
    DICKSON  Fabrics - Stock Per 02/10/2024
  </div>
  <div class="flex flex-col items-start text-[9pt]">
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
      <tr v-for="(value, key) in dataRow" :key="key" @click="onClickRow(value[0])" :class="{'selected': value[1].isSelected, 'bg-yellow-300': value[1].divider}">
        <td class="border border-black px-2 py-2 text-center hover:cursor-no-drop bg-gray-200">{{key+1}}</td>
        <QuotationFabricRowTable :key-row="key" :value="value" v-if="!value[1].divider" />
        <td class="bg-yellow-300" colspan="8" v-if="value[1].divider"></td>
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
    <div class="flex flex-col mt-3">
      <span class="font-semibold">NOTE :</span>
      <ul class="list-disc ml-5">
        <li>Above the price include VAT 11%</li>
        <li>Payment Terms :
          <ul>
            <li>Fabric : DP 50% - 50% Seatlement After Delivery</li>
          </ul>
        </li>
        <li>Account Bank Details:</li>
        <li>Nama Bank : <span class="font-semibold">BANK CENTRAL ASIA</span></li>
        <li>Address : KCU Cipete Blok A Jakarta </li>
        <li>Acc. Namek : <span class="font-semibold">PT. Amardeep Indo Sakti</span></li>
        <li>Acc. No : 2183023914</li>
        <li>Swift Code : <span class="font-semibold">CENAIDJA</span></li>
        <li>For the documents of tax invoices (Faktur Pajak), receipts and other invoices will be issued after we receive the payment</li>
        <li>We will order all the items above after receiving  Down Payment & PO, and the delivery will be confirmed subject to availability of goods from factory</li>
        <li>Validity time period of this quotation only 3 days from the date above</li>
      </ul>
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
@media print {
  .no-print {
    display: none;
  }
}
</style>