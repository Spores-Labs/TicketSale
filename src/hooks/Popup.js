import React from 'react';

const usePopup = (open = false) => {
  const [isOpen, setIsOpen] = React.useState(open);

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return [isOpen, onOpen, onClose];
};

export default usePopup;
