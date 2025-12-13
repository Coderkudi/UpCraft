import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Loader2, Download, CheckCircle, Share2, Home } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = () => {
    const [loading, setLoading] = useState(true);
    const [certificateData, setCertificateData] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const certificateRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const generateCertificate = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                const response = await api.post('/courses/demo/certificate/generate');
                setCertificateData(response.data.data);
            } catch (error) {
                console.error("Failed to generate certificate", error);
                alert("Failed to generate certificate. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        generateCertificate();
    }, []);

    const handleDownload = async () => {
        if (!certificateRef.current) return;
        setDownloading(true);

        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2, // Higher resolution
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape, A4
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('UpCraft_Certificate.pdf');
        } catch (err) {
            console.error("PDF Generation failed", err);
            alert("Failed to download certificate.");
        } finally {
            setDownloading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center text-blue-900">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
                <h2 className="text-2xl font-bold mb-2">Generating Your Certificate</h2>
                <p className="text-gray-500">Verifying completion requirements...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6 flex flex-col items-center font-sans">
            <div className="max-w-5xl w-full">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium"
                    >
                        <Home size={20} /> Back to Course
                    </button>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all shadow-sm">
                            <Share2 size={18} /> Share
                        </button>
                        <button
                            onClick={handleDownload}
                            disabled={downloading}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {downloading ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                            {downloading ? 'Downloading...' : 'Download PDF'}
                        </button>
                    </div>
                </div>

                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-full mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Congratulations, Demo User!</h1>
                    <p className="text-gray-600">You have officially completed the Agentic AI Mastery course.</p>
                </div>

                {/* CERTIFICATE PREVIEW AREA */}
                <div className="flex justify-center mb-12">
                    <div className="shadow-2xl rounded-sm overflow-hidden border border-gray-200">
                        {/* 
                    The Certificate Element 
                    This specific div is what gets captured by html2canvas
                */}
                        <div
                            ref={certificateRef}
                            className="w-[800px] h-[566px] bg-white relative p-12 flex flex-col items-center text-center justify-between"
                            style={{ fontFamily: 'Georgia, serif' }} // Using serif font for professional look
                        >
                            {/* Decorative Border */}
                            <div className="absolute top-4 left-4 right-4 bottom-4 border-4 border-double border-blue-900 pointer-events-none"></div>

                            {/* Corner Accents */}
                            <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-blue-900"></div>
                            <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-blue-900"></div>
                            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-blue-900"></div>
                            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-blue-900"></div>

                            {/* Logo Area */}
                            <div className="mt-8 z-10">
                                <h2 className="text-4xl font-sans font-black tracking-tight text-blue-900 uppercase">
                                    UpCraft
                                </h2>
                            </div>

                            {/* Title */}
                            <div className="mt-4 z-10">
                                <h1 className="text-5xl font-bold text-blue-900 mb-2 uppercase tracking-wide">
                                    Certificate
                                </h1>
                                <p className="text-lg text-blue-600 font-sans tracking-widest uppercase">Of Completion</p>
                            </div>

                            {/* Content */}
                            <div className="z-10 w-full max-w-2xl">
                                <p className="text-gray-500 italic text-lg mb-4">This is to certify that</p>

                                <h3 className="text-4xl font-bold text-gray-900 mb-2 border-b-2 border-gray-300 pb-4 inline-block min-w-[400px]">
                                    {certificateData?.studentName || "Demo User"}
                                </h3>

                                <p className="text-gray-500 italic text-lg mt-6 mb-2">Has successfully completed the comprehensive course</p>
                                <h4 className="text-2xl font-bold text-blue-800">Agentic AI Mastery</h4>
                            </div>

                            {/* Footer / Signatures */}
                            <div className="w-full flex justify-between items-end px-16 pb-8 z-10 font-sans">
                                <div className="text-center">
                                    <div className="border-t border-gray-400 w-48 pt-2 mb-1">
                                        <span className="font-script text-2xl text-blue-900 block mb-1">Antigravity AI</span>
                                    </div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Course Instructor</p>
                                </div>

                                <div className="text-center">
                                    {/* Badge */}
                                    <div className="mb-2 mx-auto w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center border-4 border-blue-100 shadow-sm">
                                        <AwardIcon />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="border-t border-gray-400 w-48 pt-2 mb-1">
                                        <p className="text-lg text-gray-800 font-medium">{new Date().toLocaleDateString()}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Date Issued</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple internal icon component for the badge to avoid lucide dependency inside the exportable canvas if possible, 
// though html2canvas handles SVG reasonably well now.
const AwardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
);

export default Certificate;
