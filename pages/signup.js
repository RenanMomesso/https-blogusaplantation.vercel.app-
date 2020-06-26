import Layout from "../components/Layout";
import SignupComponent from "../components/auth/SignupComponent";

const Signup = () => {
  console.log("this is Signup page now");
  return (
    <Layout>
      <div className="testando">

      <h2 className="text-center pt-4 pb-4" >Signup</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
        <SignupComponent />
        </div>
      </div>
      </div>
    </Layout>
  );
};
export default Signup;
