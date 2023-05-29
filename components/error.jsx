import { styles } from '../utils/style';
import { useContext, useEffect } from "react"
import Context from "../utils/context"
export default function Error() {
    const { state, dispatch } = useContext(Context)

    return (
        <div className="ml-3 mt-2 text-red-500 font-bold">{state.error}</div>
    );
}