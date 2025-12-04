
import { indexSlice } from "./indexSlice";

export const teachersAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Get All teachers //query :get,post,delete,update(moutation)
    getAllTeachers: builder.query({
      query: () => ({
        url: "/teacher/get-teacher",
        method: "GET",
      }),
      providesTags: ["teacher"],
    }),
    addTeacher: builder.mutation({
      query: (data) => ({
        url: "/teacher/add-teacher",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teacher"],
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/teacher/delete-teacher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teacher"],
    }),
    updateTeacher: builder.mutation({
      query: ({id, data}) => ({
        url: `/teacher/update-teacher/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["teacher"],
    }),
  }),
});
export const { useGetAllTeachersQuery, useAddTeacherMutation, useDeleteTeacherMutation, useUpdateTeacherMutation } = teachersAPIs;
