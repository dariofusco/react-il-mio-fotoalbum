import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function () {
    const [photos, setPhotos] = useState([]);

    const fetchPhoto = async () => {
        await axios.get('http://localhost:3000/photos')
            .then(res => {
                const photos = res.data.data;
                setPhotos(photos);
                console.log(photos);
            })
    }

    useEffect(() => {
        fetchPhoto();
    }, [])

    return (<>
        <div>
            <h1>Index Page</h1>
        </div>

        <Link to="/">Indietro</Link>

        <ul>
            {photos.map(photo => (
                <li key={photo.id}>
                    <Link to={`/photos/${photo.id}`}>{photo.title}</Link>
                </li>
            ))}
        </ul>
    </>)
}