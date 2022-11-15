export default function Dashboard() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100 flex justify-between">
        <h2 className="font-semibold text-gray-800">List Of Tags</h2>
        <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg">New Tag</button>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">No</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              <tr>
                <td className="p-2 whitespace-nowrap">1</td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left">Uncategories</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="flex gap-5 items-center">
                    <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg">Edit</button>
                    <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg">Delete</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-2 whitespace-nowrap">2</td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left">Programming</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="flex gap-5 items-center">
                    <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg">Edit</button>
                    <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg">Delete</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-2 whitespace-nowrap">3</td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left">Nodejs</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="flex gap-5 items-center">
                    <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg">Edit</button>
                    <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg">Delete</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-2 whitespace-nowrap">4</td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left">Golang</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="flex gap-5 items-center">
                    <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg">Edit</button>
                    <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg">Delete</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-2 whitespace-nowrap">5</td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left">Rust</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="flex gap-5 items-center">
                    <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg">Edit</button>
                    <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
