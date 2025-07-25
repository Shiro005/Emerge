import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ourProjects } from '../../Data/OurProjects';

const ProjectDetail = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const galleryRef = useRef(null);

    useEffect(() => {
        // Find the project that matches the slug
        const foundProject = ourProjects.find(p => p.slug === slug);
        
        if (foundProject) {
            setProject(foundProject);
            // Add slight delay before showing content for better animation effect
            setTimeout(() => {
                setLoading(false);
                setTimeout(() => setShowDetails(true), 300);
            }, 800);
        } else {
            setLoading(false);
        }
        
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, [slug]);

    // Handle image swipe for mobile
    useEffect(() => {
        if (!galleryRef.current) return;
        
        let startX, endX;
        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
        };
        
        const handleTouchEnd = (e) => {
            endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) { // Swipe left
                nextImage();
            } else if (endX - startX > 50) { // Swipe right
                prevImage();
            }
        };
        
        const element = galleryRef.current;
        element.addEventListener('touchstart', handleTouchStart);
        element.addEventListener('touchend', handleTouchEnd);
        
        return () => {
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchend', handleTouchEnd);
        };
    }, [project]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
                <motion.div
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="w-16 h-16 mb-4 relative"
                >
                    <div className="absolute inset-0 rounded-full border-4 border-stone-300 opacity-30"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-stone-600 border-r-transparent border-b-transparent border-l-transparent"></div>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-stone-600 font-medium"
                >
                    Loading project...
                </motion.p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-stone-50 to-stone-100">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-md w-full bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-stone-200"
                >
                    <motion.div
                        animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-5xl mb-6 mx-auto"
                    >
                        😕
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-4 text-stone-800">Project Not Found</h2>
                    <p className="mb-8 text-stone-600">We couldn't find the project you're looking for.</p>
                    <Link to="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-stone-600 to-stone-800 hover:from-stone-700 hover:to-stone-900 text-white rounded-lg font-medium shadow-lg shadow-stone-300/50 w-full"
                        >
                            Back to Home
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    const gallery = project.gallery || [project.mainImage];

    // Handle gallery navigation
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === (gallery.length - 1) ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? (gallery.length - 1) : prevIndex - 1
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 mt-14"
        >
            {/* Hero Header with Parallax */}
            <motion.div 
                className="relative h-screen max-h-[80vh] w-full mb-10 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Background image with overlay */}
                <div className="absolute inset-0 z-0">
                    <motion.img 
                        src={project.mainImage}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-700 via-white/10 to-white/0" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/10" />
                </div>
                
                {/* Back Button - Floating Style */}
                <div className="absolute top-6 left-6 z-20">
                    <Link to="/">
                        <motion.button
                            whileHover={{ x: -5, backgroundColor: "rgba(255,255,255,0.9)" }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center bg-white/90 backdrop-blur-md text-stone-800 px-4 py-2 rounded-full shadow-lg border border-stone-200"
                        >
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-medium">Back</span>
                        </motion.button>
                    </Link>
                </div>
                
                {/* Title Overlay */}
                <motion.div 
                    className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:pb-16 z-20 text-center"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <motion.h1 
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-50 drop-shadow-lg mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {project.title}
                    </motion.h1>
                    <motion.div 
                        className="flex justify-center flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        {project.category && (
                            <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm text-stone-700 font-medium shadow-md border border-stone-200">
                                {project.category}
                            </span>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-10">
                {/* Floating content container */}
                <motion.div 
                    className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 mb-12"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    {/* Tags */}
                    <motion.div 
                        className="flex flex-wrap justify-center gap-2 mb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        {project.tags && project.tags.map((tag, index) => (
                            <motion.span 
                                key={index} 
                                className="bg-stone-100 px-4 py-1.5 rounded-full text-sm text-stone-700 border border-stone-200"
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(68, 64, 60, 0.1)" }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Short Description */}
                    <motion.p 
                        className="text-xl text-stone-700 mb-8 max-w-4xl mx-auto text-center leading-relaxed"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        {project.shortDescription}
                    </motion.p>

                    {/* Divider */}
                    <motion.div 
                        className="w-24 h-1 bg-gradient-to-r from-stone-300 to-stone-100 rounded-full mx-auto mb-12"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    />
                </motion.div>

                {/* Image Gallery - Enhanced glass effect */}
                <motion.div 
                    ref={galleryRef}
                    className="mb-16 relative overflow-hidden rounded-3xl shadow-2xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <div className="relative w-full h-96 sm:h-[32rem] bg-stone-100 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <img 
                                    src={gallery[currentImageIndex]} 
                                    alt={`${project.title} - Image ${currentImageIndex + 1}`} 
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>
                        
                        {/* Navigation Controls - Enhanced */}
                        {gallery.length > 1 && (
                            <>
                                <motion.button 
                                    onClick={prevImage}
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.9)" }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-full z-10 shadow-lg border border-stone-200"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </motion.button>
                                <motion.button 
                                    onClick={nextImage}
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.9)" }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-full z-10 shadow-lg border border-stone-200"
                                    aria-label="Next image"
                                >
                                    <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.button>
                            </>
                        )}
                        
                        {/* Image Counter with Progress Bar - Enhanced glass effect */}
                        {gallery.length > 1 && (
                            <div className="absolute bottom-6 w-full flex justify-center z-10">
                                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-stone-200 shadow-lg">
                                    <span className="text-sm font-medium text-stone-700">
                                        {currentImageIndex + 1}/{gallery.length}
                                    </span>
                                    <div className="flex space-x-1">
                                        {gallery.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`w-2 h-2 rounded-full transition-all ${
                                                    idx === currentImageIndex 
                                                    ? 'bg-stone-700 w-6' 
                                                    : 'bg-stone-300'
                                                }`}
                                                aria-label={`Go to image ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Enhanced grid layout with better glass effect */}
                <AnimatePresence>
                    {showDetails && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                            {/* Project Metadata Card - Enhanced glass effect */}
                            <motion.div 
                                className="bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-stone-200 md:col-span-1 h-fit sticky top-8"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h2 className="text-xl font-bold mb-6 border-b border-stone-200 pb-3 text-stone-800">
                                    Project Details
                                </h2>
                                
                                <div className="space-y-5">
                                    {Object.entries({
                                        'Client': project.client,
                                        'Timeline': project.timeline,
                                        'Category': project.category,
                                        'Location': project.address,
                                        'Total Area': project.totalArea,
                                        'Budget': project.budget,
                                        'Year': project.year
                                    }).map(([label, value]) => (
                                        value && (
                                            <div key={label}>
                                                <h3 className="text-xs uppercase tracking-wider text-stone-500 mb-1">{label}</h3>
                                                <p className="font-medium text-stone-700">{value}</p>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </motion.div>

                            {/* Project Description and Testimonial - Combined for better layout */}
                            <div className="md:col-span-2 space-y-8">
                                {/* Project Description - Enhanced glass effect */}
                                <motion.div 
                                    className="bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-stone-200"
                                    whileHover={{ y: -3 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <h2 className="text-2xl font-bold mb-6 text-stone-800 border-b border-stone-200 pb-3">
                                        Project Overview
                                    </h2>
                                    <div className="prose max-w-none text-stone-700">
                                        {project.description.split('\n\n').map((paragraph, idx) => (
                                            <motion.p 
                                                key={idx} 
                                                className="mb-6 leading-relaxed"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                                            >
                                                {paragraph}
                                            </motion.p>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Testimonial Section - Enhanced elegance */}
                                {project.testimonial && (
                                    <motion.div 
                                        className="overflow-hidden"
                                        whileInView={{ scale: [0.98, 1] }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <div className="bg-gradient-to-r from-stone-100 to-stone-50 p-8 rounded-2xl relative overflow-hidden shadow-xl border border-stone-200">
                                            <div className="absolute -right-10 -top-10 text-8xl opacity-10 text-stone-400">
                                                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 11H6C3.79086 11 2 9.20914 2 7V6C2 3.79086 3.79086 2 6 2H7C9.20914 2 11 3.79086 11 6V10C11 16.0751 6.07513 21 0 21V20C5.52285 20 10 15.5228 10 10V11ZM23 11H19C16.7909 11 15 9.20914 15 7V6C15 3.79086 16.7909 2 19 2H20C22.2091 2 24 3.79086 24 6V10C24 16.0751 19.0751 21 13 21V20C18.5228 20 23 15.5228 23 10V11Z"/>
                                                </svg>
                                            </div>
                                            
                                            <blockquote className="text-lg z-10 relative">
                                                <motion.p 
                                                    className="mb-6 text-stone-700 italic text-xl leading-relaxed"
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    transition={{ duration: 1 }}
                                                >
                                                    "{project.testimonial.quote}"
                                                </motion.p>
                                                <footer className="font-medium flex items-center">
                                                    <div className="w-12 h-12 bg-stone-700 text-white rounded-full flex items-center justify-center mr-4 text-lg font-bold">
                                                        {project.testimonial.author.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <span className="block text-stone-800 font-semibold">{project.testimonial.author}</span>
                                                        {project.testimonial.position && (
                                                            <span className="block text-sm text-stone-600">{project.testimonial.position}</span>
                                                        )}
                                                    </div>
                                                </footer>
                                            </blockquote>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Call to Action - Full width with elegant gradient */}
                            <motion.div 
                                className="text-center bg-gradient-to-r from-stone-100 to-stone-50 p-8 rounded-2xl shadow-xl border border-stone-200 md:col-span-3"
                                whileInView={{ y: [10, 0], opacity: [0, 1] }}
                                transition={{ duration: 0.6 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                    className="max-w-2xl mx-auto"
                                >
                                    <h2 className="text-3xl font-bold mb-4 text-stone-800">
                                        Ready to start your project?
                                    </h2>
                                    <p className="text-stone-600 mb-8 text-lg">
                                        Let's bring your vision to life. Reach out to discuss your ideas.
                                    </p>
                                    <Link to="/contact">
                                        <motion.button
                                            whileHover={{ 
                                                scale: 1.05, 
                                                boxShadow: "0 10px 25px -5px rgba(68, 64, 60, 0.3)" 
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 bg-gradient-to-r from-stone-700 to-stone-800 text-white rounded-lg font-medium shadow-lg shadow-stone-300/50 border border-stone-600"
                                        >
                                            <span className="flex items-center justify-center">
                                                Contact Us Today
                                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Decorative background elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-stone-50 to-stone-100"></div>
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-400 to-transparent"></div>
            </div>
        </motion.div>
    );
};

export default ProjectDetail;