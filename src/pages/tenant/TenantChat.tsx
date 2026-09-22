import { useState } from 'react';
import Layout from '../../components/Layout';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
  isSticker?: boolean;
}

interface Thread {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  isGroup?: boolean;
}

const threads: Thread[] = [
  { id: 1, name: 'แชทรวมหอพัก', lastMessage: 'โอเคครับ ขอบคุณครับ', time: '19:33', isGroup: true },
  ...Array.from({ length: 9 }, (_, i) => ({
    id: i + 2,
    name: 'สมชาย อยากกินไก่',
    lastMessage: 'ได้ครับ ขอบคุณครับ',
    time: '19:33',
  })),
];

const initialMessages: Message[] = [
  { id: 1, text: 'สวัสดีครับ สามารถพาเพื่อนมาห้องได้มั้ยครับ', sender: 'me', time: '19:30' },
  { id: 2, text: 'ได้ค่ะ', sender: 'other', time: '19:31' },
  { id: 3, text: 'โอเคครับ ขอบคุณครับ', sender: 'me', time: '19:32' },
  { id: 4, text: '', sender: 'other', time: '19:33', isSticker: true },
];

export default function TenantChat() {
  const [activeThread, setActiveThread] = useState(1);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const active = threads.find(t => t.id === activeThread)!;

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: input,
      sender: 'me',
      time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInput('');
  };

  return (
    <Layout requiredRole="tenant">
      <div className="flex flex-1 min-h-0">
        {/* Thread list */}
        <div className="flex flex-col w-[240px] flex-shrink-0 border-r border-black">
          <div className="bg-white border-b border-black flex items-center px-5 h-[82px] flex-shrink-0">
            <span className="font-['Inter:Medium'] font-medium text-2xl text-black">Chat</span>
          </div>
          <div className="flex-1 overflow-auto bg-white">
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setActiveThread(thread.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 border-b border-black/10 text-left hover:bg-gray-50 ${activeThread === thread.id ? 'bg-[rgba(217,217,217,0.6)]' : ''}`}
              >
                <div className="w-9 h-9 rounded-full bg-[#d9d9d9] flex-shrink-0" />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-['Inter:Semi Bold'] font-semibold text-sm text-black truncate">{thread.name}</span>
                  <span className="font-['Inter:Regular'] font-normal text-xs text-black truncate">{thread.lastMessage}</span>
                </div>
                <span className="font-['Inter:Regular'] font-normal text-xs text-black flex-shrink-0">{thread.time}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-col flex-1 min-w-0 border-r border-black">
          <div className="bg-white border-b border-black flex items-center justify-between px-5 h-[82px] flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d9d9d9]" />
              <div>
                <p className="font-['Inter:Semi Bold'] font-semibold text-base text-black">{active.name}</p>
                <p className="font-['Inter:Regular'] font-normal text-xs text-black">Online</p>
              </div>
            </div>
            <span className="font-['Inter:Regular'] font-normal text-base text-black">ห้อง 607</span>
          </div>

          <div className="flex-1 overflow-auto bg-white p-5 flex flex-col gap-4">
            <div className="text-center">
              <span className="font-['Inter:Regular'] font-normal text-xs text-black">2 ส.ค. 2026</span>
            </div>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                {msg.isSticker ? (
                  <div className="bg-[#d9d9d9] w-[160px] h-[140px] flex items-center justify-center">
                    <span className="font-['Inter:Regular'] font-normal text-sm text-black">sticker</span>
                  </div>
                ) : (
                  <div className="border border-black px-5 py-2 max-w-xs bg-white">
                    <span className="font-['Inter:Regular'] font-normal text-sm text-black">{msg.text}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

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
        <div className="w-[240px] flex-shrink-0 bg-white flex flex-col p-5 gap-4">
          <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">รายละเอียด</span>
          {[['ชั้น', '6'], ['ห้อง', '607']].map(([label, value]) => (
            <div key={label} className="flex justify-between border-b border-black/10 pb-2">
              <span className="font-['Inter:Regular'] font-normal text-base text-black">{label}</span>
              <span className="font-['Inter:Regular'] font-normal text-base text-black">{value}</span>
            </div>
          ))}
          <span className="font-['Inter:Regular'] font-normal text-base text-black mt-2">ไฟล์ในการสนทนา</span>
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-[60px] h-[56px] bg-[#d9d9d9]" />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
