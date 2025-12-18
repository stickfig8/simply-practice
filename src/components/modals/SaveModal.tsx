import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

import { getToday, readableSeconds } from "@/utils/saveModalUtils";
import { useWaveformStore } from "@/stores/waveformStore";
import { useMetronomeStore } from "@/stores/metronomeStore";
import { useState } from "react";
import SaveModalInputWrapper from "./common/SaveModalInputWrapper";
import { useLanguageStore } from "@/stores/LanguageStore";
import { languageText } from "@/configs/language";

export default function SaveModal() {
  const date = getToday();
  const { title, loopStart, loopEnd } = useWaveformStore();
  const { bpm } = useMetronomeStore();

  const insts = ["guitar", "bass", "drum", "keyboard", "vocal", "etc"];

  const [part, setPart] = useState("");
  const [useRange, setUseRange] = useState(false);

  function handleRangeChecked(checked: boolean) {
    setUseRange(checked);
    if (checked) {
      setPart(`${readableSeconds(loopStart)} ~ ${readableSeconds(loopEnd)}`);
    } else {
      setPart("");
    }
  }

  const { lang } = useLanguageStore();
  const text = languageText.practice.save;

  return (
    <Drawer
      onOpenChange={(open) => {
        if (!open) return;
        setUseRange(false);
        setPart("");
      }}
    >
      <DrawerTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {text.save[lang]}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="px-5 w-full">
        <DrawerHeader>
          <DrawerTitle>{text.modalTitle[lang]}</DrawerTitle>
          <DrawerDescription>{date}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col mx-auto w-full max-w-120 gap-3">
          <SaveModalInputWrapper title={text.songTitle[lang]}>
            <Input
              defaultValue={title}
              placeholder="Song name"
              className="placeholder:text-sm"
            />
          </SaveModalInputWrapper>

          <SaveModalInputWrapper title={text.instrument[lang]}>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a intrument"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Band</SelectLabel>
                  {insts.map((inst) => (
                    <SelectItem key={inst} value={inst}>
                      {inst}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SaveModalInputWrapper>

          <SaveModalInputWrapper title={text.part[lang]}>
            <div className="flex items-center gap-2 w-full">
              <Input
                value={part}
                onChange={(e) => setPart(e.target.value)}
                placeholder="ex) 1-B part or 00:32 ~ 01:23"
                className="placeholder:text-sm"
              />
              <div className="flex items-center space-x-2 shrink-0">
                <Label htmlFor="use-range" className="text-sm">
                  {text.section[lang]}
                </Label>
                <Checkbox
                  id="use-range"
                  checked={useRange}
                  onCheckedChange={(e) => handleRangeChecked(Boolean(e))}
                />
              </div>
            </div>
          </SaveModalInputWrapper>

          <SaveModalInputWrapper title={text.bpm[lang]}>
            <Input defaultValue={bpm} placeholder="bpm" type="number" />
          </SaveModalInputWrapper>

          <SaveModalInputWrapper title={text.memo[lang]}>
            <Textarea
              placeholder="type practice memo"
              className="resize-none w-full whitespace-normal max-h-15 overflow-y-auto"
            />
          </SaveModalInputWrapper>

          <DrawerFooter className="px-0">
            <Button className="cursor-pointer">{text.save[lang]}</Button>
            <DrawerClose asChild>
              <Button variant="outline" className="cursor-pointer">
                {text.cancel[lang]}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
