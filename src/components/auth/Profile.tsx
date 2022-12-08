import { useMutation, useQuery } from "@apollo/client";
import { BookmarkIcon, Cog8ToothIcon, EnvelopeIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChangeEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Query } from "../../../generated-types";
import { useUser } from "../../global/UserProvider";
import { DELETE_POST, DELETE_USER, UPDATE_PROFILE } from "../../GraphQL/Mutations";
import { LOAD_POSTS_BY_AUTHOR } from "../../GraphQL/Queries";
import { User } from "../../lib/types";
import Loading from "../plugins/Loading";

const Profile = () => {
  const MySwal = withReactContent(Swal);
  const user = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState(() => (user?.currentUser.user as User)?.username);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [deleteMyAccount] = useMutation(DELETE_USER, {
    onCompleted() {
      user?.setCurrentUser({ type: "logout" });
      navigate("/login");
      Swal.fire("Deleted!", "The Users has been deleted", "success");
    },
  });
  const [deletePost] = useMutation(DELETE_POST, {
    update: (cache, _, { variables }) => {
      const existingPosts = cache.readQuery<Query>({
        query: LOAD_POSTS_BY_AUTHOR,
        variables: {
          id: (user?.currentUser.user as User)?.id,
        },
      });

      if (existingPosts) {
        cache.writeQuery({
          query: LOAD_POSTS_BY_AUTHOR,
          data: {
            GetAuthorById: {
              posts: existingPosts.GetAuthorById.posts.filter((post) => post.slug !== variables!.slug),
            },
          },
          variables: {
            id: (user?.currentUser.user as User)?.id,
          },
        });
      }
    },
  });
  const { data, loading } = useQuery<Query>(LOAD_POSTS_BY_AUTHOR, {
    variables: {
      id: (user?.currentUser.user as User)?.id,
    },
  });
  if (loading) return <Loading />;

  const handleUsername: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const result = await updateProfile({
      variables: {
        id: (user?.currentUser.user as User)?.id,
        username,
      },
    });
    user?.setCurrentUser({
      type: "update",
      payload: {
        user: { ...(user.currentUser.user as User), username: result.data.UpdateAuthor.username },
      },
    });
    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "The username has been changed",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.dir(e.target.files);
  };

  const handleDelete = (slug: string) => {
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
          await deletePost({
            variables: {
              slug,
            },
          });
          Swal.fire("Deleted!", "The post has been deleted", "success");
        } catch (error) {
          console.log(error);
          Swal.fire("Oops!", "some error occurred", "error");
        }
      }
    });
  };

  const handleDeleteAccount = () => {
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
          deleteMyAccount({
            variables: {
              id: (user?.currentUser.user as User)?.id,
            },
          });
        } catch (error) {
          console.log(error);
          Swal.fire("Oops!", "some error occurred", "error");
        }
      }
    });
  };

  return (
    <div className="flex gap-5 md:flex-row flex-col px-3">
      <div className="card w-96 bg-base-100 shadow-xl self-start">
        <div className="card-body">
          <div className="card-title justify-between">
            <h3 className="text-xl font-bold">Profile</h3>
            <button className="btn btn-xs btn-primary">Set New Password</button>
          </div>
          <form onSubmit={handleSubmit} className="form-control">
            <div className="form-control">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <label className="input-group">
                <span>
                  <UserCircleIcon className="w-6" />
                </span>
                <input type="text" id="username" value={username} onChange={handleUsername} className="input input-bordered w-full input-md" />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <label className="input-group">
                <span>
                  <EnvelopeIcon className="w-6" />
                </span>
                <input type="email" id="email" value={(user?.currentUser.user as User)?.email} disabled className="input input-bordered w-full input-md" />
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Profile Image</span>
              </label>
              <input type="file" className="file-input file-input-bordered w-full max-w-xs file-input-md" onChange={handleImage} id="profile_image" />
              <label className="label" htmlFor="profile_image">
                <span className="label-text-alt">Pick a file</span>
              </label>
            </div>
            <div className="form-control gap-1 mt-3">
              <button className="btn btn-primary btn-sm">Save Profile Information</button>
              <button className="bg-red-600 text-white btn btn-sm btn-error" type="button" onClick={handleDeleteAccount}>
                Delete My Account
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex gap-3 flex-col">
        {data?.GetAuthorById.posts.map((post, i) => (
          <div key={i} className="flex p-[1.125rem] gap-[2.1875rem] justify-center bg-white rounded-xl box-content">
            <div className="flex gap-5">
              <Link to={`/post/${post.slug}`} className="relative min-w-[14.6875rem] max-w-[14.6875rem] sm:block hidden">
                <img src={process.env.PUBLIC_URL + "/img/example/thumbnail.jpg"} alt="Thumbnail" className="rounded-[1.25rem]" />
                <div className="pt-[0.625rem] pr-[0.625rem] top-0 right-0 absolute">
                  <img src={process.env.PUBLIC_URL + "/img/example/profile.jpg"} alt="Profile" className="border-[3px] border-solid border-white rounded-full w-8 h-8" />
                </div>
              </Link>
              <div className="max-w-[26.125rem] flex flex-col gap-2">
                <div>
                  <Link to={`/post/${post.slug}`} className="font-bold lg:text-3xl sm:text-2xl text-sm leading-6 text-[#353443]">
                    {post.title}
                  </Link>
                  <p className="sm:text-xl text-sm">
                    <small className="text-[#37A0C1] font-bold">{post.tags[0] ? post.tags[0].name : "Uncategories"}&#9;</small>
                    <span className="text-[#8C8B93] font-light">|&#9;</span>
                    <small className="text-[#8E8D93]">6 min read</small>
                  </p>
                </div>

                <Link to={`/post/${post.slug}`} className="text-[#57565C] text-sm overflow-hidden">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
                </Link>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <TrashIcon className="w-8" onClick={() => handleDelete(post.slug)} />
              <Link to={`/post/${post.slug}/edit`}>
                <Cog8ToothIcon className="w-8" />
              </Link>
              <BookmarkIcon className="w-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
