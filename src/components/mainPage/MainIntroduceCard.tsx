import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { languageText } from "@/configs/language";
import { useLanguageStore } from "@/stores/languageSettingStore";

type Props = {
  index: number;
  current: number;
  title: string;
  desc: string;
  img: string;
  isHero?: boolean;
};

export default function MainIntroduceCard({
  index,
  current,
  title,
  desc,
  img,
  isHero = false,
}: Props) {
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
      // 3: 상하 슬라이드(반대)
      image: { y: 200, opacity: 0 },
      text: { y: -200, opacity: 0 },
    },
    {
      // 4: 페이드 인
      image: { opacity: 0, scale: 0.95 },
      text: { opacity: 0, scale: 0.95 },
    },
  ];

  const isActive = current === index;
  const anim = variants[index - 1] || variants[0];

  const navigate = useNavigate();
  const { lang } = useLanguageStore();

  if (isHero) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <motion.img
          src={img}
          initial={{ opacity: 0, y: -40 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 2 }}
          className="w-100 max-[700px]:w-70"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 2, delay: 0.4 }}
          className="text-xl max-[700px]:text-base text-gray-400"
        >
          {desc}
        </motion.p>
        <motion.button
          onClick={() => navigate("/practice")}
          initial={{ opacity: 0, y: 0 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="px-5 py-3 mt-4 bg-indigo-600 text-white text-xs rounded-lg shadow-md hover:bg-indigo-700 transition cursor-pointer"
        >
          {languageText.main.quickButton[lang]}
        </motion.button>
      </div>
    );
  } else {
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
          transition={{ duration: 1.5 }}
          className="w-80 aspect-square object-cover rounded-xl shadow-lg border-1 max-[700px]:w-60"
        />
        <motion.div
          style={{ willChange: "transform, opacity" }}
          key={
            current === index ? `active-div-${index}` : `inactive-div-${index}`
          }
          initial={anim.text}
          animate={isActive ? { x: 0, y: 0, opacity: 1, scale: 1 } : anim.text}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="text-center md:text-left max-w-md"
        >
          <h2 className="text-4xl font-bold mb-4 max-[700px]:text-3xl">
            {title}
          </h2>
          <p className="text-lg text-gray-500 mb-6 max-[700px]:text-base">
            {desc}
          </p>
          {index === 4 && (
            <Button
              onClick={() => navigate("/practice")}
              className="px-4 py-3 text-xs cursor-pointer"
            >
              {languageText.main.button[lang]}
            </Button>
          )}
        </motion.div>
      </div>
    );
  }
}
