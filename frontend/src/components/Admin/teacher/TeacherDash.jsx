import { useState } from "react";
import {
  useDeleteTeacherMutation,
  useGetAllTeachersQuery,
  useUpdateTeacherMutation,
} from "../../../redux/features/teacherSlice";
import Loading from "../../shared/Loading";
import { toast } from "react-toastify";

const TeacherDash = () => {
  const [teacherid, setTeacherid] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    position: "",
    phone: "",
  });

  const { data, isLoading, error } = useGetAllTeachersQuery();
  const [deleteTeacher] = useDeleteTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error)
    return <p className="p-4 text-red-600">Failed to load teachers!</p>;

  const teachers = data?.data || [];

  // Delete teacher
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

  // Edit teacher
  const handleEdit = (teacher) => {
    setTeacherid(teacher.id);
    setFormdata({
      name: teacher.name,
      email: teacher.email,
      position: teacher.position,
      phone: teacher.phone,
    });
    setOriginalData({
      name: teacher.name,
      email: teacher.email,
      position: teacher.position,
      phone: teacher.phone,
    });
    setIsModalOpen(true);
  };

  // Update teacher (only changed fields)
  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedData = {};
    if (formdata.name !== originalData.name) updatedData.name = formdata.name;
    if (formdata.email !== originalData.email)
      updatedData.email = formdata.email;
    if (formdata.position !== originalData.position)
      updatedData.position = formdata.position;
    if (formdata.phone !== originalData.phone)
      updatedData.phone = formdata.phone;

    if (Object.keys(updatedData).length === 0) {
      toast.info("No changes made");
      return;
    }

    try {
      const res= await updateTeacher({ id: teacherid, data: updatedData }).unwrap();
      console.log(res)
      toast.success(res.message||"Teacher updated Successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message||"Failed to update teacher");
      console.log(error?.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teachers List</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                ID
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
                  {teacher.id}
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

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Teacher</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={formdata.name}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formdata.email}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
              />
              <input
                type="text"
                id="position"
                placeholder="Position"
                value={formdata.position}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
              />
              <input
                type="text"
                id="phone"
                placeholder="Phone"
                value={formdata.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Update
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
