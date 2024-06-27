import { useState, useEffect } from "react";
import axios from "axios";

export default function ({ initialData, onSubmit }) {

    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        const { data: array } = await axios.get('http://localhost:3000/categories');
        setCategories(array);
        console.log(array);
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    const defaultData = initialData || {
        title: '',
        description: '',
        image: '',
        categories: [],
        visible: false
    }

    const [formData, setFormData] = useState(defaultData);

    const handleField = (name, value) => {

        setFormData(curr => ({
            ...curr,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    }
    return (<>
        <form onSubmit={handleSubmit}>

            <h1>Aggiungi una Foto:</h1>

            <div className="form-element">
                <label><strong>Titolo:</strong></label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={event => handleField('title', event.target.value)}
                />
            </div>

            <div className="form-element">
                <label><strong>Descrizione:</strong></label>
                <input
                    type="text"
                    value={formData.description}
                    onChange={event => handleField('content', event.target.value)}
                />
            </div>

            <div className="form-element">
                <label><strong>Immagine:</strong></label>
                <input
                    type="file"
                    onChange={event => handleField('image', event.target.files[0])}
                />
            </div>

            <div className="form-element">
                <ul>
                    <label><strong>Categorie:</strong></label>
                    {categories.map(({ id, name }, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                checked={formData.categories.includes(id)}
                                onChange={() => {
                                    const current = formData.categories
                                    const newCategories = current.includes(id) ?
                                        current.filter(element => element !== id) :
                                        [...current, id];
                                    handleField('categories', newCategories)
                                }}
                            />
                            {name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="form-element">
                <label><strong>Visibile:</strong></label>
                <select
                    name="visible"
                    value={formData.visible}
                    onChange={event => handleField("visible", event.target.value)}
                >
                    <option value={true}>Si</option>
                    <option value={false}>No</option>
                </select>
            </div>

            <button>Salva</button>

        </form>
    </>)
}