import Layout from "../../components/Layouts/Layout";
import Section1 from "./Section1";
import '../../styles/HomeStyle.css'
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";

export default function Home() {
  return (
    <Layout>
      <Section1/>
      <Section2/>
      <Section3/>
      <Section4/>
      <Section5/>
    </Layout>
  )
}
