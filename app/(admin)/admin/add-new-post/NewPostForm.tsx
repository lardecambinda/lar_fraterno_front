"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { createPost } from "@/services/apolloAPI";

interface IFormValues {
  title: string;
  content: string;
}

const NewPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const submit: SubmitHandler<IFormValues> = (data) => {
    console.log(data);

    const { title, content } = data;

    createPost({ title, content });
  };
  return (
    <div className="w-full">
      <form
        className="flex flex-col w-full bg-white rounded shadow-sm px-4 py-5"
        onSubmit={handleSubmit(submit)}
      >
        <div className="relative mb-4">
          <label className="text-sm font-medium ml-1" htmlFor="title">
            Título
          </label>
          <input
            className={`w-full h-11 border focus:border-gray-800 outline-none px-4 ${
              errors.title ? "border-rose-500" : ""
            }`}
            {...register("title", { required: true })}
            type="text"
            id="title"
          />
          {errors.title && (
            <p className="text-rose-500 text-xs font-semibold absolute">
              Título é um campo obrigatório
            </p>
          )}
        </div>

        <div className="relative mb-4">
          <label className="text-sm font-medium ml-1" htmlFor="content">
            Conteúdo
          </label>
          <textarea
            className={`w-full min-h-[100px] border focus:border-gray-800 outline-none px-4 py-2  ${
              errors.content ? "border-rose-500" : ""
            }`}
            {...register("content", { required: true })}
            id="content"
          />
          {errors.content && (
            <p className="text-rose-500 text-xs font-semibold absolute">
              Conteúdo é um campo obrigatório
            </p>
          )}
        </div>

        {/* <div>
          <label htmlFor="files">Arquivos</label>
          <input type="file" name="files" id="files" />
        </div> */}

        <button
          title="Enviar"
          className="self-end bg-light-black text-white font-semibold px-4 py-3 rounded"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default NewPostForm;
