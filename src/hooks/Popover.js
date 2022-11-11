import React from 'react';

const usePopover = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const onClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return [Boolean(anchorEl), anchorEl, onClick, onClose];
};

export default usePopover;
