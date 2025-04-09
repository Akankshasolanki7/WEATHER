import { createTheme } from '@mui/material/styles';

const theme = darkMode =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light', // Dynamic mode
      primary: {
        main: darkMode?"#FFA726":'#3b30c8',
      },
      secondary: {
        main: '#2cbc34',
      },
      danger: {
        main: '#DA2C2C',
      },
      neutral: {
        main: '#eae9ff',
      },
      success: {
        main: '#2cbc34',
      },
      error: {
        main: '#f44336',
      },
      common: {
        white: '#fff',
        black: '#000000',
      },
      // 23262f
      background: {
        default: darkMode ? '#434343' : '#FAFCFF', // Background colors based on dark mode
        paper: darkMode ? '#23262f' : '#FAFCFF',
        header: darkMode ? '#434343' : '#f5f5f5',
      },
      text: {
        primary: darkMode ? '#eae9ff' : '#333333', // Primary text color changes based on mode
        secondary: darkMode ? '#aaa' : '#555555', // Secondary text color changes based on mode
      },
    },

    typography: {
      fontFamily: '"Roboto", "Arial", sans-serif',

      // Heading 1
      h1: {
        fontSize: '2.25rem',
        fontWeight: 700,
        lineHeight: 1.5,
        color: darkMode ? '#000' : '#333333',
      },
      h2: {},
      h3: {
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: 1.4,
        color: darkMode ? '#cccccc' : '#000',
        letterSpacing: '0.01em',
        textAlign: 'left',
      },
      // Heading 4
      h4: {
        fontSize: '1.25rem',
        fontWeight: 500,
        lineHeight: 1.4,
        color: darkMode ? '#cccccc' : '#000',
        letterSpacing: '0.01em',
        textAlign: 'left',
      },

      // Heading 5
      h5: {
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: 1.4,
        letterSpacing: '0.02em',
        textAlign: 'left',
        color: darkMode ? '#cccccc' : '#000',
      },

      // Heading 6
      h6: {
        fontSize: '14px',
        fontWeight: 700,
        lineHeight: 1.4,
        color: darkMode ? '#fff' : '#000',
        letterSpacing: '0.03em',
        textAlign: 'left',
      },

      // Body Text (Normal Paragraph)
      body: {
        fontSize: '.90rem',
        fontWeight: 600, // Regular weight
        lineHeight: 1.5,
        // color: darkMode ? '#fff' : '#444444',
        textAlign: 'left',
      },

      body1: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: 1.6,
        color: darkMode ? '#bbb' : '#777777',
        textAlign: 'left',
      },
      body2: {
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: 1.43,
        color: darkMode ? '#bbb' : '#777777',
        textAlign: 'left',
      },

      // Subheading or secondary body text
      subheading: {
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: 1.43,
        // color: darkMode ? '#000' : '#fff',
        textAlign: 'left',
      },

      // Links (Added back)
      link: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.6,
        color: darkMode ? '#81d4fa' : '#007BFF',
        textDecoration: 'underline',
        textTransform: 'none',
        letterSpacing: '0em',
      },

      // Caption Text (small text usually below images)
      caption: {
        fontSize: '0.75rem',
        fontWeight: 300,
        lineHeight: 1.1,
        color: darkMode ? '#bbb' : '#777777',
        textAlign: 'center',
      },

      // Small Text (fine print or legal disclaimers)
      small: {
        fontSize: '0.75rem',
        fontWeight: 300,
        lineHeight: 1.4,
        color: darkMode ? '#fff' : '#888888',
        textAlign: 'left',
      },
    },

    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    spacing: 8,

    shape: {
      borderRadius: 8,
    },


  });

export default theme;
