import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import styles from "./modal.module.css";
import { addNote } from "../../utils/api";

const Modal = ({ setData, setShowModal }) => {
  const [inputData, setInputData] = useState({
    title: "",
    body: "",
  });

  const [error, setError] = useState({ title: "", body: "" });

  const validateData = () => {
    const newErrors = {};

    if (inputData.title === "") {
      newErrors.title = "Please input the title";
    }
    if (inputData.body === "") {
      newErrors.body = "Please input the description";
    }

    return newErrors;
  };

  const onSaveNote = async () => {
    const validationErrors = validateData();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    const responsePostData = await addNote(inputData);

    if (responsePostData.error) {
      toast.success("Failed to save the Note!", { autoClose: 1000 });
      return;
    }

    setData((prev) => ({
      ...prev,
      dataActive: [...prev.dataActive, responsePostData?.data],
    }));
    setShowModal(false);
    toast.success("Note saved!", { autoClose: 2000 });
  };

  return (
    <div className={`dark:text-slate-300 ${styles.modal}`}>
      <div className={`dark:bg-dark-bg-secondary ${styles.modalContent}`}>
        <span className={styles.close} onClick={() => setShowModal(false)}>
          &times;
        </span>
        {/* {children} */}
        <h1 className={`dark:text-slate-100 text-xl ${styles.titleModal}`}>
          New note
        </h1>

        <form action="" className={styles.form}>
          <label className="">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter your title"
            className={`border-b dark:border-slate-300 dark:bg-dark-bg-secondary ${styles.inputForm}`}
            onChange={(e) =>
              setInputData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          {error?.title && (
            <p className="text-sm text-red-500">{error?.title}</p>
          )}
          <label>Description</label>
          <textarea
            name="description"
            cols="20"
            rows="5"
            className={`border-b dark:border-slate-300 dark:bg-dark-bg-secondary ${styles.inputTextArea}`}
            placeholder="Enter your description"
            onChange={(e) =>
              setInputData((prev) => ({ ...prev, body: e.target.value }))
            }
          ></textarea>
          {error?.body && <p className="text-sm text-red-500">{error?.body}</p>}
        </form>

        <div className={styles.modalBtn}>
          <button
            className="dark:!bg-[#dc143c] dark:text-white"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button onClick={() => onSaveNote()}>Save</button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
};

export default Modal;
