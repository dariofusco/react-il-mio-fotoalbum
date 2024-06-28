import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

export default function ({ id, title, description, image, categories, visible, onDelete }) {

    const deletePhoto = async () => {
        await onDelete(id);
    }

    return (
        <div className={`card ${visible ? 'visible' : ''}`}>
            {image &&
                <img src={`http://localhost:3000/${image}`} alt={title} />
            }
            <div className="container">
                <h3>{title}</h3>
                <p>{description}</p>

                {categories.map((category, index) => (
                    <span className="badge" key={index}>{category.name}</span>
                ))}
                <div className="card-footer">
                    <button>
                        <Link to={`/photos/${id}/edit`}>Modifica</Link>
                    </button>

                    <button className="delete" onClick={deletePhoto}><FaTrashAlt /></button>
                </div>
            </div>
        </div>
    )
}