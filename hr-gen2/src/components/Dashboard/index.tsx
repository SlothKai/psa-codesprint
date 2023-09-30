const DashboardRow = () => {
  return (
    <div className="hidden items-center py-3 md:flex">
      <span className="basis-1/12 font-medium ">1</span>
      <span className="basis-8/12 font-medium ">Owen Lee</span>
      <span className="basis-8/12 truncate font-medium">Engineering</span>
      {/* <span className="basis-1/12 font-medium ">{index}</span>
      <span className="basis-8/12 font-medium ">{fullShortened}</span>
      <span className="basis-8/12 truncate font-medium">{url}</span> */}

      <div className="flex basis-5/12 flex-row justify-end gap-x-2">
        <div
          className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black"
          //   onClick={() => generateQrCode(fullShortened)}
        >
          {/* <QrCodeIcon
            width={20}
            height={20}
            className="fill-gray-500 transition-all group-hover:fill-black"
          /> */}
        </div>
        <div
          className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black"
          onClick={() => {
            // handleCopy(fullShortened);
          }}
        >
          {/* <Clipboard
            width={20}
            height={20}
            className="stroke-gray-500 transition-all group-hover:stroke-black"
          /> */}
        </div>
        {/* <TrashButton
          removeUrl={() => {
            removeUrl(shtnd_url);
          }}
        /> */}
      </div>
    </div>
  );
};

export default DashboardRow;
