import { TextField } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { useHttpClient } from '../../../../CustomHooks/httpClient';
import "./HosoDetailMain.css";
import maChuyenNganh from "../../../../Data/maChuyenNganh.json";
 
const token = Cookies.get("jwt");

const config = {
    headers: {
        "Authorization" : `Bearer ${token}`
    }
}

export default function HosoDetailMain() {
    const {id} = useParams();
    const [urls, setUrls] = useState([]);

    const {data} = useHttpClient(`https:localhost:7210/api/StudentInfo/${id}`);
    const {data: nganhs} = useHttpClient("https:localhost:7210/api/Nganh");

    const getPresignedUrls = () => {
        axios.post(`https://localhost:7210/api/AwsS3Upload/presignedUrls`, [
            {
                label: "Anh 3x4",
                key: data.anh3x4_Key
            },
            {
                label: "Scan CCCD/CMND",
                key: data.scanCCCD_Key
            },
            {
                label: "Ban Scan Doi Tuong",
                key: data.scanDoiTuong_Key
            },
            {
                label: "Ban Scan Khu Vuc",
                key: data.scanKhuVuc_Key
            },
            {
                label: "Ban Scan Hoc Ba",
                key: data.scanHocBa_Key
            }
        ])
        .then(res => {setUrls(res.data)
        console.log("res" ,res)})
        .catch(err => console.log(err))
    }


    console.log("URLS", urls)


    useEffect(() => {
        if(data.length !== 0)
        {
            console.log( "dsa",data);
            getPresignedUrls();
        }

    }, [data])

  return (
    <div className='wrapper'>
        {/* file1 <Link to={{pathname: url}} target="_blank">file1</Link> */}
            <div className='basic-info'>
                <div className='card-header'>
                    Basic Info
                </div>
                <div className='content-wrapper'>
                    <div className='row'>
                        <div className='row-label'>Id</div>
                        <div className='row-data'>{data.id}</div>
                    </div>
                    <div className='row'>
                        <div className='row-label'>Ho Ten</div>
                        <div className='row-data'>{data.hoTen}</div>
                    </div>
                    <div className='row'>
                        <div className='row-label'>Ngay sinh</div>
                        <div className='row-data'>{data.ngaySinh}</div>       
                    </div>
                    <div className='row'>
                        <div className='row-label'>gioiTinh</div>
                        <div className='row-data'>{data.gioiTinh}</div>       
                    </div>
                    <div className='row'>
                        <div className='row-label'>soCCCD</div>
                        <div className='row-data'>{data.soCCCD}</div>       
                    </div>
                    <div className='row'>
                        <div className='row-label'>soDienThoai</div>
                        <div className='row-data'>{data.soDienThoai}</div>       
                    </div>
                    <div className='row'>
                        <div className='row-label'>Email</div>
                        <div className='row-data'>{data.email}</div>       
                    </div>
                    <div className='row'>
                        <div className='row-label'>DiaChiHoKhau</div>
                        <div className='row-data'>{data.diaChiHoKhau}</div>       
                    </div>
                    <div className='row'>
                        <div className='row-label'>MaDoiTuong</div>
                        <div className='row-data'>{data.maDoiTuong}</div>       
                    </div>
                    <div className='row'>
                        <div className='row-label'>MaKhuVuc</div>
                        <div className='row-data'>{data.maKhuVuc}</div>       
                    </div>
                    <div className='row'>
                        <div className='row-label'>DiaChiLienHe</div>
                        <div className='row-data'>{data.diaChiLienHe}</div>
                    </div>
                    <div className='row'>
                        <div className='row-label'>HoTenBo</div>
                        <div className='row-data'>{data.hoTenBo}</div>
                    </div>
                    <div className='row'>
                        <div className='row-label'>SdtBo</div>
                        <div className='row-data'>{data.sdtBo}</div>
                    </div>
                    <div className='row'>
                        <div className='row-label'>HoTenMe</div>
                        <div className='row-data'>{data.sdtMe}</div>
                    </div>
                </div>
            </div>

            <div className='basic-info'>
                <div className='card-header'>
                        School Info
                </div>
                <div className='content-wrapper'>
                    <div className='row'>
                        <div className='row-label'>Truong 10</div>
                        <div className='row-data'>{data.truong10Info?.tenTruong }</div>
                    </div>
                    <div className='row'>
                        <div className='row-label'>Truong 11</div>
                        <div className='row-data'>{data.truong11Info?.tenTruong }</div>
                    </div>
                    <div className='row'>
                        <div className='row-label'>Truong 12</div>
                        <div className='row-data'>{data.truong12Info?.tenTruong }</div>
                    </div>
                    
                </div>
            </div>

            <div className='basic-info boxDiem'>
                <div className='card-header'>
                        Score Info
                </div>
                <div className='content-wrapper diemWrapper-content'>
                    <div className='diemContent'>
                        <div className='diemHeader'>Diem Lop 10</div>
                        <div className='row'>
                            <div className='row-label'>diemToan</div>
                            <div className='row-data'>{data.diemToan10}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemLy</div>
                            <div className='row-data'>{data.diemLy10}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemHoa</div>
                            <div className='row-data'>{data.diemHoa10}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemSinh</div>
                            <div className='row-data'>{data.diemSinh10}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemAnh</div>
                            <div className='row-data'>{data.diemAnh10}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemVan</div>
                            <div className='row-data'>{data.diemVan10}</div>
                        </div>
                    </div>
                    <div className='diemContent'>
                    <div className='diemHeader'>Diem Lop 11</div>
                        <div className='row'>
                            <div className='row-label'>diemToan</div>
                            <div className='row-data'>{data.diemToan11}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemLy</div>
                            <div className='row-data'>{data.diemLy11}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemHoa</div>
                            <div className='row-data'>{data.diemHoa11}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemSinh</div>
                            <div className='row-data'>{data.diemSinh11}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemAnh</div>
                            <div className='row-data'>{data.diemAnh11}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemVan</div>
                            <div className='row-data'>{data.diemVan11}</div>
                        </div>
                    </div>
                    <div className='diemContent'>
                    <div className='diemHeader'>Diem Lop 12</div>
                        <div className='row'>
                            <div className='row-label'>diemToan</div>
                            <div className='row-data'>{data.diemToan12}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemLy</div>
                            <div className='row-data'>{data.diemLy12}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemHoa</div>
                            <div className='row-data'>{data.diemHoa12}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemSinh</div>
                            <div className='row-data'>{data.diemSinh12}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemAnh</div>
                            <div className='row-data'>{data.diemAnh12}</div>
                        </div>
                        <div className='row'>
                            <div className='row-label'>diemVan</div>
                            <div className='row-data'>{data.diemVan12}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='basic-info box3'>
                <div className='card-header'>
                        Required paper
                </div>
                <div className='content-wrapper'>
                    {urls?.map((item, index) => (
                        <div className='row' key={index}>
                            <div className='row-data'><a target="_blank" href={item?.presignedUrl}>{item.label}</a></div>
                        </div>
                    ))}

                    {/* <div className='row'>
                        <div className='row-label'>Anh 3x4</div>
                        <div className='row-data'><a target="_blank" href={url}>Anh 3x4 File</a></div>
                    </div>
                    <div className='row'>
                        <div className='row-label'>Anh 3x4</div>
                        <div className='row-data'><a target="_blank" href={url}>Anh 3x4 File</a></div>
                    </div>
                    <div className='row'>
                        <div className='row-label'>Anh 3x4</div>
                        <div className='row-data'><a target="_blank" href={url}>Anh 3x4 File</a></div>
                    </div>
                    <div className='row'>
                        <div className='row-label'>Anh 3x4</div>
                        <div className='row-data'><a target="_blank" href={url}>Anh 3x4 File</a></div>
                    </div> */}
                </div>
            </div>

        <div className='basic-info boxDiem'>
                <div className='card-header'>
                        Info
                </div>
                <div className='content-wrapper'>
                {data.studentNguyenVongs?.map((nv, index) => (
            <div key={nv.stt_NguyenVong} className="nguyenvong-container">
              <TextField value={nv.stt_NguyenVong} label="Nguyen Vong" />
              <TextField
                value={nv.nganh.maNganh + " - " + nv.nganh.tenNganh}
                label="Nganh"
                style={{ paddingLeft: 5, width: 450 }}
              />
              <TextField
                value={nv.maToHop}
                label="To Hop"
                className="space"
                style={{ paddingLeft: 5 }}
              />
              <TextField
                value={nv.diemToHop}
                label="Diem To Hop"
                className="space"
                style={{ paddingLeft: 5 }}
              />
            </div>
          ))}
                </div>
            </div>
    </div>
  )
}
