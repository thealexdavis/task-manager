export const tableData = localStorage.getItem("taskData") ? JSON.parse(localStorage.getItem("taskData") as string) : [
  {
    id: 1,
    task_name: "AA Task Name",
    task_description: "Z Task Description",
    task_status: 2,
    date_created: "2024-06-15 12:00:00",
    date_completed: false
  },
  {
    id: 2,
    task_name: "B Task Name",
    task_description: "X Task Description",
    task_status: 1,
    date_created: "2024-06-05 12:00:00",
    date_completed: "2024-06-29 12:00:00"
  },
  {
    id: 3,
    task_name: "C Task Name",
    task_description: "Y Task Description",
    task_status: 3,
    date_created: "2024-07-02 12:00:00",
    date_completed: 0
  },
  {
    id: 4,
    task_name: "G Task Name",
    task_description: "6 Task Description",
    task_status: 1,
    date_created: "2024-06-23 12:00:00",
    date_completed: "2024-06-29 12:00:00"
  },
  {
    id: 5,
    task_name: "R Task Name",
    task_description: "2 Task Description",
    task_status: 3,
    date_created: "2024-06-08 12:00:00",
    date_completed: 0
  },
  {
    id: 6,
    task_name: "W Task Name",
    task_description: "5 Task Description",
    task_status: 2,
    date_created: "2024-06-22 12:00:00",
    date_completed: 0
  }
];