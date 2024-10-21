import type {DataRow} from "~/types/quotation/fabric";

export interface RootState {
    dataRow: DataRow[];
}

export const createState = (): Partial<RootState> => {
    return {
        dataRow: [
            {
                isSelected: false,
                no: {
                    type: "numeric",
                    value: 1,
                    indexCol: 0
                },
                item: {
                    type: "string",
                    value: "Fabric ",
                    indexCol: 1
                },
                description: {
                    type: "string",
                    value: "Dickson BS Foret Naturel #ORC 8555",
                    indexCol: 2
                },
                image: {
                    type: "string",
                    value: "No Image",
                    indexCol: 3
                },
                qty: {
                    type: "numeric",
                    value: 1,
                    indexCol: 4
                },
                unit: {
                    type: "string",
                    value: "mtr",
                    indexCol: 5
                },
                unitCost: {
                    type: "numeric",
                    value: 25000,
                    indexCol: 6
                },
                totalCost: {
                    type: "numeric",
                    value: 25000,
                    indexCol: 7
                },
                remarks: {
                    type: "string",
                    value: "Ready Jakarta 6-7 wokring days delivery",
                    indexCol: 8
                }
            }
        ]
    } as Partial<RootState>
}