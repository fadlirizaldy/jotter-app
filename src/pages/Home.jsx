import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import ActiveNoteSection from "../components/section/ActiveNoteSection";
import ArchiveNoteSection from "../components/section/ArchivedNoteSection";
import Tabs from "../components/Tabs";
import Modal from "../components/modal/Modal";
import { getActiveNotes, getArchivedNotes } from "../utils/api";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const tabs = [
    {
      label: "Active",
      content: <ActiveNoteSection data={data.dataActive} setData={setData} />,
    },
    {
      label: "Archived",
      content: (
        <ArchiveNoteSection data={data.dataArchived} setData={setData} />
      ),
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const promiseDataActive = getActiveNotes();
    const promiseDataArchived = getArchivedNotes();

    Promise.all([promiseDataActive, promiseDataArchived])
      .then((values) => {
        if (values[0].status === 401) {
          toast.info("Please login to continue");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        setData({ dataActive: values[0].data, dataArchived: values[1].data });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="mt-3 px-5 relative">
        {isLoading ? (
          <div className="flex justify-center mt-10">
            <BeatLoader color="#36d7b7" />
          </div>
        ) : (
          <Tabs tabs={tabs} />
        )}
      </div>
      <div
        className="p-2 rounded-full bg-blue-300 w-fit fixed right-10 bottom-10 z-50"
        onClick={() => setShowModal(true)}
      >
        <Icon
          icon="ic:round-add"
          className="text-white text-2xl cursor-pointer transition-all "
        />
      </div>
      {showModal && <Modal setData={setData} setShowModal={setShowModal} />}
    </Layout>
  );
};

export default HomePage;
