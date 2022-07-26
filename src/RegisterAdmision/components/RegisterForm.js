import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { FastField, FieldArray, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import SelectWrapper from '../../components/FormUI/Select';
import Textfield from '../../components/FormUI/Textfield';

import doiTuongUuTien from "../../Data/doiTuongUuTien.json";
import gioiTinh from "../../Data/gioiTinh.json";
import khuVucUuTien from "../../Data/khuVucUuTien.json";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Cookies from 'js-cookie';
import AutoCompleteWrapper from '../../components/FormUI/AutoComplete';
import CustomField from '../../components/FormUI/CustomField';
import CustomSelect from '../../components/FormUI/CustomSelect';
import CustomDatePicker from '../../components/FormUI/DatePicker';
import DependenceField from '../../components/FormUI/DependenceField';
import DependenceField11 from '../../components/FormUI/DependenceField/index11';
import DependenceField12 from '../../components/FormUI/DependenceField/index12';
import Toast from '../../components/FormUI/Toast';
import { useHttpClient } from '../../CustomHooks/httpClient';
import ScoreTable from './ScoreTable';
import UploadFiles from './UploadFiles';
// import { useHttpClientPost } from '../../CustomHooks/httpClientPost';

const token = Cookies.get("jwt");

const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {color:"red"},
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input:{
          "&::placeholder": {
            color: "grey",
            fontSize: "1rem",
            fontWeight: "500"
          },
        }
      }
    }
  },
})

const emptyNv = {
    maNganh: "",
    maToHop: "",
}


const hanldeJsonData = (data) => {
  let jsonNganh = {
  
  };
  data.forEach((item) => (
    jsonNganh[item.maNganh] = item.tenNganh
  ))
  return jsonNganh;
}

// const handleDateTimeFormated = (js_date) => {
//   var output = "";
//   js_date.get
// }

const INIT_VALIDATION = yup.object().shape({
  hoTen: yup.string().required("Required"),
  ngaySinh: yup.date().required("Required").typeError("Date Format"),
  gioiTinh: yup.string().required("Required"),
  soCCCD: yup.string().required("Required"),
  soDienThoai: yup.string().required("Required"),
  email: yup.string().email("Email format").required("Required"),
  maDoiTuong: yup.string().required("Required"),
  maKhuVuc: yup.string().required("Required"),
  diaChiHoKhau: yup.string().required("Required"),

  diaChiLienHe: yup.string().required("Required"),
  hoTenBo: yup.string().required("Required"),
  sdtBo: yup.string().required("Required"),
  hoTenMe: yup.string().required("Required"),
  sdtMe: yup.string().required("Required"),

//   truong10Id: yup.lazy((value) =>
//   typeof value === 'object'
//     ? yup.object().required('Required field').typeError('Required field object') // typeError is necessary here, otherwise we get a bad-looking yup error
//     : yup.string().required('Required field string')
// ),
  truong10Id: yup.string().required("Required").typeError("Chon truong lop 10"),
  truong11Id: yup.string().required("Required").typeError("Chon truong lop 11"),
  truong12Id: yup.string().required("Required").typeError("Chon truong lop 12"),

  // maTruong10: yup.string().required(" "),
  // maTruong11: yup.string().required(" "),
  // maTruong12: yup.string().required(" "),

  // maTinh10: yup.string().required(" "),
  // maTinh11: yup.string().required(" "),
  // maTinh12: yup.string().required(" "),

  studentNguyenVongsDto: yup.array()
    .of(
      yup.object().shape({
        maNganh: yup.string().required("Required"),
        maToHop: yup.string().required("Required")
      })
    ),
  diemToan10: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),
  diemToan11: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),
  diemToan12: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),

  diemLy10: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),
  diemLy11: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),
  diemLy12: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),
  
  diemHoa10: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),
  diemHoa11: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),
  diemHoa12: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),

  diemAnh10: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),
  diemAnh11: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),
  diemAnh12: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),

  diemVan10: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),
  diemVan11: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),
  diemVan12: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),

  diemSinh10: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),
  diemSinh11: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),
  diemSinh12: yup.number("Must be number").min(0, "More than 0").max(10 , "Less than 10").required("Required"),

  // file: yup.mixed().required("Required"),
  files : yup.object().shape({
    AnhThe3x4_JPG: yup.mixed().required("Required"),
    CMND_JPG: yup.mixed().required("Required"),
    DoiTuong_PDF: yup.mixed().required("Required"),
    KhuVuc_PDF: yup.mixed().required("Required"),
    HocBa_PDF: yup.mixed().required("Required"),
  })
  })



