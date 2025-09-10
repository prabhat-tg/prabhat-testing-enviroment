/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'green-gradient': 'linear-gradient(270deg, #015401 0%, #46aa48 50%, #015401)',
        'green-dark-gradient':
          'linear-gradient(93.97deg, #015401 0%, #46AA48 46.01%, #015401 99.35%)',
      },
      width: {
        '9/10': '90%',
      },
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'], // Sets Roboto as the default for `font-sans`
    },
    boxShadow: {
      none: 'none',
      main: `0px 4px 37px 0px #0F46102B`,
      bottom: '0px 4px 4px 0px #00000045',
      nav: '0px 4px 37px 0px #0F461054',
      card: '0px 1px 3px 0px #63636340',
      searchUsed: '1px 5px 16px 0px #58625936',
      sliderIcon: '0px 4px 4px 0px #00000040',
      forSell: '0px 4px 12px 0px #091F4345',
      buyUsedCard: '0px 4px 37px 0px #0F46102B',
    },
    colors: {
      primary: '#008000',
      secondary: '#00522E',
      header: '#002A17',
      white: '#ffffff',
      black: '#182C3D',
      darkBlack: '#000000',
      'section-gray': '#F5F5F5',
      transparent: 'transparent',
      gray: {
        main: '#666666',
        secondary: '#AFAFAF',
        description: '#848484',
        light: '#D3DAE0',
        lighter: '#DADADA',
        dark: '#595959',
        silver: '#C4C4C4',
        gainsboro: '#D9D9D9',
        grey: '#797979',
        aluminium: '#888D92',
        popup: '#2F2F2F', // must use bg-opacity-45 with this
        menubg: '#afafaf2e', // must use bg-opacity-45 with this
        lightest: '#DDDDDD',
        grayMuted: '#727272',
      },
      green: {
        dark: '#002a17',
        main: '#29852B',
        stone: '#626262',
        mid: '#BBDFBC',
        light: '#46AA4824',
        lighter: '#F4FBF4',
        mint: '#C0EBC0',
        'snowy-mint': '#D2F2D2',
        lightest: '#46AA48',
        soldOut: '#015401',
      },
      blue: {
        main: '',
        link: '#0000EE',
        linkLight: '#3c71b4',
        light: '#0CAEE5',
        lightest: '#EEF8F7',
        lighter: '#F1F3F7',
        skyBlue: '#1DA1F2',
        darkBlue: '#4285F4',
        borderBlue: '#D5EAE8',
        linkedInBlue: "#4588C2"
      },
      red: {
        danger: '#ff4500',
        main: '#ff0000',
        subscribe: '#d30000',
        subBg: '#FFE2E1',
        viewsBG: '#EA3E26',
      },
      purple: {
        main: '#C046F9',
      },
      error: {
        main: '#ef4444',
        report: '#CB2C2C',
      },
    },
  },
  plugins: [],
};
