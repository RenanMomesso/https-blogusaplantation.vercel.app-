import Layout from '../components/Layout'
import Link from 'next/link'
import SigninComponent from '../components/auth/SigninComponent'
import {withRouter} from 'next/router'


const Signin = ({router}) => {
   
  const showRedirectMessage = () => {
    if (router.query.message) {
        return <div className="alert alert-danger">{router.query.message}</div>;
    } else {
        return;
    }
};

    return (
      <Layout>
        <div className="testando">
        <h2 className="text-center pt-4 pb-4" >Signin</h2>
        <div className="container-fluid">
        {showRedirectMessage()}
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
          <SigninComponent />
          </div>
        </div>
        </div>
      </Layout>
    );
  };
export default withRouter(Signin);