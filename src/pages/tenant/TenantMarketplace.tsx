import { useState } from 'react';
import Layout from '../../components/Layout';

interface Product {
  id: number;
  seller: string;
  room: string;
  time: string;
  desc: string;
  price: string;
  isOwn?: boolean;
}

const initialProducts: Product[] = [
  { id: 1, seller: 'สมชาย อยากกินหมู', room: 'สมชาย - 607', time: '16:40 น.', desc: 'ขายพัดลมครับ ที่ห้อง', price: '123' },
  { id: 2, seller: 'สมชาย อยากกินหมู', room: 'สมชาย - 607', time: '16:40 น.', desc: 'ขายพัดลมครับ ที่ห้อง', price: '123' },
  { id: 3, seller: 'สมชาย อยากกินหมู', room: 'สมชาย - 607', time: '16:40 น.', desc: 'ขายพัดลมครับ ที่ห้อง', price: '123', isOwn: true },
  { id: 4, seller: 'สมชาย อยากกินหมู', room: 'สมชาย - 607', time: '16:40 น.', desc: 'ขายพัดลมครับ ที่ห้อง', price: '123' },
];

export default function TenantMarketplace() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [showMyProducts, setShowMyProducts] = useState(false);
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const displayProducts = showMyProducts ? products.filter(p => p.isOwn) : products;

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setMenuOpenId(null);
  };

  const handleAdd = () => {
    if (!newDesc.trim()) return;
    setProducts(prev => [...prev, {
      id: Date.now(),
      seller: 'ผู้พักอาศัย ห้อง1134',
      room: 'ฉัน - 1134',
      time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.',
      desc: newDesc,
      price: newPrice || '-',
      isOwn: true,
    }]);
    setNewDesc('');
    setNewPrice('');
    setShowAddModal(false);
  };

  return (
    <Layout requiredRole="tenant">
      <div className="bg-white border-b border-black flex items-center px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">Marketplace</span>
      </div>

      <div className="flex flex-col gap-4 p-5">
        {/* Toolbar */}
        <div className="flex gap-3">
          <div className="bg-white border border-black flex items-center gap-3 h-[49px] px-4 flex-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="7" stroke="black" strokeWidth="1.5" />
              <path d="M14 14L18 18" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาเลขห้อง / ชื่อผู้พักอาศัย"
              className="w-full font-['Inter:Regular'] font-normal text-base text-black outline-none bg-transparent"
            />
          </div>
          <button className="bg-white border border-black h-[49px] px-4 flex items-center gap-2 font-['Inter:Regular'] font-normal text-base text-black hover:bg-gray-50">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M4 8h8M6 12h4" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            sort
          </button>
          <button
            onClick={() => setShowMyProducts(!showMyProducts)}
            className={`h-[49px] px-4 border border-black font-['Inter:Regular'] font-normal text-base hover:bg-gray-50 ${showMyProducts ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            my product
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-black text-white h-[49px] px-4 font-['Inter:Bold'] font-bold text-base hover:bg-black/80"
          >
            add product
          </button>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 relative">
          {displayProducts.filter(p => p.desc.includes(search) || p.seller.includes(search)).map((p) => (
            <div key={p.id} className="bg-white border border-black p-4 flex flex-col gap-3 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#d9d9d9] flex-shrink-0" />
                  <div>
                    <p className="font-['Inter:Semi Bold'] font-semibold text-sm text-black">{p.seller}</p>
                    <p className="font-['Inter:Regular'] font-normal text-xs text-black">{p.time}</p>
                  </div>
                </div>
                {p.isOwn && (
                  <div className="relative">
                    <button
                      onClick={() => setMenuOpenId(menuOpenId === p.id ? null : p.id)}
                      className="w-7 h-7 flex items-center justify-center text-black hover:bg-gray-100"
                    >
                      ···
                    </button>
                    {menuOpenId === p.id && (
                      <div className="absolute right-0 top-8 bg-white border border-black z-10 w-28 flex flex-col">
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-4 py-2 text-left font-['Inter:Regular'] font-normal text-sm text-black hover:bg-gray-50 border-b border-black"
                        >
                          delete
                        </button>
                        <button
                          onClick={() => setMenuOpenId(null)}
                          className="px-4 py-2 text-left font-['Inter:Regular'] font-normal text-sm text-black hover:bg-gray-50"
                        >
                          edit
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="text-xs text-black">
                <p className="font-['Inter:Regular'] font-normal">{p.desc}</p>
                <p className="font-['Inter:Regular'] font-normal">{p.price}</p>
              </div>
              <div className="bg-[#d9d9d9] h-[140px]" />
              <div className="flex justify-end">
                <div className="bg-[#d9d9d9] h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add product modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white border border-black w-[480px] p-6 flex flex-col gap-4">
            <p className="font-['Inter:Semi Bold'] font-semibold text-base text-black">เพิ่มสินค้า</p>
            <div className="bg-[#d9d9d9] h-[200px] flex items-center justify-center cursor-pointer hover:bg-[#c9c9c9]">
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl text-black">+</span>
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">อัพโหลดรูปภาพ</span>
              </div>
            </div>
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="รายละเอียดสินค้า..."
              rows={3}
              className="border border-black p-3 font-['Inter:Regular'] font-normal text-base text-black outline-none resize-none"
            />
            <input
              type="text"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="ราคา"
              className="border border-black px-4 h-10 font-['Inter:Regular'] font-normal text-base text-black outline-none"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowAddModal(false)} className="border border-black px-6 h-10 font-['Inter:Regular'] font-normal text-base text-black hover:bg-gray-50">
                ยกเลิก
              </button>
              <button onClick={handleAdd} className="bg-black text-white px-6 h-10 font-['Inter:Bold'] font-bold text-base hover:bg-black/80">
                เพิ่ม
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
