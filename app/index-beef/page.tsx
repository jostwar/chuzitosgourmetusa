
import Layout from "@/components/layout/Layout"
import Banner from "@/components/sections/home2/Banner"
import Banner2 from "@/components/sections/home2/Banner2"
import Blog from "@/components/sections/home2/Blog"
import Food from "@/components/sections/home2/Food"
import Menu from "@/components/sections/home2/Menu"
import WhyChoose from "@/components/sections/home2/Whychoose"
import Biryani from "@/components/sections/home2/Biryani"
import Team from "@/components/sections/home2/Team"
import Steak from "@/components/sections/home2/Steak"
import Booking from "@/components/sections/home2/Booking"
import Testimonial from "@/components/sections/home2/Testimonial"
import Features from "@/components/sections/home2/Feature"
export default function Home() {

    return (
        <>
        <div className="home-four">
            <Layout headerStyle={2} footerStyle={1}>
                <Banner />
                <Food />
                <Menu />
                <WhyChoose />
                <Banner2 />
                <Biryani />
                <Team />
                <Steak />
                <Booking />
                <Testimonial />
                <Blog />
                <Features />
                
            </Layout>
        </div>
        </>
    )
}