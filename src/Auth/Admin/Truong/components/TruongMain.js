import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { useHttpClient } from '../../../../CustomHooks/httpClient'
import useAxios from '../../../../CustomHooks/useAxios'
import axios from '../../../../api/Truong';

const columns = [
    {field: 'id', headerName: "Id", width: 100},
    {
        field: 'maTruong' ,headerName: "Ma Truong", width: 200,
    },
    {
        field: "tenTruong", headerName: "Ten Truong", width: 300,
    },
    {
        field: "diaChi", headerName: "Dia Chi", width: 400
    },
    {
        field: "maTinh", headerName: "Ma Tinh", width: 100
    },
    {
        field: "maKhuVuc", headerName: "Khu Vuc", width: 100
    }
    
]

export default function TruongMain() {
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [numperPage, setNumperPage] = useState(20);
    // const  {data: truongData, isLoaded} = useHttpClient(`https://localhost:7210/api/Truong/admin?sortOrder=${sort}&searchTruong=${search}&page=${page}`);

    const [response, loading, error] = useAxios({
        axiosInstance: axios,
        method: "GET",
        url: `admin?sortOrder=${sort}&searchTruong=${search}&page=${page}`,
        requestConfig: {
            headers: {
            }
        }
    });

    console.log("loadugas", loading)

    // console.log("resmain", response);

    // let rows = [];
    // let rowCount = 0;
    // if(response !== null)
    // {
    //     rows = response?.truongs;
    //     rowCount = response?.pageCount;
    // }
        

    // let rows = [];
    // let rowCount = 0;

    // if(truongData?.truongs !== undefined)
    // {
    //     rows = truongData.truongs;
    //     rowCount = truongData.pageCount;
    // }
    // console.log("truongdata", rows);


    let rows = [];
    let rowCount = 0;

    if(response.truongs !== undefined)
    {
        rows = response?.truongs;
        rowCount = response?.pageCount;
    }
    // console.log("LOADING...", loading)


  return (
    <Box sx={{ height: 400, width: '100%', padding: "20px" }}>
        <Typography>Truong </Typography>
        <DataGrid
            rows={loading ? [] :rows}
            rowCount={rowCount}
            loading={loading}
            rowsPerPageOptions={[20]}
            pagination
            page={page}
            pageSize={numperPage}
            paginationMode='server'
            onPageChange={(newPage) => {
                console.log("NEWPAGE", newPage)
                setPage(newPage)}}
                onPageSizeChange={(newPageSize) => {
                    setNumperPage(newPageSize)
                }}
            columns={columns}
        />
        {/* <Button variant='contained' onClick={() => navigate("/hoso/create")}>Create</Button> */}
  </Box>
  )
}
