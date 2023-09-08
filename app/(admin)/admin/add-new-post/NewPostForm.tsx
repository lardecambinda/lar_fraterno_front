"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { createPost } from "@/services/apolloAPI";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Paperclip, Trash2 } from "lucide-react";
import { IFile } from "@/types/types";
import Tooltip from "@/components/Tooltip/Tooltip";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { toast } from "react-toastify";

interface IFormValues {
  title: string;
  content: string;
}

const NewPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormValues>();

  const { user } = useAuth();

  const [inputFiles, setInputFiles] = useState<File[] | undefined>(undefined);
  const [formFiles, setFormFiles] = useState<IFile[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const submit: SubmitHandler<IFormValues> = async (data) => {
    const { title, content } = data;

    if (!user) {
      return;
    }

    if (formFiles && formFiles.length > 0) {
      const noDate = formFiles.filter((file) => file.fileDate == "");

      if (noDate.length > 0) {
        return console.log("Todos os arquivos devem ter data e categoria...");
      }
    }

    const newPost = {
      title,
      content,
      user_id: user.id,
      files: formFiles,
    };

    console.log(newPost);

    setLoading(true);

    console.log(await createPost({ title, content, user_id: user.id }));

    setLoading(false);

    // reset form
    setValue("title", "");
    setValue("content", "");
    setFormFiles(undefined);
    setInputFiles(undefined);
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (!selectedFiles) {
      return;
    }

    const fileArr = Array.from(selectedFiles);

    setInputFiles(fileArr);
  };

  useEffect(() => {
    const temp: IFile[] | undefined = [];

    if (!inputFiles || (formFiles && formFiles.length > 0)) {
      return;
    }

    inputFiles.forEach((file) => {
      const obj: IFile = {
        file,
        fileDate: "",
        fileCategory: 0,
      };

      temp.push(obj as IFile);
    });

    setFormFiles(temp);
  }, [inputFiles]);

  const handleFileDate = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    if (!formFiles) {
      return;
    }
    let currentFile = formFiles[i];
    let temp = formFiles;

    currentFile.fileDate = e.target.value;

    temp.splice(i, 1, currentFile);

    setFormFiles([...temp]);
  };

  const handleCategory = (
    e: React.ChangeEvent<HTMLSelectElement>,
    i: number
  ) => {
    if (!formFiles) {
      return;
    }
    let currentFile = formFiles[i];
    let temp = formFiles;

    currentFile.fileCategory = Number(e.target.value);

    temp.splice(i, 1, currentFile);

    setFormFiles([...temp]);
  };

  const handleDeleteFile = (i: number) => {
    if (!formFiles || !inputFiles) {
      return;
    }

    const tempFormFiles = formFiles.filter((item) => {
      return formFiles.indexOf(item) != i;
    });

    const tempInputFiles = inputFiles.filter((item) => {
      return inputFiles.indexOf(item) != i;
    });

    setFormFiles(tempFormFiles);
    setInputFiles(tempInputFiles);
  };

  return (
    <div className="w-full">
      <form
        className="flex flex-col w-full bg-white  shadow-sm px-4 py-5"
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

        <div className="mb-4">
          <div>
            <label
              title="Adicionar arquivos"
              className="cursor-pointer flex items-center justify-center gap-2 w-fit m-auto"
              htmlFor="files"
            >
              <Paperclip size={16} strokeWidth={1.5} />
              <span className="text-sm">Adicionar arquivos</span>
            </label>
            <input
              className="absolute opacity-0 pointer-events-none"
              onChange={handleFiles}
              type="file"
              name="files"
              id="files"
              multiple
              accept=".pdf"
            />
          </div>

          {inputFiles && inputFiles.length > 0 && (
            <div className="border p-4 my-4">
              <div className="flex items-center justify-end text-xs text-gray-400">
                <p>
                  {" "}
                  <span>{inputFiles.length}</span>{" "}
                  {inputFiles.length > 1
                    ? "arquivos selecionados"
                    : "arquivo selecionado"}
                </p>
              </div>

              {inputFiles.map((file, i) => {
                return (
                  <div
                    key={i}
                    className="h-20 w-full border-b last-of-type:border-none md:flex items-center justify-between text-sm "
                  >
                    <div>
                      <p>{file.name}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center gap-2 pr-2 border-r">
                        <Tooltip text="Selecione a data em que a reunião aconteceu">
                          <span className="text-[10px] cursor-default bg-light-black text-white rounded px-1">
                            ?
                          </span>
                        </Tooltip>
                        <input
                          onChange={(e) => handleFileDate(e, i)}
                          className="outline-none border border-transparent focus:border-gray-800 rounded  "
                          type="date"
                          id="date"
                        />
                      </div>

                      <select
                        onChange={(e) => handleCategory(e, i)}
                        className="outline-none border border-transparent focus:border-gray-800 rounded  "
                        defaultValue={"Categoria"}
                      >
                        <option disabled hidden value="Categoria">
                          Categoria
                        </option>
                        <option value={0}>Exú</option>
                        <option value={1}>Caboclo</option>
                        <option value={2}>Preto Velho</option>
                        <option value={3}>Tratamento</option>
                        <option value={4}>Estudo</option>
                      </select>

                      <div>
                        <button
                          onClick={() => handleDeleteFile(i)}
                          className="flex items-center justify-center px-1"
                          title="Deletar arquivo"
                          type="button"
                        >
                          <Trash2 size={16} color="#ff5757" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <SubmitButton
          width={"80px"}
          className=" self-end"
          label="Enviar"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default NewPostForm;
