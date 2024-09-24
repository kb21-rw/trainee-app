import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { getJWT, getNextFormTitle } from "../../utils/helper";
import {
  useCreateFormMutation,
} from "../../features/user/apiSlice";
import { useNavigate } from "react-router-dom";

type FormType = "Applicant" | "Trainee";

interface MenuItemProps {
    label: string;
    type?: FormType;
    link?: string;
}

export default function CreateFormDropdown() {
    const navigate = useNavigate();
    const jwt: string = getJWT();
    const [createForm] = useCreateFormMutation();
  
    const menuItems: MenuItemProps[] = [
      { label: "Create a new Trainee form", type: "Trainee" },
      { label: "Create a new Applicant form", type: "Applicant" },
      { label: "Create a new Application form", link: "/forms/create/application-form" },
    ];

  const onClickAddForm = async (type: FormType) => {
    try {
      const nextFormTitle = getNextFormTitle(type);
  
      let requestBody: object = { name: nextFormTitle, type };
  
      console.log("Request Body:", requestBody);
  
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
          className="origin-top-right rounded-lg border border-white/5 bg-white text-sm text-gray-500 font-medium transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
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
