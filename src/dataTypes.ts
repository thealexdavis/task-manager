export type TableDataTypes = {
  id: number;
  task_name: string;
  task_description: string;
  task_status: number;
  date_created: string;
  date_completed: string | number;
}[]

export type TableColumnTypes = {
  title: string;
  slug: string;
  sortable: boolean;
  filterable: boolean;
  filterVals: any;
  showTitle: boolean;
  showInOverview: boolean;
}[]

export type CheckedIds = {
    id: number | null;
}

export type BulkActionTypes = {
    checkedIds: any[];
    tempId: number | null;
    action: string;
};

export type HandleSortTypes ={
    sortSlug: string; 
    columnDir: string;
};

export type HandleFilterTypes ={
    slug: string; 
    value: number;
};