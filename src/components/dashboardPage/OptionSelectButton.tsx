import { Button } from "../ui/button";

type Props = {
  text: string;
  onClick: () => void;
  isActivated?: boolean;
};

export default function OptionSelectButton({
  text,
  onClick,
  isActivated = false,
}: Props) {
  return (
    <Button
      className={`bg-white text-black w-13 h-7 rounded-[8px] cursor-pointer shadow-sm hover:brightness-90 hover:bg-white border-1 ${isActivated && "brightness-90"}`}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
