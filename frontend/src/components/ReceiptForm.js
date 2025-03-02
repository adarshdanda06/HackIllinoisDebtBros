import { X } from "lucide-react";

const ReceiptForm = ({ receiptData, onClose }) => {
    if (!receiptData) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="text-xl font-semibold">Receipt Details</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground rounded-full p-1">
                <X className="h-5 w-5" />
              </button>
            </div>
    
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Items</h3>
                <ul className="space-y-2">
                  {receiptData.items &&
                    Object.entries(receiptData.items).map(([item, price]) => (
                      <li key={item} className="flex justify-between items-center">
                        <span className="text-sm">{item}</span>
                        <span className="font-medium">${price.toFixed(2)}</span>
                      </li>
                    ))}
                </ul>
              </div>
    
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Tax</span>
                  <span>${receiptData.tax?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center font-medium">
                  <span>Total</span>
                  <span className="text-lg">${receiptData.total?.toFixed(2)}</span>
                </div>
              </div>
    
              <button
                onClick={onClose}
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
    )
};

export default ReceiptForm;
