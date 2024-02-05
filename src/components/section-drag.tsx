import {ChangeEvent, useState} from "react";

import SpinnerLoader from "./spinner-loading";

export default function SectionDrag() {
  const [file, setFile] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    // const ss = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve("foo");
    //   }, 2000);
    // });

    // await ss;
    const files = e.target.files;
    const data = new FormData();

    if (files && files.length) {
      data.append("file", files[0]);
    }
    data.append("upload_preset", "mmovwkqz");
    data.append("cloud_name", "dmzzbple8");

    fetch("https://api.cloudinary.com/v1_1/dmzzbple8/image/upload", {
      method: "POST",
      body: data,
    })
      .then((resp) => resp.json())
      .then((res) => setImageUrl(res.secure_url))
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });

    if (FileReader && files && files.length) {
      const fr = new FileReader();

      fr.readAsDataURL(files[0]);

      fr.onload = function () {
        setLoading(false);
        setFile(fr.result as string);
      };
    }
  }

  return (
    <section className="h-[44rem] w-full rounded-md px-24 py-12">
      {file !== "" && !loading ? (
        <div className="mx-auto h-full w-full rounded-md p-2 shadow-md xl:w-1/2 dark:bg-[#212936]">
          <img
            alt="aa"
            className="aspect-auto h-full w-full rounded-md object-contain"
            src={file}
          />
        </div>
      ) : loading === true ? (
        <SpinnerLoader />
      ) : (
        <div className="mx-auto h-full w-full rounded-md p-2 shadow-md xl:w-1/2 dark:bg-[#212936]">
          <div className=" relative flex h-full w-full  flex-col items-center justify-center gap-y-2 rounded-md border-2 border-dashed border-gray-200  p-2 dark:border-gray-400/50 dark:bg-[#212936]">
            <img alt="" className="h-16" src="/exit.svg" />
            <div className="mt-5">
              <span className="w-1/4 text-xl md:text-3xl dark:text-white">
                Drag & drop a file or{" "}
              </span>
              <label
                className="z-50 cursor-pointer text-xl text-[#3662E3] hover:text-[#3662E3]/80 md:text-3xl dark:text-sky-400 dark:hover:text-sky-400/80 "
                htmlFor="input"
              >
                browse files
              </label>
            </div>
            <span className="text-base text-gray-400 md:text-xl dark:text-gray-300">
              JPG, PNG or GIF - Max file size 2MB
            </span>
            <input
              accept="image/*"
              className="absolute h-full w-full file:hidden"
              id="input"
              style={{color: "transparent"}}
              type="file"
              onChange={onChange}
            />
          </div>
        </div>
      )}
      {file && !loading && (
        <div className="my-5 flex items-center justify-center gap-x-5">
          <button
            className="flex w-32 items-center justify-center gap-x-1.5 rounded-md bg-[#3662E3] px-5 py-2"
            onClick={() => {
              async function copyToClipboard(txt: string) {
                try {
                  const clipboardItem = new ClipboardItem({
                    "text/plain": new Blob([txt], {type: "text/plain"}),
                  });

                  await navigator.clipboard.write([clipboardItem]);
                } catch (error) {
                  await navigator.clipboard.writeText(txt);
                }
              }
              copyToClipboard(imageUrl);
            }}
          >
            <img alt="Link icon" className="h-4" src="/Link.svg" />
            <span className="text-white">Share</span>
          </button>
          <button className="flex w-32 items-center justify-center gap-x-1.5 rounded-md bg-[#3662E3] px-5 py-2">
            <img alt="Download icon" className="h-4" src="/download.svg" />
            <span className="text-white">DownLoad</span>
          </button>
        </div>
      )}
    </section>
  );
}
