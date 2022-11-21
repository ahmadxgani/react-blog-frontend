import { useMutation, useQuery } from "@apollo/client";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { CREATE_TAG, DELETE_TAG, UPDATE_TAG } from "../../GraphQL/Mutations";
import { SHOW_ALL_TAGS } from "../../GraphQL/Queries";
import Modalbox from "../plugins/Modalbox";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ManageTags = () => {
  const MySwal = withReactContent(Swal);
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTag] = useState<{ name: string; id: number }[]>([]);
  const [tag, setItem] = useState<{ name: string; id: number } | null>(null);
  const [typeModal, setTypeModal] = useState("");
  const { data } = useQuery(SHOW_ALL_TAGS);
  const inputCreateRef = useRef<null | HTMLInputElement>(null);
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
      MySwal.fire({
        position: "top-end",
        icon: "success",
        title: "The tag has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDelete = (i: number) => {
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
          Swal.fire("Deleted!", "The tag has been deleted", "success");
        } catch (error) {
          console.log(error);
          Swal.fire("Oops!", "some error occurred", "error");
        }
      }
    });
  };

  useEffect(() => {
    if (data) {
      setTag(data.ShowAllTag.map((tag: { name: string; id: number }) => ({ name: tag.name, id: tag.id })));
    }
  }, [data]);

  const NewTag = () => (
    <div className="flex flex-col gap-2">
      <input ref={(input) => (inputCreateRef.current = input)} id="tag" type="text" placeholder="add new tag..." className="p-1 rounded-lg focus:outline-none" />
      <button className="p-1 px-2 bg-[#5561E3] text-white rounded-lg" onClick={handleCreateTag}>
        Submit
      </button>
    </div>
  );

  const EditTag = ({ id, name }: any) => {
    const [inputTag, setInputTag] = useState<string | boolean>(false);
    const editTagRef = useRef<HTMLInputElement | null>(null);
    const handleUpdate = async () => {
      if (inputTag) {
        const newTag = await updateTag({
          variables: {
            name: inputTag,
            id,
          },
        });

        setTag((currentTags) => [...currentTags.filter((tag) => id !== tag.id), { name: newTag.data.UpdateTag.name, id: newTag.data.UpdateTag.id }]);
        toggleModalBox();
        MySwal.fire({
          position: "top-end",
          icon: "success",
          title: "The tag has been changed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };

    useEffect(() => {
      if (inputTag === false) {
        setInputTag(name);
      }
    }, []);

    const handleTagOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      e.preventDefault();
      setInputTag(editTagRef.current!.value);
    };
    return (
      <div className="flex flex-col gap-2">
        <input ref={(input) => (editTagRef.current = input as HTMLInputElement)} id="tag" type="text" className="p-1 rounded-lg focus:outline-none" value={inputTag ? (inputTag as string) : ""} onChange={handleTagOnChange} />
        <button className="p-1 px-2 bg-[#5561E3] text-white rounded-lg" onClick={handleUpdate}>
          Submit
        </button>
      </div>
    );
  };

  const handleEdit = (id: number, name: string) => {
    OpenModal("edit", { id, name });
  };

  const RenderModal = ({ name, id }: { name?: string; id?: number }) => {
    if (isOpen) {
      switch (typeModal) {
        case "edit":
          return <Modalbox children={<EditTag name={name} id={id} />} title={"Update tag"} onClose={toggleModalBox} />;
        case "add":
          return <Modalbox children={<NewTag />} title={"Add new tag"} onClose={toggleModalBox} />;
      }
    }
    return <></>;
  };

  const OpenModal = (type: string, { name, id }: { name?: string; id?: number }) => {
    if (name && id) {
      setItem({
        name,
        id,
      });
    }
    setTypeModal(type);
    toggleModalBox();
  };

  return (
    <div className="w-1/2 max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100 flex justify-between">
        <h2 className="font-semibold text-gray-800">List Of Tags</h2>
        <button className="text-sm p-1 px-2 bg-[#5561E3] text-white rounded-lg" onClick={() => OpenModal("add", {})}>
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
      <RenderModal name={tag?.name} id={tag?.id as number} />;
    </div>
  );
};
export default ManageTags;
