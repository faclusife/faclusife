import { Transition, Dialog } from "@headlessui/react";
import type { Darts } from "@prisma/client";
import { Fragment, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import TableDarts from "./TableDarts";

type Props = {
  darts: Partial<Darts>[] | undefined;
  isLoading: boolean;
};

type UserSubmitForm = {
  score: number;
  name: string;
};

export default function TableDartsAdmin({ darts }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const utils = api.useContext();
  const createRecord = api.example.createDartsRecord.useMutation({
    onSuccess: () => {
      utils.example.getDartsStats.invalidate().catch(console.error);
      setOpenModal(false);
      reset();
      toast.success("Record created");
    },
    onError: (error) => {
      setOpenModal(false);
      toast.error(error.message);
    },
  });

  const cancelButtonRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserSubmitForm>();

  const createRecordHandler = (data: UserSubmitForm) => {
    createRecord.mutate({
      name: data.name,
      score: data.score,
    });
  };

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
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
                            Please provide information about record you want to
                            create
                          </p>
                        </div>
                        <div className="my-2 sm:col-span-3">
                          <label
                            htmlFor="score"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Place
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              {...register("score", {
                                valueAsNumber: true,
                                required: {
                                  value: true,
                                  message: "score is required",
                                },
                              })}
                              id="score"
                              className=" block w-full rounded-md border-gray-300 pl-1  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.score?.message && (
                              <p className={"text-sm text-red-400"}>
                                {errors.score?.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="my-2 sm:col-span-3">
                          <label
                            htmlFor="score"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Score
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              {...register("score", {
                                valueAsNumber: true,
                                required: {
                                  value: true,
                                  message: "score is required",
                                },
                              })}
                              id="score"
                              className=" block w-full rounded-md border-gray-300 pl-1  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.score?.message && (
                              <p className={"text-sm text-red-400"}>
                                {errors.score?.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="my-2 sm:col-span-3">
                          <label
                            htmlFor="Name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name
                          </label>
                          <div className="mt-1">
                            <input
                              type="name"
                              {...register("name", {
                                required: {
                                  value: true,
                                  message: "Name is required",
                                },
                              })}
                              id="name"
                              className=" block w-full rounded-md border-gray-300 pl-1  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />

                            <p className={"text-sm text-red-400"}>
                              {errors.name?.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={(event) => {
                        event.preventDefault();
                        void handleSubmit(createRecordHandler)(event);
                      }}
                    >
                      Add
                    </button>
                    <button
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
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Records
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setOpenModal(true)}
          >
            Add record
          </button>
        </div>
      </div>
      <TableDarts darts={darts} isLoading={false} />
    </div>
  );
}
