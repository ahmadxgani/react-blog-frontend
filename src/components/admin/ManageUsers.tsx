import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Mutation, Query } from "../../../generated-types";
import { DELETE_USER, UPDATE_PROFILE } from "../../GraphQL/Mutations";
import { SHOW_ALL_USERS } from "../../GraphQL/Queries";
import Modal from "../modals/Modal";
import Loading from "../plugins/Loading";

const ManageUsers = () => {
  const { data, loading } = useQuery<Query>(SHOW_ALL_USERS);
  const [updateProfile] = useMutation<Mutation>(UPDATE_PROFILE);
  const [deleteAuthor] = useMutation<Mutation>(DELETE_USER, {
    update: (cache, _, { variables }) => {
      const existingUsers = cache.readQuery<Query>({
        query: SHOW_ALL_USERS,
      });

      if (existingUsers) {
        cache.writeQuery({
          query: SHOW_ALL_USERS,
          data: {
            ShowAllAuthor: existingUsers.ShowAllAuthor.filter((author) => author.id !== variables!.id),
          },
        });
      }
    },
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [user, setUser] = useState<{ id: number; username: string } | null>();
  const [inputEditUsername, setInputEditUsername] = useState("");
  const MySwal = withReactContent(Swal);

  const handleEditProfile = (id: number, username: string) => {
    setUser({ id, username });
  };

  const handleEditOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setInputEditUsername(e.target.value);
  };

  const handleDeleteAuthor = (i: number) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteAuthor({
            variables: {
              id: i,
            },
          });
          Swal.fire("Deleted!", "The Users has been deleted", "success");
        } catch (error) {
          console.log(error);
          Swal.fire("Oops!", "some error occurred", "error");
        }
      }
    });
  };

  const handleEditOnSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await updateProfile({
      variables: {
        id: user!.id,
        username: inputEditUsername,
      },
    });
    setUser(null);
    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "The username has been changed",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleCloseModal = () => {
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      setInputEditUsername(user.username);
      setShowEditModal(true);
    } else setShowEditModal(false);
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">List Of Users</h2>
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
                  <div className="font-semibold text-left">Username</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Role</div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {data?.ShowAllAuthor.map((author, i) => {
                return (
                  <tr key={i}>
                    <td className="p-2 whitespace-nowrap">{++i}</td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{author.username}</div>
                    </td>
                    <td>{author.email}</td>
                    <td>{author.role}</td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex gap-5 items-center">
                        <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg" onClick={() => handleEditProfile(author.id, author.username)}>
                          Edit
                        </button>
                        <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg" onClick={() => handleDeleteAuthor(author.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={showEditModal} setShow={handleCloseModal} title="Edit Author">
        <form onSubmit={handleEditOnSubmit} className="flex flex-col gap-2">
          <input type="text" className="p-1 rounded-lg focus:outline-none" value={inputEditUsername} onChange={handleEditOnChange} />
          <button className="p-1 px-2 bg-[#5561E3] text-white rounded-lg">Submit</button>
        </form>
      </Modal>
    </div>
  );
};
export default ManageUsers;
