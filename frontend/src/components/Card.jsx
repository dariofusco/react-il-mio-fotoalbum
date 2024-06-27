import { Link } from "react-router-dom";

export default function ({ id, title, description, image, categories, visible }) {

    return (
        <div className={`card ${visible ? 'visible' : ''}`}>
            {image &&
                <img src={`http://localhost:3000/${image}`} alt={title} />
            }
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="badge">
                {categories.map((category, index) => (
                    <span className="tag" key={index}>{category.name}</span>
                ))}
            </div>
            <Link to={`/photos/${id}/edit`}>Modifica</Link>
        </div>
    )
}