
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Header from './custom/header';
import Footer from './custom/footer';

function App({ Component, pageProps }) {
  return (
    <div data-theme="nord">
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </div>
  );
}

export default App;