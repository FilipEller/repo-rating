import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#EAEAEA',
    textSecondary: '#C3C3C3',
    textDark: '#222',
    primary: ['#B5A2FA', '#AE9CF0'],
    borderColor: '#444',
    debugBorder: '#cc888850',
    error: ['#CF6679', '#C76174'],
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  elevation: ['#121212', '#1A1A1A', '#202020', '#252525'],
}

export default theme
