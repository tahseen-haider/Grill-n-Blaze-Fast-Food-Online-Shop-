import PropTypes from 'prop-types';
import Footer from "./Footer";
import "../../styles/HeaderStyle.css"
import Header from './navbar/Header';

export default function Layout({ children }) {
  return (
    <div className='min-w-400'>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
