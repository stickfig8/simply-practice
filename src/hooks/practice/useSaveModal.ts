import { getToday, readableSeconds } from "@/utils/saveModalUtils";
import { useWaveformStore } from "@/stores/waveformStore";
import { useMetronomeStore } from "@/stores/metronomeStore";
import { useState } from "react";
import { useLanguageStore } from "@/stores/languageStore";
import { languageText } from "@/configs/language";
import { useDummyLogStore } from "@/stores/dummyDataStore";
import { useNavigate } from "react-router-dom";

export function useSaveModal() {
  const date = getToday();
  const { title, loopStart, loopEnd } = useWaveformStore();
  const { bpm } = useMetronomeStore();

  const insts = ["guitar", "bass", "drum", "keyboard", "vocal", "etc"];
  const [isOpen, setIsOpen] = useState(false);

  const [songTitle, setSongTitle] = useState("");
  const [instrument, setInstrument] = useState("");
  const [practicePart, setPracticePart] = useState("");
  const [logBpm, setLogBpm] = useState(0);
  const [desc, setDesc] = useState("");

  const [useRange, setUseRange] = useState(false);

  const { addLog } = useDummyLogStore();

  const { lang } = useLanguageStore();
  const text = languageText.practice.save;

  const navigate = useNavigate();

  function handleDrawerOpenChange(open: boolean) {
    setIsOpen(open);
    if (open) {
      setSongTitle(title);
      setLogBpm(bpm);
      setUseRange(false);
      setPracticePart("");
      setDesc("");
      setInstrument("");
    }
  }

  function handleRangeChecked(checked: boolean) {
    setUseRange(checked);
    if (checked) {
      setPracticePart(
        `${readableSeconds(loopStart)} ~ ${readableSeconds(loopEnd)}`
      );
    } else {
      setPracticePart("");
    }
  }

  function handleSave() {
    if (!songTitle || !instrument) {
      alert(text.saveErrAlert[lang]);
      return;
    }

    addLog({
      date,
      songTitle,
      instrument,
      bpm: logBpm,
      practicePart,
      desc,
    });

    const confirmed = window.confirm(text.saveConfirmAlert[lang]);

    if (confirmed) {
      navigate("/dashboard");
    }

    setIsOpen(false);
  }

  return {
    isOpen,
    insts,
    date,
    songTitle,
    practicePart,
    logBpm,
    desc,
    useRange,

    setInstrument,
    setSongTitle,
    setPracticePart,
    setLogBpm,
    setDesc,
    handleDrawerOpenChange,
    handleRangeChecked,
    handleSave,
  };
}
