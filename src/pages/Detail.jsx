import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Layout from "../components/Layout";
import { showFormattedDate } from "../utils";
import { useEffect, useState } from "react";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/api";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getNote(id)
        .then((res) => {
          setData(res.data);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleActiveArchive = async () => {
    if (data.archived) {
      const responseActive = await unarchiveNote(id);
      if (responseActive.error) {
        toast.error("Error to active note");
        return;
      }
      toast.success("Success to active the note");
      setData((prev) => ({ ...prev, archived: false }));
    } else {
      const responseArchived = await archiveNote(id);
      if (responseArchived.error) {
        toast.error("Error to archived note");
        return;
      }
      toast.success("Success to archived the note");
      setData((prev) => ({ ...prev, archived: true }));
    }
  };

  const handleDeleteNote = async () => {
    const responseDelete = await deleteNote(id);
    if (responseDelete.error) {
      toast.error("Failed to remove", { autoClose: 1000 });
    } else {
      toast.success("Note removed!", { autoClose: 1000 });
      navigate("/");
    }
  };

  return (
    <Layout>
      <div className="px-4 mt-4">
        {isLoading ? (
          <div className="flex justify-center mt-10">
            <BeatLoader color="#36d7b7" />
          </div>
        ) : (
          <>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <Icon icon="ion:chevron-back-outline" color="gray" width="18" />
              <p>Back</p>
            </div>

            <section className="mt-6 sm:px-6">
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-2xl underline">
                  {data?.title}
                </h1>
                <div className="flex sm:flex-row flex-col items-center gap-2">
                  <Icon
                    icon="material-symbols:bookmark"
                    className={`cursor-pointer ${
                      data?.archived ? "text-yellow-400" : "text-gray-400"
                    }`}
                    width={24}
                    onClick={() => handleActiveArchive()}
                  />
                  <Icon
                    icon="mdi:trash"
                    className="text-gray-400 cursor-pointer"
                    width={24}
                    onClick={() => handleDeleteNote()}
                  />
                </div>
              </div>
              <p className="text-slate-400 font-medium mb-3 text-sm mt-1">
                {showFormattedDate(data?.createdAt)}
              </p>
              <p>{data?.body}</p>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default DetailPage;
