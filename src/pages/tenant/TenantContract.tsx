import Layout from '../../components/Layout';

const contractText = `สัญญาเช่า

ข้อตกลงการเช่าหอพักฉบับนี้ทำขึ้นระหว่างเจ้าของหอพักและผู้เช่า โดยมีรายละเอียดดังต่อไปนี้

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`;

const contractText2 = `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`;

export default function TenantContract() {
  return (
    <Layout requiredRole="tenant">
      <div className="bg-white border-b border-black flex items-center px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">สัญญาเช่า</span>
      </div>

      <div className="p-5">
        <div className="bg-white border border-black p-10 flex flex-col gap-8 min-h-[600px]">
          <p className="font-['Inter:Semi Bold'] font-semibold text-xl text-black text-center">สัญญาเช่า</p>
          <p className="font-['Inter:Regular'] font-normal text-base text-black leading-relaxed whitespace-pre-line">
            {contractText}
          </p>
          <p className="font-['Inter:Regular'] font-normal text-base text-black leading-relaxed whitespace-pre-line">
            {contractText2}
          </p>
        </div>
      </div>
    </Layout>
  );
}
