import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import Card from "../Card";
import useDebounce from "../../hooks/useDebounce";

const ActiveNoteSection = ({ data, setData }) => {
  const [dataActive, setDataActive] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearchTerm = useDebounce(searchParams.get("keyword"), 500);

  useEffect(() => {
    setDataActive(data);
  }, [data]);

  useEffect(() => {
    if (searchParams.get("keyword")?.length > 0) {
      setSearchParams({});
    }
  }, []);

  useEffect(() => {
    setDataActive(
      data?.filter(
        (item) =>
          item.body
            ?.toLowerCase()
            .includes(debouncedSearchTerm?.toLowerCase() || "") ||
          item.title
            ?.toLowerCase()
            .includes(debouncedSearchTerm?.toLowerCase() || "")
      )
    );
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search note.."
        className="mb-3 bg-gray-100 py-1 px-2 rounded-lg w-full border border-slate-300 dark:bg-dark-bg-secondary dark:text-slate-300"
        onChange={(e) => setSearchParams({ keyword: e.target.value })}
      />

      {dataActive?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative">
          {dataActive?.map((item) => (
            <Card key={item.id} data={item} setData={setData} />
          ))}
        </div>
      ) : debouncedSearchTerm?.length > 0 ? (
        <p className="dark:text-slate-200">
          Note with keyword &quot;{debouncedSearchTerm}&quot; is not found
        </p>
      ) : (
        <p className="dark:text-slate-200">Note is empty</p>
      )}
    </div>
  );
};

ActiveNoteSection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ),
  setData: PropTypes.func.isRequired,
};

export default ActiveNoteSection;
