import ManageTags from "./ManageTags";
import ManageUsers from "./ManageUsers";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-2">
      <ManageTags />
      <ManageUsers />
    </div>
  );
}
