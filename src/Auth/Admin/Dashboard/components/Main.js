import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useHttpClient } from '../../../../CustomHooks/httpClient'
import './Main.css'
import MainChart from './MainChart';
import ModalDoiTuong from './ModalDoiTuong';
import ModalNganh from './ModalNganh';

export default function Main() {
  const {data : countHoSo} = useHttpClient("https://localhost:7210/api/TongHop");
  const {data: hosoNganhHighest} = useHttpClient('https://localhost:7210/api/TongHop/GetMostHosoperNganh');
  const {data: hosoDoiTuongHighest} = useHttpClient('https://localhost:7210/api/TongHop/GetMostHosoperDoiTuong');

  const [openModalNganh, setOpenModalNganh] = useState(false);
  const [openModalDoiTuong, setOpenModalDoiTuong] = useState(false);
  
  const hanldeOpenModalNganh = () => {
    setOpenModalNganh(true);
  }
  const hanldeOpenModalDoiTuong = () => {
    setOpenModalDoiTuong(true);
  }
  return (
    <div className='main-container'>
      <div className='box-container'>
        <div className='box'>
          <div className='label'>Hồ sơ nhận được</div>
          <div className='detail-container'>
            <div id="count-hoso">{countHoSo}</div>
          </div>
        </div>
        <div className='box'>
          <div className='label'>Ngành HOT</div>
          <div className='detail-container'>
            <div className='count'>{hosoNganhHighest.hosoCount}</div>
            <div className='detail'><Button variant='contained' onClick={hanldeOpenModalNganh}>view detail</Button></div>
            <ModalNganh open={openModalNganh} setOpen={setOpenModalNganh}/>
          </div>
        </div>
        <div className='box'>
          <div className='label'>Hồ sơ ĐT ưu tiên</div>
          <div className='detail-container'>
            <div className='count'>{hosoDoiTuongHighest.hosoCount}</div>
            <div className='detail'><Button variant='contained' onClick={hanldeOpenModalDoiTuong}>view detail</Button></div>
            <ModalDoiTuong open={openModalDoiTuong} setOpen={setOpenModalDoiTuong}/>
          </div>
        </div>
      </div>
      <div className='chart-container'>
        <MainChart />
        </div>
    </div>
  )
}
