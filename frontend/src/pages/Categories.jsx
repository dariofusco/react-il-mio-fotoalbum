import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function () {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        await axios.get('http://localhost:3000/categories')
            .then(res => {
                const categories = res.data;
                setCategories(categories);
                console.log(categories);
            })
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (<>
        <div>
            <h1>Categories Page</h1>
        </div>

        <Link to="/categories/create">Crea nuova categoria</Link>

        <div>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    </>)
}