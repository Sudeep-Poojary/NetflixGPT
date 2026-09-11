import lang from "../utils/languageConstants";

const GptSearchBar = () => {
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black/80 grid grid-cols-12 rounded-lg">
        <input
          type="text"
          className="p-2 m-4 col-span-9 bg-white rounded-sm"
          placeholder={lang.hindi.gptSearchPlaceHolder}
        />
        <button className="col-span-3 m-4 rounded bg-red-600 px-4 py-1.5 text-sm font-semibold text-white transition duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black">
          {lang.hindi.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
