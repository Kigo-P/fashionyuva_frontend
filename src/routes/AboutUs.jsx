import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../routes/fonts.css';
import teamImage from '../Images/teamImage.jpg';
import aboutImage from '../Images/aboutImage.jpg';
import successImage from '../Images/success.jpg';
import cocoImage from '../Images/coco.jpg'
const AboutUs = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />

      {/* Hero Section with Gradient Overlay */}
      <section className="relative h-screen bg-gray-900">
        <img
          src={teamImage}
          alt="Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/90">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
            <h2 className="rubik-wet-paint text-5xl mb-4 text-center">
              WE STARTED OUT SMALL...
            </h2>
            <p className="text-2xl md:text-3xl text-gray-200 max-w-2xl text-center">
              Now we're clothing the streets with style and purpose
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Story</h2>
          <div className="space-y-8">
            <p className="text-lg leading-relaxed">
              What started as a dream in a small garage has grown into a movement. 
              Our passion for authentic street culture and sustainable fashion drives 
              everything we do. We believe that clothing is more than just fabric – 
              it's a statement of identity and purpose.
            </p>
            <p className="text-lg leading-relaxed font-bold">
              Our Commitment:
            </p>
            <p className="text-lg leading-relaxed">
              Every piece we create is a testament to our commitment to quality, 
              creativity, and community. Our designs blend urban edge with conscious 
              craftsmanship, ensuring that each item tells a story while making a 
              positive impact on our world.
            </p>
          </div>
        </div>
      </section>

      {/* Our Community Section */}
      <section className="py-24 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Community</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-16">
            We're more than just a clothing brand – we're a family of creators, 
            dreamers, and change-makers. Our community is the heart of everything 
            we do.
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <img src={successImage} alt="Community Event 1" className="w-full h-full object-cover" />
            </div>

            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <img src={cocoImage} alt="Sustainability Initiative" className="w-full h-full object-cover" />
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold">Sustainability Initiatives</h3>
                <p className="text-gray-300">Our eco-friendly initiatives have planted over 10,000 trees worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;

