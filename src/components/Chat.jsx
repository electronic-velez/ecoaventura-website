import { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    const functions = getFunctions();
    const generateContent = httpsCallable(functions, 'generateContent');

    try {
      const result = await generateContent({ prompt: message });
      const data = result.data;
      setResponse(data.text);
    } catch (error) {
      console.error('Error calling Cloud Function:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <p>Response: {response}</p>
    </div>
  );
};

export default Chat;