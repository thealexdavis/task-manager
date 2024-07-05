export const tableColumns = [
  {
    title: "Bulk Actions",
    slug: "action",
    sortable: false,
    filterable: false,
    filterVals: false,
    showTitle: false,
    showInOverview: true
  },
  {
    title: "Task Name",
    slug: "task_name",
    sortable: true,
    filterable: false,
    filterVals: false,
    showTitle: true,
    showInOverview: true
  },
  {
    title: "Task Description",
    slug: "task_description",
    sortable: false,
    filterable: false,
    filterVals: false,
    showTitle: false,
    showInOverview: false
  },
  {
    title: "Status",
    slug: "task_status",
    sortable: true,
    filterable: true,
    filterVals: ["All", "Complete", "Incomplete", "Pending"],
    showTitle: true,
    showInOverview: true
  },
  {
    title: "Date Created",
    slug: "date_created",
    sortable: true,
    filterable: false,
    filterVals: false,
    showTitle: true,
    showInOverview: true
  },
  {
    title: "Date Completed",
    slug: "date_completed",
    sortable: true,
    filterable: false,
    filterVals: false,
    showTitle: true,
    showInOverview: true
  },
  {
    title: "Modal",
    slug: "modal_btns",
    sortable: false,
    filterable: false,
    filterVals: false,
    showTitle: false,
    showInOverview: true
  },
];