export default function RegisterForm({userId}) {

  const INIT_FORM_STATE = {
    userId: userId,
    hoTen: 'Nguyễn Khắc Kỷ',
    ngaySinh: "1999-12-11",
    gioiTinh: "Nam",
    soCCCD: "01111111111111",
    soDienThoai: "0986576418",
    email: "kynguyenkhac28@gmail.com",
    maDoiTuong: "00",
    maKhuVuc: "3",
    diaChiHoKhau: "38 Tuong Mai",
  
    diaChiLienHe :"38 Tuong Mai",
    hoTenBo: "xxx",
    sdtBo: "xxx",
    hoTenMe: "xxx",
    sdtMe: "xxx",
  
    truong10Id: "",
    truong11Id: "",
    truong12Id: "",
  
    studentNguyenVongsDto: [
      {    
        maNganh: "",
        maToHop: "",
      }
    ],
    diemToan10: 7.2,
    diemToan11: 8.5,
    diemToan12: 7.9,
    
    diemLy10: 7.7,
    diemLy11: 7.5,
    diemLy12: 5.4,
  
    diemHoa10: 9.5,
    diemHoa11: 9,
    diemHoa12: 8,
  
    diemAnh10: 9,
    diemAnh11: 9.6,
    diemAnh12: 9.8,
  
    diemVan10: 0,
    diemVan11: 0,
    diemVan12: 0,
  
    diemSinh10: 0,
    diemSinh11: 0,
    diemSinh12: 0,
  
    create_At : "",
    update_At : "",

    files: {
      AnhThe3x4_JPG: "",
      CMND_JPG: "",
      DoiTuong_PDF: "",
      KhuVuc_PDF: "",
      HocBa_PDF: "",
    }
  }

  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");


  const [toastState, setToastState] = useState({
    open: false,
    message: "",
    type: "info"
  })

  const handleClose = () => {
    setToastState({...toastState, open: false})
  }

  // const {data: user} = useHttpClient("https://localhost:7210/login/cookie");
  // setUserData(user);
  const {data : truongData} = useHttpClient(`https://localhost:7210/api/Truong?page=${page}&searchTruong=${searchKey}`);
  const {data : nganhData} = useHttpClient("https://localhost:7210/api/Nganh");

  const optionNganh = hanldeJsonData(nganhData);

  // console.log( "isload", isLoaded)
  // console.log( "error", error)
  // console.log(
  //   "userData", userData
  // )
  return (
  
    <ThemeProvider theme={theme}>
      <Toast {...toastState} handleClose={handleClose} />
      <Box sx={theme => ({
        [theme.breakpoints.up('xl')]: {
          width: "80%" ,margin: "auto",
        },
        [theme.breakpoints.up('xs')]: {
          width: "85%" ,margin: "auto",        
        }
      })}>
        <Formik initialValues={{...INIT_FORM_STATE}} 
        validationSchema={INIT_VALIDATION} 
        onSubmit={(values, {setSubmitting}) => {

          values.create_At = new Date().toLocaleDateString();
          values.update_At = new Date().toLocaleDateString();
          
          console.log("date------", values.create_At.format);
          var formData = new FormData();

          for(var key in values)
          {
            // console.log("key", values[key])
            if(Array.isArray(values[key]))
            {
              var len = values[key].length;
              for(var i=0 ;i <len; i++)
              {
                formData.append(`StudentNguyenVongsDto[${i}].maNganh`, values.studentNguyenVongsDto[i].maNganh);
                formData.append(`StudentNguyenVongsDto[${i}].maToHop`, values.studentNguyenVongsDto[i].maToHop);
              }
            }
            else if(key === "files")
            {
              console.log("----------file", values[key]);
              var item = values[key];
              for(var filekey in item)
              {
                formData.append(`files.${filekey}`, item[filekey])
              }
            }
            else{
              formData.append(key, values[key]);
            }
          }
        //   console.log("---------------", formData.values);
        //   for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }

          axios.post("https://localhost:7210/api/StudentInfo", formData, {
            //authoize, model status
            headers: {
              "Authorization" : `Bearer ${token}`,
              'cache': false,
              'Content-Type' : false,
              'processData': false,
              'Access-Control-Allow-Origin': '*',
              'crossDomain' : true,
          }
          })
          .then(res => {
            setSubmitting(false)
            console.log("upload", res)
            setToastState({
              open: true,
              message: res.data.message,
              type: "success"
            })
          })
          .catch(err => {
            setSubmitting(false)
            
            if(err.response)
            {
              if(err.response.status === 500)
              {
                setToastState({
                  open: true,
                  message: "Loi He Thong",
                  type: "error"
                })
              }
            }

          })
  
          }}>

        {({ values, errors, isSubmitting, isValid }) => (

        <Form noValidate>
        <Grid container spacing={2}>
          
          <Grid item xl={12} xs={12} sm={12} sx={{display: "flex", alignItems: "center", gap: "10px"}}>
            <Box sx={{fontFamily: "fantasy", fontSize: "x-large", fontWeight: "bolder", p: "15px 20px 15px 20px", backgroundColor: "#1976d2", color: "white"}}>1</Box>
            <Box sx={{flexBasis: "inherit" ,fontFamily: "sans-serif", paddingBottom: "10px", backgroundColor: "white", fontSize: "x-large", textTransform: "uppercase", fontWeight: "bolder", color: "#1976d2", borderBottom: "4px solid"}}>thông tin thí sinh</Box>
          </Grid>

          <Grid item xl={5} xs={12} sm={12}>
            <FastField name='hoTen' label="Họ và tên" placeholder="Vd: TRAN PHUONG" component={CustomField}/>
          </Grid>
          <Grid item xl={2} xs={12} sm={12}>
          
            {/* <Textfield name='ngaySinh' label="Ngày sinh" type='date' InputLabelProps={{shrink: true}}/> */}
            <CustomDatePicker name="ngaySinh" label="Ngay Sinh"/>
          </Grid>
          <Grid item xl={2} xs={6} sm={12}>
            <SelectWrapper name='gioiTinh' label="Giới tính" options={gioiTinh}/>
          </Grid>
          <Grid item xl={3} xs={6} sm={12}>
            {/* <Textfield name='soCCCD' label="Số CMND/CCCD"/> */}
            <FastField name='soCCCD' label="Số CMND/CCCD" placeholder="Nhap CMND/CCCD" component={CustomField}/>
          </Grid>

          <Grid item xl={5} xs={12}>
            {/* <Textfield name='soDienThoai' label="Số điện thoại"/> */}
            <FastField name='soDienThoai' label="Số điện thoại" placeholder="Nhap So Dien thoai" component={CustomField}/>
          </Grid>
          <Grid item xl={4} xs={12}>
            {/* <Textfield name='email' label="Email"/> */}
            <FastField name='email' label="Email" placeholder="Nhap Email" component={CustomField}/>
          </Grid>
          <Grid item xl={3} xs={6}>
            <SelectWrapper name='maDoiTuong' label="Đối tượng" options={doiTuongUuTien}/>
          </Grid>

          <Grid item xl={5} xs={6}>
            <SelectWrapper name='maKhuVuc' label="Khu vực" options={khuVucUuTien}/>
          </Grid>
          <Grid item xl={7} xs={12}>
            {/* <Textfield name='diaChiHoKhau' label="Địa chỉ Hộ Khẩu"/> */}
            <FastField name='diaChiHoKhau' label="Địa chỉ Hộ Khẩu" placeholder="Nhap Dia Chi Ho Khau" component={CustomField}/>
          </Grid>

          <Grid item xl={12} xs={12} sx={{display: "flex", alignItems: "center", gap: "10px"}}>
            <Box sx={{fontFamily: "fantasy", fontSize: "x-large", fontWeight: "bolder", p: "15px 20px 15px 20px", backgroundColor: "#1976d2", color: "white"}}>2</Box>
            <Box sx={{flexBasis: "inherit" ,fontFamily: "sans-serif", paddingBottom: "10px", backgroundColor: "white", fontSize: "x-large",
            textTransform: "uppercase", fontWeight: "bolder", color: "#1976d2", borderBottom: "4px solid"}}>thông tin liên hệ</Box>
          </Grid>

            <Grid item xl={12} xs={12}>
              {/* <Textfield name='diaChiLienHe' label="Địa chỉ liên hệ"/> */}
              <FastField name='diaChiLienHe' label="Địa chỉ liên hệ" placeholder="Nhap Dia Chi Lien He" component={CustomField}/>
            </Grid>

            <Grid item xl={8} xs={6}>
              {/* <Textfield name='hoTenBo' label="Họ tên bố"/> */}
              <FastField name='hoTenBo' label="Họ tên bố" placeholder="Nhap Ho Ten Bo" component={CustomField}/>
            </Grid>
            <Grid item xl={4} xs={6}>
              {/* <Textfield name='sdtBo' label="Số điện thoại bố" /> */}
              <FastField name='sdtBo' label="Số điện thoại bố" placeholder="Nhap SDt Bo" component={CustomField}/>
            </Grid>

            <Grid item xl={8} xs={6}>
              {/* <Textfield name='hoTenMe' label="Họ tên mẹ" /> */}
              <FastField name='hoTenMe' label="Họ tên mẹ" placeholder="Nhap Ho Ten Me" component={CustomField}/>
            </Grid>
            <Grid item xl={4} xs={6}>
              {/* <Textfield name='sdtMe' label="Số điện thoại mẹ" /> */}
              <FastField name='sdtMe' label="Số điện thoại mẹ" placeholder="Nhap Sdt Me" component={CustomField}/>
            </Grid>

          <Grid item xl={12} xs={12} sx={{display: "flex", alignItems: "center", gap: "10px"}}>
            <Box sx={{fontFamily: "fantasy", fontSize: "x-large", fontWeight: "bolder", p: "15px 20px 15px 20px", backgroundColor: "#1976d2", color: "white"}}>3</Box>
            <Box sx={{flexBasis: "inherit" ,fontFamily: "sans-serif", paddingBottom: "10px", backgroundColor: "white", fontSize: "x-large",
            textTransform: "uppercase", fontWeight: "bolder", color: "#1976d2", borderBottom: "4px solid"}}>thông tin trường thpt</Box>
          </Grid>

            <Grid item xl={8} xs={12}>
              {/* <Textfield name='truong10Id' label="Trường lớp 10"/> */}
              <AutoCompleteWrapper name='truong10Id' label="Trường lớp 10" options={truongData} page={page} setPage={setPage} setSearchKey={setSearchKey} />
            </Grid>
            <Grid item xl={2} xs={6}>
              {/* <Textfield name='maTruong10' label="Mã trường" readOnly shrink={false} /> */}
              <FastField name='maTruong10' label="Mã trường"  component={DependenceField}/>
            </Grid>
            <Grid item xl={2} xs={6}>
              {/* <Textfield name='maTinh10' label="Mã tỉnh" disabled/> */}
              <FastField name='maTinh10' label="Mã tỉnh" component={DependenceField}/>
            </Grid>

            <Grid item xl={8} xs={12}>
              {/* <Textfield name='truong11Id' label="Trường lớp 11"/> */}
              <AutoCompleteWrapper name='truong11Id' label="Trường lớp 11" options={truongData} page={page} setPage={setPage}  setSearchKey={setSearchKey}/>
              </Grid>
            <Grid item xl={2} xs={6}>
              {/* <Textfield name='maTruong11' label="Mã trường" disabled/> */}
              <FastField name='maTruong11' label="Mã trường"  component={DependenceField11}/>
            </Grid>
            <Grid item xl={2} xs={6}>
              {/* <Textfield name='maTinh11' label="Mã tỉnh" disabled/> */}
              <FastField name='maTinh11' label="Mã tỉnh"   component={DependenceField11}/>
            </Grid>

            <Grid item xl={8} xs={12}>
              {/* <Textfield name='truong12Id' label="Trường lớp 12"/> */}
              <AutoCompleteWrapper name='truong12Id' label="Trường lớp 12" options={truongData} page={page} setPage={setPage}  setSearchKey={setSearchKey} placeholder="Nhap ten truong:"/>
            </Grid>
            <Grid item xl={2} xs={6}>
              {/* <Textfield name='maTruong12' label="Mã trường" disabled/> */}
              <FastField name='maTruong12' label="Mã trường"  component={DependenceField12}/>
            </Grid>
            <Grid item xl={2} xs={6}>
              {/* <Textfield name='maTinh12' label="Mã tỉnh" disabled/> */}
              <FastField name='maTinh12' label="Mã tỉnh"  component={DependenceField12}/>
            </Grid>

          <Grid item xl={12} xs={12} sx={{display: "flex", alignItems: "center", gap: "10px"}}>
            <Box sx={{fontFamily: "fantasy", fontSize: "x-large", fontWeight: "bolder", p: "15px 20px 15px 20px", backgroundColor: "#1976d2", color: "white"}}>4</Box>
            <Box sx={{flexBasis: "inherit" ,fontFamily: "sans-serif", paddingBottom: "10px", backgroundColor: "white", fontSize: "x-large",
            textTransform: "uppercase", fontWeight: "bolder", color: "#1976d2", borderBottom: "4px solid"}}>thông tin đăng ký</Box>
          </Grid>

          
            <FieldArray name='studentNguyenVongsDto'>
              {({push, remove}) => (
                <>
                  {values.studentNguyenVongsDto?.map((_, index) => (
                    
                    <Grid container item spacing={2} key={index} >
                      <Grid item xl={1} xs={3}>
                        <Textfield name={`studentNguyenVongsDto[${index}].stt`} label="Nguyen Vong" 
                        inputProps={{readOnly: true, style: {
                          textAlign: "center"
                        }}} value={index + 1} />
                      </Grid>
                      <Grid item xl={5} xs={4}>
                        <SelectWrapper name={`studentNguyenVongsDto[${index}].maNganh`} label="Nganh" options={optionNganh}/>
                      </Grid>
                      <Grid item xl={2} xs={4}>
                        <CustomSelect name={`studentNguyenVongsDto[${index}].maToHop`}label="To Hop" component={<FastField />}/>
                        {/* <FastField name={`studentNguyenVongsDto[${index}.maToHop]`}label="To Hop" component={CustomSelect} /> */}
                      </Grid>
                      <Grid item xl={1} xs={1}>
                        {values.studentNguyenVongsDto.length > 1 ? <Button onClick={() => {remove(index)}}><ClearIcon /></Button> : ""}
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item>
                    <Button size='large' variant='contained' color='primary' onClick={(index) => {
                      push(emptyNv)
                    }}>Them nguyen vong</Button>
                  </Grid>
                </>
                
              )}
            </FieldArray>

            <Grid item xl={12} sx={{display: "flex", alignItems: "center", gap: "10px"}}>
              <ScoreTable values={values}/>
            </Grid>
            
          <Grid item xl={12} sx={{display: "flex", alignItems: "center", gap: "10px"}}>
            <Box sx={{fontFamily: "fantasy", fontSize: "x-large", fontWeight: "bolder", p: "15px 20px 15px 20px", backgroundColor: "#1976d2", color: "white"}}>5</Box>
            <Box sx={{flexBasis: "inherit" ,fontFamily: "sans-serif", paddingBottom: "10px", backgroundColor: "white", fontSize: "x-large",
            textTransform: "uppercase", fontWeight: "bolder", color: "#1976d2", borderBottom: "4px solid"}}>giấy tờ yêu cầu</Box>
          </Grid>

          <Grid item xl={12} sx={{display: "flex", alignItems: "center", gap: "10px"}}>
            <label >Anh 3x4 (jpg)</label>
              <UploadFiles name="files.AnhThe3x4_JPG"/>
          </Grid>
          <Grid item xl={12} sx={{display: "flex", alignItems: "center", gap: "10px"}}>
              <label >Anh CMND/CCCD (jpg)</label>
              <UploadFiles name="files.CMND_JPG"/>
          </Grid>
          <Grid item xl={12} sx={{display: "flex", alignItems: "center", gap: "10px"}}>
              <label >Scan Doi Tuong uu tien (pdf)</label>
              <UploadFiles name="files.DoiTuong_PDF"/>
          </Grid>
          <Grid item xl={12} sx={{display: "flex", alignItems: "center", gap: "10px"}}>
          <label >Scan Khu Vuc uu tien (pdf)</label>
              <UploadFiles name="files.KhuVuc_PDF"/>
          </Grid>
          <Grid item xl={12} sx={{display: "flex", alignItems: "center", gap: "10px"}}>
          <label >Scan Hoc Ba (pdf)</label>
              <UploadFiles name="files.HocBa_PDF"/>
          </Grid>
          <Grid item>
            <Button disabled={isSubmitting} size="large"  color='primary' variant='contained' type='submit' startIcon={isSubmitting ? <CircularProgress size="0.9rem"/> : undefined}>
              {isSubmitting ?<Typography fontWeight="bolder" fontSize="larger">Đăng Ký...</Typography>: <Typography fontWeight="bolder" fontSize="larger">Đăng Ký</Typography>}
              </Button>
          </Grid>
        </Grid>
        <pre>{JSON.stringify({values, errors}, null, 2)}</pre>
        </Form>
         )}

        </Formik>
      </Box>
      
      </ThemeProvider>
  )
}
