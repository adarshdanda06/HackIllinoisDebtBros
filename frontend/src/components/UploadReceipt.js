import { useState } from "react";
import axios from "axios";
import ReceiptForm from "./ReceiptForm";
import Card from "../components/ui/Card"; 
import { Upload } from "lucide-react";



const UploadReceipt = () => {
    const [file, setFile] = useState(null);
    const [receiptData, setReceiptData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isUploading] = useState(false);


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
        <Card title="Upload Receipt" className="mb-6">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center mb-4 hover:border-primary transition-colors">
                <input
                  type="file"
                  id="receipt-upload"
                  accept="image/jpeg,image/png,image/heic,image/heif"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="receipt-upload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground mb-1">{file ? file : "Click to upload or drag and drop"}</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG, HEIC, HEIF (max. 10MB)</p>
                </label>
              </div>
    
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Uploading..." : "Upload Receipt"}
              </button>
            </div>
          </div>
    
          {showPopup && <ReceiptForm receiptData={receiptData} onClose={() => setShowPopup(false)} />}
        </Card>
    )
};

export default UploadReceipt;
