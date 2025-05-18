import { useEffect, useState } from "react";
import { message } from "antd";
import { addUserClockOnUsingPost } from "@/api/userController";

/**
 * Hook: add user clock-on record
 */
const useAddUserClockOnRecord = () => {
    const [loading, setLoading] = useState(false);

    // request execution of adding clock-on record in backend
    const doFetch = async () => {
        setLoading(true);
        try {
            await addUserClockOnUsingPost();
        } catch (e) {
            message.error("Couldn't add clock-on record. " + e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        doFetch();
    }, []);

    return { loading };
};

export default useAddUserClockOnRecord;
