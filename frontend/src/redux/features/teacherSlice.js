import { indexSlice } from "./indexSlice";

export const teachersAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Get All teachers //query :get,post,delete,update(moutation)
    getALlTeachers: builder.query({
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
  }),
});
export const { useGetALlTeachersQuery, useAddTeacherMutation } = teachersAPIs;
