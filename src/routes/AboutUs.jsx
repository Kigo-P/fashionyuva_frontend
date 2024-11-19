import React from "react";
import { Building2, Users, Trophy, ShoppingBag } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full mt-24">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{
            backgroundImage: `url('./back.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-white/20"></div>
        </div>

        <div className="relative z-10 w-full">
          <div className="text-center py-12 md:py-20 mb-8 md:mb-16 bg-gradient-to-b from-navy-900/10 to-transparent">
            <div className="max-w-6xl mx-auto px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-4 md:mb-6">
                Welcome to Fashionyuva
              </h1>
              <p className="text-lg md:text-xl text-black max-w-2xl mx-auto px-4">
                Where style meets authenticity. We're more than just a fashion
                store - we're a community dedicated to helping you express your
                unique style.
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 pb-8 md:pb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-8 mb-8 md:mb-16 shadow-lg">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-xl md:text-2xl font-semibold text-navy-900 mb-3 md:mb-4">
                  Our Mission
                </h2>
                <p className="text-sm md:text-base text-black">
                  To provide accessible, high-quality fashion that empowers
                  individuals to express themselves confidently while building a
                  sustainable and inclusive fashion community.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-16">
              <div className="text-center p-4 md:p-6 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                <Building2 className="w-8 h-8 md:w-12 md:h-12 text-red-600 mx-auto mb-3 md:mb-4" />
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Est. 2023
                </h3>
                <p className="text-sm md:text-base text-black">
                  Founded with a vision to revolutionize fashion retail
                </p>
              </div>

              <div className="text-center p-4 md:p-6 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                <Users className="w-8 h-8 md:w-12 md:h-12 text-red-600 mx-auto mb-3 md:mb-4" />
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Community First
                </h3>
                <p className="text-sm md:text-base text-black">
                  Building a vibrant community of fashion enthusiasts
                </p>
              </div>

              <div className="text-center p-4 md:p-6 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                <Trophy className="w-8 h-8 md:w-12 md:h-12 text-red-600 mx-auto mb-3 md:mb-4" />
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Quality Promise
                </h3>
                <p className="text-sm md:text-base text-black">
                  Curated selection of premium fashion items
                </p>
              </div>

              <div className="text-center p-4 md:p-6 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                <ShoppingBag className="w-8 h-8 md:w-12 md:h-12 text-red-600 mx-auto mb-3 md:mb-4" />
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Trendsetting
                </h3>
                <p className="text-sm md:text-base text-black">
                  Always ahead with the latest fashion trends
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
              <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-sm">
                <h2 className="text-xl md:text-2xl font-semibold text-navy-900 mb-3 md:mb-4">
                  Our Story
                </h2>
                <p className="text-sm md:text-base text-black mb-3 md:mb-4">
                  Fashionyuva was born from a passion for making contemporary
                  fashion accessible to everyone. Starting as a small online
                  boutique, we've grown into a community-driven platform that
                  celebrates individuality and style.
                </p>
                <p className="text-sm md:text-base text-black">
                  Today, we continue to expand our collection while staying true
                  to our core values of quality, authenticity, and customer
                  satisfaction. Our journey is defined by our commitment to
                  bringing you the best in fashion, backed by exceptional
                  service.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-sm">
                <img
                  src="./girl.jpg"
                  alt="FashionYuva store"
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
