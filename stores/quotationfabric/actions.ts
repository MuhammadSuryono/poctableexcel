import type {_ActionsTree} from "pinia";

export default function actions(): _ActionsTree {
    return {
        setSelectedRow(index:number) {
            console.log(index);
        }
    }
}