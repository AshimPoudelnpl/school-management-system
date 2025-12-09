import { useState } from "react";
import {
  useAddTeacherMutation,
  useDeleteTeacherMutation,
  useGetAllTeachersQuery,
  useUpdateTeacherMutation,
} from "../../../redux/features/teacherSlice";
import Loading from "../../shared/Loading";
import { toast } from "react-toastify";
import Pagination from "../../shared/Pagination";
const initialData = {
  name: "",
  email: "",
  position: "",
  phone: "",
  image: "",
};
``;
const TeacherDash = () => {
  const [teacherid, setTeacherid] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [formdata, setFormdata] = useState(initialData);
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetAllTeachersQuery({page,limit:5});
  const [deleteTeacher] = useDeleteTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation();
  const [addteacher] = useAddTeacherMutation();

  
  
  const totalPages = data?.totalPages;

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };
  const handleFileChange = (e) => {
    setFormdata((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error)
    return <p className="p-4 text-red-600">Failed to load teachers!</p>;

  const teachers = data?.teacher;

  const handleDelete = async (teacher) => {
    setTeacherid(teacher.id);
    try {
      await deleteTeacher(teacher.id).unwrap();
      toast.success(`${teacher.name} deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete teacher");
      console.log(error);
    }
  };

  const handleEdit = (teacher) => {
    setIsAdding(false);
    setTeacherid(teacher.id);
    setFormdata({
      name: teacher.name,
      email: teacher.email,
      position: teacher.position,
      phone: teacher.phone,
      image: teacher.img,
    });
    setOriginalData(teacher);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAdding) {
      try {
        const multerData = new FormData();
        multerData.append("name", formdata.name);
        multerData.append("email", formdata.email);
        multerData.append("position", formdata.position);
        multerData.append("phone", formdata.phone);
        multerData.append("image", formdata.image);

        const res = await addteacher(multerData).unwrap();
        toast.success(res.message);
        setFormdata(initialData);
        setIsModalOpen(false);
      } catch (error) {
        toast.error(error.data?.message);
      }
      return;
    }

    let updatedData = new FormData();

    if (formdata.name !== originalData.name) {
      updatedData.append("name", formdata.name);
    }

    if (formdata.email !== originalData.email) {
      updatedData.append("email", formdata.email);
    }

    if (formdata.position !== originalData.position) {
      updatedData.append("position", formdata.position);
    }

    if (formdata.phone !== originalData.phone) {
      updatedData.append("phone", formdata.phone);
    }

    if (formdata.image instanceof File) {
      updatedData.append("image", formdata.image);
    }

    if ([...updatedData.keys()].length === 0) {
      toast.info("No changes made");
      return;
    }

    try {
      const res = await updateTeacher({
        id: teacherid,
        data: updatedData,
      }).unwrap();
      console.log(res);
      toast.success(res.message || "Teacher updated Successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update teacher");
      console.log(error?.message);
    }
  };
  const handleAddTeacher = () => {
    setIsModalOpen(true);
    setIsAdding(true);
    setTeacherid(null);
    setFormdata(initialData);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4">Teachers List</h1>
        <button
          onClick={handleAddTeacher}
          className="cursor-pointer bg-amber-700 text-white px-3 rounded-full"
        >
          Add Teacher
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {teacher.img ? (
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}/${teacher.img}`}
                      alt={teacher.img ? teacher.name : "No Image"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 text-xs">No Image</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 text-sm text-blue-600">
                  {teacher.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {teacher.position}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {teacher.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="space-x-2">
                    <button
                      onClick={() => handleDelete(teacher)}
                      className="cursor-pointer bg-red-600 text-white px-3 py-1 rounded-2xl"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(teacher)}
                      className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded-2xl"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {teachers.length === 0 && (
          <p className="p-4 text-center text-gray-500">No teacher data found</p>
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg rounded-xl w-96 p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {isAdding ? "Add" : "Edit"} Teacher
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={formdata.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formdata.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                id="position"
                placeholder="Position"
                value={formdata.position}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                id="phone"
                placeholder="Phone"
                value={formdata.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {!isAdding && formdata.image ? (
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}/${formdata.image}`}
                  alt={formdata.name}
                />
              ) : null}

              <input
                type="file"
                id="image"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required={isAdding}
              />

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isAdding ? "Add" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDash;
