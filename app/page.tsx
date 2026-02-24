import Layout from "@/components/layout/Layout"
import Banner from "@/components/sections/home2/Banner"
import Food from "@/components/sections/home2/Food"
import Menu from "@/components/sections/home2/Menu"
import Biryani from "@/components/sections/home2/Biryani"
// import Steak from "@/components/sections/home2/Steak" // Oculto por ahora, usar más adelante
import Booking from "@/components/sections/home2/Booking"
import EventosCotizar from "@/components/sections/home2/EventosCotizar"
import Testimonial from "@/components/sections/home2/Testimonial"
import Features from "@/components/sections/home2/Feature"

export default function Home() {
    return (
        <div className="home-four">
            <Layout headerStyle={2} footerStyle={1}>
                <Banner />
                <Food />
                <Menu />
                <Biryani />
                {/* <Steak /> */}
                <Booking />
                <Testimonial />
                <EventosCotizar />
                <Features />
            </Layout>
        </div>
    )
}
