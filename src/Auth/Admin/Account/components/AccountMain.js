import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import useAxiosFunction from '../../../../CustomHooks/useAxiosFunction';
import axios from '../../../../api/Auth';
import { useCallback, useEffect, useState } from 'react';
import Toast from '../../../../components/FormUI/Toast';
import "./AccountMain.css"


export default function AccountMain() {
  let navigate = useNavigate();

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
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
  
          //delete here
          serverDelete(params.row.id);
        }
        return <Button variant='contained' color="error" onClick={onClick}>Delete</Button>
      }
    }
  ]

  const [response, loading, error ,axiosFetch] = useAxiosFunction();

  const getServerData = useCallback(() => {
    axiosFetch({
     axiosInstance : axios,
     url : "/accounts",
     method: "GET",
   })
 }, [axiosFetch]);
  

  const serverDelete = async (id) => {
    await axiosFetch({
      axiosInstance : axios,
      url: `/account/${id}`,
      method: "DELETE", 
      setToastState: setToastState,
    })

    getServerData();
  }


  useEffect(() => {
    getServerData();
  }, [])

  // const serverDelete = (email) => {
  //   axios.delete(`https://admission1-api.azurewebsites.net/${id}`, config)
  //   .then(res => {
  //     getServerData();
  //   })
  //   .catch(err => console.log(err))
  // }
  
  // const getServerData = useCallback(() => {
  //   setLoading(true);
  //   axios.get("https://admission1-api.azurewebsites.net/accounts", config)
  //   .then(res => {
  //     setTableData(res.data)
  //     setLoading(false);
  //   })
  //   .catch(err => console.log(err));
  // }, [config])
  
  //   useEffect(() => {
  //     getServerData();
  //   }, [setTableData, getServerData])

  const [toastState, setToastState] = useState({
    open: false,
    message: "",
    type: "info"
});

const handleClose = () => {
    setToastState({...toastState ,open: false})
}

  return (
    <div className='main-wrapper'>
      <Toast {...toastState} handleClose={handleClose}/>
        <div>Account</div>
        <div className='main-table'>
          <DataGrid
            rows={response?.accounts ? response?.accounts : []}
            columns={columns}
            pageSize={5}
            loading={loading}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>

        <Button variant='contained' sx={{marginTop: "10px"}} onClick={() => navigate("/account/create")}>Create</Button>
    </div>
  );
}
