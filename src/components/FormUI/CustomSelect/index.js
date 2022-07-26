
import { MenuItem, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import group1ToHop from '../../../data/group1ToHop.json';
import group2ToHop from '../../../data/group2ToHop.json';
import group3ToHop from '../../../data/group3ToHop.json';

var r = /\d+/;

const group1 = ["TLA101", "TLA104", "TLA111", "TLA113", "TLA102", "TLA107", "TLA110", "TLA103", "TLA106", "TLA116", "TLA117", "TLA126", "TLA127", "TLA105", "TLA123", "TLA120", "TLA125", "TLA112", "TLA121", "TLA124", "TLA114", "TLA401", "TLA402", "TLA403", "TLA408"];
const group2 = ["TLA118"]
const group3 = ["TLA119"]

const handleNganhToHop = (tenNganhValue) => {
  let options = [];
  if(group1.includes(tenNganhValue))
  {
    options = group1ToHop;
  }else if(group2.includes(tenNganhValue))
  {
    options = group2ToHop;
  }else if(group3.includes(tenNganhValue))
  {
    options = group3ToHop;
  }
  return options;
}

const CustomSelect = ({ name, options, component ,...otherProps }) => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(name);
  
  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const index = parseInt(name.match(r)[0]);
  const tenNganhValue = values.studentNguyenVongsDto[index].maNganh;
  let disabled = false;
  console.log("TEN NGANH CHOOSEE", tenNganhValue);

  options = handleNganhToHop(tenNganhValue, options);
  if(options.length === 0)
  {
    options = ["Choose Ten Nganh first"];
    disabled = true;
  }

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    required: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }
  
  return (
      <TextField {...configSelect} required>
        {Object.keys(options).map((item, pos) => {
          return (
            <MenuItem disabled={disabled} key={pos} value={item}>
              {options[item]}
            </MenuItem>
          );
        })}
      </TextField>
  );
};

export default CustomSelect;
