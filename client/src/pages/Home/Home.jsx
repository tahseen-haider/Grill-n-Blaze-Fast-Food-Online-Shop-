import Layout from "../../components/Layouts/Layout";
import Section1 from "./Section1";
import '../../styles/HomeStyle.css'
import Section2 from "./Section2";
import Section3 from "./Section3";

export default function Home() {
  return (
    <Layout>
      <Section1/>
      <Section2/>
      <Section3/>
    </Layout>
  )
}
