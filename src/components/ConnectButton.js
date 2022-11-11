import { LoadingButton } from '@mui/lab';

/// design?: 'orange' | 'gray' | 'green' | 'yellow';
const ConnectButton = (props) => {
  const { design = 'orange', size = 'medium' } = props;
  return (
    <LoadingButton
      sx={{
        fontFamily: 'Avenir',
        color: '#F5E6D5',
        padding: '8px 20px 8px 20px',
        borderRadius: '10px',
        border: '1px solid #FFFFFF',
        backgroundColor: '#544940',
      }}
      classes={{
        sizeLarge: 'h-15 text-xl',
        sizeMedium: 'h-11',
      }}
      {...props}
    />
  );
};

export default ConnectButton;
