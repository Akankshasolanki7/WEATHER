import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert, Slide } from '@mui/material';
import { closeSnackbar } from '../features/snackbarSlice';

const SlideTransition = (props) => <Slide {...props} direction="down" />;

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.snackbar);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Top-right corner
      autoHideDuration={700}
      onClose={() => dispatch(closeSnackbar())}
      TransitionComponent={SlideTransition}
      sx={{
        // mt: 1.5,
        maxWidth: '90%',
        zIndex: (theme) => theme.zIndex.snackbar + 10,
      }}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={severity}
        onClose={() => dispatch(closeSnackbar())}
        sx={{
          width: '100%',
          boxShadow: 3,
          fontWeight: 500,
          letterSpacing: 0.5,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
