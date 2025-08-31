import { useState } from 'react';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            // Aquí se haría la llamada a la IA
            setTimeout(() => {
                setMessages(prev => [...prev, { text: 'Esta es una respuesta simulada.', sender: 'bot' }]);
            }, 1000);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col">
            <div className="bg-green-500 text-white p-3 rounded-t-lg">
                <h3 className="text-lg font-bold">Asistente de Ayuda</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`my-2 p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="p-4 border-t">
                <div className="flex">
                    <input
                        type="text"
                        className="flex-1 p-2 border rounded-l-lg"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r-lg">Enviar</button>
                </div>
            </div>
        </div>
    );
}
