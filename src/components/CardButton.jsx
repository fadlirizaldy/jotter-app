import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";

const CardButton = ({
  id,
  isArchived,
  handleDeleteNote,
  handleArchiveActive,
}) => {
  const navigate = useNavigate();

  return (
    <div className="p-1 w-fit absolute right-3 top-[39px] bg-white border border-slate-300 flex flex-col justify-center rounded-md">
      <div className="flex items-center px-[1px] py-[3px] gap-1 rounded-md hover:bg-slate-200">
        <Icon icon="iconamoon:edit-duotone" color="gray" />
        <button
          className="text-slate-600 text-sm"
          onClick={() => navigate(`/note/${id}`)}
        >
          Detail
        </button>
      </div>
      <div
        className="cursor-pointer flex items-center px-[1px] py-[3px] gap-1 rounded-md hover:bg-slate-200"
        onClick={() => handleArchiveActive()}
      >
        <Icon
          icon={isArchived ? "hugeicons:note-03" : "material-symbols:archive"}
          color="gray"
        />
        <button className="text-slate-600 text-sm">
          {isArchived ? "Active" : "Archive"}
        </button>
      </div>
      <div className="flex items-center px-[1px] py-[3px] gap-1 rounded-md hover:bg-slate-200">
        <Icon icon="octicon:trash-16" color="gray" />
        <button
          className="text-slate-600 text-sm"
          onClick={() => handleDeleteNote()}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

CardButton.propTypes = {
  id: PropTypes.string.isRequired,
  isArchived: PropTypes.bool.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  handleArchiveActive: PropTypes.func.isRequired,
};

export default CardButton;
