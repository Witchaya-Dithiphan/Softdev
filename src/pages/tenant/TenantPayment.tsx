import Layout from '../../components/Layout';

export default function TenantPayment() {
  return (
    <Layout requiredRole="tenant">
      <div className="bg-white border-b border-black flex items-center px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">แจ้งชำระเงิน</span>
      </div>

      <div className="flex flex-col gap-5 p-5">
        {/* Current bill */}
        <div className="bg-white border border-black p-5 flex flex-col gap-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-['Inter:Semi Bold'] font-semibold text-base text-black">ค่าหอประจำเดือน: สิงหาคม</p>
              <p className="font-['Inter:Regular'] font-normal text-sm text-black mt-1">ครบกำหนดชำระใน 1:10:46</p>
            </div>
            <div className="bg-[#e9e9e9] border border-black px-6 py-3">
              <span className="font-['Inter:Semi Bold'] font-semibold text-xl text-black">6,800 บาท</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-['Inter:Regular'] font-normal text-sm text-black mb-2">ค่าน้ำ</p>
              <div className="bg-[#d9d9d9] h-10" />
            </div>
            <div>
              <p className="font-['Inter:Regular'] font-normal text-sm text-black mb-2">ค่าไฟ</p>
              <div className="bg-[#d9d9d9] h-10" />
            </div>
          </div>
        </div>

        {/* Usage threshold */}
        <div className="bg-white border border-black p-5 flex flex-col gap-5">
          <div>
            <p className="font-['Inter:Semi Bold'] font-semibold text-base text-black">กำหนดลิมิตค่าน้ำค่าไฟของคุณ</p>
            <p className="font-['Inter:Regular'] font-normal text-sm text-black mt-1">เมื่อหน่วยที่ใช้ใกล้ถึงที่คุณกำหนด ระบบจะส่งแจ้งเตือน</p>
          </div>
          <div className="grid grid-cols-2 gap-8 items-end">
            <div>
              <p className="font-['Inter:Regular'] font-normal text-sm text-black mb-2">ค่าน้ำ</p>
              <div className="bg-[#d9d9d9] h-10" />
            </div>
            <div>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <p className="font-['Inter:Regular'] font-normal text-sm text-black mb-2">ค่าไฟ</p>
                  <div className="bg-[#d9d9d9] h-10" />
                </div>
                <button className="bg-black text-white px-4 h-10 font-['Inter:Regular'] font-normal text-sm whitespace-nowrap hover:bg-black/80">
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment section */}
        <div className="bg-white border border-black p-5 flex flex-col gap-4">
          <p className="font-['Inter:Semi Bold'] font-semibold text-base text-black">ชำระเงิน</p>
          <div className="bg-[#d9d9d9] h-[160px] flex items-center justify-center">
            <span className="font-['Inter:Regular'] font-normal text-sm text-black">QR Code / ช่องทางชำระเงิน</span>
          </div>
          <div className="flex justify-end">
            <button className="bg-black text-white px-8 h-[51px] font-['Inter:Bold'] font-bold text-base hover:bg-black/80">
              ยืนยันการชำระ
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
