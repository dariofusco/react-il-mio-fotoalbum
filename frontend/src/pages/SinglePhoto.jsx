import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from '../components/Card'

export default function () {

    const { id } = useParams();
    const [photo, setPhoto] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/photos/${id}`)
            .then(res => {
                setPhoto(res.data)
                console.log(res.data);
            });
    }, [id])

    const navigate = useNavigate();

    const deletePhoto = async id => {
        await axios.delete(`http://localhost:3000/photos/${id}`);
        navigate('/photos');
    }

    return (<>
        <div>
            <h1>Show Page</h1>
        </div>

        <button>
            <Link to="/photos" relative="path">Indietro</Link>
        </button>

        {photo && <Card
            id={photo.id}
            title={photo.title}
            description={photo.description}
            image={photo.image}
            categories={photo?.categories ?? []}
            visible={photo.visible}
            onDelete={deletePhoto}
        />}
    </>)
}