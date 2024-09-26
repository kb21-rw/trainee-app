import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { getJWT, getNextFormTitle } from "../../utils/helper";
import {
  useCreateFormMutation,
} from "../../features/user/apiSlice";
import { useNavigate } from "react-router-dom";
import { FormType } from "../../utils/types";
import { menuItems } from "../../utils/data";


export default function CreateFormDropdown() {
    const navigate = useNavigate();
    const jwt: string = getJWT();
    const [createForm] = useCreateFormMutation();
  


  const onClickAddForm = async (type: FormType) => {
    try {
      const nextFormTitle = getNextFormTitle(type);
  
      let requestBody: object = { name: nextFormTitle, type };
  
      const { data: formData } = await createForm({
        jwt,
        body: requestBody,
      });
  
      const id = formData?._id;
  
      if (id) {
        navigate(`/forms/${id}`);
      } else {
        throw new Error("Form creation failed: ID not found.");
      }
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };


  return (
    <div>
      <Menu>
        <MenuButton className="flex items-center gap-2 bg-primary-dark text-white px-4 py-3 rounded">
          <PlusIcon />
          Add form
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="origin-top-right rounded-lg border border-white/5 bg-white text-sm text-gray-500 font-medium transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 custom-shadow"
        >
          {menuItems.map((item, index) => (
            <MenuItem key={index}>
              {item.link ? (
                <Link
                  to={item.link}
                  className={`group flex w-full items-center py-3 px-10 data-[focus]:bg-primary-dark data-[focus]:text-white ${
                    index === menuItems.length - 1 ? "border-none" : "border-b"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  className={`group flex w-full items-center py-3 px-10 data-[focus]:bg-primary-dark data-[focus]:text-white ${
                    index === menuItems.length - 1 ? "border-none" : "border-b"
                  }`}
                  onClick={() => onClickAddForm(item.type as FormType)}
                >
                  {item.label}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
