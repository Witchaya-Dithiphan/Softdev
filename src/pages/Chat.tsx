import { useState } from 'react';
import Layout from '../components/Layout';

const assetPathPrefix = '/assets';
const imgAvatar = `${assetPathPrefix}/84d82.svg`;

interface Message {
  id: number;
  text: string;
  sender: 'tenant' | 'caretaker';
  time: string;
}

interface ChatThread {
  id: number;
  tenant: string;
  room: string;
  lastMessage: string;
  time: string;
  online: boolean;
}

const threads: ChatThread[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  tenant: 'สมชาย อยากกินไก่',
  room: `ห้อง ${600 + i + 1}`,
  lastMessage: i === 0 ? 'โอเคครับ ขอบคุณครับ' : 'ได้ครับ ขอบคุณครับ',
  time: '19:33',
  online: i === 0,
}));

const initialMessages: Message[] = [
  { id: 1, text: 'สวัสดีครับ สามารถพาเพื่อนมาห้องได้มั้ยครับ', sender: 'tenant', time: '19:30' },
  { id: 2, text: 'ได้ค่ะ', sender: 'caretaker', time: '19:31' },
  { id: 3, text: 'โอเคครับ ขอบคุณครับ', sender: 'tenant', time: '19:32' },
];

export default function Chat() {
  const [activeThread, setActiveThread] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const activeChat = threads.find(t => t.id === activeThread)!;

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: input, sender: 'caretaker', time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  return (
    <Layout requiredRole="caretaker">
      <div className="flex flex-1 min-h-0">
        {/* Thread list */}
        <div className="flex flex-col w-[365px] flex-shrink-0 border-r border-black">
          <div className="bg-white border-b border-black flex items-center px-5 h-[82px] flex-shrink-0">
            <span className="font-['Inter:Medium'] font-medium text-2xl text-black">Chat</span>
          </div>
          <div className="flex-1 overflow-auto bg-white">
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setActiveThread(thread.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 border-b border-black/10 text-left hover:bg-gray-50 transition-colors ${activeThread === thread.id ? 'bg-[rgba(217,217,217,0.6)]' : ''}`}
              >
                <img src={imgAvatar} alt="" className="w-12 h-12 rounded-full flex-shrink-0" />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">{thread.tenant}</span>
                  <span className="font-['Inter:Regular'] font-normal text-sm text-black truncate">{thread.lastMessage}</span>
                </div>
                <span className="font-['Inter:Regular'] font-normal text-sm text-black flex-shrink-0">{thread.time}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-col flex-1 min-w-0 border-r border-black">
          {/* Chat header */}
          <div className="bg-white border-b border-black flex items-center justify-between px-5 h-[82px] flex-shrink-0">
            <div className="flex items-center gap-4">
              <img src={imgAvatar} alt="" className="w-12 h-12 rounded-full" />
              <div className="flex flex-col gap-1">
                <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">{activeChat.tenant}</span>
                <span className="font-['Inter:Regular'] font-normal text-xs text-black">{activeChat.online ? 'Online' : 'Offline'}</span>
              </div>
            </div>
            <span className="font-['Inter:Regular'] font-normal text-base text-black">{activeChat.room}</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto bg-white p-5 flex flex-col gap-4">
            <div className="text-center">
              <span className="font-['Inter:Regular'] font-normal text-xs text-black">2 ส.ค. 2026</span>
            </div>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'caretaker' ? 'justify-end' : 'justify-start'}`}>
                {msg.text === 'sticker' ? (
                  <div className="bg-[#d9d9d9] w-[160px] h-[140px] flex items-center justify-center">
                    <span className="font-['Inter:Regular'] font-normal text-sm text-black">sticker</span>
                  </div>
                ) : (
                  <div className={`border border-black px-5 py-2 max-w-xs ${msg.sender === 'caretaker' ? 'bg-white' : 'bg-white'}`}>
                    <span className="font-['Inter:Regular'] font-normal text-sm text-black">{msg.text}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-black flex items-center gap-3 p-3 bg-white">
            <div className="w-10 h-10 bg-[#d9d9d9] flex-shrink-0" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="พิมข้อความ..."
              className="flex-1 border border-black px-4 py-2 font-['Inter:Regular'] font-normal text-base text-black outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-black px-4 py-2 font-['Inter:Bold'] font-bold text-base text-white hover:bg-black/80"
            >
              ส่ง
            </button>
          </div>
        </div>

        {/* Right: room detail */}
        <div className="w-[302px] flex-shrink-0 bg-white flex flex-col p-5 gap-4">
          <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">รายละเอียด</span>
          {[['ชั้น', '6'], ['ห้อง', '607'], ['ยอดค้างชำระ', '1,200'], ['งานซ่อม', '0']].map(([label, value]) => (
            <div key={label} className="flex justify-between border-b border-black/10 pb-2">
              <span className="font-['Inter:Regular'] font-normal text-base text-black">{label}</span>
              <span className="font-['Inter:Regular'] font-normal text-base text-black">{value}</span>
            </div>
          ))}

          <span className="font-['Inter:Regular'] font-normal text-base text-black mt-2">ไฟล์ในการสนทนา</span>
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-[72px] h-[64px] bg-[#d9d9d9]" />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
