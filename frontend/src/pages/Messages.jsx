import axios from "axios"
import { Fragment, useEffect, useState } from "react";

export default function () {
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        await axios.get('http://localhost:3000/messages')
            .then(res => {
                const messages = res.data;
                setMessages(messages);
                console.log(messages);
            })
    }

    useEffect(() => {
        fetchMessages();
    }, [])

    return (<>
        <div>
            <h1>Messages Page</h1>
        </div>

        <div>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Email</th>
                        <th>Content</th>
                    </tr>
                </thead>
                {messages.map(message => (
                    <tbody key={message.id}>
                        <tr>
                            <td>{message.createdAt}</td>
                            <td>{message.email}</td>
                            <td>{message.content}</td>
                        </tr>
                    </tbody>
                ))}
            </table>

        </div>
    </>)
}