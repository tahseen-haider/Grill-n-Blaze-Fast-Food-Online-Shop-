import Layout from "../../components/Layouts/Layout";
import Section1 from "./Section1";
import Section2 from "./Section2";
import '../../styles/HomeStyle.css'

export default function Home() {
  return (
    <Layout>
      <Section1/>
      <Section2/>
    </Layout>
  )
}
