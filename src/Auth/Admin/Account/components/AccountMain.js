import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from '../../../../CustomHooks/httpClient';


const columns = [
  {field: 'id', headerName : "ID", width: 300},
  {
    field: 'userName',
    headerName : 'User Name',
    width: 250,
  },
  {
    field: "email",
    headerName: 'Email',
    width: 250,
  },
  {
    field: "roles",
    headerName: "Roles",
    width: 250
  }
]

export default function AccountMain() {
  let navigate = useNavigate();

  const {data, isLoaded} = useHttpClient("https://localhost:7210/accounts");



  let rows = [];
  if(data.accounts !== undefined)
  {
    rows = data?.accounts;
  }


  return (
    <Box sx={{ height: 400, width: '100%', padding: "20px" }}>
      <Typography>Account</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        loading={isLoaded}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      <Button variant='contained' sx={{marginTop: "10px"}} onClick={() => navigate("/account/create")}>Create</Button>
    </Box>
  );
}
