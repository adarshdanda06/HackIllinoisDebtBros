const ReceiptForm = ({ receiptData, onClose }) => {
    if (!receiptData) return null

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Receipt Details</h2>
                <ul>
                    {Object.entries(receiptData.items || {}).map(([item, price]) => (
                        <li key={item}>
                            {item}: <strong>${price.toFixed(2)}</strong>
                        </li>
                    ))}
                </ul>
                <p><strong>Tax:</strong> ${receiptData.tax?.toFixed(2)}</p>
                <p><strong>Total:</strong> ${receiptData.total?.toFixed(2)}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ReceiptForm;
