import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../routes/fonts.css";
import cocoImage from "../Images/coco.jpg";
import successImage from "../Images/success.jpg";
import rastaImage from "../Images/rasta.jpg";
import mremboImage from "../Images/mrembo.jpg";
import shiroImage from "../Images/shiro.jpg";

const AboutUs = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const staggeredChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-gray-900 text-white">
      <Header />

      <section
        ref={targetRef}
        className="relative min-h-screen overflow-hidden"
      >
        <motion.div style={{ opacity, scale }} className="absolute inset-0">
          <img
            src={cocoImage}
            alt="Hero Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/70 to-gray-900" />
        </motion.div>

        <div className="relative h-full container mx-auto px-4 py-32 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="rubik-wet-paint text-7xl md:text-8xl lg:text-9xl mb-8 text-white leading-tight">
              We Started
              <span className="block text-yellow-400">Out Small</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-200 font-light max-w-2xl">
              Now we're clothing the streets with style and purpose
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-32">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggeredChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "50+", label: "Collections" },
              { number: "100%", label: "Sustainable" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariants}
                className="bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggeredChildren}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUpVariants} className="space-y-6">
              <div className="inline-block">
                <h2 className="text-6xl font-bold mb-2">Our Story</h2>
                <div className="h-2 w-full bg-yellow-400 rounded-full" />
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                What started as a dream in a small garage has grown into a
                movement. Our passion for authentic street culture and
                sustainable fashion drives everything we do.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                We believe that clothing is more than just fabric – it's a
                statement of identity and purpose.
              </p>
            </motion.div>
            <motion.div
              variants={fadeUpVariants}
              className="relative h-[700px] group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/20 to-gray-900/50 group-hover:opacity-0 transition-opacity duration-500" />
              <img
                src={rastaImage}
                alt="Our Story"
                className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <section className="py-32 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggeredChildren}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeUpVariants} className="text-center mb-20">
              <h2 className="text-6xl font-bold mb-6">Our Values</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Every piece we create is a testament to our commitment to
                quality, creativity, and community.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Quality",
                  description:
                    "Premium materials and craftsmanship in every piece",
                  icon: "🌟",
                },
                {
                  title: "Sustainability",
                  description:
                    "Eco-friendly practices and responsible production",
                  icon: "🌱",
                },
                {
                  title: "Community",
                  description:
                    "Supporting and empowering local artists and creators",
                  icon: "💫",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeUpVariants}
                  whileHover={{ y: -10 }}
                  className="bg-gray-900/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/50"
                >
                  <span className="text-4xl mb-6 block">{value.icon}</span>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggeredChildren}
            className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto"
          >
            <motion.div variants={fadeUpVariants} className="space-y-8">
              <h2 className="text-6xl font-bold mb-8">Our Impact</h2>
              <p className="text-xl text-gray-300">
                We're more than just a clothing brand – we're a family of
                creators, dreamers, and change-makers.
              </p>
              <ul className="space-y-6">
                {[
                  "10,000+ trees planted worldwide",
                  "100% sustainable packaging",
                  "50+ local artist collaborations",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={fadeUpVariants}
                    className="flex items-center space-x-4"
                  >
                    <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <span className="text-lg text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              variants={fadeUpVariants}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <img
                  src={cocoImage}
                  alt="Impact 1"
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                />
                <img
                  src={successImage}
                  alt="Impact 2"
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-6 mt-12">
                <img
                  src={shiroImage}
                  alt="Impact 3"
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                />
                <img
                  src={mremboImage}
                  alt="Impact 4"
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
