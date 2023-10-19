import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({rows}) => {
    const columns = [
        { field: 'student_id', headerName: 'ID', width: 90 },
        {
          field: 'student_name',
          headerName: 'Name',
          width: 150,
        },
        {
          field: 'student_course',
          headerName: 'Course',
          width: 150,
        },
        {
          field: 'student_score',
          headerName: 'Score',
          type: 'number',
          width: 90,
        },
        {
          field: 'student_task',
          headerName: 'Task',
          width: 160,
        },
        {
            field: 'student_email',
            headerName: 'Email',
            width: 150,
          },
        
      ];
  return (
   <DataGrid 
        rows={rows}
        columns={columns}
        // initialState={{
        //     pagination: {
        //         paginationModel: {
        //         pageSize: 5,
        //         },
        //     },
        //     }}
        //     pageSizeOptions={[5]}
        //     checkboxSelection
        //     disableRowSelectionOnClick
        />
  )
}

export default DataTable