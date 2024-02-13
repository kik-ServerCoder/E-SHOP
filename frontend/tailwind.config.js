/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
"./app/**/*.{js,ts,jsx,tsx,mdx}",
"./pages/**/*.{js,ts,jsx,tsx,mdx}",
"./components/**/*.{js,ts,jsx,tsx,mdx}",
],
theme: {
extend: {},
},
plugins: [require("daisyui")],
daisyui: {
    themes: ["nord","light","dark"], 
    darkTheme: "dark", 
    base: true, 
    styled: true, 
    utils: true, 
    prefix: "", 
    logs: true,
    themeRoot: ":root", 
  },
}