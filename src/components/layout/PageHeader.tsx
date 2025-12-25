type Props = {
  title: string;
};
export default function PageHeader({ title }: Props) {
  return (
    <header className="sticky top-0 w-full flex justify-center items-center h-20 z-10 bg-white max-[700px]:h-10">
      <h3 className="text-lg font-semibold">{title}</h3>
    </header>
  );
}
