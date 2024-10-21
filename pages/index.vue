<script setup lang="ts">

import type {DataRow} from "~/types/quotation/fabric";

const {$store} = useNuxtApp();
const copiedData = ref<any[]|null>([]);

const dataRow = computed((): DataRow[] => $store.quotationFabric.dataRow);

const indexRowSelected = ref<number | null>(null);
const isModalVisisble = ref<boolean>(false);
const alreadyCopied = ref<boolean>(false);
const optionCopyPasteRow = ref<{
  position: string;
  numberOfRow: number;
}>({
  position: "After",
  numberOfRow: 1
})


// Function to copy selected cells
const copySelectedCells = () => {
  // const selectedCells = document.querySelectorAll('.selected');
  // copiedData.value = [];

  // Store the data of selected cells
  // selectedCells.forEach(cell => {
  //   copiedData.value.push(cell.textContent);
  // });

  // Log copied data for debugging
  if (indexRowSelected.value !== null) {
    alreadyCopied.value = true;
  }
  console.log('Copied Data:', copiedData);
}

const pasteCopiedData = () => {
  // const table = document.getElementById('tableQuotation').getElementsByTagName('tbody')[0];
  // const newRow = table.insertRow();  // Insert new row
  //
  // copiedData.value?.forEach(data => {
  //   const newCell = newRow.insertCell();
  //   newCell.textContent = data;
  //   newCell.contentEditable = "true"; // Make cells editable like the original table
  // });
  if (indexRowSelected.value !== null) {
    isModalVisisble.value = true;
    alreadyCopied.value = false;
  }

  // Log for debugging
  console.log('Data pasted');
}

const confirmCopiedData = () => {
  const dataSelected = dataRow.value.at(indexRowSelected.value);
  const dataFromState = dataRow.value;
  if (optionCopyPasteRow.value.position === "Before") {
    optionCopyPasteRow.value.numberOfRow -= 1;
  }
  dataFromState.splice(optionCopyPasteRow.value.numberOfRow, 0, dataSelected);
  dataRow.value = dataFromState;
  // dataRow.value.forEach((item, index) => {
  //   item.no.value = index + 1
  // })
  isModalVisisble.value = false;
  indexRowSelected.value = null;
  document.querySelectorAll('tbody tr.selected').forEach(row => {
    // Menghapus class 'selected' dari setiap elemen <tr>
    row.classList.remove('selected');
  });
}

const updateItem = (index:number, key: string, value: any) => {
  dataRow.value[index][key].value = value;
  console.log(index, key);
}

// const clickedNumber = ref(0);
const onClickRow = (index: number) => {
  $store.quotationFabric.setSelectedRow(index)
  if (index !== indexRowSelected.value) {

    document.querySelectorAll('tbody tr.selected').forEach(row => {
      // Menghapus class 'selected' dari setiap elemen <tr>
      row.classList.remove('selected');
    });

  }

  dataRow.value.forEach(e => e.isSelected = false)
  dataRow.value[index].isSelected = true;
  indexRowSelected.value = index;
  console.log(dataRow.value[index])
}

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
      <tr v-for="(dt, i) in dataRow" :key="dt.no" @click="onClickRow(i)" :class="{'selected': dt.isSelected}">
        <td class="border border-black px-2 py-2 text-center hover:cursor-no-drop bg-gray-200">{{i+1}}</td>
        <td class="border border-black px-4 py-2 hover:cursor-cell">{{dt.item.value}}</td>
        <td class="border border-black px-4 py-2 truncate w-[10%] hover:cursor-cell">{{dt.description.value}}</td>
        <td class="border border-black px-3 py-2 hover:cursor-cell">{{dt.image.value}}</td>
        <td class="border border-black px-4 py-2 text-center hover:cursor-cell" contenteditable="true" @input="updateItem(i, 'qty', $event.target.innerText)">{{dt.qty.value}}</td>
        <td class="border border-black px-4 py-2 text-center hover:cursor-cell">{{dt.unit.value}}</td>
        <td class="border border-black px-4 py-2">
          <div class="flex justify-between">
            <span>Rp</span>
            <span>{{dt.unitCost.value}}</span>
          </div>
        </td>
        <td class="border border-black px-4 py-2">
          <div class="flex justify-between">
            <span>Rp</span>
            <span>{{dt.totalCost.value}}</span>
          </div>
        </td>
        <td class="border border-black px-4 py-2 truncate w-[20%]">{{dt.remarks.value}}</td>
      </tr>
<!--      <tr>-->
<!--        <td contenteditable="true">John</td>-->
<!--        <td contenteditable="true">25</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td contenteditable="true">Jane</td>-->
<!--        <td contenteditable="true">30</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td contenteditable="true">Doe</td>-->
<!--        <td contenteditable="true">35</td>-->
<!--      </tr>-->
      </tbody>
      <tfoot>
      <tr>
        <td colspan="7" class="py-2 px-2 font-bold text-right border border-black">TOTAL</td>
        <td class="py-2 px-2 font-bold text-justify border border-black">
          <div class="flex justify-between">
            <span class="font-semibold">IDR</span>
            <span class="font-semibold">0</span>
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