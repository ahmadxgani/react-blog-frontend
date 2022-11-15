export default function Dashboard() {
  return (
    <div className="w-1/2">
      <div className="flex justify-between">
        <h3>Lists Tag</h3>
        <button>New Tag</button>
      </div>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Programming</td>
            <td>
              <button>Edit</button>
            </td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
