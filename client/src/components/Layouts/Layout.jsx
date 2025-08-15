import PropTypes from 'prop-types';
import Footer from "./Footer";
import Header from "./Header";
import "../../styles/HomeStyle.css"

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
