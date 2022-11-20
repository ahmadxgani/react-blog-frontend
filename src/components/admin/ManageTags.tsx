import { useMutation, useQuery } from "@apollo/client";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { CREATE_TAG, DELETE_TAG, UPDATE_TAG } from "../../GraphQL/Mutations";
import { SHOW_ALL_TAGS } from "../../GraphQL/Queries";
import { Tags } from "../../lib/types";
import Modalbox from "../plugins/Modalbox";

const ManageTags = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTag] = useState<{ name: string; id: number }[]>([]);
  const [inputTag, setInputTag] = useState("");
  const [typeModal, setTypeModal] = useState("");
  const { data } = useQuery(SHOW_ALL_TAGS);
  const inputCreateRef = useRef<null | HTMLInputElement>(null);
  const editTagRef = useRef<Tags | null>(null);
  const [createTag] = useMutation(CREATE_TAG);
  const [deleteTag] = useMutation(DELETE_TAG);
  const [updateTag] = useMutation(UPDATE_TAG);
  const toggleModalBox = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateTag = async () => {
    if (inputCreateRef.current) {
      const newTag = await createTag({
        variables: {
          name: inputCreateRef.current.value,
        },
      });

      setTag((currentTags) => [...currentTags, { name: newTag.data.CreateTag.name, id: newTag.data.CreateTag.id }]);
      toggleModalBox();
    }
  };

  const handleUpdate = async () => {
    if (editTagRef.current?.inputTag?.value) {
      const newTag = await updateTag({
        variables: {
          name: inputTag,
          id: editTagRef.current!.id,
        },
      });

      setTag((currentTags) => [...currentTags.filter((tag) => editTagRef.current!.id !== tag.id), { name: newTag.data.UpdateTag.name, id: newTag.data.UpdateTag.id }]);
      toggleModalBox();
    }
  };

  const handleDelete = async (i: number) => {
    try {
      await deleteTag({
        variables: {
          id: i,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: number, name: string) => {
    editTagRef.current = {
      ...editTagRef.current,
      id,
    };
    setInputTag(name);
    openModal("edit");
  };

  const handleTagOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setInputTag(editTagRef.current!.inputTag!.value);
  };

  useEffect(() => {
    if (data) {
      setTag(data.ShowAllTag.map((tag: { name: string; id: number }) => ({ name: tag.name, id: tag.id })));
    }
  }, [data]);

  const newTag = (
    <div className="flex flex-col gap-2">
      <input ref={(input) => (inputCreateRef.current = input)} id="tag" type="text" placeholder="add new tag..." className="p-1 rounded-lg focus:outline-none" />
      <button className="p-1 px-2 bg-[#5561E3] text-white rounded-lg" onClick={handleCreateTag}>
        Submit
      </button>
    </div>
  );

  const editTag = (
    <div className="flex flex-col gap-2">
      <input ref={(input) => (editTagRef.current!.inputTag = input as HTMLInputElement)} id="tag" type="text" className="p-1 rounded-lg focus:outline-none" value={inputTag} onChange={handleTagOnChange} />
      <button className="p-1 px-2 bg-[#5561E3] text-white rounded-lg" onClick={handleUpdate}>
        Submit
      </button>
    </div>
  );

  const RenderModal = () => {
    if (isOpen) {
      switch (typeModal) {
        case "edit":
          return <Modalbox content={editTag} title={"Update tag"} onClose={toggleModalBox} />;
        case "add":
          return <Modalbox content={newTag} title={"Add new tag"} onClose={toggleModalBox} />;
      }
    }
    return <></>;
  };

  const openModal = (type: string) => {
    setTypeModal(type);
    toggleModalBox();
  };

  return (
    <div className="w-1/2 max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100 flex justify-between">
        <h2 className="font-semibold text-gray-800">List Of Tags</h2>
        <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg" onClick={() => openModal("add")}>
          New Tag
        </button>
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
              {tags.map((tag, i) => (
                <tr key={i}>
                  <td className="p-2 whitespace-nowrap">{++i}</td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{tag.name}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex gap-5 items-center">
                      <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg" onClick={() => handleEdit(tag.id, tag.name)}>
                        Edit
                      </button>
                      <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg" onClick={() => handleDelete(tag.id)}>
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
      <RenderModal />
    </div>
  );
};
export default ManageTags;
