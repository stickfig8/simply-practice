type Props = {
  title: string;
};
export default function PageHeader({ title }: Props) {
  return (
    <header className="sticky top-0 w-full flex justify-center items-center h-16 z-10 bg-white md:flex hidden">
      <h3 className="text-lg font-semibold">{title}</h3>
    </header>
  );
}
