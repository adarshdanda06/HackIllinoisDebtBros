import { useAuthContext } from "../hooks/useAuthContext";
import UploadReceipt from "../components/UploadReceipt"
import DebtsList from "../components/DebtList";

const Home = () => {
    const { user, groupID } = useAuthContext();

    return (
        <div>
            <h2>Welcome, {user}!</h2>
            <p>Your Group ID: {groupID}</p>
            <UploadReceipt/> 
            <DebtsList />
        </div>
    )
}

export default Home