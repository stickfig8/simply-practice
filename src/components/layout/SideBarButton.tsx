import { Link } from "react-router-dom";

type Props = {
  to: string;
  name: string;
};

export default function SideBarButton({ to, name }: Props) {
  return (
    <Link to={to} className="block hover:text-indigo-300 text-gray-200">
      {name}
    </Link>
  );
}
