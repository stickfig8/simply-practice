import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { languageText } from "@/configs/language";
import { useLanguageStore } from "@/stores/languageSettingStore";

export default function MainIntroduceCard({
  index,
  current,
  title,
  desc,
  img,
}: {
  index: number;
  current: number;
  title: string;
  desc: string;
  img: string;
}) {
  // 카드별 애니메이션 정의
  const variants = [
    {
      // 1: 좌우 슬라이드
      image: { x: -200, opacity: 0 },
      text: { x: 200, opacity: 0 },
    },
    {
      // 2: 상하 슬라이드
      image: { y: -200, opacity: 0 },
      text: { y: 200, opacity: 0 },
    },
    {
      // 3: 페이드 인
      image: { opacity: 0, scale: 0.95 },
      text: { opacity: 0, scale: 0.95 },
    },
  ];

  const isActive = current === index;
  const anim = variants[index] || variants[0];

  const navigate = useNavigate();
  const { lang } = useLanguageStore();

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 px-10">
      <motion.img
        style={{ willChange: "transform, opacity" }}
        key={
          current === index ? `active-img-${index}` : `inactive-img-${index}`
        }
        src={img}
        initial={anim.image}
        animate={isActive ? { x: 0, y: 0, opacity: 1, scale: 1 } : anim.image}
        transition={{ duration: 1 }}
        className="w-80 aspect-square object-cover rounded-xl shadow-lg border-1 max-[700px]:w-60"
      />
      <motion.div
        style={{ willChange: "transform, opacity" }}
        key={
          current === index ? `active-div-${index}` : `inactive-div-${index}`
        }
        initial={anim.text}
        animate={isActive ? { x: 0, y: 0, opacity: 1, scale: 1 } : anim.text}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-center md:text-left max-w-md"
      >
        <h2 className="text-4xl font-bold mb-4 max-[700px]:text-3xl">
          {title}
        </h2>
        <p className="text-lg text-gray-500 mb-6 max-[700px]:text-base">
          {desc}
        </p>
        {index === 3 && (
          <Button
            onClick={() => navigate("/practice")}
            className="px-6 py-3 text-lg cursor-pointer"
          >
            {languageText.main.button[lang]}
          </Button>
        )}
      </motion.div>
    </div>
  );
}
