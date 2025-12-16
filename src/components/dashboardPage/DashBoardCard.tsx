type Props = {
  children: React.ReactNode;
  title: string;
  desc: string;
};

export default function DashBoardCard({ children, title, desc }: Props) {
  return (
    <div className="w-full h-100 rounded-[16px] p-4 border-1 flex flex-col gap-2 items-center shadow-md">
      <h3 className="w-full h-fit flex items-center pb-2 px-1 border-b-1 font-semibold">
        {title}
      </h3>
      <div className="w-full h-60 flex items-center jutify-center">
        {children}
      </div>
      <p className="w-full h-fit flex items-center pt-2 px-1 mt-2 border-t-1 text-sm text-gray-500">
        {desc}
      </p>
    </div>
  );
}
