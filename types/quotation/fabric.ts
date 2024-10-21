
export type prefixTypeColumn = "string" | "numeric"

export interface DataConfigColumn {
    type: prefixTypeColumn,
    value: string | number;
    indexCol: number;
}

export interface DataRow {
    no: DataConfigColumn;
    item: DataConfigColumn;
    description: DataConfigColumn;
    image: DataConfigColumn;
    qty: DataConfigColumn;
    unit: DataConfigColumn;
    unitCost: DataConfigColumn;
    totalCost: DataConfigColumn;
    remarks: DataConfigColumn;
    isSelected: boolean;
    id: string;
}

export interface DataDelete {
    index: number;
    data: Map<string, DataRow>
}