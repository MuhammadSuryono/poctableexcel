import type {DataRow} from "~/types/quotation/fabric";
import { v4 as uuidv4 } from 'uuid';

export interface RootState {
    dataRow: Map<string, DataRow>;
    grandTotal: number;
}

export const createState = (): Partial<RootState> => {
    const dataFabric : Map<string, DataRow> = new Map();
    dataFabric.set(uuidv4(), {
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
            value: 78000,
            indexCol: 6
        },
        totalCost: {
            type: "numeric",
            value: 78000,
            indexCol: 7
        },
        remarks: {
            type: "string",
            value: "Ready Jakarta 6-7 wokring days delivery",
            indexCol: 8
        },
        id: uuidv4()
    })
    dataFabric.set(uuidv4(), {
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
            value: 10,
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
            value: 250000,
            indexCol: 7
        },
        remarks: {
            type: "string",
            value: "Ready Jakarta 6-7 wokring days delivery",
            indexCol: 8
        },
        id: uuidv4()
    })

    let grandTotal = 0;
    dataFabric.forEach(value => grandTotal += value.totalCost.value)
    return {
        dataRow: dataFabric,
        grandTotal: grandTotal
    } as Partial<RootState>
}