
import Layout from "@/components/layout/Layout"
import Banner from "@/components/sections/home3/Banner"
import Banner2 from "@/components/sections/home3/Banner2"
import Reservation from "@/components/sections/home3/Reservation"
import Blog from "@/components/sections/home3/Blog"
import About from "@/components/sections/home3/About"
import Special from "@/components/sections/home3/Special"
import Testimonial from "@/components/sections/home3/Testimonial"
import Order from "@/components/sections/home3/Order"
import Intro from "@/components/sections/home3/Intro"
import Instagram from "@/components/sections/home3/Instagram"
export default function Home() {

    return (
        <>
        <div className="home-two">
            <Layout headerStyle={3} footerStyle={1}>
                <Banner />  
                <About />
                <Banner2 /> 
                <Reservation /> 
                <Special /> 
                <Intro />
                <Testimonial />
                <Order />
                <Blog />
                <Instagram />
            </Layout>
        </div>
        </>
    )
}