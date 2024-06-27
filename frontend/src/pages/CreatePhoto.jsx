import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import axios from "axios";

export default function () {

    const navigate = useNavigate();

    const createPhoto = async formData => {
        const res = await axios.post('http://localhost:3000/photos', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res);
        if (res.status < 400) {
            navigate(`/photos/${res.data.id}`)
        }
    }

    return (<>
        <div>
            <h1>Create Page</h1>
        </div>

        <div>
            <Link to="/">Indietro</Link>
            <Form
                onSubmit={createPhoto}
            />
        </div>
    </>)
}