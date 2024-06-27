import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function () {

    const { login } = useAuth();

    const initialData = {
        email: 'giuseppe@verdi.it',
        password: 'password'
    };

    const [formData, setFormData] = useState(initialData);

    const [loginError, setLoginError] = useState(null);

    const changeData = (key, value) => {
        setFormData(curr => ({
            ...curr,
            [key]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await login(formData);
            setFormData(initialData);
        } catch (err) {
            setLoginError(err);
        }
    }

    return (<>
        <form onSubmit={handleSubmit}>

            <div className="form-element">
                <label>Email</label>
                <input
                    type="text"
                    value={formData.email}
                    onChange={e => changeData('email', e.target.value)}
                />
            </div>

            <div className="form-element">
                <label>Password</label>
                <input
                    type="password"
                    value={formData.password}
                    onChange={e => changeData('password', e.target.value)}
                />
            </div>

            {loginError !== null && <div className="error">{loginError.message}</div>}
            {loginError?.errors && loginError.errors.map((err, index) => (
                <div key={`err${index}`}>{err.msg}</div>
            ))}

            <button>Accedi</button>
        </form>
    </>)
}