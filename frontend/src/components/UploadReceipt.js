
import { useRef, useState } from "react";

const UploadReceipt = () => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("No file selected");

    const handleButtonClick = () => {
        fileInputRef.current.click(); 
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h3>Upload Files</h3>
                <div className="drop_box">
                    <header>
                        <h4>Select File here</h4>
                    </header>
                    <p>Supported File Types: JPEG, PNG</p>

                    {/* Hidden file input */}
                    <input 
                        type="file" 
                        hidden 
                        accept=".jpeg,.png" 
                        id="fileID"
                        ref={fileInputRef}
                        onChange={handleFileChange} // ✅ Handle file selection
                    />

                    {/* Button to open file picker */}
                    <button className="btn" onClick={handleButtonClick}>
                        Choose File
                    </button>

                    {/* Show selected file name */}
                    <p>{fileName}</p>
                </div>
            </div>
        </div>
    );
};

export default UploadReceipt;
