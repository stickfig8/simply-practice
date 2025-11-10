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
          Save
        </Button>
      </DrawerTrigger>

      <DrawerContent className="px-5 w-full">
        <DrawerHeader>
          <DrawerTitle>오늘의 연습일지</DrawerTitle>
          <DrawerDescription>{date}</DrawerDescription>
        </DrawerHeader>
        <div className="flex-col mx-auto w-full max-w-120">
          <Label className="text-lg">곡명</Label>
          <Input defaultValue={title} placeholder="Song name" />

          <Label className="text-lg">악기</Label>
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

          <Label className="text-lg">연습 파트</Label>
          <div className="flex items-center gap-2">
            <Input
              value={part}
              onChange={(e) => setPart(e.target.value)}
              placeholder="ex) 1절 b파트 or 00:32 ~ 01:23"
            />
            <div className="flex items-center space-x-2 shrink-0">
              <Label htmlFor="use-range" className="text-sm">
                구간
              </Label>
              <Checkbox
                id="use-range"
                checked={useRange}
                onCheckedChange={(e) => handleRangeChecked(Boolean(e))}
              />
            </div>
          </div>

          <Label className="text-lg">연습 BPM</Label>
          <Input defaultValue={bpm} placeholder="bpm" type="number" />

          <Label className="text-lg">메모</Label>
          <Textarea
            placeholder="type practice memo"
            className="resize-none w-full whitespace-normal max-h-15 overflow-y-auto"
          />

          <DrawerFooter className="px-0">
            <Button className="cursor-pointer">submit</Button>
            <DrawerClose asChild>
              <Button variant="outline" className="cursor-pointer">
                cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
