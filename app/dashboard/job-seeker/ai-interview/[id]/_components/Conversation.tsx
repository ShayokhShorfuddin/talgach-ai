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
    sender: 'bot',
    content:
      "Hi there! Thanks for joining me today. Let's start with the basics—can you tell me about your background and what interests you most about this role?",
  },
  {
    id: 2,
    sender: 'user',
    content:
      "Of course! I have 5 years of experience in frontend development, and I'm particularly drawn to this role because of your focus on user experience and accessibility.",
  },
  {
    id: 3,
    sender: 'bot',
    content:
      "That's great to hear. Accessibility is indeed a core value for us. Can you walk me through a recent project where you implemented accessible design principles?",
  },
  {
    id: 4,
    sender: 'user',
    content:
      'Sure! I recently led a redesign of our dashboard where I ensured full keyboard navigation, proper ARIA labels, and tested with screen readers. It significantly improved user satisfaction.',
  },
  {
    id: 5,
    sender: 'bot',
    content:
      'Excellent work. One more question—how do you stay updated with the latest web technologies and best practices?',
  },
  {
    id: 6,
    sender: 'user',
    content:
      'I regularly read blog posts, contribute to open source, and participate in developer communities. I also follow frameworks like React and Next.js closely.',
  },
  {
    id: 7,
    sender: 'bot',
    content:
      "Perfect. Well, I think we've covered a lot today. Thank you for sharing your insights. We'll be in touch soon with next steps!",
  },
];
