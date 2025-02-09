/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        logo: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      colors: {
        condo: {
          dark: 'rgba(0,87,80,255)',
          med: 'rgba(0,200,145,255)',
          light: 'rgba(157,255,189,255)',
          orange: 'rgba(255,202,115,255)',
          yellow: 'rgba(255,235,180,255)'
        },
        base: {
          dark1: '#004740', //10% mørkere
          dark2: '#003830', //20% mørkere
          dark3: '#002820', //30%mørkere
          light1: '#00786A', // 10% lysere
          light2: '#00957F', //20% lysere
          light3: '#00B38C', //30% lysere
          light0: 'rgba(230, 255, 235, 255)', //nesten hvitt
          white: 'rgba(242, 251, 250, 1)' 
        },
        light: {
          4: 'rgba(177, 255, 202, 255)',//mørkest
          3: 'rgba(196, 255, 216, 255)',
          2: 'rgba(216, 255, 229, 255)',
          1: 'rgba(235, 255, 243, 255)'
        },
        dark: {
          4: 'rgba(51, 121, 115, 255)', //mørkest
          3: 'rgba(102, 154, 150, 255)',
          2: 'rgba(153, 188, 185, 255)',
          1: 'rgba(204, 221, 220, 255)'
        },
        yellow: {
          4: 'rgba(255, 245, 200, 1)',
          3: 'rgba(255, 250, 210, 1)',
          2: 'rgba(255, 253, 230, 1)',
          1: 'rgba(255, 255, 240, 1)' //nesten hvitt
        },
        orange: {
          10 : 'rgb(237, 162, 28)',
          9: 'rgb(239, 171, 57)',
          8: 'rgb(245, 187, 86)',
          7: 'rgba(255, 202, 115, 255)'
        }
      },
      textShadow: {
        'glow': '0 0 4px rgba(255, 255, 255, 0.5)',
        'soft': '0 0 4px rgba(0, 0, 0, 0.3)',
        'yellow': '0 0 5px rgba(255, 255, 240, 0.5)',
        'light-grey': '2px 2px 4px rgba(0, 0, 0, 0.25)',
        'light': '2px 2px 7px rgba(235, 255, 243, 255, 1)',
        'xs': '0 0 2px rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}