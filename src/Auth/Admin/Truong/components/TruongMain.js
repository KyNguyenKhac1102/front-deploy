import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import axios from '../../../../api/Truong'
import useAxios from '../../../../CustomHooks/useAxios'
import useAxiosFunction from '../../../../CustomHooks/useAxiosFunction'

const columns = [
    {field: 'id', headerName: "Id", width: 100},
    {
        field: 'maTruong' ,headerName: "Ma Truong", width: 200, type: "number"
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

    // const [response, loading] = useAxios({
    //     axiosInstance: axios,
    //     method: "GET",
    //     url: `admin?sortOrder=${sort}&searchTruong=${search}&page=${page}`,
    // });  

    const [response, loading, error, axiosFetch] = useAxiosFunction();

    const getServerData = () => {
        axiosFetch({
            axiosInstance: axios,
            method: "GET",
            url: `admin?sortOrder=${sort}&searchTruong=${search}&page=${page}`
        })
    }

    useEffect(() => {
        getServerData();
    }, [sort, search, page])

    console.log("loading", loading)
    // console.log("loadugas", setSort)
    // console.log("loadugas", setSearch)
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
    <div className='main-wrapper'>
        <div>Truong</div>
        <div className='main-table'>
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
                    setPage(newPage)}}
                    onPageSizeChange={(newPageSize) => {
                        setNumperPage(newPageSize)
                    }}
                columns={columns}
                />
        </div>
    </div>

  )
}
