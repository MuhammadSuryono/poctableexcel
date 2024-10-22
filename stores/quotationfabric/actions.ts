import type {_ActionsTree} from "pinia";
import type {DataRow} from "~/types/quotation/fabric";
import { v4 as uuidv4 } from 'uuid';

export default function actions(): _ActionsTree {
    return {
        setSelectedRow(id:string) {
            let dt = this.dataRow as Map<string, DataRow>;
            dt.forEach(e => e.isSelected = false)
            dt.get(id).isSelected = true;
            this.$patch({
                dataRow: dt
            })
        },
        clearRowSelected() {
            let dt = this.dataRow as Map<string, DataRow>;
            dt.forEach(e => e.isSelected = false)
            this.$patch({
                dataRow: dt
            })
        },
        delete(index: string) {
            let dt = this.dataRow as Map<string, DataRow>;
            dt.delete(index)

            let grandTotal = 0;
            dt.forEach(value => grandTotal += value.totalCost.value)
            this.$patch({
                dataRow: dt,
                grandTotal: grandTotal
            })
        },
        copyData(start: number, indexDataCopy: string) {
            let dt = this.dataRow as Map<string, DataRow>;
            const dataSelected = JSON.parse(JSON.stringify(dt.get(indexDataCopy) as DataRow));
            dataSelected.id = uuidv4()
            let newMap : Map<string, DataRow> = new Map();
            let index = 0;
            for (let [key, value] of dt) {
                if (index === start && start !== (dt.size - 1)) {
                    newMap.set(uuidv4(), dataSelected);
                }
                newMap.set(key, value);
                if (index === start && start === (dt.size - 1)) {
                    newMap.set(uuidv4(), dataSelected);
                }
                index++;
            }
            let grandTotal = 0;
            newMap.forEach(value => grandTotal += value.totalCost.value)
            this.$patch({
                dataRow: newMap,
                grandTotal: grandTotal
            })
        },
        addDivider(start: number) {
            let dt = this.dataRow as Map<string, DataRow>;
            const dataSelected : DataRow = {
                isSelected: false,
                no: {
                    type: "numeric",
                    value: 1,
                    indexCol: 0
                },
                item: {
                    type: "string",
                    value: " ",
                    indexCol: 1
                },
                description: {
                    type: "string",
                    value: "",
                    indexCol: 2
                },
                image: {
                    type: "string",
                    value: "",
                    indexCol: 3
                },
                qty: {
                    type: "numeric",
                    value: 0,
                    indexCol: 4
                },
                unit: {
                    type: "string",
                    value: "",
                    indexCol: 5
                },
                unitCost: {
                    type: "numeric",
                    value: 0,
                    indexCol: 6
                },
                totalCost: {
                    type: "numeric",
                    value: 0,
                    indexCol: 7
                },
                remarks: {
                    type: "string",
                    value: "",
                    indexCol: 8
                },
                id: uuidv4(),
                divider: true
            };
            let newMap : Map<string, DataRow> = new Map();
            let index = 0;
            for (let [key, value] of dt) {
                if (index === start && start !== (dt.size - 1)) {
                    newMap.set(uuidv4(), dataSelected);
                }
                newMap.set(key, value);
                if (index === start && start === (dt.size - 1)) {
                    newMap.set(uuidv4(), dataSelected);
                }
                index++;
            }
            this.$patch({
                dataRow: newMap,
            })
        },
        deepCopy(obj: any) {
            return JSON.parse(JSON.stringify(obj));
        },
        updateItem (index:string, key: string, value: any) {
            let dt = this.dataRow as Map<string, DataRow>;
            const dataSelected = JSON.parse(JSON.stringify(dt.get(index)))  as DataRow;
            dataSelected[key].value = value
            if (key === 'qty') {
                dataSelected.totalCost.value = parseInt(dataSelected[key].value) * dataSelected.unitCost.value
            }
            dt.set(index, dataSelected)

            let grandTotal = 0;
            dt.forEach(value => grandTotal += value.totalCost.value)
            this.$patch({
                dataRow: dt,
                grandTotal: grandTotal
            })
        }
    }
}