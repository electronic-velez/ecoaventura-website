import { useState } from 'react';

export default function Chat() {
    const [isOpen, setIsOpen] = useState(false);
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

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-green-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-50"
                aria-label="Abrir chat"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 w-full h-full md:w-80 md:h-96 bg-white rounded-lg shadow-lg flex flex-col z-50">
            <div className="bg-green-500 text-white p-3 rounded-t-lg flex justify-between items-center">
                <h3 className="text-lg font-bold">Asistente de Ayuda</h3>
                <button onClick={() => setIsOpen(false)} className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
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
