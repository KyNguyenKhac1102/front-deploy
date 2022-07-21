import { Box, Modal } from '@mui/material';
import { useHttpClient } from '../../../../CustomHooks/httpClient';
import ModalNganhChart from './ModalNganhChart';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60vw",
    height: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
  };

export default function ModalNganh({open, setOpen}) {
    const {data: hosoperNganh} = useHttpClient('https://localhost:7210/api/TongHop/HosoperNganh');
    const hanldeClose = () => {
        setOpen(false);
    }
  return (
    <Modal
        open={open}
        onClose={hanldeClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
      <ModalNganhChart />
    </Box>
    </Modal>
  )
}
