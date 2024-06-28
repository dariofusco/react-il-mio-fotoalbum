import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";

export default function () {

    const { id } = useParams();

    const navigate = useNavigate();

    const [dataToEdit, setDataToEdit] = useState(null);

    const fetchDataToEdit = async () => {
        const { data: p } = await axios.get(`http://localhost:3000/photos/${id}`);
        setDataToEdit({
            title: p.title,
            description: p.description,
            image: '',
            categories: p.categories.map(i => i.id),
            visible: p.visible
        });
    }

    useEffect(() => {
        fetchDataToEdit();
        return () => {
            setDataToEdit(null);
        }
    }, [id]);

    const updatePhoto = async formData => {
        console.log(formData);
        const res = await axios.put(`http://localhost:3000/photos/${id}`, formData, {
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
            <h1>Update Page</h1>
        </div>

        <button>
            <Link to="../" relative="path">Annulla</Link>
        </button>

        {dataToEdit !== null && <Form
            initialData={dataToEdit}
            onSubmit={updatePhoto}
        />}
    </>)
}