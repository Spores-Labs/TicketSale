import React from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

const useAlert = () => {
  const { message, variant, key, onUpdate } = useSelector(({ alert }) => alert);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (onUpdate) {
      enqueueSnackbar(message, { variant, key });
    }
  }, [enqueueSnackbar, message, variant, key, onUpdate]);
};

export default useAlert;
