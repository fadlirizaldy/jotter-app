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
    <div className="dropdown dropdown-hover hidden group-hover:block">
      <div tabIndex={0} role="button" className="cursor-pointer">
        <Icon
          icon="bi:three-dots-vertical"
          color="gray"
          width="20"
          className="mt-1"
          onClick={() => setShowOption((prev) => !prev)}
        />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow bg-gray-100 dark:bg-dark-bg-primary dark:border dark:border-white"
      >
        <li>
          <p
            className="text-slate-600 text-md dark:text-white"
            onClick={() => navigate(`/note/${id}`)}
          >
            <Icon icon="iconamoon:edit-duotone" color="gray" />
            Detail
          </p>
        </li>
        <li onClick={() => handleArchiveActive()}>
          <p className="text-slate-600 text-md dark:text-white">
            <Icon
              icon={
                isArchived ? "hugeicons:note-03" : "material-symbols:archive"
              }
              color="gray"
            />
            {isArchived ? "Active" : "Archive"}
          </p>
        </li>
        <li>
          <p
            className="text-slate-600 text-md dark:text-white"
            onClick={() => handleDeleteNote()}
          >
            <Icon icon="octicon:trash-16" color="red" />
            Delete
          </p>
        </li>
      </ul>
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
