import Layout from "../../components/Layout";
import Link from "next/link";
import Private from "../../components/auth/Private";

const userIndex = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>User dashboard</h2>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="user/crud/create">Create Blog</a>
                </li>
                <li className="list-group-item">
                  <Link href="user/crud/blogs">
                    <a>Update/Delete blogs</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <a href="/user/update">Update Profile</a>
                </li>
              </ul>
            </div>
            <div className="col-md-8">right</div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};
export default userIndex;
