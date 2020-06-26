import Layout from "../components/Layout";
import Link from "next/link";


const Index = () => {
  return (
    <Layout>
      <Link href="/blogs">
        Open Blogs!
      </Link>
    </Layout>
  );
};
export default Index;
