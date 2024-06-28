import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import CardButton from "./CardButton";
import { showFormattedDate } from "../utils";
import { archiveNote, deleteNote, unarchiveNote } from "../utils/api";

const Card = ({ data, setData }) => {
  const { id, title, body, createdAt, archived } = data;

  const [showOption, setShowOption] = useState(false);
  const navigate = useNavigate();

  const handleDeleteNote = async () => {
    const responseDelete = await deleteNote(id);
    if (responseDelete.error) {
      toast.error("Failed to remove", { autoClose: 1000 });
    } else {
      toast.success("Note removed!", { autoClose: 1000 });
    }

    setData((prev) => {
      if (archived) {
        const newData = prev.dataArchived.filter((data) => data.id !== id);
        return { ...prev, dataArchived: newData };
      } else {
        const newData = prev.dataActive.filter((data) => data.id !== id);
        return { ...prev, dataActive: newData };
      }
    });
  };

  const handleArchiveActive = async () => {
    let responseData;
    if (archived) {
      responseData = await unarchiveNote(id);
    } else {
      responseData = await archiveNote(id);
    }

    if (responseData?.error) {
      toast.error("There's an error");
      return;
    }

    setData((prev) => {
      if (archived) {
        const newData = prev.dataActive?.filter((item) => item.id !== id);
        return {
          dataActive: [...prev.dataActive, { ...data, archived: false }],
          dataArchived: newData,
        };
      } else {
        const newData = prev.dataActive?.filter((item) => item.id !== id);
        return {
          dataActive: newData,
          dataArchived: [...prev.dataArchived, { ...data, archived: true }],
        };
      }
    });

    toast.success(
      archived ? "Success activated note" : "Success archived note",
      { autoClose: 1000 }
    );
  };

  return (
    <div className="relative p-3 border group border-slate-300 break-words rounded-md z-50 shadow-md min-h-[200px] gap-5 dark:bg-dark-bg-secondary">
      {showOption && (
        <CardButton
          key={id}
          id={id}
          isArchived={archived}
          handleDeleteNote={handleDeleteNote}
          handleArchiveActive={handleArchiveActive}
        />
      )}

      <Icon
        icon="bi:three-dots-vertical"
        color="gray"
        width="24"
        className="hidden absolute group-hover:block right-2 cursor-pointer z-[100] p-1 transition-all active:border active:border-slate-300 active:rounded-full"
        onClick={() => setShowOption((prev) => !prev)}
      />

      <h1
        className="cursor-pointer font-semibold text-lg dark:text-white"
        onClick={() => navigate(`/note/${id}`)}
      >
        {title}
      </h1>
      <p className="text-slate-400 font-medium mb-3 text-xs dark:text-slate-300">
        {showFormattedDate(createdAt)}
      </p>
      <p className="text-sm dark:text-slate-100">{body}</p>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }).isRequired,
  setData: PropTypes.func.isRequired,
};

export default Card;
