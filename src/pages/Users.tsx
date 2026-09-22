import { useState } from 'react';
import Layout from '../components/Layout';

const assetPathPrefix = '/assets';
const imgSearch = `${assetPathPrefix}/1c2c0.svg`;
const imgSort = `${assetPathPrefix}/a977f.svg`;

const users = [
  { name: 'สมชาย อยากกินไก่', email: 'abc@gmail.com', role: 'Owner', lastLogin: '22/08 08:02' },
  { name: 'สมชาย อยากกินไก่', email: 'abc@gmail.com', role: 'Admin', lastLogin: '22/08 08:02' },
  { name: 'สมชาย อยากกินไก่', email: 'abc@gmail.com', role: 'Staff', lastLogin: '22/08 08:02' },
  { name: 'สมชาย อยากกินไก่', email: 'abc@gmail.com', role: 'Staff', lastLogin: '22/08 08:02' },
  { name: 'สมชาย อยากกินไก่', email: 'abc@gmail.com', role: 'Staff', lastLogin: '22/08 08:02' },
  { name: 'สมชาย อยากกินไก่', email: 'abc@gmail.com', role: 'User', lastLogin: '22/08 08:02' },
];

const permissions = [
  'ดู Dashboard และ รายงาน',
  'เพิ่ม / ลบ / แก้ไขห้องพัก',
  'จัดการข้อมูลผู้อยู่อาศัย',
  'ออกนิติและส่งแจ้งเตือน',
  'จัดการผู้ใช้งานสิทธิ์ / ดูละระบบ',
];

const roles = ['เจ้าของหอ', 'ผู้ดูแลหอ', 'ช่างซ่อม', 'ผู้พักอาศัย'];

export default function Users() {
  const [search, setSearch] = useState('');
  const [permMatrix, setPermMatrix] = useState<boolean[][]>(
    permissions.map(() => roles.map(() => false))
  );

  const togglePerm = (pi: number, ri: number) => {
    setPermMatrix(prev => prev.map((row, i) =>
      i === pi ? row.map((val, j) => j === ri ? !val : val) : row
    ));
  };

  return (
    <Layout requiredRole="owner">
      {/* Header */}
      <div className="bg-white border-b border-black flex items-center justify-between px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">ผู้ใช้งานและสิทธิ์การเข้าถึง</span>
        <button className="bg-black h-[51px] px-6 font-['Inter:Bold'] font-bold text-base text-white hover:bg-black/80">
          + เพิ่มผู้ใช้งาน
        </button>
      </div>

      {/* Search */}
      <div className="flex gap-3 px-5 py-4 bg-[#d9d9d9]">
        <div className="bg-white border border-black flex gap-4 items-center h-[49px] px-5 flex-1">
          <img src={imgSearch} alt="" className="w-5 h-5 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหา"
            className="w-full font-['Inter:Regular'] font-normal text-base text-black outline-none bg-transparent"
          />
        </div>
        <div className="bg-white border border-black flex gap-3 items-center justify-center h-[49px] px-5 w-[111px]">
          <img src={imgSort} alt="" className="w-6 h-6" />
          <span className="font-['Inter:Regular'] font-normal text-base text-black">sort</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 p-5">
        {/* Users table */}
        <div className="bg-white border border-black overflow-auto">
          <div className="bg-[#e9e9e9] border-b border-black grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] h-[54px] items-center px-5 gap-4">
            {['ชื่อผู้ใช้งาน', 'อีเมล', 'บทบาท', 'เข้าใช้งานล่าสุด', 'จัดการ'].map(col => (
              <span key={col} className="font-['Inter:Regular'] font-normal text-base text-black">{col}</span>
            ))}
          </div>
          <div className="flex flex-col gap-3 p-5">
            {users.filter(u => u.name.includes(search) || u.email.includes(search)).map((user, i) => (
              <div key={i} className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] items-center gap-4">
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{user.name}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{user.email}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{user.role}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{user.lastLogin}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black cursor-pointer hover:underline">แก้ไข / ระงับ</span>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions matrix */}
        <div className="bg-white border border-black p-5 flex flex-col gap-4">
          <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">ตารางสิทธิ์เข้าถึง</span>
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-black px-4 py-2 text-left font-['Inter:Regular'] font-normal text-base text-black">สิทธิ์ / บทบาท</th>
                  {roles.map(role => (
                    <th key={role} className="border border-black px-4 py-2 font-['Inter:Regular'] font-normal text-base text-black">{role}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions.map((perm, pi) => (
                  <tr key={pi}>
                    <td className="border border-black px-4 py-2 font-['Inter:Regular'] font-normal text-base text-black">{perm}</td>
                    {roles.map((_, ri) => (
                      <td key={ri} className="border border-black px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={permMatrix[pi][ri]}
                          onChange={() => togglePerm(pi, ri)}
                          className="w-3 h-3"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-4">
            <button className="border border-black h-[51px] px-8 font-['Inter:Regular'] font-normal text-base text-black hover:bg-gray-50">
              ยกเลิก
            </button>
            <button className="bg-black h-[51px] px-8 font-['Inter:Bold'] font-bold text-base text-white hover:bg-black/80">
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
