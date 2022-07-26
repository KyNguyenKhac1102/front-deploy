import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';


const token = Cookies.get("jwt");


export default function HosoMain() {
  const columns = [
    {field: 'id', headerName : "ID", width: 100},
    {
      field: 'hoTen',
      headerName : 'Ho ten',
      width: 250,
      renderCell: (params) => {
        let id = params.row.id;
        console.log(params.row);
        return <Link to={`/hoso/${id}`}>{params.row.hoTen}</Link>
      }
    },
    {
      field: "email",
      headerName: 'Email',
      width: 250,
    },
    {
      field: "maDoiTuong",
      headerName: "Doi Tuong",
      width: 250
    },
    {
      field: "maKhuVuc",
      headerName: "Khu Vuc",
      width: 250
    },
    {
      field: "create_At",
      headerName: "Create At",
      width: 250
    },
    {
      field: "update_At",
      headerName: "Update At",
      width: 250
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          
          serverDelete(params.row.id);
        }
        return <Button variant='contained' color='error' onClick={onClick}>Delete</Button>
      }
    }
  ]
  

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const {data, isLoaded} = useHttpClient("https://localhost:7210/api/StudentInfo/hosos");

  // console.log("hoso DATA", data)


const config = useMemo(() => {
  return {
    headers: {
      "Authorization" : `Bearer ${token}`
  }
  }
}, [])

const serverDelete = (id) => {
  axios.delete(`https://admission1-api.azurewebsites.net/api/StudentInfo/${id}`, config)
  .then(res => {
    getServerData();
  })
  .catch(err => console.log(err))
}

const getServerData = useCallback(() => {
  setLoading(true);
  axios.get("https://admission1-api.azurewebsites.net/api/StudentInfo/hosos", config)
  .then(res => {
    setTableData(res.data)
    setLoading(false);
  })
  .catch(err => console.log(err));
}, [config])

  useEffect(() => {
    getServerData();
  }, [setTableData, getServerData])

  // let rows = data;


  return (
    <Box sx={{ height: 400, width: '100%', padding: "20px" }}>
      <Typography>Ho so</Typography>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={loading}
        checkboxSelection
        disableSelectionOnClick
      />
      {/* <Button variant='contained' onClick={() => navigate("/hoso/create")}>Create</Button> */}
    </Box>
  );
}
