import Link from "next/link";
import Admin from "../../../components/auth/Admin";
import Layout from "../../../components/Layout";
import ReadBlogs from '../../../components/crud/ReadBlogs'

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Update blog</h2>
            </div>
            <div className="col-md-12">
                    <ReadBlogs/>
            </div>
           
          </div>
        </div>
      </Admin>
    </Layout>
  );
};
export default Blog;
