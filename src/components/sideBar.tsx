import { Stack, Box, Spacer } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePersonSearch } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import DialogPost from "./dialogPost";

export default function SideBar() {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };
  return (
    <Box>
      <Stack p="3" height="100vh" display="flex" alignItems="space-between">
        <Stack gap="3">
          <h1 className="text-[#04A51E] font-bold text-3xl text-left">circle</h1>
          <h3 className="text-md text-white">
            <a href="/" className="flex items-center gap-3">
              <AiOutlineHome style={{ color: "white", fontSize: "15px" }} /> Home
            </a>
          </h3>
          <h3 className="text-md text-white">
            <a href="/search" className="flex items-center gap-3">
              <MdOutlinePersonSearch style={{ color: "white", fontSize: "15px" }} /> Search
            </a>
          </h3>
          <h3 className="text-md text-white">
            <a href="/follows" className="flex items-center gap-3">
              <RiUserFollowLine style={{ color: "white", fontSize: "15px" }} /> Follow
            </a>
          </h3>
          <h3 className="text-md text-white">
            <a href="/profile" className="flex items-center gap-3">
              <CgProfile style={{ color: "white", fontSize: "15px" }} /> Profile
            </a>
          </h3>
          <DialogPost/>
        </Stack>

        <Spacer />
          <Box
            as="button"
            className="flex items-center gap-3 text-md text-white"
            onClick={onLogout}
          >
            <TbLogout2 style={{ color: "white", fontSize: "15px" }} /> Logout
          </Box>

      </Stack>
    </Box>
  );
}