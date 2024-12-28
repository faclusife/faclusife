/* eslint-disable */

import { api } from "~/utils/api";
import { DocumentCheckIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { format } from "date-fns";
import { uk } from "date-fns/locale/uk";
import WarningModal from "~/components/WarningModal";

export default function MoviesPage() {
  const movies = api.movies.getAllToWatch.useQuery();
  const createMovie = api.movies.createNew.useMutation({
    onSuccess: () => {
      movies.refetch();
      reset({
        title: "",
        year: 0,
        image: "",
        bohdan: 0,
        mykola: 0,
      });
      setOpenModal(false);
    },
    onError: (error) => {
      toast.error("Error while creating movie. Please try login first");
    },
  });

  const updateMovie = api.movies.setToWatched.useMutation({
    onSuccess: () => {
      movies.refetch();
      toast.success("Movie was set to watched");
    },
  });

  const router = useRouter();
  const { data: sessionData } = useSession();

  const [openModal, setOpenModal] = useState(false);
  const [warning, setWarning] = useState(false);
  const [chosenMovie, setChoosenMovie] = useState<string | null>(null);
  const cancelButtonRef = useRef(null);

  const createMovieHandler = (data: any) => {
    createMovie.mutate({
      title: data["title"],
      year: data["year"],
      imageUrl: data["image"],
      bohdan: data["bohdan"] ?? 0,
      mykola: data["mykola"] ?? 0,
      status: "TO_WATCH",
    });
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  if (movies.isLoading) {
    return (
      <div className=" flex h-screen items-center justify-center">
        <svg
          aria-hidden="true"
          className="mr-2 h-40 w-40 animate-spin fill-black text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Коля І Богдан | Очередь</title>
        <meta name="description" content="Created by rvg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WarningModal
        header={"Точно подивились?"}
        text={"Ти прям уверен, шо подивився?"}
        open={warning}
        setOpen={setWarning}
        register={register}
        confirmAction={() => {
          setWarning(false);
          if (chosenMovie) {
            updateMovie.mutate({
              id: chosenMovie,
              bohdan: getValues("bohdan"),
              mykola: getValues("mykola"),
            });
            router.push("/movies");
          }
        }}
        confirmLabel={"Точно  "}
      />
      <Transition.Root show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setOpenModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Create a new movie
                        </Dialog.Title>
                        <div className="my-2">
                          <p className="text-sm text-gray-500">
                            Please provide information about movie you want to
                            create
                          </p>
                        </div>

                        <div className="my-2 sm:col-span-3">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Title
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              {...register("title", {
                                required: {
                                  value: true,
                                  message: "Title is required",
                                },
                                minLength: {
                                  value: 2,
                                  message:
                                    "Title must be at least 2 characters",
                                },
                              })}
                              id="title"
                              className=" block w-full rounded-md border-gray-300 pl-1  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors?.["title"]?.message && (
                              <p className={"text-sm text-red-400"}>
                                {errors?.["title"]?.message as string}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="my-2 sm:col-span-3">
                          <label
                            htmlFor="year"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Year
                          </label>
                          <div className="mt-1">
                            <input
                              type="year"
                              {...register("year", {
                                valueAsNumber: true,
                              })}
                              id="year"
                              className=" block w-full rounded-md border-gray-300 pl-1  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors?.["year"]?.message && (
                              <p className={"text-sm text-red-400"}>
                                {errors?.["year"]?.message as string}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="my-2 sm:col-span-3">
                          <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Image
                          </label>
                          <div className="mt-1">
                            <input
                              type="string"
                              {...register("image", {})}
                              id="image"
                              className=" block w-full rounded-md border-gray-300 pl-1  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors?.["image"]?.message && (
                              <p className={"text-sm text-red-400"}>
                                {errors?.["image"]?.message as string}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="bohdan"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Bohdan
                            </label>
                            <div className="mt-1">
                              <input
                                type="bohdan"
                                defaultValue={0}
                                {...register("bohdan", {
                                  valueAsNumber: true,
                                })}
                                id="bohdan"
                                className=" block w-full rounded-md border-gray-300 pl-1  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              />
                              {errors?.["bohdan"]?.message && (
                                <p className={"text-sm text-red-400"}>
                                  {errors?.["bohdan"]?.message as string}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="mykola"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Mykola
                            </label>
                            <div className="mt-1">
                              <input
                                type="mykola"
                                defaultValue={0}
                                {...register("mykola", {
                                  valueAsNumber: true,
                                })}
                                id="mykola"
                                className=" block w-full rounded-md border-gray-300 pl-1  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              />
                              {errors?.["mykola"]?.message && (
                                <p className={"text-sm text-red-400"}>
                                  {errors?.["mykola"]?.message as string}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleSubmit(createMovieHandler)}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setOpenModal(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="mt-10 flex justify-center text-6xl font-bold">
        Сайт рейтінга фільмів від Миколи і Богдана
      </div>
      {movies.data?.[0] ? (
        <div className="mx-10">
          <button
            onClick={() => router.push("/movies")}
            className="ml-2  mt-6 text-lg leading-8 text-blue-600   hover:underline "
          >
            {`Рейтинг`}
          </button>
          {sessionData?.user.name && (
            <div>
              <button
                onClick={() => setOpenModal(true)}
                className="ml-2  mt-6 text-lg leading-8 text-blue-600   hover:underline "
              >
                {`Add new movie`}
              </button>
              <button
                onClick={() => {
                  router.replace("/");
                }}
                className="ml-2  mt-6 text-lg leading-8 text-blue-600   hover:underline "
              >
                {`Main page`}
              </button>
            </div>
          )}
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5"
          >
            {movies.data?.map((movie) => (
              <li key={movie.title}>
                <div>
                  <img
                    className=" aspect-auto  max-h-96  max-w-xs rounded-2xl object-cover"
                    src={movie.imageUrl || "https://picsum.photos/200/300"}
                    alt=""
                  />
                  <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    {movie.title}
                  </h3>
                  <h3 className=" text-base font-semibold leading-8 tracking-tight text-gray-900">
                    Рік: {movie.year}
                  </h3>

                  {sessionData?.user.name && (
                    <button
                      type="button"
                      onClick={() => {
                        setWarning(true);
                        setChoosenMovie(movie.id);
                      }}
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <DocumentCheckIcon
                        className="-ml-0.5 mr-1.5 h-5 w-5"
                        aria-hidden="true"
                      />
                      Подивились!
                    </button>
                  )}
                  <></>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center ">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              No films yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new film.
            </p>
            <div className="mt-6">
              {sessionData?.user.name && (
                <button
                  type="button"
                  onClick={() => setOpenModal(true)}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PlusIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  Add first film!
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
