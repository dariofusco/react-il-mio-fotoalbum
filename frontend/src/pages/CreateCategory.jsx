import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function () {

    const navigate = useNavigate();

    const defaultFormData = {
        name: ""
    }

    const [formData, setFormData] = useState(defaultFormData);

    const handleField = (key, newValue) => {
        setFormData(data => ({ ...data, [key]: newValue }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://localhost:3000/categories', formData);
        console.log(res);
        if (res.status < 400) {
            navigate(`/categories`)
        }
    }

    return (<>
        <div>
            <h1>Create Category Page</h1>
        </div>

        <Link to="../" relative="path">Annulla</Link>

        <div>
            <form onSubmit={handleSubmit}>
                <h1>Aggiungi una Categoria:</h1>
                <div className="form-element">
                    <label><strong>Nome:</strong></label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={event => handleField('name', event.target.value)}
                    />
                </div>
                <button>Salva</button>
            </form>
        </div>
    </>)
}