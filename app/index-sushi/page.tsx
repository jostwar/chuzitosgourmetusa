
import Layout from "@/components/layout/Layout"
import Banner from "@/components/sections/home5/Banner"
import Blog from "@/components/sections/home5/Blog"
import Menu from "@/components/sections/home5/Menu"
import Menu2 from "@/components/sections/home5/Menu2"
import Testimonial from "@/components/sections/home5/Testimonial"
import Pricing from "@/components/sections/home5/Pricing"
import Booking from "@/components/sections/home5/Booking"
import Intro from "@/components/sections/home5/Intro"
import Gallery from "@/components/sections/home1/Gallery"
import About from "@/components/sections/home5/About"
import Order from "@/components/sections/home5/Order"
import Instagram from "@/components/sections/home5/Instagram"
export default function Home() {

    return (
        <>
        <div className="home-five">
            <Layout headerStyle={3} footerStyle={1}>
                <Banner /> 
                <About /> 
                <Menu /> 
                <Order />
                <Menu2 /> 
                <Intro /> 
                <Pricing /> 
                <Testimonial /> 
                <Booking /> 
                <Blog />
                <Instagram />
                
                
            </Layout>
        </div>
        </>
    )
}