const Profile = () => {
  return (
    <div className="p-5 bg-white rounded-xl w-96 flex flex-col gap-5">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold">Profile</h3>
        <button className="p-1 px-2 bg-[#5561E3] text-white rounded-lg">Set New Password</button>
      </div>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input className="px-2 focus:outline-none border py-1 rounded" type="text" name="username" id="username" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input className="px-2 focus:outline-none border py-1 rounded" type="email" name="email" id="email" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="profile_image">Profile Image</label>
            <div className="flex gap-2 items-center">
              <img className="rounded-full" src={process.env.PUBLIC_URL + "/img/example/user.jpeg"} alt="user's profile" width={40} />
              <input type="file" name="profile_image" id="profile_image" />
            </div>
          </div>
        </div>
        <button className="p-1 px-2 bg-[#5561E3] text-white rounded-lg">Save Profile Information</button>
      </form>
    </div>
  );
};

export default Profile;