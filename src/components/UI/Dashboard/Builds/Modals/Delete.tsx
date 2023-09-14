import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

type DeleteBuild = {
  id: string;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};

export const ModalDeleteBuild = ({ id, open, setOpen }: DeleteBuild) => {
  const postDelete = async (id: string) => {
    setOpen(false);
    try {
      await axios.delete(`/api/builds/${id}`);
      toast.success('The build has been successfully removed!');
    } catch (error) {
      toast.error('An unexpected error has occurred!');
    }
  };
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl dark:bg-black bg-white border dark:border-[#222] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                    Are you sure to do this?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">All victims infected with this build will be removed!</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="mr-2 inline-flex justify-center rounded-md border border-transparent dark:bg-white bg-black px-4 py-2 text-sm font-medium dark:text-black text-white hover:bg-opacity-80"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                      onClick={() => postDelete(id)}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
