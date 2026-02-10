import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay"; // optional but good to include
import { Autoplay, Pagination } from "swiper/modules"; // added Pagination for dots (optional)

export default function Hero() {
  return (
    <div className="h-[75vh] md:h-[90vh] mt-16 relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {/* Slide 1 – Team / Workers focus */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1503387762-592deb58caa5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 flex flex-col justify-center items-center text-center text-white px-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                Protect What Matters Most
              </h1>
              <p className="mt-5 text-lg md:text-xl max-w-2xl font-light">
                Premium industrial safety gear — helmets, gloves, vests and more — built for Kenya's toughest jobs.
              </p>
              <a
                href="#products"
                className="mt-8 inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-xl text-lg transition shadow-lg"
              >
                Explore Safety Solutions
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 – Close-up gear focus */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/4559605/pexels-photo-4559605.jpeg?auto=compress&cs=tinysrgb&w=1920')",
            }}
          >
            <div className="absolute inset-0 bg-black/65 flex flex-col justify-center items-center text-center text-white px-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                Certified. Durable. Trusted.
              </h1>
              <p className="mt-5 text-lg md:text-xl max-w-3xl">
                High-quality PPE that meets international safety standards — ready for construction, manufacturing & warehouses.
              </p>
              <a
                href="#products"
                className="mt-8 inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-xl text-lg transition shadow-lg"
              >
                View Full Range
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 – Worker in action */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1581092160607-798f8a3d7c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex flex-col justify-center items-center text-center text-white px-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                Safety That Works as Hard as You Do
              </h1>
              <p className="mt-5 text-lg md:text-xl max-w-2xl">
                Reflective gear, harnesses, respirators — everything your team needs to stay safe and compliant.
              </p>
              <a
                href="#products"
                className="mt-8 inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-xl text-lg transition shadow-lg"
              >
                Shop Now
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 – Group / Team safety emphasis */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920')",
            }}
          >
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center text-white px-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                Your Workforce. Our Priority.
              </h1>
              <p className="mt-5 text-lg md:text-xl max-w-3xl">
                Reliable, affordable industrial safety equipment — delivered across Kenya with fast support.
              </p>
              <a
                href="#products"
                className="mt-8 inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-xl text-lg transition shadow-lg"
              >
                Get Protected Today
              </a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Optional: subtle overlay gradient at bottom if needed */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" /> */}
    </div>
  );
}