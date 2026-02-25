export function Conversation() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
              message.sender === 'user'
                ? 'bg-talgach-green text-white'
                : 'bg-muted'
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
}

const messages = [
  {
    id: 1,
    sender: 'user',
    content: 'Hello, how are you?',
  },
  {
    id: 2,
    sender: 'bot',
    content: 'I am good, thank you! How can I assist you today?',
  },
  {
    id: 3,
    sender: 'user',
    content: 'Hello, how are you?',
  },
  {
    id: 4,
    sender: 'bot',
    content: 'I am good, thank you! How can I assist you today?',
  },
  {
    id: 5,
    sender: 'user',
    content: 'Hello, how are you?',
  },
  {
    id: 6,
    sender: 'bot',
    content: 'I am good, thank you! How can I assist you today?',
  },
  {
    id: 7,
    sender: 'user',
    content: 'Hello, how are you?',
  },
  {
    id: 8,
    sender: 'bot',
    content: 'I am good, thank you! How can I assist you today?',
  },
  {
    id: 9,
    sender: 'user',
    content: 'Hello, how are you?',
  },
  {
    id: 10,
    sender: 'bot',
    content: 'I am good, thank you! How can I assist you today?',
  },
  {
    id: 11,
    sender: 'user',
    content: 'Hello, how are you?',
  },
  {
    id: 12,
    sender: 'bot',
    content: 'I am good, thank you! How can I assist you today?',
  },
  {
    id: 13,
    sender: 'user',
    content: 'Hello, how are you?',
  },
  {
    id: 14,
    sender: 'bot',
    content: 'I am good, thank you! How can I assist you today?',
  },
  {
    id: 15,
    sender: 'user',
    content: 'Hello, how are you?',
  },
  {
    id: 16,
    sender: 'bot',
    content: 'I am good, thank you! How can I assist you today?',
  },
  {
    id: 17,
    sender: 'user',
    content: 'Hello, how are you?',
  },
  {
    id: 18,
    sender: 'bot',
    content: 'I am good, thank you! How can I assist you today?',
  },
  {
    id: 19,
    sender: 'user',
    content: 'Hello, how are you?',
  },
  {
    id: 20,
    sender: 'bot',
    content: 'I am good, thank you! How can I assist you today?',
  },
  {
    id: 21,
    sender: 'bot',
    content: 'I am good, thank you! How can I assist you today?',
  },
  {
    id: 22,
    sender: 'bot',
    content: 'I am good, thank you! How can I assist you today?',
  },
  {
    id: 23,
    sender: 'bot',
    content: 'I am good, thank you! How can I assist you today?',
  },
  {
    id: 24,
    sender: 'bot',
    content: 'I am good, thank you! How can I assist you today?',
  },
];
