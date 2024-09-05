import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import useUserStore from "./userStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";

const rows = [
  {
    id: 1,
    Name: "Rowan Torres",
    Email: "Rowantorres@gmail.com",
    Phone: 9999999999,
    Role: "User",
    LastLogin: "days ago",
    image: "../images/rowan.avif",
    status: "Active",
  },
  {
    id: 2,
    Name: "Roman Torres",
    Email: "Romantorres@gmail.com",
    Phone: 9999999999,
    Role: "User",
    LastLogin: "days ago",
    image: "../images/roman.jpeg",
    status: "Active",
  },
  {
    id: 3,
    Name: "Roman Torres",
    Email: "Romantorres@gmail.com",
    Phone: 9999999999,
    Role: "User",
    LastLogin: "days ago",
    image: "../images/roman.jpeg",
    status: "Active",
  },
  {
    id: 4,
    Name: "Roman Torres",
    Email: "Romantorres@gmail.com",
    Phone: 9999999999,
    Role: "Admin",
    LastLogin: "days ago",
    image: "../images/roman.jpeg",
    status: "InActive",
  },
  {
    id: 5,
    Name: "Roman Torres",
    Email: "Romantorres@gmail.com",
    Phone: 9999999999,
    Role: "User",
    LastLogin: "days ago",
    image: "../images/roman.jpeg",
    status: "Active",
  },
  {
    id: 6,
    Name: "Roman Torres",
    Email: "Romantorres@gmail.com",
    Phone: 99999999990,
    Role: "User",
    LastLogin: "days ago",
    image: "../images/roman.jpeg",
    status: "InActive",
  },
  {
    id: 7,
    Name: "Roman Torres",
    Email: "Romantorres@gmail.com",
    Phone: 9999999999,
    Role: "User",
    LastLogin: "days ago",
    image: "../images/roman.jpeg",
    status: "InActive",
  },
  {
    id: 8,
    Name: "Roman Torres",
    Email: "Romantorres@gmail.com",
    Phone: 9999999999,
    Role: "User",
    LastLogin: "days ago",
    image: "../images/roman.jpeg",
    status: "Active",
  },
  {
    id: 9,
    Name: "Roman Torres",
    Email: "Romantorres@gmail.com",
    Phone: 9999999999,
    Role: "User",
    LastLogin: "days ago",
    image: "../images/roman.jpeg",
    status: "Active",
  },
  {
    id: 10,
    Name: "Roman Torres",
    Email: "Romantorres@gmail.com",
    Phone: 9999999999,
    Role: "User",
    LastLogin: "days ago",
    image: "../images/roman.jpeg",
    status: "InActive",
  },
  {
    id: 11,
    Name: "Roman Torres",
    Email: "Romantorres@gmail.com",
    Phone: 9999999999,
    Role: "User",
    LastLogin: "days ago",
    image: "../images/roman.jpeg",
    status: "InActive",
  },
  {
    id: 12,
    Name: "Roman Torres",
    Email: "Romantorres@gmail.com",
    Phone: 9999999999,
    Role: "User",
    LastLogin: "days ago",
    image: "../images/roman.jpeg",
    status: "Active",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: 24,
  p: 4,
};

export default function DataTable({ user }) {
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={params.row.image}
            alt={params.row.Name}
            style={{
              width: "30px",
              height: "30px",
              marginRight: "10px",
            }}
          />
          {params.row.firstName + " " + params.row.lastName}{" "}
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 200,
    },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "lastLogin", headerName: "Last Login", width: 130 },
    { field: "role", headerName: "Role", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "Action",
      headerName: "Action",
      width: 90,
      renderCell: (params) => (
        <div>
          <Select
            id="status"
            name="status"
            className="w-[90%] mx-0 mt-2 md:w-20 md:h-8"
            // sx={{ width: "60%" }}
            size="small"
            placeholder="role"
            defaultValue=""
            // value="action"
            // onChange={(event) => handleAction(event, params.row.id)}
            // value={formData.status}
            onChange={(event) => handleAction(event, params.row.id)}
            required
          >
            <MenuItem value="">Action</MenuItem>
            <MenuItem value="edit">Edit</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
          </Select>
        </div>
      ),
    },
  ];
  // we have imported the removeuser function from useUserStore
  // const [users, setUsers] = useState();
  console.log("user getting from search =>" + JSON.stringify(user));
  const { removeUser } = useUserStore();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   setUsers(user);
  // }, [user]);

  const users = useUserStore((state) => state.users);
  let userData;
  if (user === undefined) {
    userData = users;
  } else {
    userData = user;
  }
  const handleDelete = () => {
    console.log("inside handle delete" + "id => " + id);
    setConfirmDelete(true);
    removeUser(id);
    setOpen(false);
    toast.error("user deleted successfully", {
      position: "top-right",
      theme: "colored",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleAction = (event, id) => {
    const action = event.target.value;

    if (action === "edit") {
      const editUrl = "/EditUser/Edit%20User?id=" + id;
      console.log("editUrl" + editUrl);
      navigate(editUrl);
    } else if (action === "delete") {
      setId(Number(id));
      console.log("action" + action);
      setOpen(true);
      console.log(
        "open" + open + "after setOpen true ,confirmDelete" + confirmDelete
      );
      // if (confirmDelete === true) {
      //   console.log("inside confirmDelete");
      //   removeUser(id);
      //   setOpen(false);
      // }
    }
  };

  return (
    <div>
      <div style={{ height: 475, width: "100%" }}>
        <DataGrid
          rows={userData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 7 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="border border-black md:w-[400px] w-72">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h10"
            component="h2"
            marginBottom={3}
          >
            Are You Really Want to Delete the user ?
          </Typography>
          <Box
            width="100%"
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button variant="contained" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "gray" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      ;
    </div>
  );
}
