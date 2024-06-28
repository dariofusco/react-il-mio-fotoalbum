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

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPhotos, setFilteredPhotos] = useState([]);

    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        const filtered = photos.filter((photo) =>
            photo.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPhotos(filtered);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const filtered = photos.filter((photo) =>
            photo.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPhotos(filtered);
    }

    return (<>
        <div>
            <h1>Index Page</h1>
        </div>

        <div>
            <h3>Cerca per titolo:</h3>
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>
            <ul className="item-list">
                {searchQuery === "" ? (
                    photos.map(photo => (
                        <li key={photo.id}>
                            <Link to={`/photos/${photo.id}`}>{photo.title}</Link>
                        </li>
                    ))
                ) : filteredPhotos.length > 0 ? (
                    filteredPhotos.map((photo, index) => (
                        <li key={index}>
                            <Link to={`/photos/${photo.id}`}>{photo.title}</Link>
                        </li>
                    ))
                ) : (
                    <li>Nessuna foto con questo titolo</li>
                )}
            </ul>
        </div>
    </>)
}