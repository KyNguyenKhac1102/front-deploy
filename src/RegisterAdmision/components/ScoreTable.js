import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { FastField, useFormikContext } from 'formik'
import React from 'react'
import CustomField from '../../components/FormUI/CustomField'

const handleRenderDiemToHop = (listToHop) => {
    let listRender = [];
    if(listToHop.includes("A00"))
    {
        if(listRender.indexOf('T') === -1)
        {
            listRender.push('T');
        }
        if(listRender.indexOf('L') === -1)
        {
            listRender.push('L');
        }
        if(listRender.indexOf('H') === -1)
        {
            listRender.push('H');
        }
    }
    if(listToHop.includes("A01"))
    {
        if(listRender.indexOf('T') === -1)
        {
            listRender.push('T');
        }
        if(listRender.indexOf('L') === -1)
        {
            listRender.push('L');
        }
        if(listRender.indexOf('A') === -1)
        {
            listRender.push('A');
        }
    }
    if(listToHop.includes("A02"))
    {
        if(listRender.indexOf('T') === -1)
        {
            listRender.push('T');
        }
        if(listRender.indexOf('L') === -1)
        {
            listRender.push('L');
        }
        if(listRender.indexOf('S') === -1)
        {
            listRender.push('S');
        }
    }
    if(listToHop.includes("B00"))
    {
        if(listRender.indexOf('T') === -1)
        {
            listRender.push('T');
        }
        if(listRender.indexOf('H') === -1)
        {
            listRender.push('H');
        }
        if(listRender.indexOf('S') === -1)
        {
            listRender.push('S');
        }
    }
    if(listToHop.includes("D01"))
    {
        if(listRender.indexOf('T') === -1)
        {
            listRender.push('T');
        }
        if(listRender.indexOf('V') === -1)
        {
            listRender.push('V');
        }
        if(listRender.indexOf('A') === -1)
        {
            listRender.push('A');
        }
    }
    if(listToHop.includes("D07"))
    {
        if(listRender.indexOf('T') === -1)
        {
            listRender.push('T');
        }
        if(listRender.indexOf('H') === -1)
        {
            listRender.push('H');
        }
        if(listRender.indexOf('A') === -1)
        {
            listRender.push('A');
        }
    }
    if(listToHop.includes("D08"))
    {
        if(listRender.indexOf('T') === -1)
        {
            listRender.push('T');
        }
        if(listRender.indexOf('S') === -1)
        {
            listRender.push('S');
        }
        if(listRender.indexOf('A') === -1)
        {
            listRender.push('A');
        }
    }
    return listRender;
}

export default function ScoreTable({values}) {
    // const { setFieldValue, values } = useFormikContext();

    let listToHop = [];
    values.studentNguyenVongsDto.map((item) => {
        if(listToHop.indexOf(item.maToHop) === -1)
        {
            listToHop.push(item.maToHop);
        }
    })


    const listRender = handleRenderDiemToHop(listToHop);
  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell>Mon Hoc</TableCell>
            <TableCell align="right">Diem Lop 10</TableCell>
            <TableCell align="right">Diem Lop 11</TableCell>
            <TableCell align="right">Diem Lop 12</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {listRender.includes('T') ? 
                <TableRow >
                    <TableCell>Toan</TableCell>
                    <TableCell><FastField name='diemToan10' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                    <TableCell><FastField name='diemToan11' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                    <TableCell><FastField name='diemToan12' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                </TableRow> 
                : 
                <TableRow></TableRow>  
            }
            {listRender.includes('L') ? 
                <TableRow >
                    <TableCell>Ly</TableCell>
                    <TableCell><FastField name='diemLy10' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                    <TableCell><FastField name='diemLy11' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                    <TableCell><FastField name='diemLy12' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                </TableRow> 
                : 
                <TableRow></TableRow>  
            }
            {listRender.includes('H') ? 
                <TableRow >
                    <TableCell>Hoa</TableCell>
                    <TableCell><FastField name='diemHoa10' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                    <TableCell><FastField name='diemHoa11' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                    <TableCell><FastField name='diemHoa12' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                </TableRow> 
                : 
                <TableRow></TableRow>  
            }
            {listRender.includes('A') ? 
                <TableRow >
                    <TableCell>Anh</TableCell>
                    <TableCell><FastField name='diemAnh10' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                    <TableCell><FastField name='diemAnh11' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                    <TableCell><FastField name='diemAnh12' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                </TableRow> 
                : 
                <TableRow></TableRow>  
            }
            {listRender.includes('V') ? 
                <TableRow >
                    <TableCell>Van</TableCell>
                    <TableCell><FastField name='diemVan10' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                    <TableCell><FastField name='diemVan11' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                    <TableCell><FastField name='diemVan12' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                </TableRow> 
                : 
                <TableRow></TableRow>  
            }
            {listRender.includes('S') ? 
                <TableRow >
                    <TableCell>Sinh</TableCell>
                    <TableCell><FastField name='diemSinh10' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                    <TableCell><FastField name='diemSinh11' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                    <TableCell><FastField name='diemSinh12' type="number" inputProps={{min: 0, max: 10, step: 0.1}} component={CustomField}/></TableCell>
                </TableRow> 
                : 
                <TableRow></TableRow>  
            }
        </TableBody>
        </Table>
    </TableContainer>
  )
}
