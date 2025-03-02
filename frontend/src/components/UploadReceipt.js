import { useState } from "react";
import axios from "axios";
import ReceiptForm from "./ReceiptForm";

const UploadReceipt = () => {
    const [file, setFile] = useState(null);
    const [receiptData, setReceiptData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        console.log("Upload button clicked!")
        if (!file) return alert("Please select a file");

        try {
            const formData = new FormData();
            formData.append("receipt", file);

            const response = await axios.post("http://localhost:4000/api/receipt", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Upload Success:", response.data);
            setReceiptData(response.data); 
            setShowPopup(true);
        } catch (error) {
            console.error("Upload Failed:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <input type="file" accept="image/jpeg,image/png,image/heic,image/heif" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Receipt</button>
            {showPopup && <ReceiptForm receiptData={receiptData} onClose={() => setShowPopup(false)} />}
        </div>
    );
};

export default UploadReceipt;
