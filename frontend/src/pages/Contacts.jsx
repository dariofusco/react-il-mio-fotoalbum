import { useState } from "react";
import axios from "axios";

export default function () {

    const defaultFormData = {
        email: "",
        content: ""
    }

    const [formData, setFormData] = useState(defaultFormData);

    const handleField = (key, newValue) => {
        setFormData(data => ({ ...data, [key]: newValue }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://localhost:3000/messages', formData);
        console.log(res);
        if (res.status < 400) {
            setFormData(defaultFormData);
        }
    }

    return (<>
        <div>
            <h1>Contacts Page</h1>
        </div>

        <div>
            <form onSubmit={handleSubmit}>

                <h1>Invia un messaggio:</h1>

                <div className="form-element">
                    <label><strong>Email:</strong></label>
                    <input
                        type="text"
                        value={formData.email}
                        onChange={event => handleField('email', event.target.value)}
                    />
                </div>

                <div className="form-element">
                    <label><strong>Content:</strong></label>
                    <input
                        type="text"
                        value={formData.content}
                        onChange={event => handleField('content', event.target.value)}
                    />
                </div>

                <button>Invia</button>

            </form>
        </div>
    </>)
}