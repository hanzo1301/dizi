'use client';

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
  // Create refs for each section
  const introRef = useRef(null);
  const whoCanLearnRef = useRef(null);
  const bookRef = useRef(null);
  const contactRef = useRef(null);

  // Track visibility
  const isIntroInView = useInView(introRef, { amount: 0.1 });
  const isWhoCanLearnInView = useInView(whoCanLearnRef, { amount: 0.1 });
  const isBookInView = useInView(bookRef, { amount: 0.1 });
  const isContactInView = useInView(contactRef, { amount: 0.1 });

  // British color palette
  const colors = {
    primary: '#0F4C81',
    secondary: '#AC2B37',
    accent: '#C19A6B',
    background: '#F8F5F0',
    text: '#333333',
    lightText: '#5C5C5C'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.4, ease: "easeOut" } 
    },
    hover: { y: -4, transition: { duration: 0.1, ease: "easeOut" } }
  };

  const openGoogleMaps = () => {
    const address = encodeURIComponent("Sládkovičova 737/23, Bánovce nad Bebravou, Slovakia");
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Cloud Background */}
      <div className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
        style={{ 
          backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/007/384/234/small/blue-sky-background-and-white-clouds-vector.jpg)'
        }}>
      </div>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative p-6 max-w-6xl mx-auto z-10"
        style={{ backgroundColor: 'rgba(248, 245, 240, 0.9)' }}
      >
        {/* Header */}
        <motion.header className="mb-12 text-center pb-6 border-b-2"
          style={{ borderColor: colors.primary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}>
          <motion.h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            Welcome to DiZi's
          </motion.h1>
          <motion.p className="text-lg md:text-xl font-serif italic"
            style={{ color: colors.accent }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}>
            Master English - The Easy Way
          </motion.p>
        </motion.header>

        {/* Introduction Section */}
        <section ref={introRef} className='mb-16 md:mb-24 pb-12 border-b-2' style={{ borderColor: colors.primary }}>
          <motion.h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-6 md:mb-8"
            style={{ color: colors.primary }}
            initial={{ opacity: 0 }}
            animate={isIntroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}>
            Let Me Introduce Myself
          </motion.h2>
          
          <div className='flex flex-col lg:flex-row items-center gap-6 md:gap-8'>
            <motion.div className='rounded-lg p-6 md:p-8 flex-1 border-l-4'
              style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderColor: colors.primary }}
              initial={{ x: -40, opacity: 0 }}
              animate={isIntroInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}>
              <p className="text-base md:text-lg leading-relaxed font-serif mb-4" style={{ color: colors.text }}>
                My name is <span className="font-semibold" style={{ color: colors.primary }}>Dr. Dimithri Mahavithanage</span>, and I am passionate about teaching English in a way that inspires <span className="italic">lifelong learning</span>.
              </p>
              <p className="text-base md:text-lg leading-relaxed font-serif mb-4" style={{ color: colors.text }}>
                As a dual citizen of Britain and Sri Lanka, and a native English speaker, I have been teaching English in Slovakia since 2018, where I also run my own language school.
              </p>
              <p className="text-base md:text-lg leading-relaxed font-serif" style={{ color: colors.text }}>
                With accreditation in <span className="font-semibold">IELTS</span> since 2010 and certifications in <span className="font-semibold">TEFL</span> and <span className="font-semibold">TESOL</span> since 2018, I bring years of experience to every lesson I teach.
              </p>                                                     
            </motion.div>
            
            <motion.div className='flex-1'
              initial={{ x: 40, opacity: 0 }}
              animate={isIntroInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="relative">
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                  <div className="absolute inset-0 bg-[url('https://static.vecteezy.com/system/resources/thumbnails/007/384/234/small/blue-sky-background-and-white-clouds-vector.jpg')] bg-cover rounded-full opacity-30"></div>
                  <img src="/pfp.jpg" alt="Dr. Dimithri Mahavithanage" 
                    className='absolute inset-0 w-full h-full rounded-full object-cover border-4'
                    style={{ borderColor: colors.primary }}/>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-full shadow-sm border"
                     style={{ borderColor: colors.accent }}>
                  <span className="font-serif text-sm" style={{ color: colors.primary }}>Doctor of medicine</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who Can Learn Section */}
        <section ref={whoCanLearnRef} className='mb-16 md:mb-24 pb-12 border-b-2' style={{ borderColor: colors.primary }}>
          <motion.h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-6 md:mb-8"
            style={{ color: colors.primary }}
            initial={{ opacity: 0 }}
            animate={isWhoCanLearnInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}>
            Who Can Learn
          </motion.h2>
          
          <div className='flex flex-col lg:flex-row items-center gap-6 md:gap-8'>
            <motion.div className='flex-1 max-w-md mx-auto'
              initial={{ x: -40, opacity: 0 }}
              animate={isWhoCanLearnInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}>
              <div className="relative rounded-lg overflow-hidden border-4" style={{ borderColor: colors.primary }}>
                <div className="absolute inset-0 bg-cover bg-center opacity-30"
                  style={{ backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/007/384/234/small/blue-sky-background-and-white-clouds-vector.jpg)' }}>
                </div>
                <img src="/learn.jpg" alt="Diverse learning groups"
                  className='relative w-full h-auto rounded-lg z-10 object-cover'
                  style={{ maxHeight: '550px' }}/>
              </div>
            </motion.div>
            
            <motion.div className='rounded-lg p-6 md:p-8 flex-1 border-l-4'
              style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderColor: colors.primary }}
              initial={{ x: 40, opacity: 0 }}
              animate={isWhoCanLearnInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}>
              <p className="text-base md:text-lg leading-relaxed font-serif mb-4" style={{ color: colors.text }}>
                I work with <span className="font-semibold" style={{ color: colors.primary }}>individuals and groups</span>, teaching:
              </p>
              <ul className="mb-4 space-y-2 font-serif" style={{ color: colors.text }}>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: colors.accent }}>•</span>
                  <span>Primary, secondary, and university students</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: colors.accent }}>•</span>
                  <span>Professionals in corporate settings</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: colors.accent }}>•</span>
                  <span>All age groups and proficiency levels</span>
                </li>
              </ul>

              <p className="text-base md:text-lg leading-relaxed font-serif mb-4" style={{ color: colors.text }}>
                Through <span className="font-semibold italic" style={{ color: colors.secondary }}>DiZi's - The Easy Way</span>, I strive to make learning English <span className="font-semibold">accessible</span>, <span className="font-semibold">engaging</span>, and <span className="font-semibold">transformative</span> for everyone I work with.
              </p>

              <p className="text-base md:text-lg leading-relaxed font-serif mb-4 italic" style={{ color: colors.text }}>
                My teaching is guided by a simple yet powerful vision: to motivate and guide people to learn English as a <span className="font-semibold">lifelong skill</span>.
              </p>

              <p className="text-base md:text-lg leading-relaxed font-serif" style={{ color: colors.text }}>
                My mission is to help learners not only <span className="font-semibold">master the language</span> but also <span className="font-semibold">embrace it as a skill they can use for life</span>. English is more than just a tool—it's a <span className="font-semibold" style={{ color: colors.secondary }}>key to unlocking opportunities</span>, building confidence, and connecting with the world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Book Section */}
        <section ref={bookRef} className="mb-16 md:mb-24 pb-12 border-b-2" style={{ borderColor: colors.primary }}>
          <motion.h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8 md:mb-12"
            style={{ color: colors.primary }}
            initial={{ opacity: 0, y: 10 }}
            animate={isBookInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}>
            My Book 
          </motion.h2>
          
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isBookInView ? "visible" : "hidden"}>
            {[
              { 
                name: 'DiZi\'s – The Easy Way', 
                description: (
                  <p className="leading-relaxed font-serif" style={{ color: colors.text }}>
                    • Learning English is one of the most valuable skills you can develop, and *DiZi's – The Easy Way* is here to make that journey as accessible, engaging, and effective as possible.
                    This book combines proven teaching methodologies with a personalized, learner-focused approach to ensure that students not only master English but also embrace it as a lifelong skill.
                  </p>
                ),
                fullWidth: false
              },
              { 
                name: 'Our Vision', 
                description: (
                  <p className="leading-relaxed font-serif" style={{ color: colors.text }}>
                    • Created by Dr. Dimithri Mahavithanage, an experienced educator and language specialist, *DiZi's – The Easy Way* is rooted in a simple yet powerful vision: to inspire learners to see English as more than just a tool for school or work, but as a gateway to opportunities, confidence, and global connections.
                    • Dr. Mahavithanage brings over a decade of expertise to this book, having taught English to students of all ages and backgrounds. As a dual citizen of Britain and Sri Lanka, and a native English speaker, he has developed a teaching approach that blends structure, repetition, and immersive engagement to deliver exceptional results.
                  </p>
                ),
                fullWidth: false
              },
              { 
                name: 'What Makes This Book Unique?', 
                description: (
                  <ul className="space-y-2 font-serif" style={{ color: colors.text }}>
                    <li>• Interactive and engaging lessons with dynamic Q&amp;A and real-life scenarios.</li>
                    <li>• Simplified grammar explanations using visuals and practical examples.</li>
                    <li>• Focus on conversational fluency through immersive role-play activities.</li>
                    <li>• Cultural and practical relevance to make learning meaningful and enjoyable.</li>
                    <li>• Integrated tools such as QR codes and online quizzes to reinforce learning.</li>
                  </ul>
                ),
                fullWidth: false
              },
              { 
                name: 'How It Works', 
                description: (
                  <p className="leading-relaxed font-serif" style={{ color: colors.text }}>
                    • Lessons in this book are carefully structured to build your skills step by step. Each chapter focuses on specific topics, such as greetings, introductions, or grammar points, and is designed to maximize your speaking, listening, and comprehension abilities.
                    • You will encounter a mix of repetition-based practice, role-playing scenarios, and guided discovery, ensuring that you retain what you learn and feel confident applying it in real-world situations.
                  </p>
                ),
                fullWidth: false
              },
              { 
                name: 'An Invitation to Transform Your Learning', 
                description: (
                  <p className="leading-relaxed font-serif" style={{ color: colors.text }}>
                    • *DiZi's – The Easy Way* is more than a textbook—it is your companion in mastering the English language. Whether you are a beginner or looking to refine your skills, this book is your key to unlocking new opportunities and achieving your goals. Dive in, stay curious, and let the learning begin!
                  </p>
                ),
                fullWidth: true
              },
            ].map((course, index) => (
              <motion.div
                key={index}
                className={`rounded-lg p-6 md:p-8 border-t-4 ${course.fullWidth ? 'md:col-span-2' : ''}`}
                style={{ 
                  backgroundColor: 'white',
                  borderColor: colors.accent,
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
                variants={itemVariants}
                whileHover="hover">
                <h3 className="text-lg md:text-xl font-serif font-semibold mb-3"
                    style={{ color: colors.secondary }}>
                  {course.name}
                </h3>
                <div>{course.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Contact Me Section */}
        <section ref={contactRef} className="mb-16 md:mb-24 pb-12">
          <motion.h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8 md:mb-12"
            style={{ color: colors.primary }}
            initial={{ opacity: 0, y: 10 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}>
            Contact Me
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="rounded-lg p-6 md:p-8 border-l-4"
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderColor: colors.primary,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
              variants={itemVariants}
              initial="hidden"
              animate={isContactInView ? "visible" : "hidden"}>
              <h3 className="text-xl font-serif font-semibold mb-4" style={{ color: colors.secondary }}>
                Get In Touch
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mt-1 mr-3" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-serif font-semibold" style={{ color: colors.primary }}>Email</p>
                    <a href="mailto:dizishoe@gmail.com" className="font-serif hover:underline" style={{ color: colors.text }}>
                      dizishoe@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 mt-1 mr-3" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-serif font-semibold" style={{ color: colors.primary }}>Phone</p>
                    <div className="space-y-1">
                      <a href="tel:+421949889936" className="font-serif block hover:underline" style={{ color: colors.text }}>
                        +421 949 889 936
                      </a>
                      <a href="tel:+447985747464" className="font-serif block hover:underline" style={{ color: colors.text }}>
                        +44 7985 747 464
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 mt-1 mr-3" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-serif font-semibold" style={{ color: colors.primary }}>Address</p>
                    <button 
                      onClick={openGoogleMaps}
                      className="text-left font-serif hover:underline cursor-pointer"
                      style={{ color: colors.text }}>
                      Sládkovičova 737/23<br />
                      Bánovce nad Bebravou<br />
                      Slovakia
                    </button>
                    <p className="font-serif text-sm mt-1 italic" style={{ color: colors.accent }}>
                      (Click address to open in Google Maps)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-lg p-6 md:p-8 border-l-4"
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderColor: colors.primary,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
              variants={itemVariants}
              initial="hidden"
              animate={isContactInView ? "visible" : "hidden"}>
              <h3 className="text-xl font-serif font-semibold mb-4" style={{ color: colors.secondary }}>
                Connect With Me
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mt-1 mr-3" style={{ color: colors.accent }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <div>
                    <p className="font-serif font-semibold" style={{ color: colors.primary }}>Instagram</p>
                    <a href="https://www.instagram.com/dizimahavithanage/" target="_blank" rel="noopener noreferrer" className="font-serif hover:underline" style={{ color: colors.text }}>
                    @dizimahavithanage
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 mt-1 mr-3" style={{ color: colors.accent }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                  <div>
                    <p className="font-serif font-semibold" style={{ color: colors.primary }}>Facebook</p>
                    <a href="https://www.facebook.com/profile.php?id=100067154321634" target="_blank" rel="noopener noreferrer" className="font-serif hover:underline" style={{ color: colors.text }}>
                    DiZi's - The Home of English
                    </a>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="font-serif italic" style={{ color: colors.text }}>
                    Feel free to reach out for inquiries about classes, schedules, or any questions you may have.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <motion.footer className="text-center text-sm mt-16 md:mt-24 pb-12 pt-6"
          style={{ color: colors.lightText }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}>
          <p className="font-serif">
            &copy; {new Date().getFullYear()} DiZi's English Academy. All rights reserved.
          </p>
          <p className="mt-2 font-serif text-xs">
            Established in London, 2010 | Registered in England and Wales
          </p>
        </motion.footer>
      </motion.main>
    </div>
  );
}