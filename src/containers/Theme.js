import { createTheme, ThemeProvider } from '@mui/material';

export const appTheme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body1: 'div',
          body2: 'div',
          inherit: 'div',
        },
      },
      styleOverrides: {
        h1: { fontSize: 48, fontWeight: 700 },
        h2: { fontSize: 36, fontWeight: 700 },
        h3: { fontSize: 24, fontWeight: 700 },
        h4: { fontSize: 20, fontWeight: 700 },
        h5: { fontSize: 16, fontWeight: 700 },
        h6: { fontSize: 14, fontWeight: 700 },
        subtitle1: { fontSize: 16, fontWeight: 500 },
        subtitle2: { fontSize: 14, fontWeight: 500 },
        body1: { fontSize: 16 },
        body2: { fontSize: 14 },
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          maxWidth: 'calc(1280px + 48px) !important',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
        size: 'medium',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          background: 'linear-gradient(31.65deg, #DEB856 6.17%, #FDE29B 93.12%)',
          color: '#17204D',
          '&:hover': {
            background: 'linear-gradient(59.24deg, #EECC75 18.13%, #F9EDCB 95.47%)',
          },
          '&.Mui-disabled': {
            background: '#EBECF0',
          },
        },
        contained: {
          '&.MuiButton-containedError': {
            background: '#FF5630',
            color: '#FFF',
            border: '2px solid silver',
            '&:hover': {
              background: '#FF3630',
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: `url(${require('assets/designs/dots-white.png')}) no-repeat center right -20px`,
            },
          },
        },
        sizeLarge: { minHeight: 48, minWidth: 48 },
        sizeMedium: { minHeight: 40, minWidth: 40 },
        sizeSmall: { minHeight: 32, minWidth: 32 },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        focused: true,
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            color: '#FFF',
            '&.Mui-focused fieldset': {
              borderColor: '#5E6484',
            },
            '& .MuiSvgIcon-root': {
              color: '#FFF',
            },
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          fontSize: 13,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        target: '_blank',
        underline: 'none',
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
        root: {
          '& .MuiBackdrop-root': {
            background: 'rgba(24, 24, 24, 0.9)',
          },
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        transformOrigin: { vertical: 'top', horizontal: 'right' },
        PaperProps: {
          style: {
            backgroundColor: '#372e49cc',
            color: '#fff',
            marginTop: 8,
            border: '1px solid #624266',
          },
        },
      },
    },
    MuiPagination: {
      defaultProps: {
        variant: 'outlined',
        shape: 'rounded',
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#655349',
          color: '#F5E6D5',
        },
        body: {
          backgroundColor: 'transparent',
          color: '#F5E6D5',
        },
        root: {
          borderBottom: '1px solid #655349',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Segoe UI Variable',
  },
  palette: {
    primary: {
      main: '#FFD751',
    },
  },
});

const Theme = ({ children }) => {
  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
};

export default Theme;
