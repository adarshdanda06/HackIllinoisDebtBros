import { useAuthContext } from "../hooks/useAuthContext";
import UploadReceipt from "../components/UploadReceipt"
import DebtsList from "../components/DebtList";
import CreditList from "../components/CreditList";

const Home = () => {
    const { user, groupID } = useAuthContext();

    return (
        <div>
            <h2>Welcome, {user}!</h2>
            <p>Your Group ID: {groupID}</p>
            <UploadReceipt/> 
            <DebtsList />
            <CreditList/>
        </div>
    )
}

export default Home