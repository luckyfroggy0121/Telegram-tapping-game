import FriendsIcon from "@/assets/svg/friends.svg?react";


const Friends = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="font-extrabold text-[20px]">Friends</div>
      <FriendsIcon  height={500} width={500} />
    </div>
  );
};

export default Friends;