import html2canvas from 'html2canvas';

/**
 * Generates a PNG image from a DOM element.
 * @param {HTMLElement} element - The DOM element to capture.
 * @returns {Promise<string>} - A promise that resolves to the Data URL of the PNG.
 */
export const generateCertificatePNG = async (element) => {
    if (!element) throw new Error("Element not provided");

    try {
        const canvas = await html2canvas(element, {
            scale: 2, // Higher resolution for better print quality
            useCORS: true, // Allow loading cross-origin images
            backgroundColor: '#ffffff', // Ensure white background
            logging: false,
        });

        return canvas.toDataURL('image/png');
    } catch (error) {
        console.error("Error generating certificate PNG:", error);
        throw error;
    }
};
