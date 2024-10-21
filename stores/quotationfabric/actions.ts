import type {_ActionsTree} from "pinia";
import type {DataRow} from "~/types/quotation/fabric";
import { v4 as uuidv4 } from 'uuid';

export default function actions(): _ActionsTree {
    return {
        setSelectedRow(id:string) {
            console.log(id)
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
        copyData(start: number, indexDataCopy: string) {
            let dt = this.dataRow as Map<string, DataRow>;
            const dataSelected = JSON.parse(JSON.stringify(dt.get(indexDataCopy) as DataRow));
            dataSelected.id = uuidv4()
            let newMap : Map<string, DataRow> = new Map();
            console.log(start);
            let index = 0;
            for (let [key, value] of dt) {
                if (index === start) {
                    newMap.set(uuidv4(), dataSelected);
                }
                newMap.set(key, value);
                index++;
            }
            this.$patch({
                dataRow: newMap
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

            this.$patch({
                dataRow: dt
            })
        }
    }
}