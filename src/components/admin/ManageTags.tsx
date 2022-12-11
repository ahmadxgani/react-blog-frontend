import { useMutation, useQuery } from "@apollo/client";
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { CREATE_TAG, DELETE_TAG, UPDATE_TAG } from "../../GraphQL/Mutations";
import { SHOW_ALL_TAGS } from "../../GraphQL/Queries";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Modal from "../modals/Modal";
import { SelectedTag } from "../../lib/types";
import { Mutation, Query } from "../../../generated-types";

const ManageTags = () => {
  const MySwal = withReactContent(Swal);
  const [tags, setTag] = useState<SelectedTag[]>([]);
  const [selectedTag, setSelectedTag] = useState<null | SelectedTag>(null);
  const [inputEditTag, setInputEditTag] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data } = useQuery(SHOW_ALL_TAGS);
  const [createTag] = useMutation<Mutation>(CREATE_TAG, {
    update: (cache, { data }) => {
      const newTagFromResponse = data?.CreateTag;
      const existingTags = cache.readQuery<Query>({
        query: SHOW_ALL_TAGS,
      });

      if (existingTags && newTagFromResponse) {
        cache.writeQuery({
          query: SHOW_ALL_TAGS,
          data: {
            ShowAllTag: [...existingTags.ShowAllTag, newTagFromResponse],
          },
        });
      }
    },
  });
  const [deleteTag] = useMutation(DELETE_TAG, {
    update: (cache, _, { variables }) => {
      const existingTags = cache.readQuery<Query>({
        query: SHOW_ALL_TAGS,
      });

      if (existingTags) {
        cache.writeQuery({
          query: SHOW_ALL_TAGS,
          data: {
            ShowAllTag: existingTags.ShowAllTag.filter((tag) => tag.id !== variables!.id),
          },
        });
      }
    },
  });
  const [updateTag] = useMutation(UPDATE_TAG);

  const handleEditOnSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (inputEditTag) {
      await updateTag({
        variables: {
          id: selectedTag?.id,
          name: inputEditTag,
        },
      });
      setShowEditModal(false);
      MySwal.fire({
        position: "top-end",
        icon: "success",
        title: "The tag has been changed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleEditOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setInputEditTag(event.target.value);
  };

  const handleEditTag = (tag: SelectedTag) => {
    setSelectedTag(tag);
  };

  const handleDeleteTag = (i: number) => {
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
          await deleteTag({
            variables: {
              id: i,
            },
          });
          MySwal.fire("Deleted!", "The tag has been deleted", "success");
        } catch (error) {
          console.log(error);
          MySwal.fire("Oops!", "some error occurred", "error");
        }
      }
    });
  };

  const handleCreateOnSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if ((event as any).target.nameTag.value) {
      await createTag({
        variables: {
          name: (event as any).target.nameTag.value,
        },
      });
      setShowCreateModal(false);
      MySwal.fire({
        position: "top-end",
        icon: "success",
        title: "The tag has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    if (data) {
      setTag(data.ShowAllTag.map((tag: SelectedTag) => ({ name: tag.name, id: tag.id })));
    }
  }, [data]);

  useEffect(() => {
    if (selectedTag) {
      setInputEditTag(selectedTag.name);
      setShowEditModal(true);
    }
  }, [selectedTag]);

  return (
    <div className="mx-auto shadow-xl card w-96 bg-base-100">
      <div className="card-body">
        <header className="card-title justify-between">
          <h2 className="font-semibold">List Of Tags</h2>
          <button className="btn btn-primary btn-sm" onClick={() => setShowCreateModal(true)}>
            New Tag
          </button>
        </header>
        <div className="divider m-0 mb-1" />
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag, i) => (
                <tr key={i}>
                  <td>{++i}</td>
                  <td>
                    <div className="text-left">{tag.name}</div>
                  </td>
                  <td>
                    <div className="flex gap-3 items-center">
                      <button className="btn btn-xs btn-primary" onClick={() => handleEditTag({ name: tag.name, id: tag.id })}>
                        Edit
                      </button>
                      <button className="btn btn-xs btn-primary" onClick={() => handleDeleteTag(tag.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={showEditModal} setShow={setShowEditModal} title="Edit Tag">
        <form onSubmit={handleEditOnSubmit} className="flex flex-col gap-2">
          <input id="nameTag" type="text" className="p-1 rounded-lg focus:outline-none" value={inputEditTag} onChange={handleEditOnChange} />
          <button className="btn btn-primary btn-sm">Submit</button>
        </form>
      </Modal>
      <Modal show={showCreateModal} setShow={setShowCreateModal} title="Create Tag">
        <form onSubmit={handleCreateOnSubmit} className="flex flex-col gap-2">
          <input id="nameTag" type="text" className="p-1 rounded-lg focus:outline-none" />
          <button className="btn btn-primary btn-sm">Submit</button>
        </form>
      </Modal>
    </div>
  );
};
export default ManageTags;
