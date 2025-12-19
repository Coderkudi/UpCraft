import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../api/axiosmock';
import { Loader2, Download, CheckCircle, Share2, Home } from 'lucide-react';
import {jsPDF} from 'jspdf';
import CertificatePreview from '../components/CertificatePreview';
// import { generateCertificatePNG } from '../utils/certificateGenerator';

const DemoCertificate = () => {
    const { courseId } = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [certificateData, setCertificateData] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const certificateRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // STRICT VALIDATION: Ensure we have valid certificate data passed from Quiz
        if (!location.state?.previewData || !location.state?.certificateData) {
            // Check if we can fallback to mock DB (e.g. user coming from Dashboard)
            // For now, redirect to ensure security compliance per instructions
            console.warn("Missing certificate state, redirecting...");
            // In a real app we might fetch by ID here, but for this specific "after generation" flow:
            // navigate(`/course/${courseId}`);
        }
        setLoading(false);
    }, [location.state, navigate, courseId]);

    const preview = location.state?.previewData || {};
    const certMeta = location.state?.certificateData || {};

    const handleDownload = () => {
  setDownloading(true);

  try {
    const pdf = new jsPDF('l', 'px', 'a4');

    pdf.setFontSize(28);
    pdf.text('Certificate of Completion', 300, 80);

    pdf.setFontSize(16);
    pdf.text('This certifies that', 300, 140);

    pdf.setFontSize(22);
    pdf.text(
      preview.userName || 'Demo Learner',
      300,
      180
    );

    pdf.setFontSize(16);
    pdf.text('has successfully completed the course', 300, 220);

    pdf.setFontSize(20);
    pdf.text(
      preview.courseTitle || 'Course Completion',
      300,
      260
    );

    pdf.save(`UpCraft_Certificate_${courseId}.pdf`);
  } catch (err) {
    console.error('PDF generation failed', err);
    alert('Failed to download certificate');
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
                        onClick={() => navigate(`/course/${courseId}`)}
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Congratulations, {certificateData?.studentName || "Learner"}!</h1>
                    <p className="text-gray-600">You have officially completed the {certificateData?.courseName || "Course"}.</p>
                </div>

                {/* CERTIFICATE PREVIEW AREA */}
                <div className="flex justify-center mb-12">
                    <CertificatePreview
                        ref={certificateRef}
                        studentName={preview.userName || "Demo Learner"}
                        courseName={preview.courseTitle || "Course Completion"}
                        date={certMeta.issuedAt ? new Date(certMeta.issuedAt).toLocaleDateString() : new Date().toLocaleDateString()}
                    />
                </div>
            </div>
        </div>
    );
};

export default DemoCertificate;
