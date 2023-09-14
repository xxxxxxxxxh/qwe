import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

type EditWebhook = {
  id: string;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};

export const ModalEditWebhook = ({ id, open, setOpen }: EditWebhook) => {
  const [webhook, setWebhook] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const updateWebhook = async (id: string) => {
    setOpen(false);
    if (webhook) await axios.put(`/api/builds/${id}`, { webhook });
    toast.success('The webhook has been successfully updated!');
  };
  const onChange = (value: string) => {
    const url = /https:\/\/(canary\.|ptb\.)?discord\.com\/api\/webhooks\/[0-9]{17,19}\/([a-zA-Z0-9-_]+)/g;
    if (value === '') return setWebhook('');
    if (!url.test(value)) setError(true);

    setError(false);
    setWebhook(value);
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
                    Edit your Webhook URL!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">The next logs are notified in your new webhook!</p>
                  </div>

                  <div className="py-4 w-full">
                    <input
                      type="text"
                      value={webhook}
                      onChange={(event) => onChange(event.target.value)}
                      className={`${
                        error ? '!border-red-600 !text-red-500' : ''
                      } focus-visible:outline-none px-2 py-3 dark:bg-black bg-white border border-gray-300 dark:border-[#111] w-full text-sm rounded`}
                      autoComplete="false"
                      autoFocus={true}
                      placeholder="Your Webhook URL..."
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      disabled={error || !webhook}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black dark:bg-[#fafafa] text-white dark:text-black hover:bg-[#fafafa]/90 h-10 px-4 py-2"
                      onClick={() => updateWebhook(id)}
                    >
                      Save changes
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
